const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
const FOOD_CHAT_ID = '8072569639';
const NEW_USER_CHAT_ID = '7225335915';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '500756304339-78rjnbeajcu4tg8aml1k14iov9vu5qjk.apps.googleusercontent.com';
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://iqbol.onrender.com';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 
let pendingTgPhones = {}; 
let otpStore = {};        
let googleUserPhones = {}; 
let paymentOrders = {}; // orderId -> { status: 'pending' | 'approved' | 'rejected', createdAt }
const seenUsers = new Set();
let botUsername = '';

function normalizePhone(raw) {
    let digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 9) digits = '998' + digits;
    return digits;
}

function tgRequest(method, payload, callback) {
    const postData = JSON.stringify(payload);
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TOKEN}/${method}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => { if (callback) callback(body); });
    });
    req.on('error', (err) => console.error("Telegram xatosi:", err.message));
    req.write(postData);
    req.end();
}

function httpsGetJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

httpsGetJson(`https://api.telegram.org/bot${TOKEN}/getMe`)
    .then((parsed) => {
        if (parsed && parsed.ok && parsed.result && parsed.result.username) {
            botUsername = parsed.result.username;
            console.log("🤖 Bot tayyor: @" + botUsername);
        }
    })
    .catch((err) => console.error("Bot info xatosi:", err.message));

app.get('/', (req, res) => { res.send('✅ IQBOL Restorani serveri ishlamoqda!'); });
app.get('/api/bot-info', (req, res) => { res.json({ username: botUsername }); });

// 1. Google orqali kirish
app.post('/api/auth/google', async (req, res) => {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ success: false, message: 'Token kerak' });

    try {
        const data = await httpsGetJson(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!data || data.error || data.error_description) return res.status(400).json({ success: false, message: 'Token yaroqsiz' });
        if (GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith('YOUR_') && data.aud !== GOOGLE_CLIENT_ID) {
            return res.status(400).json({ success: false, message: 'Client ID mos emas' });
        }

        const { email, name, picture, sub: googleId } = data;
        const savedPhone = googleUserPhones[googleId] || null;
        const isNewUser = !seenUsers.has(googleId);
        seenUsers.add(googleId);

        if (isNewUser) {
            tgRequest('sendMessage', {
                chat_id: NEW_USER_CHAT_ID,
                text: `🔐 YANGI FOYDALANUVCHI (Google Login)\n\n👤 Ism: ${name || 'N/A'}\n📧 Email: ${email || 'N/A'}\n📞 Tel: ${savedPhone || 'Hali tasdiqlanmagan'}\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`
            });
        }

        res.json({ success: true, isNewUser, user: { email, name, picture, googleId, phone: savedPhone } });
    } catch (err) {
        console.error("Google verify xatosi:", err.message);
        res.status(500).json({ success: false, message: 'Server xatosi' });
    }
});

// 2. Telegram OTP kodni tekshirish
app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, code, googleId, email } = req.body;
    const normPhone = normalizePhone(phone);
    const cleanCode = String(code || '').trim();

    const record = otpStore[normPhone];
    if (!record || record.code !== cleanCode) {
        return res.status(400).json({ success: false, message: "Kod noto'g'ri yoki bu raqam uchun kod olinmagan!" });
    }
    if (Date.now() > record.expires) {
        delete otpStore[normPhone];
        return res.status(400).json({ success: false, message: "Kodning vaqti tugagan! Iltimos, qaytadan kod oling." });
    }

    delete otpStore[normPhone];
    const formattedPhone = '+' + normPhone;
    if (googleId) googleUserPhones[googleId] = formattedPhone;

    tgRequest('sendMessage', {
        chat_id: NEW_USER_CHAT_ID,
        text: `✅ GOOGLE HISOB VA TELEFON BOG'LANDI\n\n👤 Ism: ${record.name}\n📧 Email: ${email || 'Kiritilmagan'}\n📞 Tel: ${formattedPhone}\n🆔 Telegram ID: ${record.tgId}`
    });

    res.json({ success: true, phone: formattedPhone, tgName: record.name });
});

// 3. ONLAYN TO'LOVNI YARATISH VA TELEGRAMGA TASDIQLASH TUGMASI BILAN YUBORISH
app.post('/api/payment/create', (req, res) => {
    const { orderId, name, phone, email, deliveryText, payMethod, orderLinesText, subtotalText, feeTitle, extraFeeText, totalText, note } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: 'Order ID kerak' });

    paymentOrders[orderId] = {
        status: 'pending',
        createdAt: Date.now()
    };

    const tgText = `💳 TO'LOV TEKSHIRUVI KUTILMOQDA! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${email || 'Kiritilmagan'}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n🏦 To'lov usuli: ${payMethod}\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${subtotalText}\n${feeTitle}: ${extraFeeText}\n💰 Kutilayotgan summa: ${totalText}\n📝 Izoh: ${note || "Yo'q"}\n\n⚠️ DIQQAT: 9860 1701 1569 3682 kartaga ${totalText} tushganini tekshirib, pastdagi tugmani bosing:`;

    tgRequest('sendMessage', {
        chat_id: FOOD_CHAT_ID,
        text: tgText,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "✅ Pul tushdi (Tasdiqlash)", callback_data: `pay_ok_${orderId}` },
                    { text: "❌ Tushmadi (Rad etish)", callback_data: `pay_no_${orderId}` }
                ]
            ]
        }
    });

    res.json({ success: true, orderId, status: 'pending' });
});

