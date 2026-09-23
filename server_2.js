const express = require('express');
const cors = require('cors');
const https = require('https');

const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; 
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://iqbol.onrender.com';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 

// Telegramga xabar va tugmani yuborishning eng kafolatlangan funksiyasi
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

// 1. Stol band qilish va tugma bilan xabar yuborish
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;

    const messageText = `🛎 *YANGI BUYURTMA!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;

    // Funksiya orqali xabar va tugmani yuboramiz
    sendTelegramMessage(RESERVATION_CHAT_ID, messageText, bookingKey);

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 2. Saytga band stollarni berish
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 3. Telegramdan tugma bosilganda ishlaydigan webhook
app.post('/api/telegram-webhook', (req, res) => {
    const update = req.body;
    
    if (update && update.callback_query) {
        const callbackData = update.callback_query.data;
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;

        if (callbackData && callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            
            // Stolni bazadan o'chiramiz (Saytda darhol ochiladi)
            delete bookedTables[bookingKey];

            // 1. Pop-up xabar ko'rsatish
            const answerData = JSON.stringify({
                callback_query_id: callbackQueryId,
                text: "Stol bo'shatildi va saytda ochildi!"
            });
            https.request({
                hostname: 'api.telegram.org', port: 443,
                path: `/bot${TOKEN}/answerCallbackQuery`, method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(answerData) }
            }).end(answerData);

            // 2. Xabarni yangilab, tugmani olib tashlash va holatni yozish
            const originalText = update.callback_query.message.text;
            const editData = JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
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

    // Avtomatik Webhook ulanishi
    const webhookUrl = `${RENDER_URL}/api/telegram-webhook`;
    const setWebhookUrl = `https://api.telegram.org/bot${TOKEN}/setWebhook?url=${webhookUrl}`;
    
    https.get(setWebhookUrl, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => console.log("Webhook ulanish natijasi:", data));
    }).on('error', err => {
        console.error("Webhook ulanishda xato:", err);
    });
});