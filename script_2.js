/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT
 * (60 TA TAOM + 9 TA GALEREYA RASMI + UZ/RU/EN + CLICK / PAYME / PAYNET ILOVA VA SAYT BILAN)
 */

document.addEventListener('DOMContentLoaded', () => {
  // RESTORAN KARTA RAQAMI
  const RESTAURANT_CARD = '9860 1701 1569 3682';
  const RESTAURANT_CARD_RAW = '9860170115693682';

  // TO'LOV ILOVALARI VA SAYTLARI KONFIGURATSIYASI
  const PAYMENT_PROVIDERS = {
    Click: {
      name: 'CLICK',
      color: '#0099ff',
      textColor: '#ffffff',
      webUrl: 'https://my.click.uz/',
      appScheme: 'clickup://',
      androidIntent: 'intent://#Intent;scheme=clickup;package=air.com.ssdsoftwaresolutions.clickuz;S.browser_fallback_url=https%3A%2F%2Fmy.click.uz%2F;end'
    },
    Payme: {
      name: 'Payme',
      color: '#00cccc',
      textColor: '#112219',
      webUrl: 'https://payme.uz/',
      appScheme: 'payme://',
      androidIntent: 'intent://#Intent;scheme=payme;package=uz.dida.payme;S.browser_fallback_url=https%3A%2F%2Fpayme.uz%2F;end'
    },
    Paynet: {
      name: 'Paynet',
      color: '#00a651',
      textColor: '#ffffff',
      webUrl: 'https://paynet.uz/',
      appScheme: 'paynet://',
      androidIntent: 'intent://#Intent;scheme=paynet;package=uz.paynet.app;S.browser_fallback_url=https%3A%2F%2Fpaynet.uz%2F;end'
    }
  };

  /* ==========================================================================
     0. AVTOMATIK CSS VA HTML ELEMENTLARNI QO'SHISH (UZ/RU/EN + CLICK/PAYME/PAYNET)
     ========================================================================== */
  const customStyle = document.createElement('style');
  customStyle.textContent = `
    .lang-switcher {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      padding: 3px;
      gap: 2px;
    }
    .header.scrolled .lang-switcher {
      background: var(--bg-card);
      border-color: var(--border-color);
    }
    .lang-btn {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 5px 9px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .header.scrolled .lang-btn {
      color: var(--text-main);
    }
    .lang-btn.active {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #112219 !important;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.35);
    }
    .payment-methods-box {
      margin: 0.5rem 0;
      padding: 1rem;
      border-radius: 12px;
      background: var(--bg-card);
      border: 1px solid var(--border-gold);
    }
    .payment-methods-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.65rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .payment-methods-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
    .pay-option-btn {
      padding: 0.65rem 0.5rem;
      border-radius: 8px;
      border: 1.5px solid var(--border-color);
      background: var(--bg-surface);
      color: var(--text-main);
      font-weight: 700;
      font-size: 0.82rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .pay-option-btn.active[data-pay="Naqd"] {
      border-color: var(--accent-gold);
      background: rgba(212, 175, 55, 0.15);
      color: var(--accent-gold);
    }
    .pay-option-btn.active[data-pay="Click"] {
      border-color: #0099ff;
      background: #0099ff;
      color: #ffffff;
    }
    .pay-option-btn.active[data-pay="Payme"] {
      border-color: #00cccc;
      background: #00cccc;
      color: #112219;
    }
    .pay-option-btn.active[data-pay="Paynet"] {
      border-color: #00a651;
      background: #00a651;
      color: #ffffff;
    }
    .card-Display-box {
      margin-top: 0.85rem;
      padding: 0.85rem;
      border-radius: 10px;
      background: var(--bg-surface);
      border: 1.5px dashed var(--accent-gold);
      display: none;
      flex-direction: column;
      gap: 0.6rem;
      text-align: center;
    }
    .card-Display-box.visible {
      display: flex;
    }
    .card-number-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-card);
      padding: 0.55rem 0.85rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }
    .card-number-val {
      font-family: monospace;
      font-size: 1.05rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--accent-gold);
    }
    .btn-copy-card {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #112219;
      border: none;
      border-radius: 6px;
      padding: 0.35rem 0.65rem;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
    }
    .quick-pay-links {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    .quick-pay-btn {
      padding: 0.55rem 0.5rem;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      cursor: pointer;
      border: none;
      text-decoration: none;
      transition: transform 0.15s ease;
    }
    .quick-pay-btn:hover {
      transform: translateY(-1px);
    }
    @media (max-width: 576px) {
      .lang-btn { padding: 4px 6px; font-size: 0.68rem; }
      .card-number-val { font-size: 0.92rem; }
    }
  `;
  document.head.appendChild(customStyle);

  // Header ichiga UZ | RU | EN tugmalarini joylash
  const headerActions = document.querySelector('.header-actions');
  if (headerActions && !document.querySelector('.lang-switcher')) {
    const langDiv = document.createElement('div');
    langDiv.className = 'lang-switcher';
    langDiv.innerHTML = `
      <button type="button" class="lang-btn active" data-lang="uz">UZ</button>
      <button type="button" class="lang-btn" data-lang="ru">RU</button>
      <button type="button" class="lang-btn" data-lang="en">EN</button>
    `;
    headerActions.insertBefore(langDiv, headerActions.firstChild);
  }

  // Karta raqamini nusxalash funksiyasi
  window.copyRestaurantCard = function() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(RESTAURANT_CARD_RAW).catch(() => {});
    }
    const msg = currentLang === 'ru'
      ? `Карта скопирована: ${RESTAURANT_CARD}`
      : currentLang === 'en'
      ? `Card copied: ${RESTAURANT_CARD}`
      : `Karta raqami nusxalandi: ${RESTAURANT_CARD}`;
    showToast(msg, 'fa-copy');
  };

  // Click, Payme yoki Paynet ilovasini (yoki saytini) ochish funksiyasi
  window.openPaymentDestination = function(providerKey, mode = 'auto') {
    const prov = PAYMENT_PROVIDERS[providerKey];
    if (!prov) return;

    // Avval karta raqamni avtomatik xotiraga nusxalaymiz
    window.copyRestaurantCard();

    if (mode === 'web') {
      window.open(prov.webUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      // Androidda ilovani ochadi, agar ilova yo'q bo'lsa avtomatik saytiga o'tadi
      window.location.href = prov.androidIntent;
    } else if (isIOS) {
      // iPhone'da ilovani ochishga urinadi, 1.5 sekundda ochilmasa saytini ochadi
      window.location.href = prov.appScheme;
      setTimeout(() => {
        if (!document.hidden) {
          window.open(prov.webUrl, '_blank', 'noopener,noreferrer');
        }
      }, 1500);
    } else {
      // Kompyuterda to'g'ridan-to'g'ri rasmiy saytini yangi oynada ochadi
      window.open(prov.webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  /* ==========================================================================
     1. MENU DATABASE (BARCHA TAOMLAR VA TO'G'RILANGAN SALATLAR)
     ========================================================================== */
  const MENU_DATA = [
    // --- BIRINCHI TAOMLAR ---
    { id: 'bt-1', name: 'Тушёнка (хашлама)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 40000, portion: '1 porsiya', desc: 'Mazali va to\'yimli tushonka (xashlama) sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1566_JFVMaw1_OiyJoRv.jpg', tags: ['Issiq taom'], popular: true },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'An\'anaviy o\'zbekcha guruchli mastava sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1514_ZlX2FhI.jpg', tags: ['Milliy'], popular: true },
    { id: 'bt-3', name: 'Борщ', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'Klassik qizil borsh sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1515_XhkBdxt_s4FDJwk.jpg', tags: ['Sho\'rva'], popular: false },
    { id: 'bt-4', name: 'Шўрва (мол гўшт)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan mazali sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1549_m8tgXEs.jpg', tags: ['Mol go\'shti'], popular: false },
    { id: 'bt-5', name: 'Тефтель шўрва', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Teftel solingan to\'yimli birinchi taom.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1550_zst6bIR_QraUR3a.jpg', tags: ['Teftel'], popular: false },

    // --- IKKINCHI TAOMLAR ---
    { id: 'it-1', name: 'Мушак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 210000, portion: '1 porsiya', desc: 'Maxsus usulda pishirilgan mushak jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1588_vqt1uS2.jpg', tags: ['Jiz'], popular: true },
    { id: 'it-2', name: 'Олот сомса', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 10000, portion: '1 dona', desc: 'Haqiqiy mazali Olot somsasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1613.jpg', tags: ['Samsa'], popular: true },
    { id: 'it-3', name: 'Умакай жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 porsiya', desc: 'Umakai jiz tansiq taomi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1611_IZss6f5.jpg', tags: ['Jiz'], popular: true },
    { id: 'it-4', name: 'Тандыр гўшт', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 300000, portion: '1 kg', desc: 'Haqiqiy tandirda pishirilgan xushbo\'y go\'sht.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1559_ivfhlk7_b4QiKZs_1xvVAnx_91qKrDo_7q493Pq_BSjYFYO.jpg', tags: ['Tandir', '1 kg'], popular: true },
    { id: 'it-5', name: 'Жареные крылышки', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 80000, portion: '1 kg', desc: 'Qarsildoq qovurilgan tovuq qanotchalari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1562_evu0zuO.jpg', tags: ['Tovuq'], popular: false },
    { id: 'it-6', name: 'Картошка фри', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 25000, portion: '1 porsiya', desc: 'Qarsildoq fri kartoshkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1525.jpg', tags: ['Fri'], popular: false },
    { id: 'it-7', name: 'Хасип мол гўшти', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 170000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan milliy hasip.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1565_yA2Dqxy_zJlUJ12.jpg', tags: ['Hasib'], popular: false },
    { id: 'it-8', name: 'Манчури', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 220000, portion: '1 kg', desc: 'Manchuri uslubidagi go\'shtli taom.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1571_K8pdRQY.jpg', tags: ['Manchuri', '1 kg'], popular: false },
    { id: 'it-9', name: 'Бўйрак жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Buyrakdan tayyorlangan maxsus jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1564_5lGoSMd.jpg', tags: ['Buyrak', '1 kg'], popular: false },
    { id: 'it-10', name: 'Қозонча (Қизилча)', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 250000, portion: '1 kg', desc: 'Maxsus qizilcha go\'shtli taomi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1567_t8AkDY3_FRhAnBK.jpg', tags: ['1 kg'], popular: false },
    { id: 'it-11', name: 'Уйғурча жиз', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Uyg\'ur uslubidagi mazali jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1570_M6SWgAY_nrvaBzI.jpg', tags: ['Uyg\'ur', '1 kg'], popular: true },
    { id: 'it-12', name: 'Манти', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 7000, portion: '1 dona', desc: 'Bug\'da pishirilgan shirador manti.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1526.jpg', tags: ['Manti'], popular: true },

    // --- SHASHLIK & ASSORTI ---
    { id: 'sh-1', name: 'Жигар шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Jigar va dumbadan tayyorlangan shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1631.jpg', tags: ['Jigar'], popular: true },
    { id: 'sh-2', name: 'Товуқ кавказ', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 28000, portion: '1 porsiya', desc: 'Tovuq go\'shtidan Kavkazcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1545_GKuqMgp.jpg', tags: ['Tovuq'], popular: false },
    { id: 'sh-3', name: 'Нон шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 5000, portion: '1 dona', desc: 'Ko\'mirda pishirilgan mazali non va dumba shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1542.jpg', tags: ['Non'], popular: false },
    { id: 'sh-4', name: 'Кавказ кусковой (қўй гўшти)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 85000, portion: '1 porsiya', desc: 'Qo\'y go\'shtidan Kavkazcha parcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1546_pEeqfr3.jpg', tags: ['Qo\'y go\'shti'], popular: true },
    { id: 'sh-5', name: 'Кусковой (мол гўшти)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 79000, portion: '1 porsiya', desc: 'Mol go\'shtidan lahm va dumba parcha shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1540_gbbl3GL_dL6Bmkm_FAvbp8N.jpg', tags: ['Mol go\'shti'], popular: true },
    { id: 'sh-6', name: 'Шашлик Ғиждувон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 68000, portion: '1 porsiya', desc: 'An\'anaviy G\'ijduvon qiyma shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1544_9UVbHU1_x6uvel1_4Vitamw_Bg6I9sS.jpg', tags: ['G\'ijduvon'], popular: true },
    { id: 'sh-7', name: 'Рулет шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 70000, portion: '1 porsiya', desc: 'Maxsus go\'shtli rulet kabobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1622_gb9FC5R_HfLbXcj_KNOk2b7.jpg', tags: ['Kabob'], popular: false },
    { id: 'sh-8', name: 'Сосиска сладкий', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Shirin sosiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1625_KrM9pRk.jpg', tags: ['Sosiska'], popular: false },
    { id: 'sh-9', name: 'Сосиска острый', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Achchiq sosiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1623_fszUNpw.jpg', tags: ['Sosiska'], popular: false },
    { id: 'sh-10', name: 'Наполеон', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 72000, portion: '1 porsiya', desc: 'Maxsus qatlamali Napoleon kabobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1626_RMYLZ0j_sCMPDEC.jpg', tags: ['Kabob'], popular: true },
    { id: 'sh-11', name: 'Помидор шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 20000, portion: '1 porsiya', desc: 'Ko\'mirda pishirilgan suvli pomidor shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1629.jpg', tags: ['Pomidor'], popular: false },
    { id: 'sh-12', name: 'Думба шашлик', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Saralangan dumba yog\'idan tayyorlangan shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1633.jpg', tags: ['Dumba'], popular: false },

    // --- SALATLAR (RASMLAR VA NOMLAR 100% MOSLASHTIRILDI) ---
    { id: 'qt-1', name: 'Хрустящий баклажан', category: 'salatlar', categoryName: 'Salatlar', price: 62000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan baqlajon, pomidor va maxsus sous.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1555.jpg', tags: ['Hit', 'Baqlajon'], popular: true },
    { id: 'sal-1', name: 'Свежий', category: 'salatlar', categoryName: 'Salatlar', price: 18000, portion: '1 porsiya', desc: 'Pomidor va bodringdan yig\'ilgan yangi salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1529_Enmxvpq.jpg', tags: ['Yengil'], popular: false },
    { id: 'sal-2', name: 'Шакароб', category: 'salatlar', categoryName: 'Salatlar', price: 19000, portion: '1 porsiya', desc: 'An\'anaviy piyoz va pomidor shakarobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1530_bt4dHZM.jpg', tags: ['Milliy'], popular: true },
    { id: 'sal-3', name: 'Иқбол', category: 'salatlar', categoryName: 'Salatlar', price: 53000, portion: '1 porsiya', desc: 'Restoranning maxsus firma salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1518_emfhioR.jpg', tags: ['Firma'], popular: true },
    { id: 'sal-4', name: 'Цезарь', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Klassik sezar salati krevetka/tovuq va parmezan pishlog\'i bilan.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1520.jpg', tags: ['Sezar'], popular: true },
    { id: 'sal-5', name: 'Фруктовый', category: 'salatlar', categoryName: 'Salatlar', price: 47000, portion: '1 porsiya', desc: 'Mavsumiy mevalardan vitaminli shirin salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1523.jpg', tags: ['Mevali'], popular: false },
    { id: 'sal-6', name: 'Мужской каприз', category: 'salatlar', categoryName: 'Salatlar', price: 49000, portion: '1 porsiya', desc: 'Go\'sht mahsulotlari va pishloqli to\'yimli salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1524_uFqW9ec.jpg', tags: ['To\'yimli'], popular: true },
    { id: 'sal-7', name: 'Греческий', category: 'salatlar', categoryName: 'Salatlar', price: 54000, portion: '1 porsiya', desc: 'Feta pishlog\'i, zaytun va sarxil sabzavotlardan yunoncha salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1557.jpg', tags: ['Gretskiy'], popular: true },
    { id: 'sal-8', name: 'Под водочку', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Maxsus ishtahaochar zakuska salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1522.jpg', tags: ['Zakuska'], popular: false },
    { id: 'sal-9', name: 'Японский', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'Maxsus sousda tayyorlangan yaponcha salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1527.jpg', tags: ['Yapon'], popular: false },
    { id: 'sal-10', name: 'Французский', category: 'salatlar', categoryName: 'Salatlar', price: 48000, portion: '1 porsiya', desc: 'Qarsildoq kartoshka va go\'shtli fransuzcha nafis salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1548_W2vkC83.jpg', tags: ['Fransuz'], popular: false },
    { id: 'sal-11', name: 'Смак', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: 'Pomidor, pishloq va qarsildoq suxariklar qo\'shilgan mazali Smak salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1521.jpg', tags: ['Smak'], popular: true },
    { id: 'sal-12', name: 'Свежий (қатиқли)', category: 'salatlar', categoryName: 'Salatlar', price: 19000, portion: '1 porsiya', desc: 'Qatiq va ko\'katlar qo\'shilgan sarxil pomidor-bodring salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1528_UMv33XI.jpg', tags: ['Qatiqli'], popular: false },
    { id: 'sal-13', name: 'Оливье', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'An\'anaviy va sevimli klassik Olivye salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1561.jpg', tags: ['Klassik'], popular: true },
    { id: 'sal-14', name: 'Свежий ассорти', category: 'salatlar', categoryName: 'Salatlar', price: 35000, portion: '1 porsiya', desc: 'Sarxil sabzavotlar va ko\'katlar to\'plami.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1552.jpg', tags: ['Assorti'], popular: false },
    { id: 'sal-15', name: 'Лимон', category: 'salatlar', categoryName: 'Salatlar', price: 6000, portion: '1 porsiya', desc: 'Yangi kesilgan xushbo\'y limon bo\'laklari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1531.jpg', tags: ['Limon'], popular: false },
    { id: 'sal-16', name: 'Чакки', category: 'salatlar', categoryName: 'Salatlar', price: 10000, portion: '1 porsiya', desc: 'Tabiiy va mazali suzma (chakki).', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1532.jpg', tags: ['Milliy'], popular: false },
    { id: 'sal-17', name: 'Чабан', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: 'Mayda to\'g\'ralgan sarxil sabzavotlar va ko\'katlardan tayyorlangan Chaban salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1517.jpg', tags: ['Yengil'], popular: false },
    { id: 'sal-18', name: 'Капризе', category: 'salatlar', categoryName: 'Salatlar', price: 68000, portion: '1 porsiya', desc: 'Pomidor, motsarella pishlog\'i, rukkola va pesto sousidan italyancha salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1569.jpg', tags: ['Premium'], popular: true },
    { id: 'sal-19', name: 'Сате', category: 'salatlar', categoryName: 'Salatlar', price: 45000, portion: '1 porsiya', desc: 'Maxsus retsept asosida rulet shaklida tayyorlangan Sate salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1578.jpg', tags: ['Maxsus'], popular: false },
    { id: 'sal-20', name: 'Тулум', category: 'salatlar', categoryName: 'Salatlar', price: 60000, portion: '1 porsiya', desc: 'Tulum pishlog\'i, makkajo\'xori, cherri pomidori va ko\'katlardan nafis salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1577.jpg', tags: ['Tulum'], popular: true },

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
    { id: 'des-4', name: 'MILLENNIUM air bubble', category: 'gazli', categoryName: 'Desertlar', price: 20000, portion: '1 dona', desc: 'G\'ovakli shokolad plitkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1603.jpg', tags: ['Shokolad'], popular: false }
  ];

  /* ==========================================================================
     1.1 KO'P TILLILIK LUG'ATI (UZ, RU, EN)
     ========================================================================== */
  let currentLang = localStorage.getItem('iqbol_lang') || 'uz';
  let selectedPaymentMethod = 'Naqd';

  const CATEGORY_TRANSLATIONS = {
    uz: {
      'Birinchi taomlar': 'Birinchi taomlar',
      'Ikkinchi taomlar': 'Ikkinchi taomlar',
      'Shashlik va assorti': 'Shashlik va assorti',
      'Salatlar': 'Salatlar',
      'Ichimliklar & Non': 'Ichimliklar & Non',
      'Desertlar': 'Desertlar'
    },
    ru: {
      'Birinchi taomlar': 'Первые блюда',
      'Ikkinchi taomlar': 'Вторые блюда',
      'Shashlik va assorti': 'Шашлыки и ассорти',
      'Salatlar': 'Салаты',
      'Ichimliklar & Non': 'Напитки и Хлеб',
      'Desertlar': 'Десерты'
    },
    en: {
      'Birinchi taomlar': 'First Courses',
      'Ikkinchi taomlar': 'Main Courses',
      'Shashlik va assorti': 'Shashlik & Grill',
      'Salatlar': 'Salads',
      'Ichimliklar & Non': 'Drinks & Bread',
      'Desertlar': 'Desserts'
    }
  };

  const PORTION_TRANSLATIONS = {
    uz: { '1 porsiya': '1 porsiya', '1 dona': '1 dona', '1 kg': '1 kg', '1 litr': '1 litr', '0.5 litr': '0.5 litr', '0.45 litr': '0.45 litr', '0.25 litr': '0.25 litr', '1 quti': '1 quti' },
    ru: { '1 porsiya': '1 порция', '1 dona': '1 шт', '1 kg': '1 кг', '1 litr': '1 литр', '0.5 litr': '0.5 литра', '0.45 litr': '0.45 литра', '0.25 litr': '0.25 литра', '1 quti': '1 коробка' },
    en: { '1 porsiya': '1 portion', '1 dona': '1 pc', '1 kg': '1 kg', '1 litr': '1 liter', '0.5 litr': '0.5 L', '0.45 litr': '0.45 L', '0.25 litr': '0.25 L', '1 quti': '1 box' }
  };

  const DISH_TRANSLATIONS = {
    'bt-1': { ru: ['Тушёнка (хашлама)', 'Вкусный и сытный суп тушенка (хашлама).'], en: ['Tushonka (Khashlama)', 'Delicious and hearty beef stew soup.'] },
    'bt-2': { ru: ['Мастава', 'Традиционный узбекский рисовый суп мастава.'], en: ['Mastava', 'Traditional Uzbek rice soup with tender meat.'] },
    'bt-3': { ru: ['Борщ', 'Классический красный борщ со свежей зеленью.'], en: ['Borscht', 'Classic red beetroot soup with beef.'] },
    'bt-4': { ru: ['Шурпа (говядина)', 'Ароматный суп шурпа из свежей говядины.'], en: ['Beef Shurpa', 'Rich and flavorful beef broth soup with vegetables.'] },
    'bt-5': { ru: ['Суп с тефтелями', 'Сытный суп с нежными мясными тефтелями.'], en: ['Meatball Soup', 'Hearty soup served with tender beef meatballs.'] },
    'it-1': { ru: ['Мушак джиз', 'Приготовленный по особому рецепту мушак джиз.'], en: ['Mushak Jiz', 'Specially roasted tender beef shank meat.'] },
    'it-2': { ru: ['Алатская самса', 'Настоящая сочная и хрустящая Алатская самса.'], en: ['Olot Samsa', 'Authentic crispy pastry stuffed with juicy meat and onions.'] },
    'it-3': { ru: ['Умакай джиз', 'Изысканное мясное блюдо Умакай джиз.'], en: ['Umakai Jiz', 'Traditional pan-fried meat delicacy.'] },
    'it-4': { ru: ['Тандыр гушт', 'Ароматное мясо, запеченное в настоящем тандыре.'], en: ['Tandoor Meat', 'Aromatic lamb slow-roasted in a traditional clay tandoor.'] },
    'it-5': { ru: ['Жареные крылышки', 'Хрустящие жареные куриные крылышки.'], en: ['Fried Chicken Wings', 'Crispy golden fried chicken wings.'] },
    'it-6': { ru: ['Картошка фри', 'Хрустящий золотистый картофель фри.'], en: ['French Fries', 'Crispy golden french fries.'] },
    'it-7': { ru: ['Хасип из говядины', 'Национальное блюдо хасип из отборной говядины.'], en: ['Beef Khasip', 'Traditional Uzbek homemade beef and rice sausage.'] },
    'it-8': { ru: ['Манчури', 'Мясное блюдо в стиле Манчури.'], en: ['Manchurian Meat', 'Savory meat prepared in special Manchurian style.'] },
    'it-9': { ru: ['Буйрак джиз', 'Специальный джиз из свежих почек.'], en: ['Buyrak Jiz', 'Specialty pan-fried dish made with tender kidneys.'] },
    'it-10': { ru: ['Казанча (Кизилча)', 'Фирменное мясное блюдо в казане.'], en: ['Qozoncha (Kizilcha)', 'Signature slow-cooked meat dish in a cast-iron kazan.'] },
    'it-11': { ru: ['Уйгурский джиз', 'Аппетитный джиз по-уйгурски со специями.'], en: ['Uyghur Jiz', 'Flavorful stir-fried meat in traditional Uyghur style.'] },
    'it-12': { ru: ['Манты', 'Сочные манты с рубленым мясом на пару.'], en: ['Manti', 'Steamed dumplings filled with juicy minced meat and onions.'] },
    'sh-1': { ru: ['Шашлык из печени', 'Нежный шашлык из печени и курдюка.'], en: ['Liver Shashlik', 'Tender skewered beef liver with tail fat.'] },
    'sh-2': { ru: ['Куриный кавказский', 'Кавказский шашлык из нежного куриного филе.'], en: ['Caucasian Chicken Shashlik', 'Marinated chicken skewers grilled over charcoal.'] },
    'sh-3': { ru: ['Нон шашлык', 'Хрустящий шашлык из лепешки и курдючного жира.'], en: ['Bread Shashlik', 'Charcoal-grilled bread infused with savory lamb fat.'] },
    'sh-4': { ru: ['Кавказский кусковой (баранина)', 'Сочный кусковой шашлык из баранины по-кавказски.'], en: ['Caucasian Lamb Shashlik', 'Juicy chunks of marinated lamb grilled on skewers.'] },
    'sh-5': { ru: ['Кусковой (говядина)', 'Кусковой шашлык из отборной говядины с курдюком.'], en: ['Beef Shashlik', 'Tender beef fillet skewers grilled over glowing embers.'] },
    'sh-6': { ru: ['Шашлык Гиждуван', 'Традиционный гиждуванский молотый шашлык (люля).'], en: ['Gijduvan Shashlik', 'Famous Gijduvan-style minced meat kebab.'] },
    'sh-7': { ru: ['Рулет шашлык', 'Особый мясной рулет на углях.'], en: ['Roll Shashlik', 'Special rolled meat kebab grilled over charcoal.'] },
    'sh-8': { ru: ['Сосиска сладкая', 'Аппетитный шашлык из нежных сосисок.'], en: ['Sweet Sausage Skewer', 'Charcoal-grilled mild sausage on a skewer.'] },
    'sh-9': { ru: ['Сосиска острая', 'Пикантный шашлык из острых сосисок.'], en: ['Spicy Sausage Skewer', 'Charcoal-grilled spicy sausage on a skewer.'] },
    'sh-10': { ru: ['Шашлык Наполеон', 'Фирменный слоеный шашлык Наполеон из мяса и курдюка.'], en: ['Napoleon Shashlik', 'Signature layered beef and lamb fat kebab.'] },
    'sh-11': { ru: ['Шашлык из помидоров', 'Сочные помидоры, запеченные на углях.'], en: ['Tomato Shashlik', 'Juicy ripe tomatoes grilled over charcoal.'] },
    'sh-12': { ru: ['Думба шашлык', 'Ароматный шашлык из отборного курдючного жира.'], en: ['Dumba (Tail Fat) Shashlik', 'Crispy and savory grilled lamb tail fat skewers.'] },
    'qt-1': { ru: ['Хрустящий баклажан', 'Хрустящие жареные баклажаны со свежими томатами и соусом.'], en: ['Crispy Eggplant Salad', 'Crispy fried eggplant tossed with tomatoes and special sauce.'] },
    'sal-1': { ru: ['Свежий салат', 'Легкий салат из свежих помидоров и огурцов.'], en: ['Fresh Salad', 'Light salad with fresh ripe tomatoes and cucumbers.'] },
    'sal-2': { ru: ['Шакароб', 'Традиционный узбекский салат из тонко нарезанных томатов и лука.'], en: ['Shakarob', 'Traditional Uzbek sliced tomato and onion salad.'] },
    'sal-3': { ru: ['Салат Икбол', 'Эксклюзивный фирменный салат от шеф-повара ресторана.'], en: ['Iqbol Signature Salad', 'Our restaurant’s special house salad.'] },
    'sal-4': { ru: ['Цезарь', 'Классический салат Цезарь с креветками/курицей и пармезаном.'], en: ['Caesar Salad', 'Classic Caesar salad with shrimp/chicken and Parmesan cheese.'] },
    'sal-5': { ru: ['Фруктовый салат', 'Витаминный сладкий салат из сезонных фруктов.'], en: ['Fruit Salad', 'Sweet vitamin-rich salad made from seasonal fresh fruits.'] },
    'sal-6': { ru: ['Мужской каприз', 'Сытный мясной салат с сыром и майонезной заправкой.'], en: ['Men\'s Caprice Salad', 'Hearty meat and cheese salad with rich dressing.'] },
    'sal-7': { ru: ['Греческий салат', 'Свежие овощи, маслины и нежный сыр Фета.'], en: ['Greek Salad', 'Fresh vegetables, olives, and authentic Feta cheese.'] },
    'sal-8': { ru: ['Под водочку', 'Специальный аппетитный закусочный салат.'], en: ['Appetizer Salad', 'Savory starter salad with pickled and fresh ingredients.'] },
    'sal-9': { ru: ['Японский салат', 'Пикантный салат в японском стиле с фирменным соусом.'], en: ['Japanese Style Salad', 'Savory salad dressed in a special Japanese soy-sesame sauce.'] },
    'sal-10': { ru: ['Французский салат', 'Нежный салат с мясом, свежими овощами и хрустящим картофелем пай.'], en: ['French Salad', 'Delicate meat and vegetable salad topped with crispy shoestring potatoes.'] },
    'sal-11': { ru: ['Салат Смак', 'Вкусный салат с томатами, сыром и хрустящими сухариками.'], en: ['Smak Salad', 'Tasty salad with tomatoes, cheese, and crunchy croutons.'] },
    'sal-12': { ru: ['Свежий (с катыком)', 'Свежие помидоры и огурцы, заправленные домашним катыком и зеленью.'], en: ['Fresh Salad with Yogurt', 'Fresh tomatoes, cucumbers, and herbs dressed with traditional yogurt.'] },
    'sal-13': { ru: ['Оливье', 'Традиционный и всеми любимый классический салат Оливье.'], en: ['Olivier Salad', 'Traditional classic Russian potato, meat, and pea salad.'] },
    'sal-14': { ru: ['Свежее ассорти', 'Богатая нарезка из свежих овощей и ароматной зелени.'], en: ['Fresh Vegetable Platter', 'Assortment of fresh seasonal vegetables and greens.'] },
    'sal-15': { ru: ['Лимон', 'Свеженарезанные ароматные дольки лимона.'], en: ['Fresh Lemon', 'Freshly sliced aromatic lemon wedges.'] },
    'sal-16': { ru: ['Чакки (Сузьма)', 'Натуральная домашняя сузьма (чакки) со специями.'], en: ['Chakki (Strained Yogurt)', 'Natural and creamy traditional strained yogurt.'] },
    'sal-17': { ru: ['Салат Чабан', 'Мелко нарезанные свежие овощи и зелень по-восточному.'], en: ['Chaban Salad', 'Finely diced fresh tomatoes, cucumbers, onions, and herbs.'] },
    'sal-18': { ru: ['Капрезе', 'Итальянский салат со спелыми томатами, моцареллой, рукколой и песто.'], en: ['Caprese Salad', 'Italian salad with tomatoes, mozzarella, arugula, and pesto sauce.'] },
    'sal-19': { ru: ['Салат Сате', 'Оригинальный салат в виде баклажанных рулетиков по особому рецепту.'], en: ['Sate Salad', 'Special eggplant rolls stuffed with savory filling.'] },
    'sal-20': { ru: ['Салат Тулум', 'Изысканный салат с сыром Тулум, кукурузой, черри и свежей зеленью.'], en: ['Tulum Cheese Salad', 'Refined salad with Tulum cheese, sweet corn, cherry tomatoes, and greens.'] },
    'ich-1': { ru: ['Сок DENA', 'Натуральный фруктовый сок DENA.'], en: ['DENA Juice', 'Natural fruit juice.'] },
    'ich-2': { ru: ['KARLOVY VARY', 'Лечебная минеральная вода.'], en: ['KARLOVY VARY Water', 'Mineral water.'] },
    'ich-3': { ru: ['Черноголовка', 'Освежающий лимонад Черноголовка.'], en: ['Chernogolovka Lemonade', 'Refreshing traditional lemonade.'] },
    'ich-4': { ru: ['BLANC BLUE', 'Прохладительный напиток Blanc Blue.'], en: ['BLANC BLUE Drink', 'Refreshing sparkling drink.'] },
    'ich-5': { ru: ['RED BULL', 'Энергетический напиток Red Bull.'], en: ['RED BULL Energy Drink', 'Classic energy drink.'] },
    'ich-6': { ru: ['Sayhun', 'Чистая питьевая вода без газа.'], en: ['Sayhun Still Water', 'Pure drinking water.'] },
    'ich-7': { ru: ['GORILLA', 'Энергетический напиток Gorilla.'], en: ['GORILLA Energy Drink', 'Energy drink.'] },
    'ich-8': { ru: ['Аш-ТАУ', 'Природная минеральная вода Аш-Тау.'], en: ['Ash-TAU Mineral Water', 'Premium mineral water.'] },
    'ich-9': { ru: ['Adrenaline Rush', 'Энергетический напиток Adrenaline Rush.'], en: ['Adrenaline Rush', 'Energy drink.'] },
    'ich-10': { ru: ['Fanta', 'Освежающая апельсиновая Fanta.'], en: ['Fanta', 'Classic orange soda.'] },
    'ich-11': { ru: ['Coca-Cola', 'Классическая прохладная Coca-Cola.'], en: ['Coca-Cola', 'Classic refreshing Coca-Cola.'] },
    'ich-12': { ru: ['Мохито Киви', 'Ледяной освежающий мохито со вкусом киви.'], en: ['Kiwi Mojito', 'Ice-cold refreshing kiwi mojito pitcher.'] },
    'ich-13': { ru: ['Мохито Классический', 'Классический мохито со свежей мятой и лаймом.'], en: ['Classic Mojito', 'Classic mojito pitcher with fresh mint and lime.'] },
    'ich-14': { ru: ['Тархун Мохито', 'Ароматный освежающий лимонад Тархун.'], en: ['Tarragon Mojito', 'Refreshing tarragon lemonade pitcher.'] },
    'ich-15': { ru: ['Манго-Маракуйя', 'Экзотический мохито со вкусом манго и маракуйи.'], en: ['Mango-Passionfruit Mojito', 'Exotic mango and passionfruit mojito pitcher.'] },
    'ich-16': { ru: ['Мохито Клубничный', 'Сладкий освежающий клубничный мохито.'], en: ['Strawberry Mojito', 'Sweet and refreshing strawberry mojito pitcher.'] },
    'des-1': { ru: ['Сан-Себастьян', 'Нежный испанский чизкейк Сан-Себастьян с шоколадом/карамелью.'], en: ['San Sebastian Cheesecake', 'Creamy Spanish burnt cheesecake with chocolate sauce.'] },
    'des-2': { ru: ['Ягодная опера', 'Изысканное пирожное Опера с лесными ягодами.'], en: ['Berry Opera Cake', 'Delicate layered Opera cake with berry glaze.'] },
    'des-3': { ru: ['Орешки Safia', 'Печенье орешки со вареной сгущенкой в коробке.'], en: ['Safia Sweet Walnuts', 'Pastry cookies filled with caramelized milk.'] },
    'des-4': { ru: ['MILLENNIUM Air Bubble', 'Пористый молочный шоколад.'], en: ['MILLENNIUM Air Bubble', 'Aerated milk chocolate bar.'] }
  };

  function getDishName(dish) {
    if (currentLang !== 'uz' && DISH_TRANSLATIONS[dish.id] && DISH_TRANSLATIONS[dish.id][currentLang]) {
      return DISH_TRANSLATIONS[dish.id][currentLang][0];
    }
    return dish.name;
  }

  function getDishDesc(dish) {
    if (currentLang !== 'uz' && DISH_TRANSLATIONS[dish.id] && DISH_TRANSLATIONS[dish.id][currentLang]) {
      return DISH_TRANSLATIONS[dish.id][currentLang][1];
    }
    return dish.desc;
  }

  function getCategoryName(catName) {
    return (CATEGORY_TRANSLATIONS[currentLang] && CATEGORY_TRANSLATIONS[currentLang][catName]) || catName;
  }

  function getPortionName(portion) {
    return (PORTION_TRANSLATIONS[currentLang] && PORTION_TRANSLATIONS[currentLang][portion]) || portion;
  }

  const PAGE_SELECTORS_I18N = [
    { sel: '.logo-sub', uz: 'Oilaviy restoran', ru: 'Семейный ресторан', en: 'Family Restaurant' },
    { sel: '#desktopNav a[href="#home"]', uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    { sel: '#desktopNav a[href="#about"]', uz: 'Biz haqimizda', ru: 'О нас', en: 'About' },
    { sel: '#desktopNav a[href="#why"]', uz: 'Afzalliklar', ru: 'Преимущества', en: 'Features' },
    { sel: '#desktopNav a[href="#menu"]', uz: 'Menyu', ru: 'Меню', en: 'Menu' },
    { sel: '#desktopNav a[href="#gallery"]', uz: 'Galereya', ru: 'Галерея', en: 'Gallery' },
    { sel: '#desktopNav a[href="#testimonials"]', uz: 'Sharhlar', ru: 'Отзывы', en: 'Reviews' },
    { sel: '#desktopNav a[href="#contact"]', uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
    { sel: '#headerReservationBtn span', uz: 'Stol band qilish', ru: 'Бронь стола', en: 'Book a Table' },
    { sel: '.hero-badge span', uz: "Qarshi shahrida mehmondo'stlik maskani", ru: 'Место гостеприимства в городе Карши', en: 'A hub of hospitality in Karshi' },
    { sel: '.hero-title', html: true, uz: 'IQBOL — <span class="gold-gradient-text">Ta\'m va mehmondo\'stlik</span> uyg\'unligi', ru: 'IQBOL — Гармония <span class="gold-gradient-text">вкуса и гостеприимства</span>', en: 'IQBOL — Harmony of <span class="gold-gradient-text">Taste & Hospitality</span>' },
    { sel: '.hero-subtitle', uz: "An'anaviy o'zbek va uyg'ur taomlari, iliq muhit va unutilmas ta'mlar. Saralangan go'sht, haqiqiy tandir va mehr bilan pishirilgan lazzatlar oilangizni kutmoqda.", ru: 'Традиционные узбекские и уйгурские блюда, теплая атмосфера и незабываемые вкусы. Отборное мясо, настоящий тандыр и приготовленные с любовью блюда ждут вашу семью.', en: 'Traditional Uzbek and Uyghur cuisine, warm atmosphere, and unforgettable flavors. Selected meat, authentic clay tandoor, and dishes cooked with love await your family.' },
    { sel: '#heroMenuBtn span', uz: "Menuni ko'rish", ru: 'Смотреть меню', en: 'View Menu' },
    { sel: '#heroReservationBtn span', uz: 'Stol band qilish', ru: 'Забронировать стол', en: 'Book a Table' },
    { sel: '#menu .section-tag', uz: 'Bizning taomnoma', ru: 'Наше меню', en: 'Our Menu' },
    { sel: '#menu .section-title', html: true, uz: 'IQBOL <span>Restoran Menyu</span>', ru: 'Меню <span>Ресторана IQBOL</span>', en: 'IQBOL <span>Restaurant Menu</span>' },
    { sel: '#menu .section-subtitle', uz: "Haqiqiy chop etilgan menyu asosidagi asl taomlar va narxlar. O'zingiz yoqtirgan taomni qidiring yoki toifa bo'yicha tanlang.", ru: 'Оригинальные блюда и актуальные цены нашего ресторана. Найдите любимое блюдо через поиск или выберите категорию.', en: 'Authentic dishes and prices from our kitchen. Search for your favorite meal or filter by category.' },
    { sel: '.cat-tab-btn[data-category="all"] span', uz: 'Barchasi', ru: 'Все', en: 'All' },
    { sel: '.cat-tab-btn[data-category="birinchi"] span', uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
    { sel: '.cat-tab-btn[data-category="ikkinchi"] span', uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Courses' },
    { sel: '.cat-tab-btn[data-category="shashlik"] span', uz: 'Shashliklar', ru: 'Шашлыки', en: 'Shashlik' },
    { sel: '.cat-tab-btn[data-category="salatlar"] span', uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
    { sel: '.cat-tab-btn[data-category="ichimliklar"] span', uz: 'Ichimliklar & Non', ru: 'Напитки и Хлеб', en: 'Drinks & Bread' },
    { sel: '.cat-tab-btn[data-category="gazli"] span', uz: 'Desert', ru: 'Десерты', en: 'Desserts' },
    { sel: '#reservation .form-title', uz: 'Stol band qilish', ru: 'Бронирование стола', en: 'Table Reservation' },
    { sel: '#reservation .form-desc', uz: "Qarshi shahrida oilaviy yoki do'stlar bilan unutilmas kecha o'tkazish uchun joyingizni oldindan bron qiling.", ru: 'Забронируйте столик заранее для незабываемого вечера в кругу семьи или друзей.', en: 'Reserve your table in advance for an unforgettable evening with family and friends.' },
    { sel: '#reservationForm button[type="submit"] span', uz: 'Stol band qilish', ru: 'Забронировать стол', en: 'Book Table' },
    { sel: '#gallery .section-tag', uz: 'Foto lavhalar', ru: 'Фотогалерея', en: 'Photo Gallery' },
    { sel: '#gallery .section-title', html: true, uz: 'IQBOL <span>Galereyasi</span>', ru: 'Галерея <span>IQBOL</span>', en: 'IQBOL <span>Gallery</span>' },
    { sel: '#testimonials .section-tag', uz: 'Mehmonlar fikri', ru: 'Отзывы гостей', en: 'Guest Reviews' },
    { sel: '#testimonials .section-title', html: true, uz: 'Haqiqiy <span>Mijozlarimiz sharhlari</span>', ru: 'Отзывы <span>Наших гостей</span>', en: 'Real <span>Customer Reviews</span>' },
    { sel: '#contact .section-tag', uz: 'Manzil & Aloqa', ru: 'Адрес и Контакты', en: 'Location & Contact' },
    { sel: '#contact .section-title', html: true, uz: 'Bizni <span>Qarshida toping</span>', ru: 'Найдите нас <span>в Карши</span>', en: 'Find Us <span>in Karshi</span>' },
    { sel: '.cart-title span', uz: 'Sizning buyurtmangiz', ru: 'Ваш заказ', en: 'Your Order' },
    { sel: '.order-type-btn[data-type="dine_in"]', html: true, uz: '<i class="fas fa-utensils"></i> Restoranda', ru: '<i class="fas fa-utensils"></i> В ресторане', en: '<i class="fas fa-utensils"></i> Dine-in' },
    { sel: '.order-type-btn[data-type="delivery"]', html: true, uz: '<i class="fas fa-motorcycle"></i> Yetkazib berish', ru: '<i class="fas fa-motorcycle"></i> Доставка', en: '<i class="fas fa-motorcycle"></i> Delivery' },
    { sel: '.cart-footer .btn-primary span', uz: 'Buyurtmani rasmiylashtirish', ru: 'Оформить заказ', en: 'Proceed to Checkout' },
    { sel: '#dishModal .modal-actions .btn-primary span', uz: "Buyurtmaga qo'shish", ru: 'Добавить в корзину', en: 'Add to Order' },
    { sel: '#checkoutModal h3.font-display', uz: 'Buyurtmani tasdiqlash', ru: 'Подтверждение заказа', en: 'Confirm Order' },
    { sel: '#checkoutForm button[type="submit"] span', uz: 'Buyurtmani yuborish', ru: 'Отправить заказ', en: 'Submit Order' }
  ];

  window.changeLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('iqbol_lang', lang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    PAGE_SELECTORS_I18N.forEach(item => {
      document.querySelectorAll(item.sel).forEach(el => {
        if (item.html) el.innerHTML = item[lang];
        else el.textContent = item[lang];
      });
    });

    const sInput = document.getElementById('searchInput');
    if (sInput) {
      sInput.placeholder = lang === 'ru'
        ? 'Поиск блюда по названию (например: тандыр, шашлык, салат)...'
        : lang === 'en'
        ? 'Search dish by name (e.g. tandoor, shashlik, salad)...'
        : "Taom nomi yoki tarkibini qidiring (masalan: tandir, shashlik, lag'mon)...";
    }

    const payTitleEl = document.getElementById('payMethodsTitleText');
    if (payTitleEl) {
      payTitleEl.textContent = lang === 'ru' ? 'Способ оплаты (Click / Payme / Paynet / Наличные):' : lang === 'en' ? 'Payment Method (Click / Payme / Paynet / Cash):' : "To'lov usulini tanlang:";
    }

    const cashBtnEl = document.getElementById('payBtnCashText');
    if (cashBtnEl) {
      cashBtnEl.textContent = lang === 'ru' ? 'Наличные' : lang === 'en' ? 'Cash' : 'Naqd';
    }

    renderMenu();
    updateCartUI();
    renderGallery();
  };

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => window.changeLanguage(btn.dataset.lang));
  });

  /* ==========================================================================
     2. APP STATE & STORAGE
     ========================================================================== */
  let cart = [];
  try {
    const rawCart = JSON.parse(localStorage.getItem('iqbol_cart')) || [];
    cart = rawCart.filter(item => item && MENU_DATA.some(d => d.id === item.id));
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

  function formatPrice(num) {
    const unit = currentLang === 'ru' ? ' сум' : currentLang === 'en' ? ' UZS' : " so'm";
    return Number(num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + unit;
  }

  function showToast(message, icon = 'fa-check-circle') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span class="toast-text">${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
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

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        getDishName(item).toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        getDishDesc(item).toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q)
      );
    }
    if (filtered.length === 0) {
      const emptyTxt = currentLang === 'ru' ? 'Блюда не найдены' : currentLang === 'en' ? 'No dishes found' : 'Hech qanday taom topilmadi';
      dishesGrid.innerHTML = `<div class="no-dishes-found"><i class="fas fa-utensils"></i><h3>${emptyTxt}</h3></div>`;
      return;
    }

    const priceLbl = currentLang === 'ru' ? 'Цена:' : currentLang === 'en' ? 'Price:' : 'Narxi:';
    let htmlResult = '';
    filtered.forEach(dish => {
      const isFav = favorites.includes(dish.id);
      const dName = getDishName(dish);
      const dDesc = getDishDesc(dish);
      const dCat = getCategoryName(dish.categoryName);
      const dPortion = getPortionName(dish.portion);

      htmlResult += `
        <article class="dish-card" data-id="${dish.id}">
          <div class="dish-img-wrap" onclick="window.openDishModal('${dish.id}')">
            <img src="${dish.image}" alt="${dName}" loading="lazy" />
            <div class="dish-badges">
              ${dish.popular ? '<span class="badge badge-gold"><i class="fas fa-star"></i> Hit</span>' : ''}
              ${dish.portion ? `<span class="badge badge-portion">${dPortion}</span>` : ''}
            </div>
            <button class="dish-fav-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); window.toggleFavorite('${dish.id}')"><i class="${isFav ? 'fas' : 'far'} fa-heart"></i></button>
          </div>
          <div class="dish-content">
            <div class="dish-category">${dCat}</div>
            <h3 class="dish-title" onclick="window.openDishModal('${dish.id}')">${dName}</h3>
            <p class="dish-desc">${dDesc}</p>
            <div class="dish-footer">
              <div class="dish-price-box"><span class="price-label">${priceLbl}</span><span class="dish-price">${formatPrice(dish.price)}</span></div>
              <button class="btn-add-cart" onclick="window.addToCart('${dish.id}')"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </article>
      `;
    });
    dishesGrid.innerHTML = htmlResult;
  }

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
      if (clearSearchBtn) clearSearchBtn.classList.toggle('visible', searchQuery.length > 0);
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

  window.toggleFavorite = function(dishId) {
    const idx = favorites.indexOf(dishId);
    if (idx > -1) {
      favorites.splice(idx, 1);
      showToast(currentLang === 'ru' ? 'Удалено из избранного' : currentLang === 'en' ? 'Removed from favorites' : 'Sevimlilardan olib tashlandi', 'fa-heart-broken');
    } else {
      favorites.push(dishId);
      showToast(currentLang === 'ru' ? 'Добавлено в избранное!' : currentLang === 'en' ? 'Added to favorites!' : 'Sevimlilarga qo\'shildi!', 'fa-heart');
    }
    localStorage.setItem('iqbol_favorites', JSON.stringify(favorites));
    renderMenu();
  };

  let selectedModalDish = null;
  let modalQuantity = 1;
  window.openDishModal = function(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish || !dishModal) return;
    selectedModalDish = dish;
    modalQuantity = 1;
    document.getElementById('modalImg').src = dish.image;
    document.getElementById('modalTitle').textContent = getDishName(dish);
    document.getElementById('modalPrice').textContent = formatPrice(dish.price) + (dish.portion ? ` (${getPortionName(dish.portion)})` : '');
    document.getElementById('modalDesc').textContent = getDishDesc(dish);
    document.getElementById('modalCategoryBadge').textContent = getCategoryName(dish.categoryName);
    document.getElementById('modalQtyVal').textContent = modalQuantity;
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
    document.getElementById('modalQtyVal').textContent = modalQuantity;
  };
  window.addModalDishToCart = function() {
    if (!selectedModalDish) return;
    window.addToCart(selectedModalDish.id, modalQuantity);
    window.closeDishModal();
  };

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
      const emptyCartTxt = currentLang === 'ru' ? 'Корзина пуста' : currentLang === 'en' ? 'Cart is empty' : "Savat bo'sh";
      cartItemsList.innerHTML = `<div class="empty-cart-view"><i class="fas fa-shopping-basket"></i><h4>${emptyCartTxt}</h4></div>`;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(0); 
      if (cartTotalEl) cartTotalEl.textContent = formatPrice(0); 
      return;
    }
    
    let subtotal = 0;
    let itemsHtml = '';
    cart.forEach(item => {
      const dish = MENU_DATA.find(d => d.id === item.id);
      if (!dish) return;
      const itemTotal = dish.price * item.quantity;
      subtotal += itemTotal;
      itemsHtml += `
        <div class="cart-item">
          <img src="${dish.image}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h5 class="cart-item-name">${getDishName(dish)}</h5>
            <div class="cart-item-price">${formatPrice(dish.price)} x ${item.quantity} = <strong>${formatPrice(itemTotal)}</strong></div>
          </div>
          <div class="cart-item-actions">
            <div class="quantity-control">
              <button class="qty-btn" onclick="window.changeCartQty('${dish.id}', -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="window.changeCartQty('${dish.id}', 1)">+</button>
            </div>
            <button class="btn-remove-item" onclick="window.removeFromCart('${dish.id}')"><i class="fas fa-trash-alt"></i></button>
          </div>
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
      feeDescription = zoneVal === 'tashqi' ? 'Yetkazish (Tashqari): 15 000' : 'Yetkazish (Shahar ichi): 10 000';
    } else {
      let serviceFeePercent = 0.07;
      const tableInputVal = document.getElementById('checkoutTable') ? document.getElementById('checkoutTable').value.toLowerCase() : '';
      if (tableInputVal.includes('vip') || tableInputVal.includes('kabina')) {
        serviceFeePercent = 0.10;
      }
      extraFee = Math.round(subtotal * serviceFeePercent);
      feeDescription = `Xizmat haqi (${Math.round(serviceFeePercent * 100)}%): ${formatPrice(extraFee)}`;
    }

    let grandTotal = subtotal + extraFee;

    if (cartTotalEl) {
      cartTotalEl.innerHTML = `${formatPrice(grandTotal)} <br><small style="font-size:0.75rem; color:var(--accent-gold);">(${feeDescription})</small>`;
    }
  }

  window.addToCart = function(dishId, qty = 1) {
    const dish = MENU_DATA.find(d => d.id === dishId);
    if (!dish) return;
    const existing = cart.find(item => item.id === dishId);
    if (existing) existing.quantity += qty;
    else cart.push({ id: dishId, quantity: qty });
    saveCart();
    const addedMsg = currentLang === 'ru' ? `"${getDishName(dish)}" добавлено в корзину!` : currentLang === 'en' ? `"${getDishName(dish)}" added to cart!` : `"${dish.name}" savatga qo'shildi!`;
    showToast(addedMsg, 'fa-shopping-cart');
  };
  window.changeCartQty = function(dishId, delta) {
    const item = cart.find(i => i.id === dishId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(i => i.id !== dishId);
    saveCart();
  };
  window.removeFromCart = function(dishId) {
    cart = cart.filter(i => i.id !== dishId);
    saveCart();
  };
  window.openCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      updateCartUI();
    }
  };
  window.closeCart = function() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  /* ==========================================================================
     4. CHECKOUT & CLICK / PAYME / PAYNET (9860 1701 1569 3682)
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  window.openCheckout = function() {
    if (cart.length === 0) {
      showToast('Savat bo\'sh!', 'fa-exclamation-circle');
      return;
    }
    window.closeCart();
    if (checkoutModal) {
      checkoutModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      ensureDeliveryZoneSelect();
      ensurePaymentSelectorUI();
      updateCartUI();
    }
  };
  window.closeCheckout = function() {
    if (checkoutModal) {
      checkoutModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  function ensureDeliveryZoneSelect() {
    const addressGroup = document.getElementById('checkoutAddressGroup');
    if (addressGroup && !document.getElementById('deliveryZone')) {
      const zoneDiv = document.createElement('div');
      zoneDiv.className = 'form-group';
      zoneDiv.style.marginTop = '10px';
      zoneDiv.innerHTML = `
        <label for="deliveryZone">Yetkazish hududi *</label>
        <select id="deliveryZone" style="width:100%; padding:0.8rem 1rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main);">
          <option value="ichki">Shahar ichi (10 000 so'm)</option>
          <option value="tashqi">Shahar tashqari (15 000 so'm)</option>
        </select>
      `;
      addressGroup.appendChild(zoneDiv);
      document.getElementById('deliveryZone').addEventListener('change', updateCartUI);
    }
  }

  function updateQuickPayButtonsUI() {
    const actionsRow = document.getElementById('quickPayLinksRow');
    if (!actionsRow) return;
    const prov = PAYMENT_PROVIDERS[selectedPaymentMethod];
    if (!prov) {
      actionsRow.innerHTML = '';
      return;
    }
    actionsRow.innerHTML = `
      <button type="button" class="quick-pay-btn" style="background:${prov.color}; color:${prov.textColor};" onclick="window.openPaymentDestination('${selectedPaymentMethod}', 'auto')">
        <i class="fas fa-mobile-screen-button"></i> ${prov.name} Ilovani ochish
      </button>
      <button type="button" class="quick-pay-btn" style="background:var(--bg-card); color:var(--text-main); border:1px solid var(--border-gold);" onclick="window.openPaymentDestination('${selectedPaymentMethod}', 'web')">
        <i class="fas fa-globe"></i> ${prov.name} Saytiga kirish
      </button>
    `;
  }

  // Click / Payme / Paynet / Naqd va 9860 1701 1569 3682 karta raqamini ko'rsatuvchi blok
  function ensurePaymentSelectorUI() {
    const checkoutFormEl = document.getElementById('checkoutForm');
    if (!checkoutFormEl || document.getElementById('paymentMethodsBox')) return;

    const submitBtn = checkoutFormEl.querySelector('button[type="submit"]');
    const payBox = document.createElement('div');
    payBox.id = 'paymentMethodsBox';
    payBox.className = 'payment-methods-box';
    payBox.innerHTML = `
      <div class="payment-methods-title">
        <i class="fas fa-wallet" style="color:var(--accent-gold);"></i>
        <span id="payMethodsTitleText">To'lov usulini tanlang:</span>
      </div>
      <div class="payment-methods-grid">
        <button type="button" class="pay-option-btn active" data-pay="Naqd">
          <i class="fas fa-money-bill-wave"></i> <span id="payBtnCashText">Naqd</span>
        </button>
        <button type="button" class="pay-option-btn" data-pay="Click">
          <i class="fas fa-credit-card"></i> <span>CLICK</span>
        </button>
        <button type="button" class="pay-option-btn" data-pay="Payme">
          <i class="fas fa-mobile-screen-button"></i> <span>Payme</span>
        </button>
        <button type="button" class="pay-option-btn" data-pay="Paynet">
          <i class="fas fa-bolt"></i> <span>Paynet</span>
        </button>
      </div>
      <div id="cardDisplayBox" class="card-Display-box">
        <span style="font-size:0.78rem; color:var(--text-muted);" id="cardTransferHint">
          To'lov uchun karta raqami (Click / Payme / Paynet):
        </span>
        <div class="card-number-row">
          <span class="card-number-val">${RESTAURANT_CARD}</span>
          <button type="button" class="btn-copy-card" onclick="window.copyRestaurantCard()">
            <i class="fas fa-copy"></i> Nusxalash
          </button>
        </div>
        <div id="quickPayLinksRow" class="quick-pay-links"></div>
      </div>
    `;
    checkoutFormEl.insertBefore(payBox, submitBtn);

    const cardBox = document.getElementById('cardDisplayBox');
    payBox.querySelectorAll('.pay-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        payBox.querySelectorAll('.pay-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPaymentMethod = btn.dataset.pay;
        const isOnline = selectedPaymentMethod === 'Click' || selectedPaymentMethod === 'Payme' || selectedPaymentMethod === 'Paynet';
        if (cardBox) {
          cardBox.classList.toggle('visible', isOnline);
        }
        if (isOnline) {
          updateQuickPayButtonsUI();
        }
      });
    });
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
      const noteEl = document.getElementById('checkoutNote');
      const note = noteEl ? noteEl.value.trim() : '';
      
      if (!name || !phone) {
        showToast('Ism va telefonni kiriting!', 'fa-exclamation-triangle');
        return;
      }
      if (orderType === 'delivery' && !address) {
        showToast('Yetkazish manzilini kiriting!', 'fa-exclamation-triangle');
        return;
      }
      
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
        feeTitle = `Xizmat haqi (${Math.round(serviceFeePercent * 100)}%)`;
      }

      let totalSum = subtotal + extraFee;

      const orderId = 'IQB-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryText = orderType === 'delivery' ? `Yetkazish: ${address} (${feeTitle})` : `Restoranda: ${table || 'Tanlanmagan'}`;
      const payInfoLine = selectedPaymentMethod === 'Naqd' ? 'Naqd' : `${selectedPaymentMethod} (Karta: ${RESTAURANT_CARD})`;
      
      showToast("Yuborilmoqda...", 'fa-spinner');
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
      const FOOD_CHAT_ID = '8072569639';
      
      const tgText = `📦 *YANGI TAOM BUYURTMASI!* (#${orderId})\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📍 ${deliveryText}\n💳 To'lov usuli: *${payInfoLine}*\n\n🛒 *Buyurtmalar:*\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 *Jami to'lov: ${formatPrice(totalSum)}*\n📝 Izoh: ${note || "Yo'q"}`;
      
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: FOOD_CHAT_ID, text: tgText, parse_mode: 'Markdown' })
        });
      } catch (err) {
        console.log("Telegram xatolik:", err);
      }

      window.closeCheckout(); 
      showSuccessModal({ 
        title: selectedPaymentMethod === 'Naqd' ? 'Buyurtmangiz qabul qilindi!' : `Buyurtma va ${selectedPaymentMethod} to'lov!`, 
        subtitle: `Raqam: #${orderId} | To'lov: ${selectedPaymentMethod}`, 
        message: selectedPaymentMethod === 'Naqd'
          ? `Tez orada operator aloqaga chiqadi.`
          : `Karta raqami (${RESTAURANT_CARD}) nusxalandi! Quyidagi tugma orqali ${selectedPaymentMethod} ilovasiga yoki saytiga kirib ${formatPrice(totalSum)} o'tkazing:`, 
        details: `${deliveryText}\nTo'lov turi: ${payInfoLine}\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\nJami: ${formatPrice(totalSum)}\n\n${orderLinesText}`,
        paymentProvider: selectedPaymentMethod,
        paymentAmount: totalSum,
        orderId: orderId
      });
      cart = [];
      saveCart();
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
        tableNumberSelect.innerHTML = '';
        for (let i = 1; i <= max; i++) {
          const optionValue = `${label} #${i}`;
          const opt = document.createElement('option');
          opt.value = optionValue;
          opt.textContent = optionValue;
          tableNumberSelect.appendChild(opt);
        }
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
      const notesEl = document.getElementById('resNotes');
      const notes = notesEl ? notesEl.value.trim() : '';

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
        showToast("Server bilan aloqa yo'q!", 'fa-wifi');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ==========================================================================
     6. SUCCESS MODAL (CLICK / PAYME / PAYNET ILOVA VA SAYT TUGMALARI BILAN)
     ========================================================================== */
  const successModal = document.getElementById('successModal');
  function showSuccessModal(data) {
    if (!successModal) return;
    const titleEl = document.getElementById('successTitle');
    const subEl = document.getElementById('successSubtitle');
    const msgEl = document.getElementById('successMessage');
    const detEl = document.getElementById('successDetails');

    if (titleEl) titleEl.textContent = data.title || '';
    if (subEl) subEl.textContent = data.subtitle || '';
    if (msgEl) msgEl.textContent = data.message || '';
    if (detEl) detEl.textContent = data.details || '';

    let oldPayWrap = document.getElementById('dynamicOnlinePayWrap');
    if (oldPayWrap) oldPayWrap.remove();

    const prov = data.paymentProvider ? PAYMENT_PROVIDERS[data.paymentProvider] : null;
    if (prov) {
      // Karta raqamini avtomatik nusxalab beramiz
      if (navigator.clipboard) {
        navigator.clipboard.writeText(RESTAURANT_CARD_RAW).catch(() => {});
      }

      const payWrap = document.createElement('div');
      payWrap.id = 'dynamicOnlinePayWrap';
      payWrap.style.cssText = 'margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.65rem;';
      payWrap.innerHTML = `
        <div class="card-number-row" style="justify-content: space-between;">
          <span class="card-number-val">${RESTAURANT_CARD}</span>
          <button type="button" class="btn-copy-card" onclick="window.copyRestaurantCard()">
            <i class="fas fa-copy"></i> Nusxalash
          </button>
        </div>
        <button type="button" onclick="window.openPaymentDestination('${data.paymentProvider}', 'auto')" class="btn" style="width:100%; color:${prov.textColor}; font-weight:700; background:${prov.color};">
          <i class="fas fa-mobile-screen-button"></i>
          <span>${prov.name} Ilovasini ochish (${formatPrice(data.paymentAmount)})</span>
        </button>
        <button type="button" onclick="window.openPaymentDestination('${data.paymentProvider}', 'web')" class="btn btn-outline-gold" style="width:100%; font-size:0.85rem; padding:0.6rem 1rem;">
          <i class="fas fa-globe"></i>
          <span>${prov.name} rasmiy saytiga kirish</span>
        </button>
      `;
      if (detEl && detEl.parentNode) {
        detEl.parentNode.insertBefore(payWrap, detEl.nextSibling);
      }
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
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
      if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  window.closeMobileNav = function() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ==========================================================================
     7. GALLERY (NOMLARI TO'G'RILANDI VA ORTIQCHA TUGMALAR OLIB TASHLANDI)
     ========================================================================== */
  const GALLERY_IMAGES = [
    { url: 'gal1.jpg', caption: 'IQBOL Restorani — Mehmondo\'stlik maskani', tag: 'IQBOL Restoran', featured: true },
    { url: 'gal2.jpg', caption: 'Yuqori darajadagi xizmat va shinam zal', tag: 'Restoran muhiti', featured: false },
    { url: 'gal3.jpg', caption: 'Milliy qadriyatlar va an\'anaviy kolorit', tag: 'Sharqona bezak', featured: false },
    { url: 'gal4.jpg', caption: 'Yashilliklar orasidagi qulay o\'rindiqlar', tag: 'Shinam muhit', featured: false },
    { url: 'gal5.jpg', caption: 'Oilaviy va do\'stlar davrasi uchun keng zal', tag: 'Oilaviy zal', featured: false },
    { url: 'gal6.jpg', caption: 'Alangada pishirilgan tansiq taomlar', tag: 'Oshxona sirlari', featured: false },
    { url: 'gal7.jpg', caption: 'Nafis sharqona naqshlar uyg\'unligi', tag: 'Interyer', featured: false },
    { url: 'gal8.jpg', caption: 'Milliy sopol laganlar va so\'zana', tag: 'Milliy ruh', featured: false },
    { url: 'gal9.jpg', caption: 'Maxsus steyk va ishtahaochar taomlarimiz', tag: 'Maxsus taomlar', featured: false }
  ];

  const filterTabsContainer = document.querySelector('.gallery-filter-tabs');
  if (filterTabsContainer) {
    filterTabsContainer.style.display = 'none';
  }

  let activeLightboxIndex = 0;
  const galleryGrid = document.getElementById('galleryGrid');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = GALLERY_IMAGES.map((item, index) => `
      <div class="gallery-item ${item.featured ? 'featured' : ''}" onclick="window.openLightbox(${index})">
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.tag}</span>
          <h4 class="gallery-caption">${item.caption}</h4>
        </div>
      </div>
    `).join('');
  }

  window.openLightbox = function(index) {
    activeLightboxIndex = index;
    const item = GALLERY_IMAGES[activeLightboxIndex];
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
    if (activeLightboxIndex < 0) activeLightboxIndex = GALLERY_IMAGES.length - 1;
    if (activeLightboxIndex >= GALLERY_IMAGES.length) activeLightboxIndex = 0;
    const item = GALLERY_IMAGES[activeLightboxIndex];
    if (item) {
      lightboxImg.src = item.url;
      lightboxCaption.textContent = item.caption;
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeDishModal();
      window.closeCart();
      window.closeCheckout();
      window.closeSuccessModal();
      window.closeMobileNav();
      window.closeLightbox();
    }
  });

  // Orqa fondagi videoni majburan o'ynatish
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(err => console.log("Video avto-yonish xatosi:", err));
  }

  // Boshlang'ich til va menyuni yuklash
  window.changeLanguage(currentLang);
});