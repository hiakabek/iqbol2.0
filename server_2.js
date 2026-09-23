const express = require('express');
const cors = require('cors');
const https = require('https');

// === SOZLAMALAR ===
const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; // Stol bron xabari boradigan admin ID

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 

// Telegramga xabar va tugma yuboruvchi funksiya
function sendTelegramMessage(chatId, text, replyMarkup = null) {
    const data = JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: replyMarkup
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => { responseBody += chunk; });
        res.on('end', () => { console.log("Telegram javobi:", responseBody); });
    });

    req.on('error', (error) => { console.error("Telegramga yuborishda xato:", error); });
    req.write(data);
    req.end();
}

// 1. STOL BAND QILISH VA TUGMA BILAN XABAR YUBORISH
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;

    const messageText = `🛎 *STOL BRON QILINDI!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;

    // 👉 Tugma qo'shilgan qism
    const replyMarkup = {
        inline_keyboard: [
            [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
        ]
    };

    sendTelegramMessage(RESERVATION_CHAT_ID, messageText, replyMarkup);

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 2. SAYTGA BAND STOLLARNI YUBORISH
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 3. TELEGRAMDAN KELGAN TUGMA BOSISHNI QABUL QILISH (Webhook)
app.post('/api/telegram-webhook', async (req, res) => {
    const update = req.body;
    
    if (update.callback_query) {
        const callbackData = update.callback_query.data;
        const chatId = update.callback_query.message.chat.id;
        const messageId = update.callback_query.message.message_id;
        const callbackQueryId = update.callback_query.id;

        if (callbackData.startsWith('free_')) {
            const bookingKey = callbackData.replace('free_', '');
            
            // Stolni bazadan o'chiramiz (Saytda avtomat ochiladi)
            delete bookedTables[bookingKey];

            // Telegramdagi xabarga javob berish (popup chiqarish)
            const answerData = JSON.stringify({
                callback_query_id: callbackQueryId,
                text: "Stol bo'shatildi va saytda ochildi!"
            });
            https.request({
                hostname: 'api.telegram.org',
                port: 443,
                path: `/bot${TOKEN}/answerCallbackQuery`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': answerData.length }
            }).end(answerData);

            // Xabardagi tugmani olib tashlab, holatini o'zgartirish
            const editData = JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                text: update.callback_query.message.text + `\n\n🟢 *HOLAT:* Yopilgan (Stol bo'shatildi)`,
                parse_mode: 'Markdown'
            });
            https.request({
                hostname: 'api.telegram.org',
                port: 443,
                path: `/bot${TOKEN}/editMessageText`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Content-Length': editData.length }
            }).end(editData);
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da muammosiz ishlamoqda...`);
});