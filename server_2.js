const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
const NEW_USER_CHAT_ID = '7225335915';

// Telegram "Open" tugmasi bosilganda FAQAT JARAYON (Tracker) ochilishi uchun manzil:
const WEBAPP_TRACKER_URL = process.env.WEBAPP_URL || 'https://iqbol2.vercel.app/?mode=tracker';

// Asosiy qabul qiluvchi Admin/Chef ID (Bitta zakaz faqat 1 marta borishi uchun)
const STAFF_CHAT_IDS = new Set(['7225335915']);

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
let paymentOrders = {}; 
let activeOrders = {};  
const sentOrderIds = new Set(); // Dublikat xabarlardan himoya
const seenUsers = new Set();
let botUsername = 'iqbol_reservations_bot';

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

function setupTelegramOpenButton() {
    tgRequest('setChatMenuButton', {
        menu_button: {
            type: 'web_app',
            text: 'Open',
            web_app: {
                url: WEBAPP_TRACKER_URL
            }
        }
    });
}

function broadcastToStaff(targetSet, text, replyMarkup) {
    targetSet.forEach((chatId) => {
        const payload = { chat_id: chatId, text };
        if (replyMarkup) payload.reply_markup = replyMarkup;
        tgRequest('sendMessage', payload);
    });
}

function getChefAndCourierKeyboard(orderId) {
    return {
        inline_keyboard: [
            [
                { text: "🔥 Chef: 10-15 daq", callback_data: `c_15_${orderId}` },
                { text: "🔥 Chef: 20-25 daq", callback_data: `c_25_${orderId}` },
                { text: "🔥 Chef: 30-40 daq", callback_data: `c_35_${orderId}` }
            ],
            [
                { text: "👨‍🍳✅ CHEF: OVQAT TAYYOR BO'LDI!", callback_data: `c_rdy_${orderId}` }
            ],
            [
                { text: "🛵 Dastavshik: Yo'lga chiqdim", callback_data: `d_way_${orderId}` },
                { text: "🏁 Topshirildi (Yopish)", callback_data: `d_end_${orderId}` }
            ]
        ]
    };
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
            setupTelegramOpenButton();
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

// 3. NAQD BUYURTMA YARATISH (FAQAT 1 MARTA XABAR YUBORADI)
app.post('/api/order/create-cash', (req, res) => {
    const { orderId, name, phone, email, deliveryText, orderLinesText, subtotalText, feeTitle, extraFeeText, totalText, note } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: 'Order ID kerak' });

    const receiptText = `📍 ${deliveryText}\n💳 To'lov: Naqd | Jami: ${totalText}\n\n${orderLinesText}`;
    activeOrders[orderId] = {
        orderId,
        step: 'accepted',
        eta: '⏳ Chef vaqtni belgilamoqda...',
        receiptText,
        phone: normalizePhone(phone),
        customerName: name,
        updatedAt: Date.now()
    };

    if (!sentOrderIds.has(orderId)) {
        sentOrderIds.add(orderId);
        const tgText = `📦 YANGI TAOM BUYURTMASI! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${email || 'Kiritilmagan'}\n📞 Tel: ${phone}\n📍 ${deliveryText}\n💳 To'lov usuli: Naqd\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${subtotalText}\n${feeTitle}: ${extraFeeText}\n💰 Jami to'lov: ${totalText}\n📝 Izoh: ${note || "Yo'q"}\n\n👨‍🍳 CHEF VA 🛵 DASTAVSHIK BOSHQARUVI:`;
        broadcastToStaff(STAFF_CHAT_IDS, tgText, getChefAndCourierKeyboard(orderId));
    }

    res.json({ success: true, orderId, step: 'accepted', botUsername });
});

