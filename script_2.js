/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT (TO'LIQ YANGILANGAN BAZA, GALEREYA VA AVTO-VIDEO)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MENU DATABASE (BARCHA HAQIQIY RASM URL VA TAOMLAR)
     ========================================================================== */
  const MENU_DATA = [
    // --- BIRINCHI TAOMLAR ---
    { id: 'bt-1', name: 'Тушёка (хашлама)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 40000, portion: '1 porsiya', desc: 'Mazali va to\'yimli tushonka (xashlama) sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1566_JFVMaw1_OiyJoRv.jpg', tags: ['Issiq taom'], popular: true },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'An\'anaviy o\'zbekcha guruchli mastava sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1514_ZlX2FhI.jpg', tags: ['Milliy'], popular: true },
    { id: 'bt-3', name: 'Борш', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'Klassik qizil borsh sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1515_XhkBdxt_s4FDJwk.jpg', tags: ['Sho\'rva'], popular: false },
    { id: 'bt-4', name: 'Шўрва (мол гўшт)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan mazali sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1549_m8tgXEs.jpg', tags: ['Mol go\'shti'], popular: false },
    { id: 'bt-5', name: 'Тифтел', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Tiftel solingan to\'yimli birinchi taom.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1550_zst6bIR_QraUR3a.jpg', tags: ['Teftel'], popular: false },

    // --- IKKINCHI TAOMLAR ---
    { id: 'it-1', name: 'Мушак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 210000, portion: '1 porsiya', desc: 'Maxsus usulda pishirilgan mushak jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1588_vqt1uS2.jpg', tags: ['Jiz'], popular: true },
    { id: 'it-2', name: 'Олот сомса', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 10000, portion: '1 dona', desc: 'Haqiqiy mazali Olot somsasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1613.jpg', tags: ['Samsa'], popular: true },
    { id: 'it-3', name: 'Умакай жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 porsiya', desc: 'Umakai jiz tansiq taomi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1611_IZss6f5.jpg', tags: ['Jiz'], popular: true },
    { id: 'it-4', name: 'Тандыр', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 300000, portion: '1 kg', desc: 'Haqiqiy tandirda pishirilgan xushbo\'y go\'sht.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1559_ivfhlk7_b4QiKZs_1xvVAnx_91qKrDo_7q493Pq_BSjYFYO.jpg', tags: ['Tandir', '1 kg'], popular: true },
    { id: 'it-5', name: 'Жареные крылышки', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 80000, portion: '1 kg', desc: 'Qarsildoq qovurilgan tovuq qanotchalari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1562_evu0zuO.jpg', tags: ['Tovuq'], popular: false },
    { id: 'it-6', name: 'Фири', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 25000, portion: '1 porsiya', desc: 'Qarsildoq fri kartoshkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1525.jpg', tags: ['Fri'], popular: false },
    { id: 'it-7', name: 'Хасиб мол гўшти', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 170000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan hasib.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1565_yA2Dqxy_zJlUJ12.jpg', tags: ['Hasib'], popular: false },
    { id: 'it-8', name: 'Манчури', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 220000, portion: '1 kg', desc: 'Manchuri uslubidagi go\'shtli taom.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1571_K8pdRQY.jpg', tags: ['Manchuri', '1 kg'], popular: false },
    { id: 'it-9', name: 'Бўйрак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Buyrakdan tayyorlangan maxsus jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1564_5lGoSMd.jpg', tags: ['Buyrak', '1 kg'], popular: false },
    { id: 'it-10', name: 'Қизилча', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 250000, portion: '1 kg', desc: 'Maxsus qizilcha taomi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1567_t8AkDY3_FRhAnBK.jpg', tags: ['1 kg'], popular: false },
    { id: 'it-11', name: 'Уйгурча жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Uyg\'ur uslubidagi mazali jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1570_M6SWgAY_nrvaBzI.jpg', tags: ['Uyg\'ur', '1 kg'], popular: true },
    { id: 'it-12', name: 'Манти', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 7000, portion: '1 dona', desc: 'Bug\'da pishirilgan shirador manti.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1526.jpg', tags: ['Manti'], popular: true },
    { id: 'qt-1', name: 'Хрустящий баклажан', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 62000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan baqlajon.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1555.jpg', tags: ['Hit', 'Baqlajon'], popular: true },

    // --- SALATLAR ---
    { id: 'sal-1', name: 'Свежий', category: 'salatlar', categoryName: 'Salatlar', price: 18000, portion: '1 porsiya', desc: 'Pomidor va bodringdan yig\'ilgan yangi salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1529_Enmxvpq.jpg', tags: ['Yengil'], popular: false },
    { id: 'sal-2', name: 'Шакароб', category: 'salatlar', categoryName: 'Salatlar', price: 19000, portion: '1 porsiya', desc: 'An\'anaviy piyoz va pomidor shakarobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1530_bt4dHZM.jpg', tags: ['Milliy'], popular: true },
    { id: 'sal-3', name: 'Иқбол', category: 'salatlar', categoryName: 'Salatlar', price: 53000, portion: '1 porsiya', desc: 'Restoranning maxsus firma salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1518_emfhioR.jpg', tags: ['Firma'], popular: true },
    { id: 'sal-4', name: 'Цезарь', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Klassik sezar salati krevetka/tovuq bilan.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1520.jpg', tags: ['Sezar'], popular: true },
    { id: 'sal-5', name: 'Фруктовый', category: 'salatlar', categoryName: 'Salatlar', price: 47000, portion: '1 porsiya', desc: 'Vitaminli mevali salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1523.jpg', tags: ['Mevali'], popular: false },
    { id: 'sal-6', name: 'Мужской каприз', category: 'salatlar', categoryName: 'Salatlar', price: 49000, portion: '1 porsiya', desc: 'To\'yimli go\'shtli salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1524_uFqW9ec.jpg', tags: ['To\'yimli'], popular: true },
    { id: 'sal-7', name: 'Греческий', category: 'salatlar', categoryName: 'Salatlar', price: 54000, portion: '1 porsiya', desc: 'Feta pishlog\'i qo\'shilgan yunoncha salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1557.jpg', tags: ['Gretskiy'], popular: true },
    { id: 'sal-8', name: 'Под водочку', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Maxsus zakuska salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1522.jpg', tags: ['Zakuska'], popular: false },
    { id: 'sal-9', name: 'Японский', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'Yaponcha uslubdagi salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1527.jpg', tags: ['Yapon'], popular: false },
    { id: 'sal-10', name: 'Французский', category: 'salatlar', categoryName: 'Salatlar', price: 48000, portion: '1 porsiya', desc: 'Fransuzcha nafis salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1548_W2vkC83.jpg', tags: ['Fransuz'], popular: false },

    // --- ICHIMLIKLAR & MOXITO ---
    { id: 'ich-1', name: 'Сок DENA', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 18000, portion: '1 litr', desc: 'Tabiiy DENA meva sharbati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1590.jpg', tags: ['Sharbat'], popular: false },
    { id: 'ich-2', name: 'KARLOVY VARY', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: 'Shifobaxsh mineral suv.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1587_j9z8Wv3_zGxwjgk.jpg', tags: ['Mineral suv'], popular: false },
    { id: 'ich-3', name: 'Черноголовка', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 14000, portion: '1 litr', desc: 'Mazali Tarxun / limonad.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1593_rJiNON9.jpg', tags: ['Limonad'], popular: false },
    { id: 'ich-4', name: 'BLANC BLUE', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '1 litr', desc: 'Blanc Blue limonad.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1596_DqDuOH0.jpg', tags: ['Limonad'], popular: false },
    { id: 'ich-5', name: 'RED BULL energy drink', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 20000, portion: '0.25 litr', desc: 'Red Bull energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1592_1iwuHz7.jpg', tags: ['Energetik'], popular: true },
    { id: 'ich-6', name: 'Sayhun', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 5000, portion: '1 litr', desc: 'Toza ichimlik suvi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1591_lxwiL7V.jpg', tags: ['Suv'], popular: false },
    { id: 'ich-7', name: 'GORILLA energy drink', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '0.5 litr', desc: 'Gorilla energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1600_3CtcD64.jpg', tags: ['Energetik'], popular: false },
    { id: 'ich-8', name: 'Аш-ТАУ', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 17000, portion: '0.45 litr', desc: 'Ash-Tau mineral suvi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1598_Bt0R3UE.jpg', tags: ['Mineral suv'], popular: false },
    { id: 'ich-9', name: 'Adrenaline Rush', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '0.5 litr', desc: 'Adrenaline Rush energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1599_Z7szmMV.jpg', tags: ['Energetik'], popular: false },
    { id: 'ich-10', name: 'Fanta', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: 'Apelsin ta\'mli Fanta.', image: 'https://admin.easymenu.uz/media/menu/items/Screenshot_20260316_111839_Google.jpg', tags: ['Gazli'], popular: false },
    { id: 'ich-11', name: 'Coca cola', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: 'Klassik Coca-cola.', image: 'https://admin.easymenu.uz/media/menu/items/Screenshot_20260316_111747_Chrome.jpg', tags: ['Gazli'], popular: true },
    { id: 'ich-12', name: 'Мохито киви', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 50000, portion: '1 litr', desc: 'Muzdek tetiklantiruvchi kivi moxitosi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1573.jpg', tags: ['Moxito'], popular: true },
    { id: 'ich-13', name: 'Мохито Классический', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 65000, portion: '1 litr', desc: 'Klassik moxito grafin.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1554.jpg', tags: ['Moxito'], popular: true },
    { id: 'ich-14', name: 'Тархун', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 litr', desc: 'Xushbo\'y tarxun moxitosi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1534.jpg', tags: ['Moxito'], popular: false },
    { id: 'ich-15', name: 'Манго-Маракуя', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 65000, portion: '1 litr', desc: 'Egzotik mango-marakuya moxitosi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1533.jpg', tags: ['Moxito'], popular: true },
    { id: 'ich-16', name: 'Мохито клубничный', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 litr', desc: 'Qulupnayli shirin moxito.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1535.jpg', tags: ['Moxito'], popular: false },

    // --- DESERTLAR ---
    { id: 'des-1', name: 'San sebastian', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 dona', desc: 'Ispancha shokoladli/karamelli San-Sebastyan cheyzkeyki.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1608.jpg', tags: ['Desert'], popular: true },
    { id: 'des-2', name: 'Yagodniy opera', category: 'gazli', categoryName: 'Desertlar', price: 50000, portion: '1 dona', desc: 'Mevali nafis opera torti bo\'lagi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1609.jpg', tags: ['Desert'], popular: false },
    { id: 'des-3', name: 'Орешки safia', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 quti', desc: 'Qaynatma shokoladli safia yong\'oqlari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1605.jpg', tags: ['Shirinlik'], popular: true },
    { id: 'des-4', name: 'MILLENNIUM air bubble', category: 'gazli', categoryName: 'Desertlar', price: 20000, portion: '1 dona', desc: 'G\'ovakli shokolad plitkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1603.jpg', tags: ['Shokolad'], popular: false },

    // --- SHASHLIK & ASSORTI ---
    { id: 'sh-1', name: 'Жигар шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Jigar va dumbadan tayyorlangan shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1625_KrM9pRk.jpg', tags: ['Jigar'], popular: true },
    { id: 'sh-2', name: 'Товуқ кавказ', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 28000, portion: '1 porsiya', desc: 'Tovuq go\'shtidan Kavkazcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1623_fszUNpw.jpg', tags: ['Tovuq'], popular: false },
    { id: 'sh-3', name: 'Нон шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 5000, portion: '1 dona', desc: 'Ko\'mirda pishirilgan mazali non shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1622_gb9FC5R_HfLbXcj_KNOk2b7.jpg', tags: ['Non'], popular: false },
    { id: 'sh-4', name: 'Кавказ кусковой (қўй гўшти)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 85000, portion: '1 porsiya', desc: 'Qo\'y go\'shtidan Kavkazcha parcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1629.jpg', tags: ['Qo\'y go\'shti'], popular: true },
    { id: 'sh-5', name: 'Кусковой (мол гўшти)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 79000, portion: '1 porsiya', desc: 'Mol go\'shtidan lahm parcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1633.jpg', tags: ['Mol go\'shti'], popular: true },
    { id: 'sh-6', name: 'Шашлик гиждуван', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 68000, portion: '1 porsiya', desc: 'An\'anaviy G\'ijduvon qiyma shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1626_RMYLZ0j_sCMPDEC.jpg', tags: ['G\'ijduvon'], popular: true },
    { id: 'sh-7', name: 'Гиждуван Кавказ', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 dona', desc: 'Maxsus G\'ijduvon-Kavkaz kabobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1631.jpg', tags: ['Kabob'], popular: false },
    { id: 'sh-8', name: 'Сосиска сладкий', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Shirin sasiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1545_GKuqMgp.jpg', tags: ['Sasiska'], popular: false },
    { id: 'sh-9', name: 'Сосиска острый', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Achchiq sasiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1542.jpg', tags: ['Sasiska'], popular: false },
    { id: 'sh-10', name: 'Наполеон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 72000, portion: '1 porsiya', desc: 'Maxsus Napoleon kabobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1546_pEeqfr3.jpg', tags: ['Kabob'], popular: false },
    { id: 'sh-11', name: 'Помидор шашлык', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 20000, portion: '1 porsiya', desc: 'Ko\'mirda pishirilgan pomidor shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1540_gbbl3GL_dL6Bmkm_FAvbp8N.jpg', tags: ['Pomidor'], popular: false },
    { id: 'sh-12', name: 'Думба', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Dumba yog\'idan tayyorlangan shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1544_9UVbHU1_x6uvel1_4Vitamw_Bg6I9sS.jpg', tags: ['Dumba'], popular: false }
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
  const categoryTabs = document.querySelectorAll('.menu-categories-tabs .cat-tab-btn');
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
     4. CHECKOUT & TELEGRAM (OVQAT BUYURTMASI)
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
            opt.textContent = makeStrikethrough(optionValue) + " (BAND)";
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
     6. SUCCESS MODAL & THEME
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
      window.closeDishModal(); window.closeCart(); window.closeCheckout(); window.closeSuccessModal(); window.closeMobileNav(); window.closeLightbox();
    }
  });

  /* ==========================================================================
     7. GALLERY VA VIDEONI MAJBURIY YOQISH
     ========================================================================== */
  const GALLERY_IMAGES = [
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1559_ivfhlk7_b4QiKZs_1xvVAnx_91qKrDo_7q493Pq_BSjYFYO.jpg', caption: 'Tandir go\'shti', category: 'taomlar', featured: true },
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1629.jpg', caption: 'Kavkaz shashlik', category: 'shashlik', featured: false },
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1570_M6SWgAY_nrvaBzI.jpg', caption: 'Uyg\'urcha jiz', category: 'taomlar', featured: false },
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1518_emfhioR.jpg', caption: 'Iqbol firma salati', category: 'salatlar', featured: false },
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1626_RMYLZ0j_sCMPDEC.jpg', caption: 'G\'ijduvon kabob', category: 'shashlik', featured: false },
    { url: 'https://admin.easymenu.uz/media/menu/items/IMG_1573.jpg', caption: 'Muzdek Moxito', category: 'ichimliklar', featured: false }
  ];

  let currentGalleryCategory = 'all'; let activeLightboxIndex = 0; let activeGalleryItems = [];
  const galleryGrid = document.getElementById('galleryGrid');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function renderGallery() {
    if (!galleryGrid) return;
    activeGalleryItems = currentGalleryCategory === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === currentGalleryCategory);
    galleryGrid.innerHTML = activeGalleryItems.map((item, index) => `
      <div class="gallery-item ${item.featured ? 'featured' : ''}" onclick="window.openLightbox(${index})">
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.category}</span>
          <h4 class="gallery-caption">${item.caption}</h4>
        </div>
      </div>
    `).join('');
  }

  document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.remove('active'));
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
    if (item) { lightboxImg.src = item.url; lightboxCaption.textContent = item.caption; }
  };

  // Orqa fondagi videoni majburan o'ynatish
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(err => console.log("Video avto-yonish xatosi:", err));
  }

  renderMenu();
  updateCartUI();
  renderGallery();
});