const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
const NEW_USER_CHAT_ID = '7225335915'; // Yangi Google userlar shu chatga tushadi
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '500756304339-78rjnbeajcu4tg8aml1k14iov9vu5qjk.apps.googleusercontent.com';
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://iqbol.onrender.com';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 
const seenUsers = new Set();

// Telegramga xabar va tugmani yuborish (Stol uchun)
function sendTelegramMessage(chatId, text, bookingKey) {
    const postData = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
            ]
        }
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log("Telegram javobi:", body));
    });

    req.on('error', (err) => console.error("Telegram xatosi:", err));
    req.write(postData);
    req.end();
}

// Telegramga oddiy xabar yuborish (Yangi user uchun)
function sendTelegramPlainMessage(chatId, text) {
    const postData = JSON.stringify({
        chat_id: chatId, text: text, parse_mode: 'Markdown', disable_web_page_preview: true
    });
    const options = {
        hostname: 'api.telegram.org', port: 443,
        path: `/bot${TOKEN}/sendMessage`, method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
    };
    const req = https.request(options, (res) => {
        let body = ''; res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log("Telegram user xabari:", body));
    });
    req.on('error', (err) => console.error("Telegram user xatosi:", err));
    req.write(postData); req.end();
}

// 1. Stol band qilish
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;
    const messageText = `🛎 *YANGI BUYURTMA!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;
    sendTelegramMessage(RESERVATION_CHAT_ID, messageText, bookingKey);
    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 2. Band stollarni saytga berish
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 3. Google bilan kirish (YANGI QO'SHILDI)
app.post('/api/auth/google', async (req, res) => {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ success: false, message: 'Token kerak' });

    try {
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        const data = await verifyRes.json();

        if (data.error || data.error_description) return res.status(400).json({ success: false, message: 'Token yaroqsiz' });
        if (GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.startsWith('YOUR_') && data.aud !== GOOGLE_CLIENT_ID) return res.status(400).json({ success: false, message: 'Client ID mos emas' });

        const { email, name, picture, sub: googleId } = data;
        const isNewUser = !seenUsers.has(googleId);
        seenUsers.add(googleId);

        if (isNewUser) {
            const messageText = `🔐 *YANGI FOYDALANUVCHI (Google Login)*\n\n👤 Ism: ${name || 'N/A'}\n📧 Email: \`${email || 'N/A'}\`\n🆔 Google ID: \`${googleId}\`\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
            sendTelegramPlainMessage(NEW_USER_CHAT_ID, messageText);
        }

        res.json({ success: true, isNewUser, user: { email, name, picture, googleId } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server xatosi' });
    }
});

// 4. Telegram Webhook
app.post('/api/telegram-webhook', (req, res) => {
    const update = req.body;
    if (update && update.callback_query) {
        const callbackData = update.callback_query.data;
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;

        if (callbackData && callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            delete bookedTables[bookingKey];

            const answerData = JSON.stringify({ callback_query_id: callbackQueryId, text: "Stol bo'shatildi va saytda ochildi!" });
            https.request({
                hostname: 'api.telegram.org', port: 443,
                path: `/bot${TOKEN}/answerCallbackQuery`, method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(answerData) }
            }).end(answerData);

            const originalText = update.callback_query.message.text;
            const editData = JSON.stringify({
                chat_id: chatId, message_id: messageId,
                text: originalText + `\n\n🟢 *HOLAT:* Yopilgan (Stol bo'shatildi)`,
                parse_mode: 'Markdown'
            });
            https.request({
                hostname: 'api.telegram.org', port: 443,
                path: `/bot${TOKEN}/editMessageText`, method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(editData) }
            }).end(editData);
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