// 4. ONLAYN TO'LOVNI YARATISH (CLICK / PAYME / PAYNET)
app.post('/api/payment/create', (req, res) => {
    const { orderId, name, phone, email, deliveryText, payMethod, orderLinesText, subtotalText, feeTitle, extraFeeText, totalText, note } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: 'Order ID kerak' });

    const receiptText = `📍 ${deliveryText}\n💳 To'lov: ${payMethod} | Jami: ${totalText}\n\n${orderLinesText}`;
    paymentOrders[orderId] = { status: 'pending', createdAt: Date.now() };
    activeOrders[orderId] = {
        orderId,
        step: 'accepted',
        eta: '⏳ Chef vaqtni belgilamoqda...',
        receiptText,
        phone: normalizePhone(phone),
        customerName: name,
        updatedAt: Date.now()
    };

    if (!sentOrderIds.has(orderId)) {
        sentOrderIds.add(orderId);
        const tgText = `💳 TO'LOV TEKSHIRUVI KUTILMOQDA! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${email || 'Kiritilmagan'}\n📞 Tel: ${phone}\n📍 ${deliveryText}\n🏦 To'lov usuli: ${payMethod}\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${subtotalText}\n${feeTitle}: ${extraFeeText}\n💰 Kutilayotgan summa: ${totalText}\n📝 Izoh: ${note || "Yo'q"}\n\n⚠️ DIQQAT: 9860 1701 1569 3682 kartaga ${totalText} tushganini tekshirib, pastdagi tugmani bosing:`;
        broadcastToStaff(STAFF_CHAT_IDS, tgText, {
            inline_keyboard: [
                [
                    { text: "✅ Pul tushdi (Chefga o'tkazish)", callback_data: `p_ok_${orderId}` },
                    { text: "❌ Tushmadi (Rad etish)", callback_data: `p_no_${orderId}` }
                ]
            ]
        });
    }

    res.json({ success: true, orderId, status: 'pending', botUsername });
});

// 5. BUYURTMA HOLATINI TEKSHIRISH (POLLING)
app.get('/api/payment/status/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = paymentOrders[orderId];
    if (!order) return res.json({ success: false, status: 'not_found' });
    res.json({ success: true, status: order.status });
});

app.get('/api/order/status/:orderId', (req, res) => {
    const { orderId } = req.params;
    const track = activeOrders[orderId];
    if (!track) return res.json({ success: false, step: 'not_found' });
    res.json({
        success: true,
        orderId: track.orderId,
        step: track.step,
        eta: track.eta || '~20–25 daq',
        receiptText: track.receiptText || '',
        customerName: track.customerName || '',
        updatedAt: track.updatedAt
    });
});

app.get('/api/order/latest-list', (req, res) => {
    const list = Object.values(activeOrders)
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 10);
    res.json({ success: true, orders: list });
});

// 6. QR-STOL ORQALI OFITSIANT CHAQIRISH
app.post('/api/waiter/call', (req, res) => {
    const { table, actionType, customerName, customerPhone, note } = req.body;
    if (!table) return res.status(400).json({ success: false, message: 'Stol raqamini kiriting!' });

    const callId = Math.floor(1000 + Math.random() * 9000);
    let actionTitle = '🛎 OFITSIANT CHAQIRUVI!';
    if (actionType === 'bill') actionTitle = "🧾 HISOBNI (CHEKNI) SO'RASH!";
    if (actionType === 'tea_bread') actionTitle = "🫖 CHOY / NON QO'SHISH SO'ROVI!";

    const msgText = `🚨 ${actionTitle}\n\n🪑 Stol / Joy: ${table}\n👤 Mijoz: ${customerName || 'Mehmon'}\n📞 Tel: ${customerPhone || 'Kiritilmagan'}\n📝 Izoh: ${note || 'Tezroq qaravoring'}\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`;

    broadcastToStaff(STAFF_CHAT_IDS, msgText, {
        inline_keyboard: [[{ text: "✅ Xizmat ko'rsatildi", callback_data: `waiter_done_${callId}` }]]
    });

    res.json({ success: true, message: 'Ofitsiantga xabar yuborildi!' });
});

