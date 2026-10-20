const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
const NEW_USER_CHAT_ID = '7225335915';
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://iqbol.onrender.com';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 
let pendingTgPhones = {}; // chatId -> saytda yozilgan raqam ("998901234567")
let otpStore = {};        // "998901234567" -> { code: "4829", name: "Sardor", phone: "+998901234567", tgId: 123, expires: ... }
let botUsername = '';

// Telefon raqamni faqat raqamlardan iborat 998XXXXXXXXX formatга keltirish
function normalizePhone(raw) {
    let digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 9) digits = '998' + digits;
    return digits;
}

// Telegram API ga so'rov yuborish funksiyasi
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
    req.on('error', (err) => console.error("Telegram xatosi:", err));
    req.write(postData);
    req.end();
}

// Bot username-ni avtomatik aniqlash
https.get(`https://api.telegram.org/bot${TOKEN}/getMe`, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            if (parsed.ok && parsed.result.username) {
                botUsername = parsed.result.username;
                console.log("🤖 Bot tayyor: @" + botUsername);
            }
        } catch (e) {}
    });
});

// 1. Saytga bot username-ni berish
app.get('/api/bot-info', (req, res) => {
    res.json({ username: botUsername });
});

// 2. Mijoz saytda kiritgan 4 xonali kodni va raqamni tekshirish
app.post('/api/auth/verify-otp', (req, res) => {
    const { phone, code } = req.body;
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

    // Admin chatiga yangi tasdiqlangan mijoz haqida xabar yuborish
    tgRequest('sendMessage', {
        chat_id: NEW_USER_CHAT_ID,
        text: `🔐 *YANGI TASDIQLANGAN MIJOZ (Telegram OTP)*\n\n👤 Ism: ${record.name}\n📞 Tel: \`+${normPhone}\`\n🆔 Telegram ID: \`${record.tgId}\`\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`,
        parse_mode: 'Markdown'
    });

    res.json({
        success: true,
        user: {
            name: record.name,
            phone: '+' + normPhone,
            tgId: record.tgId
        }
    });
});

// 3. Stol band qilish
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;
    const messageText = `🛎 *YANGI BUYURTMA!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;
    
    tgRequest('sendMessage', {
        chat_id: RESERVATION_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
            ]
        }
    });

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 4. Band stollarni saytga berish
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 5. Telegram Webhook (OTP kod berish + Raqamni solishtirish + Stol bo'shatish)
app.post('/api/telegram-webhook', (req, res) => {
    const update = req.body;

    if (update && update.message) {
        const msg = update.message;
        const chatId = msg.chat.id;

        // A) Mijoz saytdan /start login_998901234567 bo'lib kelganda
        if (msg.text && msg.text.startsWith('/start')) {
            const parts = msg.text.split(' ');
            const payload = parts[1] || '';

            if (payload.startsWith('login_')) {
                const requestedPhone = normalizePhone(payload.replace('login_', ''));
                pendingTgPhones[chatId] = requestedPhone;

                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: `🔐 *IQBOL Restorani — Xavfsizlik tekshiruvi*\n\nSiz saytda *+${requestedPhone}* raqamini kiritdingiz.\n\nUshbu raqam haqiqatdan ham sizning Telegram profilingizga ulanganini tasdiqlash va *4 xonali kod* olish uchun pastdagi tugmani bosing 👇`,
                    parse_mode: 'Markdown',
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
                    text: "👋 *IQBOL Restorani* rasmiy botiga xush kelibsiz!\n\nTasdiqlash kodini olish uchun quyidagi *«📱 Raqamni tasdiqlash va kod olish»* tugmasini bosing:",
                    parse_mode: 'Markdown',
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

        // B) Mijoz "Raqamni tasdiqlash" tugmasini bosib kontaktini yuborganda
        if (msg.contact) {
            // Faqat o'zining shaxsiy kontaktini yuborganini tekshiramiz (boshqa odamning kontaktini forward qilsa o'tmaydi!)
            if (msg.contact.user_id && msg.from && msg.contact.user_id !== msg.from.id) {
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: "❌ *XATOLIK!* Siz boshqa odamning kontaktini yubordingiz. Faqat pastdagi tugmani bosib o'z raqamingizni yuboring!",
                    parse_mode: 'Markdown'
                });
                return res.sendStatus(200);
            }

            const actualPhone = normalizePhone(msg.contact.phone_number);
            const expectedPhone = pendingTgPhones[chatId];

            // Agar saytda yozilgan raqam bilan Telegramga ulangan raqam bir xil bo'lmasa — RAD ETAMIZ!
            if (expectedPhone && expectedPhone !== actualPhone) {
                tgRequest('sendMessage', {
                    chat_id: chatId,
                    text: `❌ *FIRIBGARLIK HIMOYASI: Raqamlar mos kelmadi!*\n\nSiz saytda: *+${expectedPhone}* raqamini yozdingiz,\nlekin Telegramingiz: *+${actualPhone}* raqamiga ulangan!\n\n👉 Iltimos, saytga qaytib aynan *+${actualPhone}* raqamini yozing va qaytadan urinib ko'ring.`,
                    parse_mode: 'Markdown',
                    reply_markup: { remove_keyboard: true }
                });
                return res.sendStatus(200);
            }

            // Hammasi 100% to'g'ri — 4 xonali kod beramiz
            const otpCode = String(Math.floor(1000 + Math.random() * 9000));
            const firstName = msg.contact.first_name || msg.from.first_name || 'Mijoz';

            otpStore[actualPhone] = {
                code: otpCode,
                name: firstName,
                phone: '+' + actualPhone,
                tgId: msg.from.id,
                expires: Date.now() + 10 * 60 * 1000 // 10 daqiqa
            };

            delete pendingTgPhones[chatId];

            tgRequest('sendMessage', {
                chat_id: chatId,
                text: `✅ *Raqamingiz tasdiqlandi:* +${actualPhone}\n\n🔐 Saytga kiritish uchun 4 xonali maxfiy kodingiz:\n\n👉 *${otpCode}*\n\n_(Saytga qaytib ushbu 4 xonali kodni kiriting)_`,
                parse_mode: 'Markdown',
                reply_markup: { remove_keyboard: true }
            });
        }
    }

    // C) Stolni bo'shatish tugmasi bosilganda
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
                text: originalText + `\n\n🟢 *HOLAT:* Yopilgan (Stol bo'shatildi)`,
                parse_mode: 'Markdown'
            });
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da ishlamoqda...`);
    const webhookUrl = `${RENDER_URL}/api/telegram-webhook`;
    const setWebhookUrl = `https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}`;
    https.get(setWebhookUrl, (res) => {
        let data = ''; res.on('data', chunk => data += chunk);
        res.on('end', () => console.log("Webhook natijasi:", data));
    }).on('error', err => console.error("Webhook xato:", err));
});