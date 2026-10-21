const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
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
const seenUsers = new Set();
let botUsername = '';

// Telefon raqamni 998XXXXXXXXX formatga keltirish
function normalizePhone(raw) {
    let digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 9) digits = '998' + digits;
    return digits;
}

// Telegram API ga xavfsiz so'rov yuborish funksiyasi
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
        res.on('end', () => {
            if (callback) callback(body);
        });
    });
    req.on('error', (err) => console.error("Telegram xatosi:", err.message));
    req.write(postData);
    req.end();
}

// HTTPS GET yordamchi funksiyasi (fetch o'rniga 100% barcha Node.js da ishlaydi)
function httpsGetJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Bot username-ni avtomatik aniqlash
httpsGetJson(`https://api.telegram.org/bot${TOKEN}/getMe`)
    .then((parsed) => {
        if (parsed && parsed.ok && parsed.result && parsed.result.username) {
            botUsername = parsed.result.username;
            console.log("🤖 Bot tayyor: @" + botUsername);
        }
    })
    .catch((err) => console.error("Bot info xatosi:", err.message));

// Server ishlayotganini tekshirish uchun bosh sahifa
app.get('/', (req, res) => {
    res.send('✅ IQBOL Restorani serveri ishlamoqda!');
});

app.get('/api/bot-info', (req, res) => {
    res.json({ username: botUsername });
});

// 1. Google orqali kirish (fetch o'rniga httpsGetJson ishlatildi)
app.post('/api/auth/google', async (req, res) => {
    const { credential } = req.body;
    if (!credential) {
        return res.status(400).json({ success: false, message: 'Token kerak' });
    }

    try {
        const data = await httpsGetJson(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);

        if (!data || data.error || data.error_description) {
            return res.status(400).json({ success: false, message: 'Token yaroqsiz' });
        }
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

        res.json({
            success: true,
            isNewUser,
            user: { email, name, picture, googleId, phone: savedPhone }
        });
    } catch (err) {
        console.error("Google verify xatosi:", err.message);
        res.status(500).json({ success: false, message: 'Server xatosi' });
    }
});

// 2. Telegram 4 xonali OTP kodni tekshirish va Google hisobga bog'lash
app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, code, googleId, email } = req.body;
    const normPhone = normalizePhone(phone);
    const cleanCode = String(code || '').trim();

    const record = otpStore[normPhone];
    if (!record || record.code !== cleanCode) {
        return res.status(400).json({
            success: false,
            message: "Kod noto'g'ri yoki bu raqam uchun kod olinmagan!"
        });
    }

    if (Date.now() > record.expires) {
        delete otpStore[normPhone];
        return res.status(400).json({
            success: false,
            message: "Kodning vaqti tugagan! Iltimos, qaytadan kod oling."
        });
    }

    delete otpStore[normPhone];
    const formattedPhone = '+' + normPhone;

    if (googleId) {
        googleUserPhones[googleId] = formattedPhone;
    }

    tgRequest('sendMessage', {
        chat_id: NEW_USER_CHAT_ID,
        text: `✅ GOOGLE HISOB VA TELEFON BOG'LANDI\n\n👤 Ism: ${record.name}\n📧 Email: ${email || 'Kiritilmagan'}\n📞 Tel: ${formattedPhone}\n🆔 Telegram ID: ${record.tgId}`
    });

    res.json({
        success: true,
        phone: formattedPhone,
        tgName: record.name
    });
});

// 3. Stol band qilish
app.post('/api/book', (req, res) => {
    const { name, phone, email, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;
    const emailLine = email ? `\n📧 Email: ${email}` : '';
    const messageText = `🛎 YANGI STOL BUYURTMASI!\n\n👤 Mijoz: ${name}${emailLine}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || "Yo'q"}`;
    
    tgRequest('sendMessage', {
        chat_id: RESERVATION_CHAT_ID,
        text: messageText,
        reply_markup: {
            inline_keyboard: [
                [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
            ]
        }
    });

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 4. Telegram Webhook
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
                    reply_markup: {
                        keyboard: [
                            [{ text: "📱 Raqamni tasdiqlash va kod olish", request_contact: true }]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            } else {
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: "👋 IQBOL Restorani rasmiy botiga xush kelibsiz!\n\nTasdiqlash kodini olish uchun quyidagi tugmani bosing:",
                    reply_markup: {
                        keyboard: [
                            [{ text: "📱 Raqamni tasdiqlash va kod olish", request_contact: true }]
                        ],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            }
        }

        if (msg.contact) {
            if (msg.contact.user_id && msg.from && msg.contact.user_id !== msg.from.id) {
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: "❌ XATOLIK! Faqat pastdagi tugmani bosib o'z raqamingizni yuboring!"
                });
                return res.sendStatus(200);
            }

            const actualPhone = normalizePhone(msg.contact.phone_number);
            const expectedPhone = pendingTgPhones[chatId];

            if (expectedPhone && expectedPhone !== actualPhone) {
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: `❌ Raqamlar mos kelmadi!\n\nSiz saytda: +${expectedPhone} yozdingiz,\nlekin Telegramingiz: +${actualPhone} raqamiga ulangan!\n\n👉 Saytga qaytib aynan +${actualPhone} raqamini kiriting.`,
                    reply_markup: { remove_keyboard: true }
                });
                return res.sendStatus(200);
            }

            const otpCode = String(Math.floor(1000 + Math.random() * 9000));
            const firstName = msg.contact.first_name || (msg.from && msg.from.first_name) || 'Mijoz';

            otpStore[actualPhone] = {
                code: otpCode,
                name: firstName,
                phone: '+' + actualPhone,
                tgId: msg.from ? msg.from.id : chatId,
                expires: Date.now() + 10 * 60 * 1000
            };

            delete pendingTgPhones[chatId];

            tgRequest('sendMessage', {
                chat_id: chatId,
                text: `✅ Raqamingiz tasdiqlandi: +${actualPhone}\n\n🔐 Saytga kiritish uchun 4 xonali kodingiz:\n\n👉 ${otpCode}`,
                reply_markup: { remove_keyboard: true }
            });
        }
    }

    if (update && update.callback_query) {
        const callbackData = update.callback_query.data;
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;

        if (callbackData && callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            delete bookedTables[bookingKey];

            tgRequest('answerCallbackQuery', {
                callback_query_id: callbackQueryId,
                text: "Stol bo'shatildi va saytda ochildi!"
            });

            const originalText = update.callback_query.message.text;
            tgRequest('editMessageText', {
                chat_id: chatId,
                message_id: messageId,
                text: originalText + `\n\n🟢 HOLAT: Yopilgan (Stol bo'shatildi)`
            });
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da ishlamoqda...`);
    const webhookUrl = `${RENDER_URL}/api/telegram-webhook`;
    https.get(`https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => console.log("Webhook natijasi:", data));
    }).on('error', err => console.error("Webhook xatosi:", err.message));
});