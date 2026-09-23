const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');

// === SOZLAMALAR ===
const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 

// ➔ FAQAT STOL BRON QILISH XABARI KELADIGAN ADMIN ID'SI:
const RESERVATION_CHAT_ID = '7225335915'; 

const PORT = 3000;

// Zamonaviy Telegraf botni ishga tushirish
const bot = new Telegraf(TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 

// 1. SAYTDAN STOL BRON QILISHNI QABUL QILISH
app.post('/api/book', async (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;

    const messageText = `🛎 *STOL BRON QILINDI!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;

    try {
        await bot.telegram.sendMessage(RESERVATION_CHAT_ID, messageText, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✅ Stolni bo'shatish", callback_data: `free_${bookingKey}` }]
                ]
            }
        });
        res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
    } catch (err) {
        console.error("Bot xatosi:", err);
        res.status(500).json({ success: false, message: 'Botda xatolik yuz berdi' });
    }
});

// 2. SAYTGA BAND STOLLARNI YUBORISH
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 3. ADMIN "STOL BO'SHADI" TUGMASINI BOSGANDA
bot.action(/^free_(.+)$/, (ctx) => {
    const bookingKey = ctx.match[1];
    delete bookedTables[bookingKey];
    ctx.answerCbQuery("Stol bo'shatildi va saytda ochildi!");
    
    const originalText = ctx.callbackQuery.message.text;
    ctx.editMessageText(`${originalText}\n\n🟢 *HOLAT:* Yopilgan (Stol bo'shatildi)`, {
        parse_mode: 'Markdown'
    }).catch(e => console.log("E'tibor bermang:", e));
});

// Tizimlarni ishga tushirish
bot.launch();
app.listen(PORT, () => {
    console.log(`✅ Server https://iqbol.onrender.com/api ${PORT}-portda ishlamoqda...`);
});

// Dastur to'xtatilganda botni ham xavfsiz to'xtatish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));