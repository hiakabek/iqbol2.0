/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT (FINAL MENU & PRICES MATCHED)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MENU DATABASE (RASMDAGI ANIQ NARX VA TAOMLAR BILAN YANGILANDI)
     ========================================================================== */
  const MENU_DATA = [
    // --- BIRINCHI TAOMLAR ---
    { id: 'bt-1', name: 'Борщ', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'An\'anaviy mol go\'shti, sabzi, lavlagi va ko\'katlar bilan to\'yimli sho\'rva.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Issiq taom', 'Mol go\'shti'], popular: false },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'O\'zbekcha suyuq guruchli taom, barra go\'sht, qatiq va xushbo\'y ziravorlar uyg\'unligi.', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', tags: ['Milliy', 'Mashhur'], popular: true },
    { id: 'bt-3', name: 'Суп с лапшой', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'Qo\'lda cho\'zilgan yupqa ugra, tiniq go\'shtli bulyon va sarxil sabzavotlar.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'l ugrasi', 'Tiniq bulyon'], popular: false },
    { id: 'bt-4', name: 'Ковурма лагман', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'Uyg\'urcha qo\'lda cho\'zilgan lazzatli lag\'mon, qovurilgan go\'sht va sarxil qalampirlar.', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop', tags: ['Uyg\'ur oshxonasi', 'Tavsiya'], popular: true },
    { id: 'bt-5', name: 'Тушёнка шўрка', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'Tushonka go\'shtidan tayyorlangan maxsus milliy sho\'rva.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Sho\'rva'], popular: false },
    { id: 'bt-6', name: 'Кайнаatma шўрка', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 25000, portion: '1 porsiya', desc: 'Qaynatma go\'sht va sarxil sabzavotlardan tayyorlangan to\'yimli shўrva.', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', tags: ['Qaynatma'], popular: false },
    { id: 'bt-7', name: 'Тефтель шўрка', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 25000, portion: '1 porsiya', desc: 'Mazali teftellar solingan issiq va mazali birinchi taom.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop', tags: ['Teftel'], popular: false },
    { id: 'bt-8', name: 'Бульон', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 10000, portion: '1 porsiya', desc: 'Tiniq va xushbo\'y go\'sht bulyoni.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Bulyon'], popular: false },

    // --- IKKINCHI TAOMLAR & TANDIR ---
    { id: 'it-1', name: 'Тандыр (Tandir go\'sht)', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 245000, portion: '1 kg', desc: 'Qarshining afsonaviy archa va tandirda pishirilgan xushbo\'y, erib ketadigan qo\'y go\'shti.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', tags: ['Qarshi Brandi', 'Tandir', '1 kg'], popular: true },
    { id: 'it-2', name: 'Казанча', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 250000, portion: '1 kg', desc: 'Maxsus cho\'yan qozonda qizarguncha qovurilgan sarxil barra go\'sht va kartoshka.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qozon-kabob', '1 kg'], popular: true },
    { id: 'it-3', name: 'Уйгурча жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 265000, portion: '1 kg', desc: 'Uyg\'ur uslubida tayyorlangan maxsus ziravorli jiz.', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop', tags: ['Uyg\'ur', '1 kg'], popular: true },
    { id: 'it-4', name: 'Манчури', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 kg', desc: 'Maxsus sousda tayyorlangan lazzatli go\'shtli taom.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop', tags: ['Manchuri', '1 kg'], popular: false },
    { id: 'it-5', name: 'Умакаи жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 porsiya', desc: 'Maxsus retsept bo\'yicha tayyorlangan umakai jiz porsiyasi.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', tags: ['Jiz'], popular: false },
    { id: 'it-6', name: 'Буйрак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Saralangan buyrakdan tayyorlangan tansiq taom.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Buyrak'], popular: false },
    { id: 'it-7', name: 'Хасиб мол гўшти', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 120000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan an\'anaviy hasib.', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop', tags: ['Hasib'], popular: false },
    { id: 'it-8', name: 'Мумтак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 210000, portion: '1 kg', desc: 'Mumtak uslubidagi mazali go\'shtli taom.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop', tags: ['Jiz'], popular: false },

    // --- SHASHLIK & ASSORTI ---
    { id: 'sh-1', name: 'Овощной шашлык', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Ko\'mirda pishirilgan sarxil sabzavotlar shashligi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Sabzavot'], popular: false },
    { id: 'sh-2', name: 'Помидор шашлык', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 20000, portion: '1 porsiya', desc: 'Sharbatli pomidordan tayyorlangan issiq shashlik.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Pomid'], popular: false },
    { id: 'sh-3', name: 'Грибной шашлык', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 50000, portion: '1 porsiya', desc: 'Qo\'ziqorindan tayyorlangan mazali kabob.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'ziqorin'], popular: false },
    { id: 'sh-4', name: 'Думба', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Saralangan dumba yog\'idan six kabob.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Dumba'], popular: false },
    { id: 'sh-5', name: 'Печень', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Tvorogli va yumshoq jigar shashligi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Jigar'], popular: false },
    { id: 'sh-6', name: 'Корейка шашлык', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 35000, portion: '1 tayoqcha', desc: 'Suyakli mazali qo\'y go\'shti koreykasi.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Koreyka'], popular: false },
    { id: 'sh-7', name: 'Кавказ баранина', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 85000, portion: '1 tayoqcha', desc: 'Kavkazcha maxsus usulda pishirilgan qo\'y go\'shti.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Kavkaz'], popular: true },
    { id: 'sh-8', name: 'Кавказ говядина', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 57000, portion: '1 tayoqcha', desc: 'Kavkazcha mol go\'shti kabobi.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Kavkaz'], popular: false },
    { id: 'sh-9', name: 'Кавказ куриный', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 28000, portion: '1 tayoqcha', desc: 'Tovuq go\'shtidan kavkazcha shashlik.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Tovuq'], popular: false },
    { id: 'sh-10', name: 'Кавказ гиждувон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 35000, portion: '1 tayoqcha', desc: 'G\'ijduvoncha maxsus ziravorli shashlik.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['G\'ijduvon'], popular: false },
    { id: 'sh-11', name: 'Кусковой говядина', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 70000, portion: '1 porsiya', desc: 'Saralangan mol lahm go\'shti shashligi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Mol go\'shti'], popular: true },
    { id: 'sh-12', name: 'Сосиска острый', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Achchiq sasiska kabobi.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Sasiska'], popular: false },
    { id: 'sh-13', name: 'Кусковой баранина', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 85000, portion: '1 porsiya', desc: 'Cho\'g\'da pishirilgan barra qo\'y go\'shti va dumba yog\'i.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'y go\'shti'], popular: true },
    { id: 'sh-14', name: 'Крылышка', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 48000, portion: '1 porsiya', desc: 'Tovuq qanotchalaridan tayyorlangan qarsildoq kabob.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Qanotcha'], popular: false },
    { id: 'sh-15', name: 'Гиждувон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 62000, portion: '1 porsiya', desc: 'An\'anaviy G\'ijduvon qiyma kabobi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qiyma'], popular: true },
    { id: 'sh-16', name: 'Сосиска сладкий', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Shirin sasiska kabobi.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Sasiska'], popular: false },
    { id: 'sh-17', name: 'Марварид', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 72000, portion: '1 porsiya', desc: 'Maxsus marvarid kabob porsiyasi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Kabob'], popular: false },
    { id: 'sh-18', name: 'Наполеон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 88000, portion: '1 porsiya', desc: 'Maxsus tayyorlangan napoleon kabobi.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Kabob'], popular: false },
    { id: 'sh-19', name: 'Рулет шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 70000, portion: '1 porsiya', desc: 'Go\'shtli rulet shaklidagi shashlik.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Rulet'], popular: false },
    { id: 'sh-20', name: 'Сырой фарш', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 130000, portion: '1 kg', desc: 'Yangicha tayyorlash uchun xom qiyma.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Qiyma', '1 kg'], popular: false },

    // Assorti to'plamlar
    { id: 'sha-1', name: 'Шашлык ассорти (4 персон)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 350000, portion: '4 kishi', desc: 'Har xil turdagi saralangan shashliklar to\'plami.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Assorti', '4 kishi'], popular: true },
    { id: 'sha-2', name: 'Шашлык ассорти (6 персон)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 650000, portion: '6 kishi', desc: 'Katta davra uchun shashliklar assortisi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Assorti', '6 kishi'], popular: true },
    { id: 'sha-3', name: 'Иқбол ассорти (4 персон)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 520000, portion: '4 kishi', desc: 'Restoranimizdan maxsus "Iqbol" assortisi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Iqbol', '4 kishi'], popular: true },
    { id: 'sha-4', name: 'Иқбол ассорти (6 персон)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 760000, portion: '6 kishi', desc: 'Katta oilaviy davra uchun "Iqbol" maxsus assortisi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Iqbol', '6 kishi'], popular: true },

    // --- QO'SHIMCHA TAOMLAR ---
    { id: 'qt-1', name: 'Хрустящий баклажан', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 62000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan baqlajon bo\'laklari, shirin-nordon sous.', image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=800&auto=format&fit=crop', tags: ['Hit', 'Baqlajon'], popular: true },
    { id: 'qt-2', name: 'Хрустящий шампиньон', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 72000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan qo\'ziqorinlar.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'ziqorin'], popular: false },
    { id: 'qt-3', name: 'Картошка фри', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 25000, portion: '1 porsiya', desc: 'Oltin rangdagi qarsildoq fri kartoshkasi.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop', tags: ['Fri'], popular: false },
    { id: 'qt-4', name: 'Жареные пельмени', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 20000, portion: '15 dona', desc: 'Qizarguncha qovurilgan mazali pelmenlar.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop', tags: ['Pelmen', '15 ta'], popular: false },
    { id: 'qt-5', name: 'Сомса', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 7000, portion: '1 dona', desc: 'Tandirda pishirilgan xushbo\'y go\'shtli somsalar.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', tags: ['Samsa'], popular: true },
    { id: 'qt-6', name: 'Нон шаashlik / Non', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 4000, portion: '1 dona', desc: 'Issiq va yumshoq tandir noni.', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=800&auto=format&fit=crop', tags: ['Non'], popular: false },

    // --- SALATLAR ---
    { id: 'sal-1', name: 'Страчителло с томатом', category: 'salatlar', categoryName: 'Salatlar', price: 82000, portion: '1 porsiya', desc: 'Mazali strachatello pishlog\'i va pomidorlar.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Salat'], popular: false },
    { id: 'sal-2', name: 'Тунис', category: 'salatlar', categoryName: 'Salatlar', price: 72000, portion: '1 porsiya', desc: 'Tinch okeani tunets balig\'i qo\'shilgan salat.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Tunets'], popular: false },
    { id: 'sal-3', name: 'Итальянский шпинат', category: 'salatlar', categoryName: 'Salatlar', price: 70000, portion: '1 porsiya', desc: 'Italiya uslubidagi ismaloqli vitaminli salat.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Ismaloq'], popular: false },
    { id: 'sal-4', name: 'Капризе', category: 'salatlar', categoryName: 'Salatlar', price: 68000, portion: '1 porsiya', desc: 'Pomidor, motsarella va rayhon barglari.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Klassik'], popular: false },
    { id: 'sal-5', name: 'Салат Тулим', category: 'salatlar', categoryName: 'Salatlar', price: 60000, portion: '1 porsiya', desc: 'Maxsus Tulim salati.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Salat'], popular: false },
    { id: 'sal-6', name: 'Греческий', category: 'salatlar', categoryName: 'Salatlar', price: 54000, portion: '1 porsiya', desc: 'Feta pishlog\'i, zaytun va sarxil sabzavotlar.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Gretskiy'], popular: true },
    { id: 'sal-7', name: 'Подволочку', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Mazali va to\'yimli salat.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Salat'], popular: false },
    { id: 'sal-8', name: 'Японский', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'Yaponcha uslubdagi yengil salat.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Yapon'], popular: false },
    { id: 'sal-9', name: 'Чайан', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: 'An\'anaviy chayan salati.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Salat'], popular: false },
    { id: 'sal-10', name: 'Икбол', category: 'salatlar', categoryName: 'Salatlar', price: 52000, portion: '1 porsiya', desc: 'Restoranimiz nomi bilan ataluvchi maxsus firma salati.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Firma'], popular: true },
    { id: 'sal-11', name: 'Свежий', category: 'salatlar', categoryName: 'Salatlar', price: 25000, portion: '1 porsiya', desc: 'Sarxil pomidor va bodringlardan yig\'ilgan yengil salat.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Sveжий'], popular: false },
    { id: 'sal-12', name: 'Свежий катикли', category: 'salatlar', categoryName: 'Salatlar', price: 25000, portion: '1 porsiya', desc: 'Qatiqli maxsus yangi salat.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Qatiq'], popular: false },
    { id: 'sal-13', name: 'Шакароб', category: 'salatlar', categoryName: 'Salatlar', price: 25000, portion: '1 porsiya', desc: 'Piyoz, pomidor va achchiq qalampirdan tayyorlangan milliy shakarob.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Milliy'], popular: true },
    { id: 'sal-14', name: 'Чакки', category: 'salatlar', categoryName: 'Salatlar', price: 10000, portion: '1 porsiya', desc: 'Tabiiy so\'zni suzma (chakki).', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Sut mahsuloti'], popular: false },
    { id: 'sal-15', name: 'Фруктовый салат', category: 'salatlar', categoryName: 'Salatlar', price: 47000, portion: '1 porsiya', desc: 'Sarxil mevalardan tayyorlangan shirin vitaminli salat.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Mevali'], popular: false },
    { id: 'sal-16', name: 'Мужской каприз', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Go\'shtli va to\'yimli "Muzshoy kapriz" salati.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['To\'yimli'], popular: true },
    { id: 'sal-17', name: 'Цезарь', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Klassik sezar salati tovuq go\'shti bilan.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Sezar'], popular: true },
    { id: 'sal-18', name: 'Смак', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: 'Mazali va ishtaha ochar Smak salati.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Smak'], popular: false },
    { id: 'sal-19', name: 'Французский', category: 'salatlar', categoryName: 'Salatlar', price: 48000, portion: '1 porsiya', desc: 'Fransuzcha nafis salat.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Fransuz'], popular: false },
    { id: 'sal-20', name: 'Оливье', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'Sevimli va tansiq olivye salati.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Klassik'], popular: false },
    { id: 'sal-21', name: 'Мясной ассорти', category: 'salatlar', categoryName: 'Salatlar', price: 160000, portion: '1 porsiya', desc: 'Saralangan go\'sht mahsulotlari assortisi.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Assorti'], popular: true },
    { id: 'sal-22', name: 'Сырный ассорти', category: 'salatlar', categoryName: 'Salatlar', price: 160000, portion: '1 porsiya', desc: 'Elita pishloqlar assortisi.', image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop', tags: ['Pishloq'], popular: false },
    { id: 'sal-23', name: 'Мева ассорти', category: 'salatlar', categoryName: 'Salatlar', price: 160000, portion: '1 porsiya', desc: 'Mavsumiy sarxil mevalar assortisi.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Mevali'], popular: false },

    // --- ICHIMLIKLAR & MOXITO ---
    { id: 'ich-1', name: 'Мохито киви', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 50000, portion: '1 grafin', desc: 'Muzdek tetiklantiruvchi kivi moxitosi.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop', tags: ['Moxito', 'Muzdek'], popular: true },
    { id: 'ich-2', name: 'Ягода', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 grafin', desc: 'Mevali tetiklantiruvchi yagoda ichimligi.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Mevali'], popular: false },
    { id: 'ich-3', name: 'Классический', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 45000, portion: '1 grafin', desc: 'Klassik moxito ichimligi.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop', tags: ['Klassik'], popular: false },
    { id: 'ich-4', name: 'Манго-Маракуйя', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 65000, portion: '1 grafin', desc: 'Egzotik mango va marakuya moxitosi.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Egzotik'], popular: true },
    { id: 'ich-5', name: 'Тархун', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 grafin', desc: 'Xushbo\'y tarxun ichimligi.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop', tags: ['Tarxun'], popular: false },
    { id: 'ich-6', name: 'Клубничный', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 grafin', desc: 'Qulupnayli shirin moxito.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Qulupnay'], popular: false },
    { id: 'ich-7', name: 'Чалон', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '1 litr', desc: 'Milliyligimiz bo\'lgan salqin chalob.', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', tags: ['Milliy', 'Chalob'], popular: true },
    { id: 'ich-8', name: 'Нон ассорти', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 25000, portion: '1 taqsimcha', desc: 'Har xil turdagi nonlar assortisi.', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=800&auto=format&fit=crop', tags: ['Non'], popular: false },

    // --- GAZLI & SALQIN ICHIMLIKLAR ---
    { id: 'gz-1', name: 'Кола (1L)', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 12000, portion: '1 litr', desc: 'Klassik Coca-Cola yaxna baklashka.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRdBQlp_m3fDR-FH0_cPYLIqVQzUUXKWDMo1cQGRN3aO-EHAiuavas7of&s=10', tags: ['1L', 'Muzdek'], popular: false },
    { id: 'gz-2', name: 'Фанта (1L)', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 12000, portion: '1 litr', desc: 'Apelsin ta\'mli Fanta yaxna baklashka.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRdBQlp_m3fDR-FH0_cPYLIqVQzUUXKWDMo1cQGRN3aO-EHAiuavas7of&s=10', tags: ['1L'], popular: false },
    { id: 'gz-3', name: 'Пепси (1L)', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 12000, portion: '1 litr', desc: 'Pepsi yaxna baklashka.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRdBQlp_m3fDR-FH0_cPYLIqVQzUUXKWDMo1cQGRN3aO-EHAiuavas7of&s=10', tags: ['1L'], popular: false },
    { id: 'gz-4', name: 'Сок', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 18000, portion: '1 litr', desc: 'Tabiiy meva sharbati.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Sharbat'], popular: false },
    { id: 'gz-5', name: 'Ред бул', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 20000, portion: '250 ml', desc: 'Energetik ichimlik.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Energetik'], popular: false },
    { id: 'gz-6', name: 'Адналин', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 14000, portion: '500 ml', desc: 'Adrenalin energetik ichimligi.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Energetik'], popular: false },
    { id: 'gz-7', name: 'Флеш', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 12000, portion: '450 ml', desc: 'Flash energetik ichimligi.', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop', tags: ['Energetik'], popular: false },
    { id: 'gz-8', name: 'Карлавори', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 12000, portion: '0.5 l', desc: 'Mineral suv.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop', tags: ['Suv'], popular: false },
    { id: 'gz-9', name: 'Вода', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 5000, portion: '0.5 l', desc: 'Toza ichimlik suvi.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop', tags: ['Suv'], popular: false },
    { id: 'gz-10', name: 'Чортоқ', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 13000, portion: '0.5 l', desc: 'Shifobaxsh Chortoq suvi.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=800&auto=format&fit=crop', tags: ['Mineral suv'], popular: false },
    { id: 'gz-11', name: 'Писта', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 25000, portion: '1 porsiya', desc: 'Qovurilgan psta.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Quruq meva'], popular: false },
    { id: 'gz-12', name: 'Бодом', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 25000, portion: '1 porsiya', desc: 'Tandirda qovurilgan bodom.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Bodom'], popular: false },
    { id: 'gz-13', name: 'Кешью', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 25000, portion: '1 porsiya', desc: 'Saralangan kashyu yong\'og\'i.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Kashyu'], popular: false },
    { id: 'gz-14', name: 'Пивное ассорти', category: 'gazli', categoryName: 'Gazli va salqin ichimliklar', price: 50000, portion: '1 porsiya', desc: 'Pivo uchun maxsus zakuskalar assortisi.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Assorti', 'Pivo'], popular: false }
  ];

  /* ==========================================================================
     2. APP STATE & STORAGE
     ========================================================================== */
  let cart = []; try { cart = JSON.parse(localStorage.getItem('iqbol_cart')) || []; } catch(e) { cart = []; }
  let favorites = []; try { favorites = JSON.parse(localStorage.getItem('iqbol_favorites')) || []; } catch(e) { favorites = []; }

  let activeCategory = 'all'; let searchQuery = ''; let orderType = 'dine_in'; 

  const dishesGrid = document.getElementById('dishesGrid');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryTabs = document.querySelectorAll('.cat-tab-btn');
  const cartBadge = document.getElementById('cartBadge');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const dishModal = document.getElementById('dishModal');
  const toastContainer = document.getElementById('toastContainer');
  const backToTopBtn = document.getElementById('backToTop');
  const themeToggleBtn = document.getElementById('themeToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const hamburgerBtn = document.getElementById('hamburgerBtn');

  function formatPrice(num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"; }

  function showToast(message, icon = 'fa-check-circle') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span class="toast-text">${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3200);
  }

  function makeStrikethrough(text) {
    return text.split('').map(char => char + '\u0336').join('');
  }

  /* ==========================================================================
     3. RENDER MENU
     ========================================================================== */
  function renderMenu() {
    if (!dishesGrid) return;
    let filtered = MENU_DATA;

    if (activeCategory !== 'all') { filtered = filtered.filter(item => item.category === activeCategory); }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.categoryName.toLowerCase().includes(q));
    }
    if (filtered.length === 0) { dishesGrid.innerHTML = `<div class="no-dishes-found"><i class="fas fa-utensils"></i><h3>Hech qanday taom topilmadi</h3></div>`; return; }

    let htmlResult = '';
    filtered.forEach(dish => {
      const isFav = favorites.includes(dish.id);
      htmlResult += `
        <article class="dish-card" data-id="${dish.id}">
          <div class="dish-img-wrap" onclick="window.openDishModal('${dish.id}')">
            <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
            <div class="dish-badges">
              ${dish.popular ? '<span class="badge badge-gold"><i class="fas fa-star"></i> Hit</span>' : ''}
              ${dish.portion ? `<span class="badge badge-portion">${dish.portion}</span>` : ''}
            </div>
            <button class="dish-fav-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); window.toggleFavorite('${dish.id}')"><i class="${isFav ? 'fas' : 'far'} fa-heart"></i></button>
          </div>
          <div class="dish-content">
            <div class="dish-category">${dish.categoryName}</div>
            <h3 class="dish-title" onclick="window.openDishModal('${dish.id}')">${dish.name}</h3>
            <p class="dish-desc">${dish.desc}</p>
            <div class="dish-footer">
              <div class="dish-price-box"><span class="price-label">Narxi:</span><span class="dish-price">${formatPrice(dish.price)}</span></div>
              <button class="btn-add-cart" onclick="window.addToCart('${dish.id}')"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </article>
      `;
    });
    dishesGrid.innerHTML = htmlResult;
  }

  categoryTabs.forEach(btn => {
    btn.addEventListener('click', () => { categoryTabs.forEach(b => b.classList.remove('active')); btn.classList.add('active'); activeCategory = btn.dataset.category; renderMenu(); });
  });

  if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value; if (clearSearchBtn) clearSearchBtn.classList.toggle('visible', searchQuery.length > 0); renderMenu(); });
  if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; searchQuery = ''; clearSearchBtn.classList.remove('visible'); renderMenu(); searchInput.focus(); });

  window.toggleFavorite = function(dishId) {
    const idx = favorites.indexOf(dishId);
    if (idx > -1) { favorites.splice(idx, 1); showToast('Sevimlilardan olib tashlandi', 'fa-heart-broken'); } 
    else { favorites.push(dishId); showToast('Sevimlilarga qo\'shildi!', 'fa-heart'); }
    localStorage.setItem('iqbol_favorites', JSON.stringify(favorites)); renderMenu();
  };

  let selectedModalDish = null; let modalQuantity = 1;
  window.openDishModal = function(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId); if (!dish || !dishModal) return;
    selectedModalDish = dish; modalQuantity = 1;
    document.getElementById('modalImg').src = dish.image; document.getElementById('modalTitle').textContent = dish.name;
    document.getElementById('modalPrice').textContent = formatPrice(dish.price) + (dish.portion ? ` (${dish.portion})` : '');
    document.getElementById('modalDesc').textContent = dish.desc; document.getElementById('modalCategoryBadge').textContent = dish.categoryName;
    document.getElementById('modalQtyVal').textContent = modalQuantity;
    dishModal.classList.add('open'); document.body.style.overflow = 'hidden';
  };
  window.closeDishModal = function() { if (!dishModal) return; dishModal.classList.remove('open'); document.body.style.overflow = ''; };
  window.updateModalQty = function(delta) { modalQuantity += delta; if (modalQuantity < 1) modalQuantity = 1; document.getElementById('modalQtyVal').textContent = modalQuantity; };
  window.addModalDishToCart = function() { if (!selectedModalDish) return; window.addToCart(selectedModalDish.id, modalQuantity); window.closeDishModal(); };

  function saveCart() { localStorage.setItem('iqbol_cart', JSON.stringify(cart)); updateCartUI(); }
  
  function updateCartUI() {
    let totalCount = 0; cart.forEach(item => { totalCount += item.quantity; });
    if (cartBadge) { cartBadge.textContent = totalCount; cartBadge.style.display = totalCount > 0 ? 'flex' : 'none'; }
    if (!cartItemsList) return;
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = `<div class="empty-cart-view"><i class="fas fa-shopping-basket"></i><h4>Savat bo'sh</h4></div>`;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '0 so\'m'; 
      if (cartTotalEl) cartTotalEl.textContent = '0 so\'m'; 
      return;
    }
    
    let subtotal = 0; let itemsHtml = '';
    cart.forEach(item => {
      const dish = MENU_DATA.find(d => d.id === item.id); if (!dish) return;
      const itemTotal = dish.price * item.quantity; subtotal += itemTotal;
      itemsHtml += `
        <div class="cart-item">
          <img src="${dish.image}" class="cart-item-thumb" />
          <div class="cart-item-details"><h5 class="cart-item-name">${dish.name}</h5><div class="cart-item-price">${formatPrice(dish.price)} x ${item.quantity} = <strong>${formatPrice(itemTotal)}</strong></div></div>
          <div class="cart-item-actions"><div class="quantity-control"><button class="qty-btn" onclick="window.changeCartQty('${dish.id}', -1)">-</button><span class="qty-val">${item.quantity}</span><button class="qty-btn" onclick="window.changeCartQty('${dish.id}', 1)">+</button></div><button class="btn-remove-item" onclick="window.removeFromCart('${dish.id}')"><i class="fas fa-trash-alt"></i></button></div>
        </div>`;
    });
    
    cartItemsList.innerHTML = itemsHtml; 
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);

    let extraFee = 0;
    let feeDescription = '';

    if (orderType === 'delivery') {
      const zoneSelect = document.getElementById('deliveryZone');
      const zoneVal = zoneSelect ? zoneSelect.value : 'ichki';
      extraFee = zoneVal === 'tashqi' ? 15000 : 10000;
      feeDescription = zoneVal === 'tashqi' ? 'Yetkazish (Tashqari): 15 000 so\'m' : 'Yetkazish (Shahar ichi): 10 000 so\'m';
    } else {
      let serviceFeePercent = 0.07;
      const tableInputVal = document.getElementById('checkoutTable') ? document.getElementById('checkoutTable').value.toLowerCase() : '';
      if (tableInputVal.includes('vip') || tableInputVal.includes('kabina')) {
        serviceFeePercent = 0.10;
      }
      extraFee = Math.round(subtotal * serviceFeePercent);
      feeDescription = `Xizmat haqi (${serviceFeePercent * 100}%): ${formatPrice(extraFee)}`;
    }

    let grandTotal = subtotal + extraFee;

    if (cartTotalEl) {
      cartTotalEl.innerHTML = `${formatPrice(grandTotal)} <br><small style="font-size:0.75rem; color:var(--accent-gold);">(${feeDescription})</small>`;
    }
  }

  window.addToCart = function(dishId, qty = 1) { const dish = MENU_DATA.find(d => d.id === dishId); if (!dish) return; const existing = cart.find(item => item.id === dishId); if (existing) existing.quantity += qty; else cart.push({ id: dishId, quantity: qty }); saveCart(); showToast(`"${dish.name}" savatga qo'shildi!`, 'fa-shopping-cart'); };
  window.changeCartQty = function(dishId, delta) { const item = cart.find(i => i.id === dishId); if (!item) return; item.quantity += delta; if (item.quantity <= 0) cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.removeFromCart = function(dishId) { cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.openCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; updateCartUI(); } };
  window.closeCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; } };

  /* ==========================================================================
     4. CHECKOUT & TELEGRAM (OVQAT BUYURTMASI -> 8072569639)
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  window.openCheckout = function() { if (cart.length === 0) { showToast('Savat bo\'sh!', 'fa-exclamation-circle'); return; } window.closeCart(); if (checkoutModal) { checkoutModal.classList.add('open'); document.body.style.overflow = 'hidden'; ensureDeliveryZoneSelect(); updateCartUI(); } };
  window.closeCheckout = function() { if (checkoutModal) { checkoutModal.classList.remove('open'); document.body.style.overflow = ''; } };

  function ensureDeliveryZoneSelect() {
    const addressGroup = document.getElementById('checkoutAddressGroup');
    if (addressGroup && !document.getElementById('deliveryZone')) {
      const zoneDiv = document.createElement('div');
      zoneDiv.className = 'form-group';
      zoneDiv.style.marginTop = '10px';
      zoneDiv.innerHTML = `
        <label for="deliveryZone">Yetkazish hududi *</label>
        <select id="deliveryZone" style="width:150px; padding:6px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main);">
          <option value="ichki">Shahar ichi (10 000 so'm)</option>
          <option value="tashqi">Shahar tashqari (15 000 so'm)</option>
        </select>
      `;
      addressGroup.appendChild(zoneDiv);
      document.getElementById('deliveryZone').addEventListener('change', updateCartUI);
    }
  }

  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => { 
      orderTypeBtns.forEach(b => b.classList.remove('active')); 
      btn.classList.add('active'); 
      orderType = btn.dataset.type; 
      document.getElementById('checkoutAddressGroup').style.display = orderType === 'delivery' ? 'flex' : 'none'; 
      document.getElementById('checkoutTableGroup').style.display = orderType === 'delivery' ? 'none' : 'flex'; 
      if (orderType === 'delivery') ensureDeliveryZoneSelect();
      updateCartUI();
    });
  });

  const checkoutTableInput = document.getElementById('checkoutTable');
  if (checkoutTableInput) {
    checkoutTableInput.addEventListener('input', updateCartUI);
  }

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('checkoutName').value.trim(); 
      const phone = document.getElementById('checkoutPhone').value.trim(); 
      const address = document.getElementById('checkoutAddress').value.trim(); 
      const table = document.getElementById('checkoutTable').value.trim(); 
      const note = document.getElementById('checkoutNote').value.trim();
      
      if (!name || !phone) { showToast('Ism va telefonni kiriting!', 'fa-exclamation-triangle'); return; }
      if (orderType === 'delivery' && !address) { showToast('Yetkazish manzilini kiriting!', 'fa-exclamation-triangle'); return; }
      
      let subtotal = 0; 
      let orderLinesText = cart.map(item => { 
        const dish = MENU_DATA.find(d => d.id === item.id); 
        const lineTotal = dish ? dish.price * item.quantity : 0; 
        subtotal += lineTotal; 
        return `• ${dish ? dish.name : ''} x ${item.quantity} = ${formatPrice(lineTotal)}`; 
      }).join('\n');

      let extraFee = 0;
      let feeTitle = '';

      if (orderType === 'delivery') {
        const zoneSelect = document.getElementById('deliveryZone');
        const zoneVal = zoneSelect ? zoneSelect.value : 'ichki';
        extraFee = zoneVal === 'tashqi' ? 15000 : 10000;
        feeTitle = zoneVal === 'tashqi' ? 'Yetkazish (Shahar tashqari)' : 'Yetkazish (Shahar ichi)';
      } else {
        let serviceFeePercent = 0.07;
        if (table.toLowerCase().includes('vip') || table.toLowerCase().includes('kabina')) {
          serviceFeePercent = 0.10;
        }
        extraFee = Math.round(subtotal * serviceFeePercent);
        feeTitle = `Xizmat haqi (${serviceFeePercent * 100}%)`;
      }

      let totalSum = subtotal + extraFee;

      const orderId = 'IQB-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryText = orderType === 'delivery' ? `Yetkazish: ${address} (${feeTitle})` : `Restoranda: ${table || 'Tanlanmagan'}`;
      
      showToast("Yuborilmoqda...", 'fa-spinner');
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
      const FOOD_CHAT_ID = '8072569639';
      
      const tgText = `📦 *YANGI TAOM BUYURTMASI!* (#${orderId})\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📍 ${deliveryText}\n\n🛒 *Buyurtmalar:*\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 *Jami to'lov: ${formatPrice(totalSum)}*\n📝 Izoh: ${note || "Yo'q"}`;
      
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: FOOD_CHAT_ID, text: tgText, parse_mode: 'Markdown' })
        });
      } catch (e) {
        console.log("Telegram xatolik:", e);
      }

      window.closeCheckout(); 
      showSuccessModal({ 
        title: 'Buyurtmangiz qabul qilindi!', 
        subtitle: `Raqam: #${orderId}`, 
        message: `Tez orada operator aloqaga chiqadi.`, 
        details: `${deliveryText}\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\nJami: ${formatPrice(totalSum)}\n\n${orderLinesText}` 
      });
      cart = []; saveCart();
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  /* ==========================================================================
     5. TABLE RESERVATION SYSTEM
     ========================================================================== */
  const API_URL = 'https://iqbol.onrender.com/api';
  const reservationForm = document.getElementById('reservationForm');

  if (reservationForm) {
    const resDateInput = document.getElementById('resDate');
    const resTimeSelect = document.getElementById('resTime');
    const tableTypeSelect = document.getElementById('resTableType');
    const tableNumberSelect = document.getElementById('resTableNumber');

    if (resDateInput) {
      resDateInput.min = new Date().toISOString().split('T')[0];
      resDateInput.value = new Date().toISOString().split('T')[0];
    }

    async function checkAndFilterBookedTables() {
      if (!tableTypeSelect || !tableNumberSelect || !resDateInput || !resTimeSelect) return;

      const type = tableTypeSelect.value;
      const date = resDateInput.value;
      const time = resTimeSelect.value;

      let max = 0; let label = 'Stol'; let tableTypeName = '';
      switch (type) {
        case 'asosiy-zal': max = 35; label = 'Stol'; tableTypeName = 'Asosiy zal'; break;
        case 'zal-2': max = 8; label = 'Stol'; tableTypeName = '2-zal'; break;
        case 'vip': max = 9; label = 'Kabina'; tableTypeName = 'VIP kabina'; break;
        case 'tashqi': max = 40; label = 'Joy'; tableTypeName = "Ko'cha / Tashqi ayvon"; break;
      }

      tableNumberSelect.innerHTML = '<option value="">Yuklanmoqda...</option>';

      try {
        const response = await fetch(`${API_URL}/booked`);
        const bookedTables = await response.json();

        tableNumberSelect.innerHTML = '';
        for (let i = 1; i <= max; i++) {
          const optionValue = `${label} #${i}`;
          const opt = document.createElement('option');
          opt.value = optionValue;
          
          const bookingKey = `${date}_${time}_${tableTypeName}_${optionValue}`;

          if (bookedTables[bookingKey]) {
            opt.disabled = true;
            opt.textContent = `${optionValue} (BAND)`;
            opt.style.color = "red";
            opt.style.backgroundColor = "#ffe6e6";
          } else {
            opt.textContent = optionValue;
          }
          tableNumberSelect.appendChild(opt);
        }

        if (tableNumberSelect.options.length > 0 && tableNumberSelect.options[tableNumberSelect.selectedIndex]?.disabled) {
          const firstAvailable = Array.from(tableNumberSelect.options).find(o => !o.disabled);
          if (firstAvailable) { tableNumberSelect.value = firstAvailable.value; } 
          else { tableNumberSelect.innerHTML = '<option value="" disabled selected>Hamma joy band</option>'; }
        }
      } catch (err) {
        tableNumberSelect.innerHTML = '<option value="">Server ishga tushmagan!</option>';
      }
    }

    tableTypeSelect.addEventListener('change', checkAndFilterBookedTables);
    resDateInput.addEventListener('change', checkAndFilterBookedTables);
    resTimeSelect.addEventListener('change', checkAndFilterBookedTables);
    
    checkAndFilterBookedTables();

    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = resDateInput.value;
      const time = resTimeSelect.value;
      const guests = document.getElementById('resGuests').value;
      const tableType = tableTypeSelect.value;
      const tableNumber = tableNumberSelect.value;
      const notes = document.getElementById('resNotes').value.trim();

      if (!name || !phone || !date || !time || !tableNumber) {
        showToast("Iltimos, barcha maydonlarni to'ldiring!", 'fa-exclamation-triangle');
        return;
      }

      let tableTypeName = '';
      if (tableType === 'asosiy-zal') tableTypeName = 'Asosiy zal';
      else if (tableType === 'zal-2') tableTypeName = '2-zal';
      else if (tableType === 'vip') tableTypeName = 'VIP kabina';
      else if (tableType === 'tashqi') tableTypeName = "Ko'cha / Tashqi ayvon";

      showToast("Tizimga yuborilmoqda...", 'fa-spinner');
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, date, time, tableType: tableTypeName, tableNumber, guests, notes })
        });

        const result = await response.json();

        if (!result.success) {
          showToast(result.message, 'fa-exclamation-triangle');
          checkAndFilterBookedTables(); 
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        const bookingCode = 'STOL-' + Math.floor(1000 + Math.random() * 9000);
        showSuccessModal({
          title: 'Stol muvaffaqiyatli band qilindi!',
          subtitle: `Kod: #${bookingCode}`,
          message: `Hurmatli ${name}, joyingiz ro'yxatga olindi. Sizni kutamiz!`,
          details: `Joy turi: ${tableTypeName}\nStol: ${tableNumber}\nTelefon: ${phone}`
        });

        reservationForm.reset();
        checkAndFilterBookedTables(); 
      } catch (err) {
        showToast("Server yoniq emas!", 'fa-wifi');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================================================
     6. SUCCESS MODAL
     ========================================================================== */
  const successModal = document.getElementById('successModal');
  function showSuccessModal(data) {
    if (!successModal) return;
    document.getElementById('successTitle').textContent = data.title;
    document.getElementById('successSubtitle').textContent = data.subtitle;
    document.getElementById('successMessage').textContent = data.message;
    document.getElementById('successDetails').textContent = data.details;

    const tgBtn = document.getElementById('successTelegramBtn');
    if (tgBtn) tgBtn.style.display = 'none';

    successModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.closeSuccessModal = function() {
    if (successModal) { successModal.classList.remove('open'); document.body.style.overflow = ''; }
  };

  /* ==========================================================================
     7. THEME TOGGLE (DARK / LIGHT MODE)
     ========================================================================== */
  const savedTheme = localStorage.getItem('iqbol_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('iqbol_theme', next);
      updateThemeIcon(next);
      showToast(next === 'dark' ? 'Tungi rejim yoqildi' : 'Kunduzgi rejim yoqildi', next === 'dark' ? 'fa-moon' : 'fa-sun');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'dark'
      ? '<i class="fas fa-sun" style="color: #f3d889;"></i>'
      : '<i class="fas fa-moon"></i>';
  }

  /* ==========================================================================
     8. SCROLL & MOBILE NAV
     ========================================================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (header) header.classList.toggle('scrolled', scrollY > 50);
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrollY > 400);
  });
  if (backToTopBtn) backToTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => { mobileNavDrawer.classList.add('open'); mobileNavOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
  window.closeMobileNav = function() { if (mobileNavDrawer) { mobileNavDrawer.classList.remove('open'); mobileNavOverlay.classList.remove('open'); document.body.style.overflow = ''; } };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeDishModal(); window.closeCart(); window.closeCheckout(); window.closeSuccessModal(); window.closeMobileNav();
    }
  });

  renderMenu();
  updateCartUI();
});