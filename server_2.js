const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

let bookedTables = {}; 

// 1. STOL BAND QILISH SO'ROVINI QABUL QILISH
app.post('/api/book', (req, res) => {
    const { name, phone, date, time, tableType, tableNumber, notes } = req.body;
    const bookingKey = `${date}_${time}_${tableType}_${tableNumber}`;

    if (bookedTables[bookingKey]) {
        return res.status(400).json({ success: false, message: 'Bu stol hozirgina band qilindi!' });
    }

    bookedTables[bookingKey] = true;
    res.json({ success: true, message: 'Muvaffaqiyatli band qilindi!' });
});

// 2. SAYTGA BAND STOLLARNI YUBORISH
app.get('/api/booked', (req, res) => {
    res.json(bookedTables);
});

// 3. STOLNI BO'SHATISH (ADMIN UCHUN)
app.post('/api/free', (req, res) => {
    const { bookingKey } = req.body;
    delete bookedTables[bookingKey];
    res.json({ success: true, message: "Stol bo'shatildi!" });
});

app.listen(PORT, () => {
    console.log(`✅ Server port ${PORT} da muammosiz ishlamoqda...`);
});