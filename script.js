/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT
 * Location: Qarshi, Uzbekistan
 * Vanilla JS (No React)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MENU DATABASE (EXACT MENU FROM RESTAURANT)
     ========================================================================== */
  const MENU_DATA = [
    // BIRINCHI TAOM
    {
      id: 'bt-1',
      name: 'Борщи',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 30000,
      portion: '1 porsiya',
      desc: 'An\'anaviy mol go\'shti, sabzi, lavlagi va ko\'katlar bilan to\'yimli sho\'rva.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop',
      tags: ['Issiq taom', 'Mol go\'shti'],
      popular: false
    },
    {
      id: 'bt-2',
      name: 'Мастава',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 35000,
      portion: '1 porsiya',
      desc: 'O\'zbekcha suyuq guruchli taom, barra go\'sht, qatiq va xushbo\'y ziravorlar uyg\'unligi.',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop',
      tags: ['Milliy', 'Mashhur'],
      popular: true
    },
    {
      id: 'bt-3',
      name: 'Суп с лапшой',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 35000,
      portion: '1 porsiya',
      desc: 'Qo\'lda cho\'zilgan yupqa ugra, tiniq go\'shtli bulyon va sarxil sabzavotlar.',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop',
      tags: ['Qo\'l ugrasi', 'Tiniq bulyon'],
      popular: false
    },
    {
      id: 'bt-4',
      name: 'Ковурма лагман',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 35000,
      portion: '1 porsiya',
      desc: 'Uyg\'urcha qo\'lda cho\'zilgan lazzatli lag\'mon, qovurilgan go\'sht va sarxil qalampirlar.',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop',
      tags: ['Uyg\'ur oshxonasi', 'Tavsiya'],
      popular: true
    },
    {
      id: 'bt-5',
      name: 'Пельмени (Chuchvara)',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 35000,
      portion: '1 porsiya',
      desc: 'Xushbo\'y go\'shtli mayda chuchvaralar, barra bulyon va yangi qaymoq bilan tortiladi.',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
      tags: ['Chuchvara', 'Qaymoqli'],
      popular: false
    },
    {
      id: 'bt-6',
      name: 'Казанский шурпа',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 35000,
      portion: '1 porsiya',
      desc: 'Qozonda dimlangan yumshoq qo\'y go\'shti, noxat va yirik sabzavotli boy sho\'rva.',
      image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=800&auto=format&fit=crop',
      tags: ['Qo\'y go\'shti', 'Milliy'],
      popular: true
    },
    {
      id: 'bt-7',
      name: 'Тефтели шурпа',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 25000,
      portion: '1 porsiya',
      desc: 'Yumshoq qiymali teftellar va sabzavotli yengil, parhezbop sho\'rva.',
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
      tags: ['Yengil', 'Teftel'],
      popular: false
    },
    {
      id: 'bt-8',
      name: 'Бульон',
      category: 'birinchi',
      categoryName: 'Birinchi taomlar',
      price: 10000,
      portion: '1 kosa',
      desc: 'Toza go\'sht suyaklarida qaynatilgan tabiiy quvvatbaxsh shifobaxsh bulyon.',
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop',
      tags: ['Shifobaxsh', 'Issiq'],
      popular: false
    },

    // IKKINCHI TAOM
    {
      id: 'it-1',
      name: 'Тандыр (Tandir go\'sht)',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 245000,
      portion: '1 kg',
      desc: 'Qarshining afsonaviy archa va tandirda pishirilgan xushbo\'y, erib ketadigan qo\'y go\'shti.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Qarshi Brandi', 'Tandir', '1 kg'],
      popular: true
    },
    {
      id: 'it-2',
      name: 'Казанча',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 250000,
      portion: '1 kg',
      desc: 'Maxsus cho\'yan qozonda qizarguncha qovurilgan sarxil barra go\'sht va kartoshka.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Qozon-kabob', '1 kg'],
      popular: true
    },
    {
      id: 'it-3',
      name: 'Унгирча жиз (Ungircha jiz)',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 250000,
      portion: '1 kg',
      desc: 'Tog\'cha uslubdagi shirador jiz go\'shti, piyoz va an\'anaviy ziravorlar bilan.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Jiz-biz', '1 kg'],
      popular: false
    },
    {
      id: 'it-4',
      name: 'Манты',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 190000,
      portion: '1 kg',
      desc: 'Yupqa xamir ichida mayda to\'g\'ralgan shirador go\'sht va piyoz, bug\'da pishirilgan.',
      image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop',
      tags: ['Bug\'da', '1 kg'],
      popular: true
    },
    {
      id: 'it-5',
      name: 'Мускус жиз',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 130000,
      portion: '1 porsiya',
      desc: 'Maxsus marinadlangan nozik go\'sht bo\'laklaridan tayyorlangan mazali jiz.',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop',
      tags: ['Maxsus', 'Porsiyali'],
      popular: false
    },
    {
      id: 'it-6',
      name: 'Уйгурча жиз (Uyghur jiz)',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 240000,
      portion: '1 porsiya',
      desc: 'Uyg\'urcha o\'tkir olovda qovurilgan achchiq-chuchuk lazzatli go\'sht va sarimsoq.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      tags: ['Uyg\'ur', 'Achchiqroq'],
      popular: true
    },
    {
      id: 'it-7',
      name: 'Хасиб (Hasib)',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 120000,
      portion: '1 porsiya',
      desc: 'Milliy uslubda tayyorlangan go\'shtli va guruchli uy hasibi.',
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=800&auto=format&fit=crop',
      tags: ['Milliy delikates'],
      popular: false
    },
    {
      id: 'it-8',
      name: 'Муштак',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 210000,
      portion: '1 porsiya',
      desc: 'Restoranning maxsus oshpaz retsepti bo\'yicha tayyorlanadigan qovurma tansiq taom.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Mualliflik taomi'],
      popular: false
    },
    {
      id: 'it-9',
      name: 'Госса острый',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 150000,
      portion: '1 kg',
      desc: 'Achchiq qalampir va maxsus uyg\'ur sousida pishirilgan xushxo\'r go\'sht.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Achchiq', '1 kg'],
      popular: false
    },
    {
      id: 'it-10',
      name: 'Сосиска сливки',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 150000,
      portion: '1 kg',
      desc: 'Yumshoq qaymoqli sousda tayyorlangan lazzatli sosiskalar.',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop',
      tags: ['Qaymoqli', '1 kg'],
      popular: false
    },
    {
      id: 'it-11',
      name: 'Сырой фарш (Tayyor qiyma)',
      category: 'ikkinchi',
      categoryName: 'Ikkinchi taomlar',
      price: 130000,
      portion: '1 kg',
      desc: 'Uyda pishirish uchun saralangan tabiiy toza go\'shtdan tayyorlangan maxsus qiyma.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=800&auto=format&fit=crop',
      tags: ['Yarim tayyor', '1 kg'],
      popular: false
    },

    // SHASHLIK
    {
      id: 'sh-1',
      name: 'Кусковой баранина',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 85000,
      portion: '1 six',
      desc: 'Cho\'g\'da pishirilgan barra qo\'y go\'shti va dumba yog\'i, piyoz va murch bilan.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Qo\'y go\'shti', 'Sixli'],
      popular: true
    },
    {
      id: 'sh-2',
      name: 'Кусковой говядина',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 85000,
      portion: '1 six',
      desc: 'Saralangan mol lahm go\'shti, ko\'mirda pishirilgan shirador kabob.',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop',
      tags: ['Mol go\'shti'],
      popular: true
    },
    {
      id: 'sh-3',
      name: 'Кавказ баранина',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 85000,
      portion: '1 six',
      desc: 'Kavkazcha maxsus marinad, kashnich va xushbo\'y giyohlarda toblangan qo\'y go\'shti.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Kavkazcha'],
      popular: false
    },
    {
      id: 'sh-4',
      name: 'Кавказ говядина',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 85000,
      portion: '1 six',
      desc: 'Mol go\'shti qovurg\'alari va lahmlari maxsus shirin-nordon sousda.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Kavkazcha'],
      popular: false
    },
    {
      id: 'sh-5',
      name: 'Корейка шашлык',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 35000,
      portion: '1 six',
      desc: 'Yupqa suyakli nozik go\'sht bo\'lagi, ko\'mirda shaqillatib qizartirilgan.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Koreyka'],
      popular: true
    },
    {
      id: 'sh-6',
      name: 'Кавказ куриный',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 28000,
      portion: '1 six',
      desc: 'Yumshoq tovuq filesi, limon va sarimsoqli marinadda tayyorlangan.',
      image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=800&auto=format&fit=crop',
      tags: ['Tovuq', 'Yengil'],
      popular: false
    },
    {
      id: 'sh-7',
      name: 'Кавказ из говядины',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 35000,
      portion: '1 six',
      desc: 'Mol go\'shtidan tayyorlangan qiyma kabob, shirador va yumshoq.',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop',
      tags: ['Qiyma kabob'],
      popular: false
    },
    {
      id: 'sh-8',
      name: 'Крылышки (Qanotcha shashlik)',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 48000,
      portion: '1 porsiya',
      desc: 'Qarsildoq qovurilgan tovuq qanotchalaridan lazzatli barbekyu kabob.',
      image: 'https://images.unsplash.com/photo-1527477378377-f80e922a9cf2?q=80&w=800&auto=format&fit=crop',
      tags: ['Qarsildoq', 'Gril'],
      popular: true
    },
    {
      id: 'sh-9',
      name: 'Гужувон',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 62000,
      portion: '1 six',
      desc: 'Buxorocha an\'anadagi mashhur gijduvoncha yumshoq qiyma kabob.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['G\'ijduvoncha', 'Mashhur'],
      popular: true
    },
    {
      id: 'sh-10',
      name: 'Рулет шашлык',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 70000,
      portion: '1 six',
      desc: 'Lahm go\'sht va dumba yog\'i o\'ralgan rulet shaklidagi nozik kabob.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Rulet'],
      popular: false
    },
    {
      id: 'sh-11',
      name: 'Ларшарли',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 70000,
      portion: '1 six',
      desc: 'Oshpazning maxsus usulda marinadlagan go\'sht bo\'laklaridan kabob.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Maxsus'],
      popular: false
    },
    {
      id: 'sh-12',
      name: 'Наполеон (Go\'shtli qavat)',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 66000,
      portion: '1 six',
      desc: 'Yupqa go\'sht va yog\' qavatlari terib tayyorlangan lazzatli six.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Qavatli kabob'],
      popular: false
    },
    {
      id: 'sh-13',
      name: 'Печень (Jigar shashlik)',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 40000,
      portion: '1 six',
      desc: 'Dumba yog\'i bilan navbatma-navbat terilgan yangi mol jigari.',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop',
      tags: ['Jigar'],
      popular: false
    },
    {
      id: 'sh-14',
      name: 'Грибной шашлык',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 50000,
      portion: '1 six',
      desc: 'Cho\'g\'da ziroatlangan sarxil shampinyon qo\'ziqorinlari.',
      image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop',
      tags: ['Qo\'ziqorin', 'Vegetarian'],
      popular: false
    },
    {
      id: 'sh-15',
      name: 'Овощной шашлык',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 40000,
      portion: '1 six',
      desc: 'Baqlajon, shirin bulg\'or qalampiri, pomidor va piyoz cho\'g\'da.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      tags: ['Sabzavotli'],
      popular: false
    },
    {
      id: 'sh-16',
      name: 'Помидор шашлык',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 20000,
      portion: '1 six',
      desc: 'Cho\'g\'da pishirilgan shirador qizil pomidorlar.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop',
      tags: ['Pomidor'],
      popular: false
    },
    {
      id: 'sh-17',
      name: 'Дуйка',
      category: 'shashlik',
      categoryName: 'Shashlik va gril',
      price: 40000,
      portion: '1 six',
      desc: 'Shirador dumba bo\'laklaridan qarsildoq qovurilgan shashlik.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Dumba'],
      popular: false
    },

    // SHASHLIK ASSORTI
    {
      id: 'sha-1',
      name: 'Шашлык ассорти (4 kishilik)',
      category: 'shashlik',
      categoryName: 'Shashlik va assorti',
      price: 350000,
      portion: '4 kishi uchun',
      desc: 'Lahm, qiyma, tovuq, qanotcha va sabzavotli shashliklarning katta to\'plami.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Assorti', 'Oila uchun'],
      popular: true
    },
    {
      id: 'sha-2',
      name: 'Шашлык ассорти (6 kishilik)',
      category: 'shashlik',
      categoryName: 'Shashlik va assorti',
      price: 650000,
      portion: '6 kishi uchun',
      desc: 'Katta dasturxon uchun barcha turdagi ko\'mir kaboblari, souslar va non bilan.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Katta bayram', '6 kishi'],
      popular: true
    },
    {
      id: 'sha-3',
      name: 'Икбол ассорти (4 kishilik)',
      category: 'shashlik',
      categoryName: 'Shashlik va assorti',
      price: 520000,
      portion: '4 kishi uchun',
      desc: 'IQBOL restoranining eng tanlangan go\'shtli va tandir kaboblaridan eksklyuziv podnos.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['IQBOL Special', 'Premium'],
      popular: true
    },
    {
      id: 'sha-4',
      name: 'Икбол ассорти (6 kishilik)',
      category: 'shashlik',
      categoryName: 'Shashlik va assorti',
      price: 700000,
      portion: '6 kishi uchun',
      desc: 'Restoranning shohona assortisi: tandir, qozon kabob, xilma-xil shashliklar va garnirlar.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Shohona', 'Premium 6 kishi'],
      popular: true
    },

    // QO'SHIMCHA TAOMLAR
    {
      id: 'qt-1',
      name: 'Хрустящий баклажан',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 62000,
      portion: '1 porsiya',
      desc: 'Qarsildoq qovurilgan baqlajon bo\'laklari, shirin-nordon sous va kashnich.',
      image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=800&auto=format&fit=crop',
      tags: ['Hit taom', 'Qarsildoq'],
      popular: true
    },
    {
      id: 'qt-2',
      name: 'Хрустящий напичинский',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 72000,
      portion: '1 porsiya',
      desc: 'Maxsus pishiriq sousi bilan taqdim etiladigan qarsildoq gazak.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
      tags: ['Gazak'],
      popular: false
    },
    {
      id: 'qt-3',
      name: 'Картошка фри',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 25000,
      portion: '1 porsiya',
      desc: 'Oltin rang qarsildoq fri kartoshkasi, tomat sousi bilan.',
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
      tags: ['Fri', 'Bolalar uchun'],
      popular: false
    },
    {
      id: 'qt-4',
      name: 'Жареные пельмени (Qovurma chuchvara)',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 20000,
      portion: '15 dona',
      desc: 'Yog\'da qizarguncha qarsillatib qovurilgan go\'shtli chuchvaralar.',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
      tags: ['15 dona', 'Qarsildoq'],
      popular: true
    },
    {
      id: 'qt-5',
      name: 'Самса (Tandir somsa)',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 7000,
      portion: '1 dona',
      desc: 'Qatlama xamirdan tandirda pishirilgan, go\'sht va piyozli shirador somsa.',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
      tags: ['Tandir somsa', '1 dona'],
      popular: true
    },
    {
      id: 'qt-6',
      name: 'Пон чижик',
      category: 'qoshimcha',
      categoryName: 'Qo\'shimcha taomlar',
      price: 4000,
      portion: '1 dona',
      desc: 'Shirin xushxo\'r mayin pishiriq ponchik.',
      image: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?q=80&w=800&auto=format&fit=crop',
      tags: ['1 dona'],
      popular: false
    },

    // SALATLAR
    {
      id: 'sal-1',
      name: 'Страчателла с томатом',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 82000,
      portion: '1 porsiya',
      desc: 'Yumshoq italyancha strachatella pishlog\'i, pishgan shirin pomidor va rayhon moyi.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop',
      tags: ['Premium', 'Pishloqli'],
      popular: true
    },
    {
      id: 'sal-2',
      name: 'Цезарь (Tovuq bilan)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 72000,
      portion: '1 porsiya',
      desc: 'Aysberg salat bargi, grilda pishgan tovuq go\'shti, parmezan va maxsuz sezar sousi.',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
      tags: ['Klassik', 'Mashhur'],
      popular: true
    },
    {
      id: 'sal-3',
      name: 'Итальянский шпинат',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 70000,
      portion: '1 porsiya',
      desc: 'Yangi yosh ismaloq barglari, yong\'oqlar va sitrusli sous.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Ismaloqli'],
      popular: false
    },
    {
      id: 'sal-4',
      name: 'Капризе',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 68000,
      portion: '1 porsiya',
      desc: 'Motsarella pishlog\'i, yangi pomidor va xushbo\'y pesto sousi.',
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop',
      tags: ['Motsarella'],
      popular: false
    },
    {
      id: 'sal-5',
      name: 'Салат Тунин',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 60000,
      portion: '1 porsiya',
      desc: 'Tyunets balig\'i, zaytun mevalari va sarxil sabzavotlar uyg\'unligi.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Baliqli'],
      popular: false
    },
    {
      id: 'sal-6',
      name: 'Греческий салат',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 54000,
      portion: '1 porsiya',
      desc: 'Feta pishlog\'i, qora zaytun, bodring, pomidor va zaytun moyi.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Feta', 'Klassik'],
      popular: false
    },
    {
      id: 'sal-7',
      name: 'Икбол салат (Special)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 52000,
      portion: '1 porsiya',
      desc: 'Restoranning o\'ziga xos mualliflik salati — mayin go\'sht, qarsildoq sabzavotlar va maxsus sous.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['IQBOL Firmaviy'],
      popular: true
    },
    {
      id: 'sal-8',
      name: 'Французский',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 48000,
      portion: '1 porsiya',
      desc: 'Qarsildoq kartoshka pay, go\'sht va sarxil sabzavotlar bilan.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
      tags: ['Fransuzcha'],
      popular: false
    },
    {
      id: 'sal-9',
      name: 'Фруктовый салат',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 47000,
      portion: '1 porsiya',
      desc: 'Mavsumiy yangi mevalar: olma, banan, apelsin, kivi va tabiiy asal.',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=800&auto=format&fit=crop',
      tags: ['Mevali', 'Desert'],
      popular: false
    },
    {
      id: 'sal-10',
      name: 'Оливье',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 46000,
      portion: '1 porsiya',
      desc: 'Klassik oshpazona olive, sarxil go\'sht va mayonez bilan.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
      tags: ['Klassik'],
      popular: false
    },
    {
      id: 'sal-11',
      name: 'Мужской каприз',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 44000,
      portion: '1 porsiya',
      desc: 'Qaynatilgan mol go\'shti tili, pishloq, tuxum va sarxil sous.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['To\'yimli'],
      popular: false
    },
    {
      id: 'sal-12',
      name: 'Японский',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 46000,
      portion: '1 porsiya',
      desc: 'Yengil yaponcha sabzavotlar va kunjut yog\'i sousi.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Kunjutli'],
      popular: false
    },
    {
      id: 'sal-13',
      name: 'Подворочку',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 44000,
      portion: '1 porsiya',
      desc: 'Shohona dasturxon uchun marinadlangan sarxil gazaklar.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Gazak'],
      popular: false
    },
    {
      id: 'sal-14',
      name: 'Чабан (Cho\'poncha)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 42000,
      portion: '1 porsiya',
      desc: 'Bodring, pomidor, qizil piyoz va rayhon — haqiqiy milliy lazzat.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Milliy', 'Sarxil'],
      popular: true
    },
    {
      id: 'sal-15',
      name: 'Смик',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 42000,
      portion: '1 porsiya',
      desc: 'Sabzavotli aralash xushxo\'r salat.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
      tags: ['Yengil'],
      popular: false
    },
    {
      id: 'sal-16',
      name: 'Шакароб (Achichuk)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 25000,
      portion: '1 porsiya',
      desc: 'Yupqa to\'g\'ralgan Yulduz pomidori, archilgan piyoz va achchiq qalampir.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=800&auto=format&fit=crop',
      tags: ['Shashlikka mos', 'Milliy'],
      popular: true
    },
    {
      id: 'sal-17',
      name: 'Свежий (Oddiy sarxil)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 25000,
      portion: '1 porsiya',
      desc: 'Yangi bodring, pomidor va sarxil ko\'katlar kesmasi.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Oddiy'],
      popular: false
    },
    {
      id: 'sal-18',
      name: 'Свежий катикли',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 25000,
      portion: '1 porsiya',
      desc: 'Tabiiy qatiq, sarxil bodring va yalpizli tetiklashtiruvchi salat.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Qatiqli'],
      popular: false
    },
    {
      id: 'sal-19',
      name: 'Чакки (Suzma)',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 10000,
      portion: '1 kosa',
      desc: 'Qashqadaryoning haqiqiy xushbo\'y suzmasi, shivit va sarimsoq bilan.',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop',
      tags: ['Suzma', 'Qashqadaryo'],
      popular: true
    },
    {
      id: 'sal-20',
      name: 'Мясной ассорти',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 160000,
      portion: '1 tarelka',
      desc: 'Qazi, til, dudlangan mol go\'shti va saralangan ruletlar to\'plami.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      tags: ['Qazi', 'Katta tarelka'],
      popular: true
    },
    {
      id: 'sal-21',
      name: 'Сырный ассорти',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 160000,
      portion: '1 tarelka',
      desc: 'Fransuz va golland pishloqlari, uzum, yong\'oq va asal bilan.',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=800&auto=format&fit=crop',
      tags: ['Pishloqlar'],
      popular: false
    },
    {
      id: 'sal-22',
      name: 'Мена ассорти',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 160000,
      portion: '1 tarelka',
      desc: 'Xushxo\'r gazaklar va tushlikbop delikateslar assortisi.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop',
      tags: ['Assorti'],
      popular: false
    },
    {
      id: 'sal-23',
      name: 'Свежий ассорти',
      category: 'salatlar',
      categoryName: 'Salatlar',
      price: 46000,
      portion: '1 tarelka',
      desc: 'Katta tarelka to\'la butun pomidor, bodring, bulg\'or qalampiri va barra ko\'katlar.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
      tags: ['Sarxil sabzavotlar'],
      popular: false
    },

    // ICHIMLIKLAR & NON
    {
      id: 'ich-1',
      name: 'Мохито киви',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 50000,
      portion: '1 grafin',
      desc: 'Muzdek tetiklantiruvchi kivi bo\'laklari, yalpiz va laym sharbati.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      tags: ['Moxito', 'Muzdek'],
      popular: true
    },
    {
      id: 'ich-2',
      name: 'Ягода (O\'rmon mevalari)',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 60000,
      portion: '1 grafin',
      desc: 'Malina, qorag\'at va qulupnayli tabiiy xushbo\'y mevali kokteyl.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
      tags: ['Mevali', 'Tabiiy'],
      popular: true
    },
    {
      id: 'ich-3',
      name: 'Классический мохито',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 45000,
      portion: '1 grafin',
      desc: 'Klassik yangi yalpiz barglari, laym bo\'laklari, gazli suv va muz.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
      tags: ['Klassik'],
      popular: false
    },
    {
      id: 'ich-4',
      name: 'Манго-маракуйя',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 65000,
      portion: '1 grafin',
      desc: 'Tropik mango va marakuyyaning quyoshli ekzotik ta\'mi.',
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=800&auto=format&fit=crop',
      tags: ['Ekzotik'],
      popular: true
    },
    {
      id: 'ich-5',
      name: 'Тархун',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 60000,
      portion: '1 grafin',
      desc: 'Haqiqiy estragon (tarxun) o\'tidan tayyorlangan zumrad rang tetiklik.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop',
      tags: ['Tarxun'],
      popular: false
    },
    {
      id: 'ich-6',
      name: 'Клубничный мохито',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 60000,
      portion: '1 grafin',
      desc: 'Yangi qulupnay mevalari ezilgan xushbo\'y shirin kokteyl.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
      tags: ['Qulupnay'],
      popular: false
    },
    {
      id: 'ich-7',
      name: 'Чайник (Ko\'k / Qora choy)',
      category: 'ichimliklar',
      categoryName: 'Ichimliklar',
      price: 15000,
      portion: '1 choynak',
      desc: 'Tog\' giyohlari, limon va novvot bilan damlangan milliy choy.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
      tags: ['Choy', 'Issiq'],
      popular: true
    },
    {
      id: 'ich-8',
      name: 'Нон ассорти',
      category: 'ichimliklar',
      categoryName: 'Non va qo\'shimchalar',
      price: 25000,
      portion: '1 savat',
      desc: 'Patir, obi non, shirmoy non va kunjutli issiq nonlar savati.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
      tags: ['Issiq non', 'Assorti'],
      popular: true
    },
    {
      id: 'ich-9',
      name: 'Tandir non / Patir',
      category: 'ichimliklar',
      categoryName: 'Non va qo\'shimchalar',
      price: 5000,
      portion: '1 dona',
      desc: 'Tandirdan uzilgan qashqadaryocha issiq qatlama patir non.',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=800&auto=format&fit=crop',
      tags: ['Tandir non'],
      popular: true
    },

    // GAZLI VA BOSHQA
    {
      id: 'gz-1',
      name: 'Кока-Кола (1L)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 12000,
      portion: '1 litr',
      desc: 'Klassik Coca-Cola yaxna baklashka.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRdBQlp_m3fDR-FH0_cPYLIqVQzUUXKWDMo1cQGRN3aO-EHAiuavas7of&s=10',
      tags: ['1L', 'Muzdek'],
      popular: false
    },
    {
      id: 'gz-2',
      name: 'Фанта (1L)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 12000,
      portion: '1 litr',
      desc: 'Apelsin ta\'mli Fanta 1 litr.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7WYRP7mKhQGmt4ZSwug0xD4qfrkp5yBJIPJSAo7ONkZW-NyDGy_4doD8&s=10',
      tags: ['1L'],
      popular: false
    },

    {
      id: 'gz-5',
      name: 'Ред Бул (Red Bull)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 20000,
      portion: '1 banka',
      desc: 'Red Bull energetik salqin ichimlik.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu_02n8Bi5JPNYEJ-ks1Eu5Vl_jxD3ehXTpph7s8vRd15v4H6hBqYE0Zw&s=10',
      tags: ['Energetik'],
      popular: false
    },
    {
      id: 'gz-6',
      name: 'Адреналин',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 14000,
      portion: '1 banka',
      desc: 'Adrenaline Rush energetik ichimligi.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6JJnlAKbEraU-lNkrCrG0jT6tByAftngTkzAJrziH8WAlGfqmtd6BY8x&s=10',
      tags: ['Energetik'],
      popular: false
    },
    {
      id: 'gz-7',
      name: 'Флеш (Flash)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 12000,
      portion: '1 banka',
      desc: 'Flash Up salqin ichimlik.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWYALh_GBpOAYravXlV30SAVJZ6nJtTXzG9KPHd3-ClVH1ZAxZ_6bpdDQ&s=10',
      tags: ['Energetik'],
      popular: false
    },
    {
      id: 'gz-8',
      name: 'Карлавори',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 12000,
      portion: '1 shisha',
      desc: 'Karlavari mineral shifobaxsh suvi.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtsZWRDb2a5iYpOlHGLIJuJFkvtcz02bktX7p9ZOjAc_0PHTa1eajEPE&s=10',
      tags: ['Mineral suv'],
      popular: false
    },
    {
      id: 'gz-9',
      name: 'Чорток (Chortoq)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 13000,
      portion: '1 shisha',
      desc: 'O\'zbekistonning shifobaxsh mineral suvi.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkSi2BVpDR2ywh02_HyrkEQQx48g1HuJrvUJBYIl-WvVj_jupVmpWR1Ms&s=10',
      tags: ['Mineral', 'Gazli'],
      popular: true
    },
    {
      id: 'gz-10',
      name: 'Тоза ичимлик суви (Вода) / Gazli',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 5000,
      portion: '1L',
      desc: 'Tog\' manbalaridan tozalangan muzdek tabiiy suv.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-8gNQdNglnqKBlcAyhdSa1pRotguCtxB8WXxO5IQNg&s=10',
      tags: ['Toza suv'],
      popular: false
    },
    {
      id: 'gz-13',
      name: 'Кешью (Saralangan keshyu)',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 25000,
      portion: '1 kosa',
      desc: 'Qovurilgan qarsildoq keshyu yong\'og\'i.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvNzyH01piJs_r-vEPRsOsSHfn_YC9jrAa5s3AFa2CQ&s=10',
      tags: ['Keshyu'],
      popular: false
    },
    {
      id: 'gz-14',
      name: 'Пивное ассорти',
      category: 'gazli',
      categoryName: 'Gazli va yaxna ichimliklar',
      price: 50000,
      portion: '1 tarelka',
      desc: 'Pista, bodom, pishloq bo\'laklari va qarsildoq chipslar to\'plami.',
      image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?q=80&w=800&auto=format&fit=crop',
      tags: ['Gazak to\'plam'],
      popular: false
    }
  ];

  /* ==========================================================================
     2. APP STATE & STORAGE
     ========================================================================== */
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('iqbol_cart')) || [];
  } catch(e) {
    cart = [];
  }
  
  let favorites = [];
  try {
    favorites = JSON.parse(localStorage.getItem('iqbol_favorites')) || [];
  } catch(e) {
    favorites = [];
  }

  let activeCategory = 'all';
  let searchQuery = '';
  let orderType = 'dine_in'; 

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

  /* ==========================================================================
     3. UTILITIES
     ========================================================================== */
  function formatPrice(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
  }

  function showToast(message, icon) {
    if (!icon) icon = 'fa-check-circle';
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = '<i class="fas ' + icon + ' toast-icon"></i><span class="toast-text">' + message + '</span>';
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     4. RENDER MENU
     ========================================================================== */
  function renderMenu() {
    if (!dishesGrid) return;

    let filtered = MENU_DATA;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        (item.portion && item.portion.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      dishesGrid.innerHTML = '<div class="no-dishes-found"><i class="fas fa-utensils"></i><h3>Hech qanday taom topilmadi</h3><p>Qidiruv so\'zini o\'zgartiring yoki boshqa toifani tanlang.</p></div>';
      return;
    }

    let htmlResult = '';
    filtered.forEach(dish => {
      const isFav = favorites.includes(dish.id);
      let hitBadge = dish.popular ? '<span class="badge badge-gold"><i class="fas fa-star"></i> Hit</span>' : '';
      let portionBadge = dish.portion ? '<span class="badge badge-portion">' + dish.portion + '</span>' : '';
      let heartIcon = isFav ? 'fas fa-heart' : 'far fa-heart';
      let favClass = isFav ? 'favorited' : '';

      htmlResult += '<article class="dish-card" data-id="' + dish.id + '">' +
        '<div class="dish-img-wrap" onclick="window.openDishModal(\'' + dish.id + '\')">' +
          '<img src="' + dish.image + '" alt="' + dish.name + '" loading="lazy" />' +
          '<div class="dish-badges">' + hitBadge + portionBadge + '</div>' +
          '<button class="dish-fav-btn ' + favClass + '" onclick="event.stopPropagation(); window.toggleFavorite(\'' + dish.id + '\')" aria-label="Sevimlilarga qo\'shish">' +
            '<i class="' + heartIcon + '"></i>' +
          '</button>' +
        '</div>' +
        '<div class="dish-content">' +
          '<div class="dish-category">' + dish.categoryName + '</div>' +
          '<h3 class="dish-title" onclick="window.openDishModal(\'' + dish.id + '\')">' + dish.name + '</h3>' +
          '<p class="dish-desc">' + dish.desc + '</p>' +
          '<div class="dish-footer">' +
            '<div class="dish-price-box">' +
              '<span class="price-label">Narxi:</span>' +
              '<span class="dish-price">' + formatPrice(dish.price) + '</span>' +
            '</div>' +
            '<button class="btn-add-cart" onclick="window.addToCart(\'' + dish.id + '\')" title="Buyurtma berish" aria-label="Savatga qo\'shish">' +
              '<i class="fas fa-plus"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
    });
    
    dishesGrid.innerHTML = htmlResult;
  }

  /* ==========================================================================
     5. SEARCH & CATEGORY FILTERING
     ========================================================================== */
  categoryTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderMenu();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.add('visible');
        } else {
          clearSearchBtn.classList.remove('visible');
        }
      }
      renderMenu();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('visible');
      renderMenu();
      searchInput.focus();
    });
  }

  /* ==========================================================================
     6. FAVORITES
     ========================================================================== */
  window.toggleFavorite = function(dishId) {
    const idx = favorites.indexOf(dishId);
    const dish = MENU_DATA.find(d => d.id === dishId);
    let dishName = dish ? dish.name : 'Taom';
    
    if (idx > -1) {
      favorites.splice(idx, 1);
      showToast('"' + dishName + '" sevimlilardan olib tashlandi', 'fa-heart-broken');
    } else {
      favorites.push(dishId);
      showToast('"' + dishName + '" sevimlilarga qo\'shildi!', 'fa-heart');
    }
    localStorage.setItem('iqbol_favorites', JSON.stringify(favorites));
    renderMenu();
  };

  /* ==========================================================================
     7. DISH DETAIL MODAL
     ========================================================================== */
  let selectedModalDish = null;
  let modalQuantity = 1;

  window.openDishModal = function(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish || !dishModal) return;

    selectedModalDish = dish;
    modalQuantity = 1;

    document.getElementById('modalImg').src = dish.image;
    document.getElementById('modalImg').alt = dish.name;
    document.getElementById('modalTitle').textContent = dish.name;
    
    let priceText = formatPrice(dish.price);
    if (dish.portion) priceText += ' (' + dish.portion + ')';
    document.getElementById('modalPrice').textContent = priceText;
    
    document.getElementById('modalDesc').textContent = dish.desc;
    document.getElementById('modalCategoryBadge').textContent = dish.categoryName;
    document.getElementById('modalQtyVal').textContent = modalQuantity;

    const tagsWrap = document.getElementById('modalTags');
    if (tagsWrap) {
      let tagsHtml = '';
      if (dish.tags) {
        dish.tags.forEach(t => {
          tagsHtml += '<span class="badge badge-gold"><i class="fas fa-tag"></i> ' + t + '</span>';
        });
      }
      tagsWrap.innerHTML = tagsHtml;
    }

    dishModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeDishModal = function() {
    if (!dishModal) return;
    dishModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.updateModalQty = function(delta) {
    modalQuantity += delta;
    if (modalQuantity < 1) modalQuantity = 1;
    const qtyVal = document.getElementById('modalQtyVal');
    if (qtyVal) qtyVal.textContent = modalQuantity;
  };

  window.addModalDishToCart = function() {
    if (!selectedModalDish) return;
    window.addToCart(selectedModalDish.id, modalQuantity);
    window.closeDishModal();
  };

  /* ==========================================================================
     8. CART & ORDER SYSTEM
     ========================================================================== */
  function saveCart() {
    localStorage.setItem('iqbol_cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    let totalCount = 0;
    cart.forEach(item => { totalCount += item.quantity; });
    
    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (!cartItemsList) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<div class="empty-cart-view"><i class="fas fa-shopping-basket"></i><h4>Savat hali bo\'sh</h4><p>Menyudan mazali taomlar tanlab, "Buyurtma berish" tugmasini bosing.</p></div>';
      if (cartSubtotalEl) cartSubtotalEl.textContent = '0 so\'m';
      if (cartTotalEl) cartTotalEl.textContent = '0 so\'m';
      return;
    }

    let subtotal = 0;
    let itemsHtml = '';

    cart.forEach(item => {
      const dish = MENU_DATA.find(d => d.id === item.id);
      if (!dish) return;
      const itemTotal = dish.price * item.quantity;
      subtotal += itemTotal;

      itemsHtml += '<div class="cart-item">' +
        '<img src="' + dish.image + '" alt="' + dish.name + '" class="cart-item-thumb" />' +
        '<div class="cart-item-details">' +
          '<h5 class="cart-item-name">' + dish.name + '</h5>' +
          '<div class="cart-item-price">' + formatPrice(dish.price) + ' &times; ' + item.quantity + ' = <strong>' + formatPrice(itemTotal) + '</strong></div>' +
        '</div>' +
        '<div class="cart-item-actions">' +
          '<div class="quantity-control">' +
            '<button class="qty-btn" onclick="window.changeCartQty(\'' + dish.id + '\', -1)">-</button>' +
            '<span class="qty-val">' + item.quantity + '</span>' +
            '<button class="qty-btn" onclick="window.changeCartQty(\'' + dish.id + '\', 1)">+</button>' +
          '</div>' +
          '<button class="btn-remove-item" onclick="window.removeFromCart(\'' + dish.id + '\')" title="Olib tashlash">' +
            '<i class="fas fa-trash-alt"></i>' +
          '</button>' +
        '</div>' +
      '</div>';
    });

    cartItemsList.innerHTML = itemsHtml;
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    if (cartTotalEl) cartTotalEl.textContent = formatPrice(subtotal);
  }

  window.addToCart = function(dishId, qty = 1) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish) return;

    const existing = cart.find(item => item.id === dishId);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ id: dishId, quantity: qty });
    }
    saveCart();
    showToast('"' + dish.name + '" savatga qo\'shildi! (' + qty + 'x)', 'fa-shopping-cart');
  };

  window.changeCartQty = function(dishId, delta) {
    const item = cart.find(i => i.id === dishId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== dishId);
    }
    saveCart();
  };

  window.removeFromCart = function(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    cart = cart.filter(i => i.id !== dishId);
    saveCart();
    let dishName = dish ? dish.name : 'Taom';
    showToast('"' + dishName + '" savatdan olib tashlandi', 'fa-trash-alt');
  };

  window.openCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      orderType = btn.dataset.type;
      const addressGroup = document.getElementById('checkoutAddressGroup');
      const tableGroup = document.getElementById('checkoutTableGroup');
      if (addressGroup && tableGroup) {
        if (orderType === 'delivery') {
          addressGroup.style.display = 'flex';
          tableGroup.style.display = 'none';
        } else {
          addressGroup.style.display = 'none';
          tableGroup.style.display = 'flex';
        }
      }
    });
  });

  const checkoutModal = document.getElementById('checkoutModal');

  window.openCheckout = function() {
    if (cart.length === 0) {
      showToast('Savat bo\'sh! Avval taom tanlang.', 'fa-exclamation-circle');
      return;
    }
    window.closeCart();
    if (checkoutModal) {
      checkoutModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCheckout = function() {
    if (checkoutModal) {
      checkoutModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('checkoutName').value.trim();
      const phone = document.getElementById('checkoutPhone').value.trim();
      const address = document.getElementById('checkoutAddress').value.trim();
      const table = document.getElementById('checkoutTable').value.trim();
      const note = document.getElementById('checkoutNote').value.trim();

      if (!name || !phone) {
        showToast('Iltimos, ism va telefon raqamingizni kiriting!', 'fa-exclamation-triangle');
        return;
      }

      let totalSum = 0;
      let orderLinesText = "";
      
      cart.forEach(item => {
        const dish = MENU_DATA.find(d => d.id === item.id);
        const lineTotal = dish ? dish.price * item.quantity : 0;
        totalSum += lineTotal;
        let dName = dish ? dish.name : '';
        orderLinesText += "• " + dName + " x " + item.quantity + " = " + formatPrice(lineTotal) + "\n";
      });

      const orderId = 'IQB-' + Math.floor(100000 + Math.random() * 900000);
      
      let deliveryText = "Restoranda (Stol: " + (table ? table : "Tanlanmagan") + ")";
      if (orderType === 'delivery') {
        deliveryText = "Yetkazib berish (Manzil: " + (address ? address : "Ko'rsatilmagan") + ")";
      }

      showToast("Buyurtma yuborilmoqda...", 'fa-spinner');
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const TELEGRAM_BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
      const TELEGRAM_CHAT_ID = '7225335915'; 
      
      let finalTgText = "📦 *YANGI TAOM BUYURTMASI!* (#" + orderId + ")\n\n" +
                        "👤 Mijoz: " + name + "\n" +
                        "📞 Tel: " + phone + "\n" +
                        "📍 " + deliveryText + "\n\n" +
                        "🛒 *Buyurtmalar:*\n" + orderLinesText + "\n" +
                        "💰 *Jami: " + formatPrice(totalSum) + "*\n" +
                        "📝 Izoh: " + (note ? note : "Yo'q");
      
      try {
        await fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: finalTgText, parse_mode: 'Markdown' })
        });
      } catch (e) {
        console.log("Telegram xatolik:", e);
      }

      window.closeCheckout();
      
      let finalDetails = "Yetkazish turi: " + deliveryText + "\nJami summa: " + formatPrice(totalSum) + "\n\nTaomlar:\n" + orderLinesText;
      let tgShareLink = "https://t.me/hydrotoxic?text=" + encodeURIComponent("Buyurtma #" + orderId + "\nMijoz: " + name + "\nTel: " + phone + "\n" + deliveryText + "\nJami: " + formatPrice(totalSum) + "\n\n" + orderLinesText);

      showSuccessModal({
        title: 'Buyurtmangiz qabul qilindi!',
        subtitle: 'Buyurtma raqami: #' + orderId,
        message: 'Hurmatli ' + name + ', buyurtmangiz tez orada tayyorlanadi. Bizning operatorimiz tasdiqlash uchun ' + phone + ' raqamingizga qo\'ng\'iroq qiladi.',
        details: finalDetails,
        telegramLink: tgShareLink
      });

      cart = [];
      saveCart();
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  /* ==========================================================================
     9. TABLE RESERVATION SYSTEM (FAQAT TELEGRAM BOT ORQALI)
     ========================================================================== */
  
  const TELEGRAM_BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
  const TELEGRAM_CHAT_ID = '7225335915'; 

  const reservationForm = document.getElementById('reservationForm');

  if (reservationForm) {
    const resDateInput = document.getElementById('resDate');
    const resTimeSelect = document.getElementById('resTime');
    const tableTypeSelect = document.getElementById('resTableType');
    const tableNumberSelect = document.getElementById('resTableNumber');

    if (resDateInput) {
      const today = new Date().toISOString().split('T')[0];
      resDateInput.min = today;
      resDateInput.value = today;
    }

    function updateTablesList() {
      if (!tableTypeSelect || !tableNumberSelect) return;
      const type = tableTypeSelect.value;
      
      let max = 0;
      let label = 'Stol';

      switch (type) {
        case 'asosiy-zal': max = 35; label = 'Stol'; break;
        case 'zal-2': max = 8; label = 'Stol'; break;
        case 'vip': max = 9; label = 'Kabina'; break;
        case 'tashqi': max = 40; label = 'Joy'; break;
        default: max = 10; label = 'Stol';
      }

      tableNumberSelect.innerHTML = '';
      for (let i = 1; i <= max; i++) {
        const opt = document.createElement('option');
        opt.value = label + ' #' + i;
        opt.textContent = label + ' #' + i;
        tableNumberSelect.appendChild(opt);
      }
    }

    if (tableTypeSelect) tableTypeSelect.addEventListener('change', updateTablesList);
    updateTablesList();

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
        showToast("Iltimos, barcha majburiy maydonlarni to'ldiring!", 'fa-exclamation-triangle');
        return;
      }

      let tableTypeName = '';
      switch (tableType) {
        case 'asosiy-zal': tableTypeName = 'Asosiy zal'; break;
        case 'zal-2': tableTypeName = '2-zal'; break;
        case 'vip': tableTypeName = 'VIP kabina'; break;
        case 'tashqi': tableTypeName = "Ko'cha / Tashqi ayvon"; break;
        default: tableTypeName = tableType;
      }

      showToast('Buyurtma yuborilmoqda...', 'fa-spinner');
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;

      const bookingCode = 'STOL-' + Math.floor(1000 + Math.random() * 9000);

      let messageContent = "🛎 *YANGI STOL BAND QILINDI!* (#" + bookingCode + ")\n\n" +
                           "👤 Mijoz: " + name + "\n" +
                           "📞 Tel: " + phone + "\n" +
                           "📅 Sana: " + date + "\n" +
                           "⏰ Vaqt: " + time + "\n" +
                           "👥 Mehmonlar: " + guests + "\n" +
                           "📍 Zal: " + tableTypeName + "\n" +
                           "🪑 Joy: " + tableNumber + "\n" +
                           "📝 Izoh: " + (notes ? notes : "Yo'q");

      const url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage";
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageContent,
            parse_mode: 'Markdown'
          })
        });

        const result = await response.json();

        if (result.ok) {
          let detailsText = "Mehmonlar: " + guests + "\nJoy turi: " + tableTypeName + "\nStol: " + tableNumber + "\nTelefon: " + phone;
          if (notes) {
            detailsText += "\nIstaklar: " + notes;
          }

         

          showSuccessModal({
            title: 'Stol muvaffaqiyatli band qilindi!',
            subtitle: 'Kod: #' + bookingCode,
            message: 'Hurmatli ' + name + ', buyurtmangiz ro\'yxatga olindi. ' + date + ' kuni soat ' + time + ' da sizni IQBOL restoranida kutamiz!',
            details: detailsText,
          });
          reservationForm.reset();
          updateTablesList();
        } else {
          console.error(result);
          showToast("Xatolik: Botga xabar bormadi.", 'fa-exclamation-triangle');
        }
      } catch (err) {
        console.error(err);
        showToast("Tarmoq xatosi yuz berdi. Qayta urinib ko'ring.", 'fa-exclamation-triangle');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================================================
     10. SUCCESS MODAL
     ========================================================================== */
  const successModal = document.getElementById('successModal');

  function showSuccessModal(data) {
    if (!successModal) return;

    document.getElementById('successTitle').textContent = data.title;
    document.getElementById('successSubtitle').textContent = data.subtitle;
    document.getElementById('successMessage').textContent = data.message;
    document.getElementById('successDetails').textContent = data.details;
    
    const tgBtn = document.getElementById('successTelegramBtn');
    if (tgBtn && data.telegramLink) {
      tgBtn.href = data.telegramLink;
    }

    successModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.closeSuccessModal = function() {
    if (successModal) {
      successModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  /* ==========================================================================
     11. GALLERY & LIGHTBOX
     ========================================================================== */
  const GALLERY_IMAGES = [
    { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', caption: 'Qarshi uslubidagi afsonaviy Tandir go\'shti', category: 'taomlar', featured: true },
    { url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop', caption: 'Cho\'g\'da pishirilgan barra qo\'y shashliklari', category: 'shashlik', featured: false },
    { url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200&auto=format&fit=crop', caption: 'Qo\'lda cho\'zilgan qovurma uyg\'ur lag\'moni', category: 'taomlar', featured: false },
    { url: 'https://images.unsplash.com/photo-1592417817098-8f3d691029c0?q=80&w=1200&auto=format&fit=crop', caption: 'Sarxil Yulduz pomidoridan shakarob va yangi salatlar', category: 'salatlar', featured: false },
    { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', caption: 'IQBOL restoranining shinam va hashamatli oilaviy zallari', category: 'restoran', featured: true },
    { url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop', caption: 'Muzdek xushbo\'y mevali kivi moxito va tarxunlar', category: 'ichimliklar', featured: false },
    { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop', caption: 'Kechki shinam muhit va mehmondo\'st xizmat', category: 'restoran', featured: false },
    { url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop', caption: 'Tandirdan uzilgan qatlama issiq somsalar', category: 'taomlar', featured: false }
  ];

  let currentGalleryCategory = 'all';
  let activeLightboxIndex = 0;
  let activeGalleryItems = [];

  const galleryGrid = document.getElementById('galleryGrid');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function renderGallery() {
    if (!galleryGrid) return;
    activeGalleryItems = currentGalleryCategory === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === currentGalleryCategory);
    
    let htmlGallery = '';
    activeGalleryItems.forEach((item, index) => {
      let featClass = item.featured ? 'featured' : '';
      htmlGallery += '<div class="gallery-item ' + featClass + '" onclick="window.openLightbox(' + index + ')">' +
        '<img src="' + item.url + '" alt="' + item.caption + '" loading="lazy" />' +
        '<div class="gallery-overlay">' +
          '<span class="gallery-tag">' + item.category + '</span>' +
          '<h4 class="gallery-caption">' + item.caption + '</h4>' +
        '</div>' +
      '</div>';
    });
    galleryGrid.innerHTML = htmlGallery;
  }

  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGalleryCategory = btn.dataset.category;
      renderGallery();
    });
  });

  window.openLightbox = function(index) {
    activeLightboxIndex = index;
    const item = activeGalleryItems[activeLightboxIndex];
    if (!item || !lightboxModal) return;
    lightboxImg.src = item.url;
    lightboxImg.alt = item.caption;
    lightboxCaption.textContent = item.caption;
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.changeLightbox = function(step) {
    activeLightboxIndex += step;
    if (activeLightboxIndex < 0) activeLightboxIndex = activeGalleryItems.length - 1;
    if (activeLightboxIndex >= activeGalleryItems.length) activeLightboxIndex = 0;
    const item = activeGalleryItems[activeLightboxIndex];
    if (item) {
      lightboxImg.src = item.url;
      lightboxCaption.textContent = item.caption;
    }
  };

  /* ==========================================================================
     12. THEME TOGGLE (DARK / LIGHT MODE)
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
     13. NAVIGATION & SCROLL EVENTS
     ========================================================================== */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollY > 400) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSectionId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.add('open');
      mobileNavOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  window.closeMobileNav = function() {
    if (mobileNavDrawer && mobileNavOverlay) {
      mobileNavDrawer.classList.remove('open');
      mobileNavOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeDishModal();
      window.closeCart();
      window.closeCheckout();
      window.closeSuccessModal();
      window.closeLightbox();
      window.closeMobileNav();
    }
    if (lightboxModal && lightboxModal.classList.contains('open')) {
      if (e.key === 'ArrowRight') window.changeLightbox(1);
      if (e.key === 'ArrowLeft') window.changeLightbox(-1);
    }
  });

  /* ==========================================================================
     14. INITIALIZE
     ========================================================================== */
  renderMenu();
  renderGallery();
  updateCartUI();
});