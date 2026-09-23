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

// Telegramga xabar yuboruvchi yordamchi funksiya
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
        res.on('end', () => {
            console.log("Telegram javobi:", responseBody);
        });
    });

    req.on('error', (error) => {
        console.error("Telegramga yuborishda xato:", error);
    });

    req.write(data);
    req.end();
}

// 1. STOL BAND QILISH VA TELEGRAMGA XABAR YUBORISH
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;

    const messageText = `🛎 *STOL BRON QILINDI!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;

    const replyMarkup = {
        inline_keyboard: [
            [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
        ]
    };

    // Telegramga xabar yuborish
    sendTelegramMessage(RESERVATION_CHAT_ID, messageText, replyMarkup);

    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 2. SAYTGA BAND STOLLARNI YUBORISH
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da muammosiz ishlamoqda...`);
});