// 4. SAYTDAN TO'LOV HOLATINI TEKSHIRISH (POLLING)
app.get('/api/payment/status/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = paymentOrders[orderId];
    if (!order) {
        return res.json({ success: false, status: 'not_found' });
    }
    res.json({ success: true, status: order.status });
});

// 5. Stol band qilish
app.post('/api/book', (req, res) => {
    const { name, phone, email, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });

    bookedTables[bookingKey] = true;
    const emailLine = email ? `\n📧 Email: ${email}` : '';
    const messageText = `🛎 YANGI STOL BUYURTMASI!\n\n👤 Mijoz: ${name}${emailLine}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || "Yo'q"}`;
    
    tgRequest('sendMessage', {
        chat_id: RESERVATION_CHAT_ID, text: messageText,
        reply_markup: { inline_keyboard: [[{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]] }
    });

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

app.get('/api/booked', (req, res) => { res.json(bookedTables); });

// 6. Telegram Webhook (OTP + Stol bo'shatish + To'lovni tasdiqlash/rad etish)
app.post('/api/telegram-webhook', (req, res) => {
    const update = req.body;
    if (update && update.message) {
        const msg = update.message;
        const chatId = msg.chat.id;

        if (msg.text && msg.text.startsWith('/start')) {
            const parts = msg.text.split(' ');
            const payload = parts[1] || '';
            if (payload.startsWith('login_')) {
                const requestedPhone = normalizePhone(payload.replace('login_', ''));
                pendingTgPhones[chatId] = requestedPhone;
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: `🔐 IQBOL Restorani — Raqamni tasdiqlash\n\nSiz saytda +${requestedPhone} raqamini kiritdingiz.\n\nGoogle hisobingizga ushbu raqamni ulash va 4 xonali kod olish uchun pastdagi tugmani bosing 👇`,
                    reply_markup: { keyboard: [[{ text: "📱 Raqamni tasdiqlash va kod olish", request_contact: true }]], resize_keyboard: true, one_time_keyboard: true }
                });
            } else {
                tgRequest('sendMessage', {
                    chat_id: chatId, text: "👋 IQBOL Restorani rasmiy botiga xush kelibsiz! Tasdiqlash kodini olish uchun quyidagi tugmani bosing:",
                    reply_markup: { keyboard: [[{ text: "📱 Raqamni tasdiqlash va kod olish", request_contact: true }]], resize_keyboard: true, one_time_keyboard: true }
                });
            }
        }

        if (msg.contact) {
            if (msg.contact.user_id && msg.from && msg.contact.user_id !== msg.from.id) {
                tgRequest('sendMessage', { chat_id: chatId, text: "❌ XATOLIK! Faqat o'z raqamingizni yuboring!" });
                return res.sendStatus(200);
            }
            const actualPhone = normalizePhone(msg.contact.phone_number);
            const expectedPhone = pendingTgPhones[chatId];
            if (expectedPhone && expectedPhone !== actualPhone) {
                tgRequest('sendMessage', { chat_id: chatId, text: `❌ Raqamlar mos kelmadi! Saytda +${expectedPhone} yozgansiz, lekin Telegramingiz +${actualPhone} ga ulangan.`, reply_markup: { remove_keyboard: true } });
                return res.sendStatus(200);
            }
            const otpCode = String(Math.floor(1000 + Math.random() * 9000));
            const firstName = msg.contact.first_name || (msg.from && msg.from.first_name) || 'Mijoz';
            otpStore[actualPhone] = { code: otpCode, name: firstName, phone: '+' + actualPhone, tgId: msg.from ? msg.from.id : chatId, expires: Date.now() + 10 * 60 * 1000 };
            delete pendingTgPhones[chatId];
            tgRequest('sendMessage', { chat_id: chatId, text: `✅ Raqamingiz tasdiqlandi: +${actualPhone}\n\n🔐 Kodingiz: 👉 ${otpCode}`, reply_markup: { remove_keyboard: true } });
        }
    }

    if (update && update.callback_query) {
        const callbackData = update.callback_query.data;
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;
        const originalText = update.callback_query.message.text;

        // A) Stolni bo'shatish
        if (callbackData && callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            delete bookedTables[bookingKey];
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Stol bo'shatildi!" });
            tgRequest('editMessageText', { chat_id: chatId, message_id: messageId, text: originalText + `\n\n🟢 HOLAT: Yopilgan` });
        }

        // B) To'lov tushganini tasdiqlash
        if (callbackData && callbackData.startsWith('pay_ok_')) {
            const orderId = callbackData.replace('pay_ok_', '');
            if (paymentOrders[orderId]) {
                paymentOrders[orderId].status = 'approved';
            }
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "To'lov tasdiqlandi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: originalText + `\n\n🟢 TO'LOV HOLATI: TASDIQLANDI (Pul kartaga tushdi)`
            });
        }

        // C) To'lov tushmaganini rad etish
        if (callbackData && callbackData.startsWith('pay_no_')) {
            const orderId = callbackData.replace('pay_no_', '');
            if (paymentOrders[orderId]) {
                paymentOrders[orderId].status = 'rejected';
            }
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "To'lov rad etildi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: originalText + `\n\n🔴 TO'LOV HOLATI: TASDIQLANMADI (Pul tushmagan)`
            });
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da ishlamoqda...`);
    const webhookUrl = `${RENDER_URL}/api/telegram-webhook`;
    https.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}`);
});