const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');

// === SOZLAMALAR ===
const TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
const RESERVATION_CHAT_ID = '7225335915'; // Stol bron xabari boradigan admin ID

const PORT = process.env.PORT || 3000;

// Telegraf botni ishga tushiramiz
const bot = new Telegraf(TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 

// 1. STOL BAND QILISH VA TELEGRAMGA TUGMA BILAN XABAR YUBORISH
app.post('/api/book', async (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;

    const messageText = `🛎 *YANGI BUYURTMA!*\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📅 Sana: ${date}\n⏰ Vaqt: ${time}\n🛋 Zal: ${tableType}\n🔢 Stol: ${tableNumber}\n📝 Izoh: ${notes || 'Yo\'q'}`;

    try {
        // Telegraf yordamida tugmali xabar yuborish
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
bot.action(/^free_(.+)$/, async (ctx) => {
    const bookingKey = ctx.match[1];
    
    // Stolni bazadan o'chiramiz (Saytda avtomat ochiladi)
    delete bookedTables[bookingKey];

    try {
        await ctx.answerCbQuery("Stol bo'shatildi va saytda ochildi!");
        
        const originalText = ctx.callbackQuery.message.text;
        await ctx.editMessageText(`${originalText}\n\n🟢 *HOLAT:* Yopilgan (Stol bo'shatildi)`, {
            parse_mode: 'Markdown'
        });
    } catch (e) {
        console.log("Tugmani bosishda xatolik:", e);
    }
});

// Botni va serverni birgalikda ishga tushiramiz
bot.launch().catch(err => console.log("Botni ishga tushirishda xato:", err));

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da muammosiz ishlamoqda...`);
});

// Xavfsiz to'xtatish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));