// 7. Stol band qilish
app.post('/api/book', (req, res) => {
    const { name, phone, email, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });

    bookedTables[bookingKey] = true;
    const emailLine = email ? `\n📧 Email: ${email}` : '';
    const messageText = `🛎 YANGI STOL BUYURTMASI!\n\n👤 Mijoz: ${name}${emailLine}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || "Yo'q"}`;
    
    tgRequest('sendMessage', {
        chat_id: RESERVATION_CHAT_ID, text: messageText,
        reply_markup: { inline_keyboard: [[{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]] }
    });

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

app.get('/api/booked', (req, res) => { res.json(bookedTables); });

// 8. Telegram Webhook
app.post('/api/telegram-webhook', (req, res) => {
    const update = req.body;
    if (update && update.message) {
        const msg = update.message;
        const chatId = String(msg.chat.id);

        if (msg.text === '/chef') {
            STAFF_CHAT_IDS.add(chatId);
            tgRequest('sendMessage', { chat_id: chatId, text: "👨‍🍳 Sizning telefoningiz BOSH OSHPAZ (Chef) sifatida ulandi!" });
            return res.sendStatus(200);
        }
        if (msg.text === '/kuryer') {
            STAFF_CHAT_IDS.add(chatId);
            tgRequest('sendMessage', { chat_id: chatId, text: "🛵 Sizning telefoningiz DASTAVSHIK (Kuryer/Ofitsiant) sifatida ulandi!" });
            return res.sendStatus(200);
        }

        if (msg.text && msg.text.startsWith('/start')) {
            const parts = msg.text.split(' ');
            const payload = parts[1] || '';

            if (payload.startsWith('track_')) {
                const ordId = payload.replace('track_', '');
                const specificTrackerUrl = `${WEBAPP_TRACKER_URL}${WEBAPP_TRACKER_URL.includes('?') ? '&' : '?'}order=${encodeURIComponent(ordId)}`;
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: `👑 *IQBOL Restorani — Jonli Kuzatuv*\n\n📦 Sizning buyurtmangiz: *#${ordId}*\n\nBuyurtmangiz qachon pishishi va yetkazilishini jonli kuzatish uchun pastdagi tugmani bosing 👇`,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: `🔥 #${ordId} jarayonini ko'rish (Open)`, web_app: { url: specificTrackerUrl } }]
                        ]
                    }
                });
                return res.sendStatus(200);
            }

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
                    chat_id: chatId,
                    text: "👑 *IQBOL Oilaviy Restorani* rasmiy botiga xush kelibsiz!\n\n🔥 Buyurtmangiz tayyor bo'lish jarayonini jonli kuzatish uchun pastdagi *«Open / Jarayonni kuzatish»* tugmasini bosing:",
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "🔥 Buyurtma jarayonini kuzatish (Open)", web_app: { url: WEBAPP_TRACKER_URL } }]
                        ]
                    }
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
            tgRequest('sendMessage', {
                chat_id: chatId,
                text: `✅ Raqamingiz tasdiqlandi: +${actualPhone}\n\n🔐 Kodingiz: 👉 ${otpCode}`,
                reply_markup: { remove_keyboard: true }
            });
        }
    }

    if (update && update.callback_query) {
        const callbackData = update.callback_query.data || '';
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;
        const originalText = update.callback_query.message.text || '';
        const cleanBaseText = originalText.split('\n\n👨‍🍳 HOLAT:')[0].split('\n\n🔥 HOLAT:')[0].split('\n\n🛵 HOLAT:')[0].split('\n\n✅ HOLAT:')[0];

        if (callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            delete bookedTables[bookingKey];
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Stol bo'shatildi!" });
            tgRequest('editMessageText', { chat_id: chatId, message_id: messageId, text: originalText + `\n\n🟢 HOLAT: Yopilgan` });
        }

        if (callbackData.startsWith('p_ok_') || callbackData.startsWith('pay_ok_')) {
            const orderId = callbackData.replace('p_ok_', '').replace('pay_ok_', '');
            paymentOrders[orderId] = { status: 'approved' };
            if (!activeOrders[orderId]) activeOrders[orderId] = { orderId };
            activeOrders[orderId].step = 'accepted';
            activeOrders[orderId].eta = '⏳ Chef vaqtni belgilamoqda...';
            activeOrders[orderId].updatedAt = Date.now();

            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "To'lov tasdiqlandi! Endi Chef vaqtni belgilashi mumkin." });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n🟢 TO'LOV TASDIQLANDI! Chef, pishirish vaqtini tanlang:`,
                reply_markup: getChefAndCourierKeyboard(orderId)
            });
        }

        if (callbackData.startsWith('p_no_') || callbackData.startsWith('pay_no_')) {
            const orderId = callbackData.replace('p_no_', '').replace('pay_no_', '');
            paymentOrders[orderId] = { status: 'rejected' };
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "To'lov rad etildi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n🔴 TO'LOV HOLATI: TASDIQLANMADI (Pul tushmagan)`
            });
        }

        if (callbackData.startsWith('c_15_') || callbackData.startsWith('c_25_') || callbackData.startsWith('c_35_') || callbackData.startsWith('ord_cook_')) {
            let etaText = '~20–25 daq';
            let orderId = '';
            if (callbackData.startsWith('c_15_')) { etaText = '~10–15 daq'; orderId = callbackData.replace('c_15_', ''); }
            else if (callbackData.startsWith('c_25_')) { etaText = '~20–25 daq'; orderId = callbackData.replace('c_25_', ''); }
            else if (callbackData.startsWith('c_35_')) { etaText = '~30–40 daq'; orderId = callbackData.replace('c_35_', ''); }
            else { orderId = callbackData.replace('ord_cook_', ''); }

            if (!activeOrders[orderId]) activeOrders[orderId] = { orderId };
            activeOrders[orderId].step = 'cooking';
            activeOrders[orderId].eta = etaText;
            activeOrders[orderId].updatedAt = Date.now();

            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: `Telegram Open oynasida "Pishirilmoqda (${etaText})" deb ko'rsatildi!` });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n🔥 HOLAT: Chef pishirmoqda (Vaqt: ${etaText})`,
                reply_markup: getChefAndCourierKeyboard(orderId)
            });
        }

        if (callbackData.startsWith('c_rdy_')) {
            const orderId = callbackData.replace('c_rdy_', '');
            if (!activeOrders[orderId]) activeOrders[orderId] = { orderId };
            activeOrders[orderId].step = 'ready';
            activeOrders[orderId].eta = 'Tayyor! Yetkazilmoqda';
            activeOrders[orderId].updatedAt = Date.now();

            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Ovqat tayyor! Dastavshik va mijozga xabar berildi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n👨‍🍳 HOLAT: OVQAT TAYYOR BO'LDI! Dastavshik yo'lga chiqishi kutilmoqda...`,
                reply_markup: getChefAndCourierKeyboard(orderId)
            });
        }

        if (callbackData.startsWith('d_way_') || callbackData.startsWith('ord_deliv_')) {
            const orderId = callbackData.replace('d_way_', '').replace('ord_deliv_', '');
            if (!activeOrders[orderId]) activeOrders[orderId] = { orderId };
            activeOrders[orderId].step = 'delivering';
            activeOrders[orderId].eta = '~5–10 daq';
            activeOrders[orderId].updatedAt = Date.now();

            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Mijozga 'Dastavshik yo'lda 🛵' deb ko'rsatildi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n🛵 HOLAT: Dastavshik zakazni oldi va yo'lga chiqdi!`,
                reply_markup: getChefAndCourierKeyboard(orderId)
            });
        }

        if (callbackData.startsWith('d_end_') || callbackData.startsWith('ord_done_')) {
            const orderId = callbackData.replace('d_end_', '').replace('ord_done_', '');
            if (!activeOrders[orderId]) activeOrders[orderId] = { orderId };
            activeOrders[orderId].step = 'completed';
            activeOrders[orderId].eta = 'Topshirildi ✅';
            activeOrders[orderId].updatedAt = Date.now();

            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Buyurtma muvaffaqiyatli yakunlandi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: cleanBaseText + `\n\n✅ HOLAT: Mijozga topshirildi (Yopilgan)`
            });
        }

        if (callbackData.startsWith('waiter_done_')) {
            tgRequest('answerCallbackQuery', { callback_query_id: callbackQueryId, text: "Bajarildi!" });
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: originalText + `\n\n✅ Xizmat ko'rsatildi`
            });
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da ishlamoqda...`);
    const webhookUrl = `${RENDER_URL}/api/telegram-webhook`;
    https.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}`);
    setupTelegramOpenButton();
});