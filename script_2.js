/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT
 * (100% TO'LIQ UZ/RU/EN TARJIMA + TELEGRAM MINI APP TRACKER + OFITSIANT & QR + CLICK/PAYME/PAYNET)
 */

document.addEventListener('DOMContentLoaded', () => {
  const RESTAURANT_CARD = '9860 1701 1569 3682';
  const RESTAURANT_CARD_RAW = '9860170115693682';
  const API_URL = 'https://iqbol.onrender.com/api';
  const GOOGLE_CLIENT_ID = '500756304339-78rjnbeajcu4tg8aml1k14iov9vu5qjk.apps.googleusercontent.com';
  const GOOGLE_AUTH_API = `${API_URL}/auth/google`;

  const DIRECT_BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns';
  const PRIMARY_ADMIN_CHAT_ID = '7225335915';

  let currentLang = localStorage.getItem('iqbol_lang') || 'uz';

  // Sahifa Telegram Mini App ("Open" tugmasi) ichida ochilganini 100% aniqlash:
  const urlParams = new URLSearchParams(window.location.search);
  const isTelegramTrackerApp =
    urlParams.get('mode') === 'tracker' ||
    window.location.hash.includes('tgWebApp') ||
    window.location.search.includes('tgWebApp') ||
    typeof window.TelegramWebviewProxy !== 'undefined' ||
    typeof window.TelegramWebview !== 'undefined' ||
    (navigator.userAgent && navigator.userAgent.includes('Telegram')) ||
    Boolean(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData);

  /* ==========================================================================
     AGAR TELEGRAM "OPEN" TUGMASI BOSILGAN BO'LSA -> FAQAT BUYURTMA JARAYONI OCHILADI!
     ========================================================================== */
  if (isTelegramTrackerApp) {
    // Asosiy saytdagi barcha elementlarni DOM'dan tozalab, faqat Tracker'ni qoldiramiz
    Array.from(document.body.children).forEach(el => {
      if (el.tagName !== 'SCRIPT') el.style.setProperty('display', 'none', 'important');
    });

    const tgOnlyStyle = document.createElement('style');
    tgOnlyStyle.textContent = `
      body > *:not(#iqbolTelegramTrackerApp) {
        display: none !important;
      }
      body {
        background: radial-gradient(circle at top, #102d22 0%, #05120d 100%) !important;
        color: #ffffff !important;
        min-height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
      }
      #iqbolTelegramTrackerApp {
        display: flex !important;
        min-height: 100vh;
        padding: 1.1rem 1rem 2.5rem 1rem;
        max-width: 480px;
        margin: 0 auto;
        flex-direction: column;
        gap: 1rem;
        box-sizing: border-box;
      }
      .tg-app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1rem;
        border-radius: 18px;
        background: rgba(15, 44, 34, 0.92);
        border: 1px solid rgba(212, 175, 55, 0.45);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
      }
      .tg-brand-row { display: flex; align-items: center; gap: 10px; }
      .tg-crown-circle {
        width: 38px; height: 38px; border-radius: 50%;
        background: linear-gradient(135deg, #fff6d1, #d4af37);
        color: #061710; display: flex; align-items: center; justify-content: center;
        font-size: 1.05rem; box-shadow: 0 0 18px rgba(212, 175, 55, 0.6);
      }
      .tg-lang-switch {
        display: inline-flex; gap: 3px; background: rgba(0,0,0,0.35);
        padding: 3px; border-radius: 99px; border: 1px solid rgba(212,175,55,0.35);
      }
      .tg-lang-b {
        border: none; background: transparent; color: #fff; font-size: 0.68rem;
        font-weight: 800; padding: 4px 8px; border-radius: 99px; cursor: pointer;
      }
      .tg-lang-b.active {
        background: linear-gradient(135deg, #f3d889, #d4af37); color: #061710;
      }
      .tg-eta-badge {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: #ffffff; font-size: 0.75rem; font-weight: 800;
        padding: 5px 12px; border-radius: 999px;
        box-shadow: 0 4px 14px rgba(46, 204, 113, 0.4);
      }
      .tg-hero-card {
        background: linear-gradient(145deg, rgba(17, 48, 37, 0.96), rgba(7, 24, 18, 0.99));
        border: 1.5px solid rgba(212, 175, 55, 0.55);
        border-radius: 22px; padding: 1.35rem 1.2rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
      }
      .tg-stage-icon {
        width: 64px; height: 64px; border-radius: 18px;
        background: radial-gradient(circle at 30% 30%, rgba(243, 216, 137, 0.28), rgba(212, 175, 55, 0.08));
        border: 1.5px solid rgba(212, 175, 55, 0.6);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.9rem; color: #f3d889; flex-shrink: 0;
        animation: tgFloat 2.2s infinite ease-in-out;
      }
      @keyframes tgFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      .tg-seg-bar {
        display: grid; grid-template-columns: repeat(4, 1fr);
        gap: 6px; margin: 1.25rem 0 0.7rem 0;
      }
      .tg-seg {
        height: 6px; border-radius: 99px;
        background: rgba(255, 255, 255, 0.14);
        overflow: hidden; position: relative;
      }
      .tg-seg.done { background: #2ecc71; box-shadow: 0 0 10px rgba(46, 204, 113, 0.7); }
      .tg-seg.active { background: rgba(212, 175, 55, 0.3); }
      .tg-seg.active::after {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(90deg, transparent, #f3d889, #2ecc71, transparent);
        animation: tgShimmer 1.3s infinite linear;
      }
      @keyframes tgShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      .tg-nodes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; text-align: center; }
      .tg-node {
        font-size: 0.66rem; font-weight: 700; color: rgba(255, 255, 255, 0.45);
        display: flex; flex-direction: column; align-items: center; gap: 4px;
      }
      .tg-node.done { color: #2ecc71; }
      .tg-node.active { color: #f3d889; font-weight: 800; }
      .tg-receipt-box {
        background: rgba(15, 44, 34, 0.75);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 18px; padding: 1.1rem;
      }
      .tg-orders-chips { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; }
      .tg-order-chip {
        padding: 6px 12px; border-radius: 99px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.4);
        color: #f3d889; font-size: 0.76rem; font-weight: 700;
        cursor: pointer; white-space: nowrap;
      }
      .tg-order-chip.active {
        background: linear-gradient(135deg, #f3d889, #d4af37); color: #061710;
      }
    `;
    document.head.appendChild(tgOnlyStyle);

    const trackerApp = document.createElement('div');
    trackerApp.id = 'iqbolTelegramTrackerApp';
    trackerApp.innerHTML = `
      <div class="tg-app-header">
        <div class="tg-brand-row">
          <div class="tg-crown-circle"><i class="fas fa-crown"></i></div>
          <div>
            <div style="font-weight:800; font-size:1rem; letter-spacing:0.08em;">IQBOL</div>
            <div id="tgHdrSub" style="font-size:0.68rem; color:#f3d889;">Jonli Buyurtma Jarayoni</div>
          </div>
        </div>
        <div class="tg-lang-switch">
          <button type="button" class="tg-lang-b ${currentLang==='uz'?'active':''}" onclick="window.setTgTrackerLang('uz')">UZ</button>
          <button type="button" class="tg-lang-b ${currentLang==='ru'?'active':''}" onclick="window.setTgTrackerLang('ru')">RU</button>
          <button type="button" class="tg-lang-b ${currentLang==='en'?'active':''}" onclick="window.setTgTrackerLang('en')">EN</button>
        </div>
      </div>

      <div id="tgActiveOrdersBar" class="tg-orders-chips" style="display:none;"></div>

      <div class="tg-hero-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.9rem;">
          <span id="tgAppOrderIdBadge" style="font-size:0.78rem; font-weight:800; color:#f3d889; background:rgba(212,175,55,0.16); padding:4px 12px; border-radius:99px; border:1px solid rgba(212,175,55,0.4);">Buyurtma...</span>
          <span id="tgAppEtaBadge" class="tg-eta-badge">⏳ ...</span>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <div id="tgAppStageIcon" class="tg-stage-icon">
            <i class="fas fa-clipboard-check"></i>
          </div>
          <div style="flex:1;">
            <h2 id="tgAppStageTitle" style="font-size:1.35rem; font-weight:800; color:#ffffff; margin:0 0 4px 0; line-height:1.2;">Buyurtma holati</h2>
            <p id="tgAppStageDesc" style="font-size:0.8rem; color:rgba(255,255,255,0.78); margin:0; line-height:1.4;">Yuklanmoqda...</p>
          </div>
        </div>

        <div class="tg-seg-bar">
          <div id="tgSeg_0" class="tg-seg active"></div>
          <div id="tgSeg_1" class="tg-seg"></div>
          <div id="tgSeg_2" class="tg-seg"></div>
          <div id="tgSeg_3" class="tg-seg"></div>
        </div>

        <div class="tg-nodes">
          <div id="tgNode_0" class="tg-node active"><i class="fas fa-check-circle"></i><span id="tgN0Txt">Qabul qilindi</span></div>
          <div id="tgNode_1" class="tg-node"><i class="fas fa-fire-burner"></i><span id="tgN1Txt">Pishirilmoqda</span></div>
          <div id="tgNode_2" class="tg-node"><i class="fas fa-motorcycle"></i><span id="tgN2Txt">Yo'lda / Stolda</span></div>
          <div id="tgNode_3" class="tg-node"><i class="fas fa-utensils"></i><span id="tgN3Txt">Topshirildi</span></div>
        </div>
      </div>

      <div class="tg-receipt-box">
        <div id="tgRecHdr" style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#f3d889; margin-bottom:8px;">
          <i class="fas fa-receipt"></i> Buyurtma tafsilotlari
        </div>
        <div id="tgAppReceiptText" style="font-size:0.84rem; color:#ffffff; white-space:pre-line; line-height:1.5;">...</div>
      </div>

      <div class="tg-receipt-box" style="padding:0.9rem;">
        <div id="tgSearchLbl" style="font-size:0.75rem; color:#f3d889; font-weight:700; margin-bottom:6px;">Buyurtma raqamini tekshirish:</div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="tgManualOrderIdInput" placeholder="IQB-507912" style="flex:1; padding:0.65rem 0.9rem; border-radius:10px; border:1px solid rgba(212,175,55,0.45); background:rgba(0,0,0,0.35); color:#fff; font-weight:700; font-size:0.85rem;" />
          <button type="button" id="tgManualSearchBtn" style="padding:0.65rem 1.1rem; border-radius:10px; border:none; background:linear-gradient(135deg,#f3d889,#d4af37); color:#061710; font-weight:800; font-size:0.82rem; cursor:pointer;">Topish</button>
        </div>
      </div>
    `;
    document.body.appendChild(trackerApp);

    const TG_I18N = {
      uz: {
        sub: 'Jonli Buyurtma Jarayoni',
        n0: 'Qabul qilindi', n1: 'Pishirilmoqda', n2: "Yo'lda / Stolda", n3: 'Topshirildi',
        recHdr: 'Buyurtma tafsilotlari', searchLbl: 'Boshqa buyurtma raqamini tekshirish:', btnFind: 'Topish',
        noOrd: 'Faol buyurtma topilmadi',
        noOrdDesc: "Hozircha faol buyurtma yo'q yoki pastdagi katakka buyurtma raqamingizni (#IQB-...) yozib tekshiring.",
        stages: {
          accepted: { idx: 0, icon: 'fa-clipboard-check', title: 'Buyurtmangiz qabul qilindi!', desc: "Oshxonamiz buyurtmangizni qabul qildi. Hozir Bosh oshpaz (Chef) tayyor bo'lish vaqtini belgilaydi.", eta: '⏳ Chef kutilyapti' },
          cooking: { idx: 1, icon: 'fa-fire-burner', title: 'Chef taomingizni pishirmoqda! 🔥', desc: 'Usta oshpazimiz buyurtmangizni olovda issiqqina qilib tayyorlamoqda.', eta: '~15–20 daq' },
          ready: { idx: 2, icon: 'fa-bell-concierge', title: "Ovqatingiz TAYYOR bo'ldi! 👨‍🍳✅", desc: 'Chef taomni pishirib bo\'ldi! Hozir Dastavshik (yoki ofitsiant) sizga yetkazadi.', eta: '🔥 Tayyor!' },
          delivering: { idx: 2, icon: 'fa-motorcycle', title: "Dastavshik yo'lda / Tortilmoqda! 🛵", desc: 'Buyurtmangiz issiqqina holatda siz tomonga yetkazilmoqda.', eta: '🛵 ~5–10 daq' },
          completed: { idx: 3, icon: 'fa-check-double', title: 'Topshirildi — Yoqimli ishtaha! ✅', desc: "IQBOL oilaviy restorani bilan bo'lganingiz uchun tashakkur!", eta: 'Topshirildi ✅' }
        }
      },
      ru: {
        sub: 'Отслеживание заказа',
        n0: 'Принят', n1: 'Готовится', n2: 'В пути / На столе', n3: 'Доставлен',
        recHdr: 'Детали заказа', searchLbl: 'Проверить другой номер заказа:', btnFind: 'Найти',
        noOrd: 'Активный заказ не найден',
        noOrdDesc: 'Пока нет активных заказов. Введите номер вашего заказа (#IQB-...) в поле ниже.',
        stages: {
          accepted: { idx: 0, icon: 'fa-clipboard-check', title: 'Ваш заказ принят!', desc: 'Кухня получила ваш заказ. Сейчас Шеф-повар укажет точное время приготовления.', eta: '⏳ Ждем Шефа' },
          cooking: { idx: 1, icon: 'fa-fire-burner', title: 'Шеф готовит ваше блюдо! 🔥', desc: 'Наши повара готовят ваш заказ с пылу с жару.', eta: '~15–20 мин' },
          ready: { idx: 2, icon: 'fa-bell-concierge', title: 'Блюдо ГОТОВО! 👨‍🍳✅', desc: 'Шеф закончил приготовление! Сейчас курьер или официант доставит его вам.', eta: '🔥 Готово!' },
          delivering: { idx: 2, icon: 'fa-motorcycle', title: 'Курьер в пути / Подается! 🛵', desc: 'Ваш горячий заказ уже направляется к вам.', eta: '🛵 ~5–10 мин' },
          completed: { idx: 3, icon: 'fa-check-double', title: 'Доставлено — Приятного аппетита! ✅', desc: 'Спасибо, что выбрали семейный ресторан IQBOL!', eta: 'Доставлено ✅' }
        }
      },
      en: {
        sub: 'Live Order Tracker',
        n0: 'Accepted', n1: 'Cooking', n2: 'On the way', n3: 'Delivered',
        recHdr: 'Order Details', searchLbl: 'Check another order number:', btnFind: 'Find',
        noOrd: 'No active order found',
        noOrdDesc: 'No active order right now, or enter your order ID (#IQB-...) below to track.',
        stages: {
          accepted: { idx: 0, icon: 'fa-clipboard-check', title: 'Your order is accepted!', desc: 'Our kitchen received your order. The Head Chef is setting the preparation time.', eta: '⏳ Waiting Chef' },
          cooking: { idx: 1, icon: 'fa-fire-burner', title: 'Chef is cooking your meal! 🔥', desc: 'Our master chefs are preparing your fresh and hot meal.', eta: '~15–20 min' },
          ready: { idx: 2, icon: 'fa-bell-concierge', title: 'Your meal is READY! 👨‍🍳✅', desc: 'The Chef finished cooking! The courier or waiter is bringing it to you now.', eta: '🔥 Ready!' },
          delivering: { idx: 2, icon: 'fa-motorcycle', title: 'Courier on the way / Serving! 🛵', desc: 'Your hot order is on its way to you right now.', eta: '🛵 ~5–10 min' },
          completed: { idx: 3, icon: 'fa-check-double', title: 'Delivered — Enjoy your meal! ✅', desc: 'Thank you for dining with IQBOL Family Restaurant!', eta: 'Delivered ✅' }
        }
      }
    };

    let currentTrackedId = urlParams.get('order') || localStorage.getItem('iqbol_active_order') || '';
    let lastFetchedData = { step: 'accepted', eta: '', receiptText: '' };

    function renderTelegramTrackerState(ordId, step, eta, receiptText) {
      const dict = TG_I18N[currentLang] || TG_I18N.uz;
      document.getElementById('tgHdrSub').textContent = dict.sub;
      document.getElementById('tgN0Txt').textContent = dict.n0;
      document.getElementById('tgN1Txt').textContent = dict.n1;
      document.getElementById('tgN2Txt').textContent = dict.n2;
      document.getElementById('tgN3Txt').textContent = dict.n3;
      document.getElementById('tgRecHdr').innerHTML = `<i class="fas fa-receipt"></i> ${dict.recHdr}`;
      document.getElementById('tgSearchLbl').textContent = dict.searchLbl;
      document.getElementById('tgManualSearchBtn').textContent = dict.btnFind;

      if (!ordId) {
        document.getElementById('tgAppOrderIdBadge').textContent = dict.noOrd;
        document.getElementById('tgAppReceiptText').textContent = dict.noOrdDesc;
        return;
      }

      const cfg = dict.stages[step] || dict.stages.accepted;
      const finalEta = eta || cfg.eta;

      document.getElementById('tgAppOrderIdBadge').textContent = `#${ordId}`;
      document.getElementById('tgAppEtaBadge').textContent = `⏱ ${finalEta}`;
      document.getElementById('tgAppStageIcon').innerHTML = `<i class="fas ${cfg.icon}"></i>`;
      document.getElementById('tgAppStageTitle').textContent = cfg.title;
      document.getElementById('tgAppStageDesc').textContent = cfg.desc;

      if (receiptText) {
        document.getElementById('tgAppReceiptText').textContent = receiptText;
      }

      for (let i = 0; i < 4; i++) {
        const seg = document.getElementById(`tgSeg_${i}`);
        const node = document.getElementById(`tgNode_${i}`);
        [seg, node].forEach(el => {
          if (!el) return;
          el.classList.remove('active', 'done');
          if (i < cfg.idx || step === 'completed') el.classList.add('done');
          else if (i === cfg.idx) el.classList.add('active');
        });
      }
    }

    window.setTgTrackerLang = function(l) {
      currentLang = l;
      localStorage.setItem('iqbol_lang', l);
      document.querySelectorAll('.tg-lang-b').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === l));
      renderTelegramTrackerState(currentTrackedId, lastFetchedData.step, lastFetchedData.eta, lastFetchedData.receiptText);
    };

    async function fetchAndSyncOrder() {
      try {
        const listRes = await fetch(`${API_URL}/order/latest-list`);
        const listData = await listRes.json();
        if (listData && listData.success && Array.isArray(listData.orders) && listData.orders.length > 0) {
          const barEl = document.getElementById('tgActiveOrdersBar');
          barEl.style.display = 'flex';
          if (!currentTrackedId) {
            currentTrackedId = listData.orders[0].orderId;
          }
          barEl.innerHTML = listData.orders.map(o => `
            <button type="button" class="tg-order-chip ${o.orderId === currentTrackedId ? 'active' : ''}" onclick="window.selectTgOrder('${o.orderId}')">
              #${o.orderId} (${o.customerName || 'Mijoz'})
            </button>
          `).join('');
        }

        if (currentTrackedId) {
          const stRes = await fetch(`${API_URL}/order/status/${currentTrackedId}`);
          const stData = await stRes.json();
          if (stData && stData.success) {
            lastFetchedData = { step: stData.step, eta: stData.eta, receiptText: stData.receiptText };
            renderTelegramTrackerState(currentTrackedId, stData.step, stData.eta, stData.receiptText);
          } else {
            const localRec = localStorage.getItem('iqbol_active_order_details') || '';
            lastFetchedData = { step: 'accepted', eta: '', receiptText: localRec };
            renderTelegramTrackerState(currentTrackedId, 'accepted', '', localRec);
          }
        } else {
          renderTelegramTrackerState('', 'accepted', '', '');
        }
      } catch (e) {}
    }

    window.selectTgOrder = function(ordId) {
      currentTrackedId = ordId;
      localStorage.setItem('iqbol_active_order', ordId);
      fetchAndSyncOrder();
    };

    document.getElementById('tgManualSearchBtn').addEventListener('click', () => {
      let val = document.getElementById('tgManualOrderIdInput').value.trim().toUpperCase().replace('#', '');
      if (!val) return;
      if (!val.startsWith('IQB-')) val = 'IQB-' + val;
      currentTrackedId = val;
      fetchAndSyncOrder();
    });

    fetchAndSyncOrder();
    setInterval(fetchAndSyncOrder, 2500);
    return;
  }

  /* ==========================================================================
     ODDIY SAYT REJIMI (BARCHA NARSALAR 100% UZ / RU / EN TILIGA TARJIMA QILINGAN)
     ========================================================================== */
  const lensIntroStyle = document.createElement('style');
  lensIntroStyle.textContent = `
    #iqbolLensPortal {
      position: fixed; inset: 0; z-index: 99999;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; pointer-events: all; user-select: none;
    }
    .portal-iris-window {
      position: relative; width: 250px; height: 250px; border-radius: 50%;
      box-shadow: 0 0 0 250vmax #04110c, 0 0 60px rgba(212, 175, 55, 0.75), inset 0 0 40px rgba(212, 175, 55, 0.65);
      border: 2.5px solid #d4af37; display: flex; align-items: center; justify-content: center;
      overflow: hidden; transition: transform 1.2s cubic-bezier(0.85, 0, 0.15, 1), border-color 0.8s ease;
      will-change: transform; z-index: 2;
    }
    .portal-reel-backdrop {
      position: absolute; inset: 0; border-radius: 50%;
      background-size: cover; background-position: center;
      filter: brightness(0.42) contrast(1.15); transform: scale(1.15);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .portal-inner-content {
      position: relative; z-index: 3; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .portal-crown-badge {
      width: 58px; height: 58px; border-radius: 50%;
      background: linear-gradient(135deg, #fff6d1, #d4af37, #9b7615);
      color: #061710; display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem; box-shadow: 0 0 30px rgba(212, 175, 55, 0.9);
      margin-bottom: 0.55rem; animation: pulseBadge 1.5s infinite ease-in-out;
    }
    .portal-brand-name {
      font-family: var(--font-display, 'Cormorant Garamond', serif);
      font-size: 2.45rem; font-weight: 800; letter-spacing: 0.16em;
      color: #ffffff; text-shadow: 0 4px 20px rgba(0, 0, 0, 0.85); line-height: 1;
    }
    .portal-pct-counter {
      margin-top: 0.45rem; font-size: 0.95rem; font-weight: 800; letter-spacing: 0.2em;
      color: #f3d889; background: rgba(5, 18, 13, 0.75); padding: 3px 12px;
      border-radius: 99px; border: 1px solid rgba(212, 175, 55, 0.4);
    }
    .portal-orbit-svg {
      position: absolute; width: 370px; height: 370px; z-index: 3;
      pointer-events: none; animation: orbitSpin 16s linear infinite;
      transition: opacity 0.5s ease, transform 0.9s cubic-bezier(0.85, 0, 0.15, 1);
    }
    .portal-orbit-svg text {
      fill: #f3d889; font-size: 11.5px; font-weight: 700;
      letter-spacing: 5.2px; text-transform: uppercase;
    }
    .portal-shockwave {
      position: absolute; width: 250px; height: 250px; border-radius: 50%;
      border: 2px solid rgba(243, 216, 137, 0.8); box-shadow: 0 0 50px rgba(212, 175, 55, 0.6);
      z-index: 3; pointer-events: none; opacity: 0;
    }
    .portal-bottom-caption {
      position: absolute; bottom: 7%; z-index: 4; text-align: center;
      color: rgba(255, 255, 255, 0.7); font-size: 0.78rem;
      letter-spacing: 0.3em; text-transform: uppercase; transition: opacity 0.4s ease;
    }
    #iqbolLensPortal.lens-open { pointer-events: none; }
    #iqbolLensPortal.lens-open .portal-reel-backdrop,
    #iqbolLensPortal.lens-open .portal-inner-content,
    #iqbolLensPortal.lens-open .portal-bottom-caption { opacity: 0; transform: scale(0.8); }
    #iqbolLensPortal.lens-open .portal-orbit-svg { opacity: 0; transform: scale(2.4) rotate(45deg); }
    #iqbolLensPortal.lens-open .portal-iris-window { transform: scale(18); border-color: rgba(212, 175, 55, 0); }
    #iqbolLensPortal.lens-open .portal-shockwave { animation: shockwaveExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

    .about-section, .why-section, .menu-section, .reservation-section, .gallery-section, .testimonials-section, .location-section, #dishesGrid {
      opacity: 1 !important; visibility: visible !important; transform: none !important;
    }

    @media (min-width: 992px) {
      .iqbol-cursor-dot, .iqbol-cursor-ring {
        position: fixed; top: -100px; left: -100px; pointer-events: none; z-index: 99998;
        border-radius: 50%; transform: translate(-50%, -50%); opacity: 0; transition: opacity 0.25s ease;
      }
      .iqbol-cursor-dot { width: 7px; height: 7px; background: #d4af37; box-shadow: 0 0 10px #d4af37; }
      .iqbol-cursor-ring {
        width: 36px; height: 36px; border: 1.5px solid rgba(212, 175, 55, 0.55);
        background: rgba(212, 175, 55, 0.04); transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s, opacity 0.25s;
      }
      body.cursor-active .iqbol-cursor-dot, body.cursor-active .iqbol-cursor-ring { opacity: 1; }
      body.cursor-hover .iqbol-cursor-ring { width: 56px; height: 56px; border-color: #f3d889; background: rgba(212, 175, 55, 0.15); }
    }

    .dish-card { position: relative; transform-style: preserve-3d; will-change: transform; }
    .dish-card::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: radial-gradient(380px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(243, 216, 137, 0.16), transparent 60%);
      opacity: 0; transition: opacity 0.3s ease; z-index: 3;
    }
    .dish-card.tilting::after { opacity: 1; }

    #waiterFloatBtn {
      position: fixed; bottom: 24px; left: 24px; z-index: 990;
      display: inline-flex; align-items: center; gap: 10px;
      padding: 0.72rem 1.2rem; border-radius: 999px;
      background: linear-gradient(135deg, #112e23, #071912); color: #f3d889;
      border: 1.5px solid #d4af37; box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.25);
      font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.25s ease;
    }
    #waiterFloatBtn:hover { transform: translateY(-3px) scale(1.02); }
    #waiterFloatBtn .bell-icon-wrap {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, #f3d889, #d4af37); color: #071912;
      display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem;
    }
    #waiterFloatBtn .bell-icon-wrap i { animation: ringBell 2.5s infinite ease-in-out; }
    @keyframes ringBell {
      0%, 80%, 100% { transform: rotate(0); }
      85% { transform: rotate(16deg); }
      90% { transform: rotate(-16deg); }
      95% { transform: rotate(10deg); }
    }

    .btn-go-tg-bot {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      width: 100%; padding: 0.85rem 1.3rem; border-radius: 999px;
      background: linear-gradient(135deg, #24a1de, #1b82b5); color: #ffffff !important;
      font-weight: 800; font-size: 0.92rem; border: none;
      box-shadow: 0 8px 22px rgba(36, 161, 222, 0.4); cursor: pointer;
      text-decoration: none !important; margin-bottom: 0.65rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn-go-tg-bot:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(36, 161, 222, 0.6); }

    .service-tabs-nav {
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
      background: var(--bg-card); padding: 5px; border-radius: 12px;
      border: 1px solid var(--border-color); margin-bottom: 1.1rem;
    }
    .service-tab-btn {
      padding: 0.6rem; border-radius: 9px; border: none; background: transparent;
      color: var(--text-muted); font-weight: 700; font-size: 0.82rem; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s ease;
    }
    .service-tab-btn.active {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #091e16; box-shadow: 0 3px 10px rgba(212, 175, 55, 0.3);
    }
    .quick-table-chips { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 0.75rem; scrollbar-width: none; }
    .quick-table-chip {
      padding: 5px 11px; border-radius: 99px; border: 1px solid var(--border-gold);
      background: var(--bg-surface); color: var(--text-main); font-size: 0.75rem;
      font-weight: 700; white-space: nowrap; cursor: pointer; transition: all 0.2s;
    }
    .quick-table-chip.active, .quick-table-chip:hover { background: var(--accent-gold); color: #091e16; }

    .waiter-action-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.65rem; margin-top: 0.5rem; }
    .waiter-action-card {
      display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
      padding: 0.9rem; border-radius: 14px; background: var(--bg-card);
      border: 1.5px solid var(--border-gold); color: var(--text-main);
      font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: all 0.2s ease; text-align: left;
    }
    .waiter-action-card:hover {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #091e16; transform: translateY(-2px);
    }
    .waiter-action-card i { font-size: 1.35rem; color: var(--accent-gold); }
    .waiter-action-card:hover i { color: #091e16; }

    .qr-stand-preview {
      background: linear-gradient(145deg, #0d291e, #06150f); border: 2px solid #d4af37;
      border-radius: 18px; padding: 1.25rem; color: #ffffff; text-align: center;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4); margin-bottom: 1rem;
    }
    .qr-img-box {
      width: 175px; height: 175px; margin: 0.75rem auto; padding: 10px;
      background: #ffffff; border-radius: 14px; border: 2px solid #f3d889;
      display: flex; align-items: center; justify-content: center;
    }
    .qr-img-box img { width: 100%; height: 100%; object-fit: contain; }

    @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulseBadge {
      0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(212, 175, 55, 0.7); }
      50% { transform: scale(1.08); box-shadow: 0 0 45px rgba(243, 216, 137, 1); }
    }
    @keyframes shockwaveExpand { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(8); opacity: 0; } }
    @media (max-width: 576px) {
      .portal-iris-window { width: 210px; height: 210px; }
      .portal-orbit-svg { width: 310px; height: 310px; }
      .portal-brand-name { font-size: 2rem; }
      #waiterFloatBtn { bottom: 16px; left: 14px; padding: 0.55rem 0.9rem; font-size: 0.76rem; }
      .waiter-action-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(lensIntroStyle);

  const REEL_DISH_PHOTOS = [
    'https://admin.easymenu.uz/media/menu/items/IMG_1559_ivfhlk7_b4QiKZs_1xvVAnx_91qKrDo_7q493Pq_BSjYFYO.jpg',
    'https://admin.easymenu.uz/media/menu/items/IMG_1546_pEeqfr3.jpg',
    'https://admin.easymenu.uz/media/menu/items/IMG_1613.jpg',
    'https://admin.easymenu.uz/media/menu/items/IMG_1518_emfhioR.jpg'
  ];

  const lensPortal = document.createElement('div');
  lensPortal.id = 'iqbolLensPortal';
  lensPortal.innerHTML = `
    <svg class="portal-orbit-svg" viewBox="0 0 300 300">
      <defs><path id="textCirclePath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" /></defs>
      <text><textPath href="#textCirclePath" startOffset="0%">• IQBOL OILAVIY RESTORAN • QARSHI • MILLIY VA UYG'UR TAOMLARI</textPath></text>
    </svg>
    <div class="portal-shockwave"></div>
    <div class="portal-iris-window">
      <div id="portalReelBg" class="portal-reel-backdrop" style="background-image: url('${REEL_DISH_PHOTOS[0]}');"></div>
      <div class="portal-inner-content">
        <div class="portal-crown-badge"><i class="fas fa-crown"></i></div>
        <div class="portal-brand-name">IQBOL</div>
        <div id="portalPctText" class="portal-pct-counter">0%</div>
      </div>
    </div>
    <div id="portalCaptionTxt" class="portal-bottom-caption">Lazzat olami yuklanmoqda...</div>
  `;
  document.body.appendChild(lensPortal);

  const reelBgEl = document.getElementById('portalReelBg');
  const pctTextEl = document.getElementById('portalPctText');
  let reelIdx = 0;
  let loadPct = 0;

  const reelSwitcher = setInterval(() => {
    reelIdx = (reelIdx + 1) % REEL_DISH_PHOTOS.length;
    if (reelBgEl) {
      reelBgEl.style.backgroundImage = `url('${REEL_DISH_PHOTOS[reelIdx]}')`;
      reelBgEl.style.transform = `scale(${1.1 + (reelIdx % 2) * 0.08})`;
    }
  }, 300);

  function triggerPortalOpen() {
    if (lensPortal.classList.contains('lens-open')) return;
    clearInterval(reelSwitcher);
    lensPortal.classList.add('lens-open');
    setTimeout(() => { lensPortal.remove(); }, 1200);
  }

  const pctInterval = setInterval(() => {
    loadPct += Math.floor(Math.random() * 10) + 6;
    if (loadPct >= 100) {
      loadPct = 100;
      clearInterval(pctInterval);
      if (pctTextEl) pctTextEl.textContent = '100%';
      setTimeout(triggerPortalOpen, 150);
      return;
    }
    if (pctTextEl) pctTextEl.textContent = loadPct + '%';
  }, 40);

  lensPortal.addEventListener('click', () => {
    clearInterval(pctInterval);
    triggerPortalOpen();
  });

  if (window.innerWidth >= 992) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'iqbol-cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'iqbol-cursor-ring';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
      document.body.classList.add('cursor-active');
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      const interactive = e.target.closest('a, button, .dish-card, .gallery-item, input, select');
      document.body.classList.toggle('cursor-hover', Boolean(interactive));
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 992) return;
    const card = e.target.closest('.dish-card');
    document.querySelectorAll('.dish-card.tilting').forEach(c => {
      if (c !== card) { c.style.transform = ''; c.classList.remove('tilting'); }
    });
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    card.classList.add('tilting');
    card.style.transform = `perspective(750px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
  });

  async function sendSingleFallbackTelegram(text, replyMarkup = null) {
    try {
      const payload = { chat_id: PRIMARY_ADMIN_CHAT_ID, text };
      if (replyMarkup) payload.reply_markup = replyMarkup;
      const res = await fetch(`https://api.telegram.org/bot${DIRECT_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return Boolean(data && data.ok);
    } catch (e) {
      return false;
    }
  }

  function buildChefAndCourierInlineKeyboard(orderId) {
    return {
      inline_keyboard: [
        [
          { text: "🔥 Chef: 10-15 daq", callback_data: `c_15_${orderId}` },
          { text: "🔥 Chef: 20-25 daq", callback_data: `c_25_${orderId}` },
          { text: "🔥 Chef: 30-40 daq", callback_data: `c_35_${orderId}` }
        ],
        [
          { text: "👨‍🍳✅ CHEF: OVQAT TAYYOR BO'LDI!", callback_data: `c_rdy_${orderId}` }
        ],
        [
          { text: "🛵 Dastavshik: Yo'lga chiqdim", callback_data: `d_way_${orderId}` },
          { text: "🏁 Topshirildi (Yopish)", callback_data: `d_end_${orderId}` }
        ]
      ]
    };
  }

  const PAYMENT_APPS = {
    Click: {
      name: 'Click', color: '#0099ff', webUrl: 'https://my.click.uz/', appScheme: 'clickup://',
      androidIntent: 'intent://#Intent;scheme=clickup;package=air.com.ssdsoftwaresolutions.clickuz;S.browser_fallback_url=https%3A%2F%2Fmy.click.uz%2F;end'
    },
    Payme: {
      name: 'Payme', color: '#00cccc', webUrl: 'https://payme.uz/', appScheme: 'payme://',
      androidIntent: 'intent://#Intent;scheme=payme;package=uz.dida.payme;S.browser_fallback_url=https%3A%2F%2Fpayme.uz%2F;end'
    },
    Paynet: {
      name: 'Paynet', color: '#00a651', webUrl: 'https://paynet.uz/', appScheme: 'paynet://',
      androidIntent: 'intent://#Intent;scheme=paynet;package=uz.paynet.app;S.browser_fallback_url=https%3A%2F%2Fpaynet.uz%2F;end'
    }
  };

  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('iqbol_user')) || null;
    if (currentUser && !currentUser.email) {
      localStorage.removeItem('iqbol_user');
      currentUser = null;
    }
  } catch (e) { currentUser = null; }

  let tgBotUsername = 'iqbol_reservations_bot';
  fetch(`${API_URL}/bot-info`).then(r => r.json()).then(d => { if (d && d.username) tgBotUsername = d.username; }).catch(() => {});
  fetch(`https://api.telegram.org/bot${DIRECT_BOT_TOKEN}/getMe`).then(r => r.json()).then(d => { if (d && d.ok && d.result && d.result.username) tgBotUsername = d.result.username; }).catch(() => {});

  window.getTelegramBotOrderUrl = function(orderId) {
    const cleanOrd = String(orderId || localStorage.getItem('iqbol_active_order') || '').replace('#', '');
    return cleanOrd ? `https://t.me/${tgBotUsername}?start=track_${cleanOrd}` : `https://t.me/${tgBotUsername}`;
  };

  const drawerEl = document.getElementById('mobileNavDrawer');
  const drawerLinksEl = drawerEl ? drawerEl.querySelector('.drawer-links') : null;
  const mobileGoogleEl = document.getElementById('mobileGoogleContainer');
  const mobileChipEl = document.getElementById('mobileUserChip');
  if (drawerEl && drawerLinksEl) {
    if (mobileGoogleEl) drawerEl.insertBefore(mobileGoogleEl, drawerLinksEl);
    if (mobileChipEl) drawerEl.insertBefore(mobileChipEl, drawerLinksEl);
  }

  const customStyle = document.createElement('style');
  customStyle.textContent = `
    html body #header #googleSignInContainer.force-hide-auth,
    html body #header #userProfileChip.force-hide-auth,
    html body #mobileGoogleContainer.force-hide-auth,
    html body #mobileUserChip.force-hide-auth,
    html body #checkoutLoginNotice.force-hide-auth {
      display: none !important; width: 0px !important; min-width: 0px !important; max-width: 0px !important;
      height: 0px !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important;
      visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; position: absolute !important; left: -9999px !important;
    }
    @media (min-width: 901px) {
      html body #header #googleSignInContainer:not(.force-hide-auth) { width: auto !important; max-width: none !important; overflow: visible !important; display: inline-flex !important; }
      html body #header #userProfileChip.user-profile-chip:not(.force-hide-auth) {
        display: inline-flex !important; align-items: center !important; flex-wrap: nowrap !important; gap: 7px !important;
        padding: 3px 6px 3px 4px !important; height: 38px !important; border-radius: 999px !important;
        background: rgba(15, 44, 34, 0.88) !important; border: 1px solid rgba(212, 175, 55, 0.5) !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18) !important; max-width: 245px !important;
      }
      .header.scrolled #userProfileChip.user-profile-chip:not(.force-hide-auth) { background: var(--bg-card) !important; border-color: var(--border-gold) !important; }
    }
    @media (max-width: 900px) {
      html body #header #googleSignInContainer, html body #header #userProfileChip, html body #header #userProfileChip.user-profile-chip { display: none !important; }
      html body #header #themeToggle, html body #header #cartBtn {
        display: inline-flex !important; width: 36px !important; height: 36px !important; min-width: 36px !important;
        border-radius: 50% !important; align-items: center !important; justify-content: center !important; flex-shrink: 0 !important; visibility: visible !important; opacity: 1 !important;
      }
      html body #header .header-actions { width: 100% !important; display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 6px !important; }
      html body #header #headerReservationBtn { margin-left: 0 !important; margin-right: auto !important; padding: 0.4rem 0.75rem !important; font-size: 0.74rem !important; }
      html body #mobileNavDrawer .brand-logo { display: flex !important; }
      html body #mobileNavDrawer .contact-mini { display: flex !important; flex-direction: column !important; gap: 6px !important; margin-bottom: 14px !important; font-size: 0.82rem !important; color: var(--text-muted) !important; }
      html body #mobileNavDrawer .contact-mini i { color: var(--accent-gold) !important; width: 18px !important; }
    }
    @media (max-width: 420px) {
      html body #header #headerReservationBtn i { display: none !important; }
      html body #header #headerReservationBtn { padding: 0.36rem 0.55rem !important; font-size: 0.68rem !important; }
      html body #header #themeToggle, html body #header #cartBtn, html body #header #hamburgerBtn { width: 33px !important; height: 33px !important; min-width: 33px !important; }
    }
    html body #header #googleSignInContainer iframe { transform: scale(0.92) !important; transform-origin: center center !important; }
    .lang-switcher { display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 999px; padding: 3px; gap: 2px; }
    .header.scrolled .lang-switcher { background: var(--bg-card); border-color: var(--border-color); }
    .lang-btn { background: transparent; border: none; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 5px 9px; border-radius: 999px; cursor: pointer; transition: all 0.2s ease; }
    .header.scrolled .lang-btn { color: var(--text-main); }
    .lang-btn.active { background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark)); color: #112219 !important; box-shadow: 0 2px 8px rgba(212, 175, 55, 0.35); }
    .payment-methods-box { margin: 0.5rem 0; padding: 1rem; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border-gold); }
    .payment-methods-title { font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.65rem; display: flex; align-items: center; gap: 0.4rem; }
    .payment-methods-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
    .pay-option-btn { padding: 0.65rem 0.5rem; border-radius: 8px; border: 1.5px solid var(--border-color); background: var(--bg-surface); color: var(--text-main); font-weight: 700; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; cursor: pointer; transition: all 0.2s ease; }
    .pay-option-btn.active { border-color: var(--accent-gold); background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark)); color: #112219; }
    .card-Display-box { margin-top: 0.85rem; padding: 0.85rem; border-radius: 10px; background: var(--bg-surface); border: 1.5px dashed var(--accent-gold); display: none; flex-direction: column; gap: 0.6rem; text-align: center; }
    .card-Display-box.visible { display: flex; }
    .card-number-row { display: flex; align-items: center; justify-content: space-between; background: var(--bg-card); padding: 0.55rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-color); }
    .card-number-val { font-family: monospace; font-size: 1.05rem; font-weight: 800; letter-spacing: 0.05em; color: var(--accent-gold); }
    .btn-copy-card { background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark)); color: #112219; border: none; border-radius: 6px; padding: 0.35rem 0.65rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.3rem; }
    .open-app-btn { width: 100%; padding: 0.7rem; border-radius: 8px; font-weight: 700; font-size: 0.88rem; color: #fff; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; transition: opacity 0.2s; }
    .open-app-btn:hover { opacity: 0.92; }
    #userProfileChip .user-avatar { width: 28px !important; height: 28px !important; min-width: 28px !important; border-radius: 50% !important; object-fit: cover !important; border: 1.5px solid var(--accent-gold) !important; }
    #userProfileChip .user-info { display: inline-flex !important; align-items: center !important; gap: 6px !important; overflow: hidden !important; }
    #userProfileChip .user-name { display: flex !important; flex-direction: column !important; justify-content: center !important; font-size: 0.72rem !important; font-weight: 700 !important; color: #ffffff !important; line-height: 1.15 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 155px !important; }
    .header.scrolled #userProfileChip .user-name { color: var(--text-main) !important; }
    #userProfileChip .user-name small { font-size: 0.65rem !important; color: var(--accent-gold) !important; font-weight: 700 !important; cursor: pointer !important; }
    #userProfileChip .btn-logout { width: 24px !important; height: 24px !important; min-width: 24px !important; border-radius: 50% !important; background: rgba(255, 107, 107, 0.15) !important; border: 1px solid rgba(255, 107, 107, 0.35) !important; color: #ff6b6b !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; font-size: 0.7rem !important; padding: 0 !important; cursor: pointer !important; transition: all 0.2s ease !important; }
    #userProfileChip .btn-logout:hover { background: #ff6b6b !important; color: #ffffff !important; }
    #mobileGoogleContainer:not(.force-hide-auth) { display: flex !important; justify-content: center !important; margin-bottom: 1.25rem !important; padding-bottom: 1rem !important; border-bottom: 1px solid var(--border-color) !important; }
    #mobileUserChip.mobile-user-chip:not(.force-hide-auth) { display: flex !important; align-items: center !important; gap: 12px !important; padding: 12px 14px !important; background: var(--bg-card) !important; border: 1.5px solid var(--border-gold) !important; border-radius: 14px !important; margin-bottom: 1.5rem !important; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12) !important; }
    #mobileUserChip .user-avatar { width: 42px !important; height: 42px !important; min-width: 42px !important; border-radius: 50% !important; border: 2px solid var(--accent-gold) !important; object-fit: cover !important; }
    #mobileUserChip .user-name-mobile { font-size: 0.9rem !important; font-weight: 700 !important; color: var(--text-main) !important; line-height: 1.3 !important; }
    #mobileUserChip .user-name-mobile small { display: block !important; font-size: 0.75rem !important; color: var(--accent-gold) !important; margin-top: 2px !important; }
    #mobileUserChip .btn-logout-mobile { background: rgba(201, 64, 91, 0.14) !important; color: #ff6b6b !important; border: 1px solid rgba(201, 64, 91, 0.35) !important; padding: 5px 10px !important; border-radius: 8px !important; font-size: 0.75rem !important; font-weight: 700 !important; margin-top: 6px !important; display: inline-flex !important; align-items: center !important; gap: 5px !important; cursor: pointer !important; }
    @keyframes spinLoader { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .pay-spinner { width: 56px; height: 56px; border: 4px solid rgba(212, 175, 55, 0.2); border-top-color: var(--accent-gold); border-radius: 50%; animation: spinLoader 1s linear infinite; margin: 0 auto 1.2rem auto; }
    @media (max-width: 576px) { .lang-btn { padding: 4px 6px; font-size: 0.68rem; } .card-number-val { font-size: 0.92rem; } }
  `;
  document.head.appendChild(customStyle);

  const headerActions = document.querySelector('.header-actions');
  if (headerActions && !document.querySelector('.lang-switcher')) {
    const langDiv = document.createElement('div');
    langDiv.className = 'lang-switcher';
    langDiv.innerHTML = `<button type="button" class="lang-btn active" data-lang="uz">UZ</button><button type="button" class="lang-btn" data-lang="ru">RU</button><button type="button" class="lang-btn" data-lang="en">EN</button>`;
    headerActions.insertBefore(langDiv, headerActions.firstChild);
  }

  /* ==========================================================================
     UI DICTIONARY (MODALLAR, SAVAT, TUGMALAR VA XABARLAR UCHUN 3 TILLI LUG'AT)
     ========================================================================== */
  const UI_TEXTS = {
    uz: {
      priceLabel: 'Narxi:',
      hitBadge: 'Hit',
      noDishes: 'Hech qanday taom topilmadi',
      emptyCart: "Savat bo'sh",
      addedToCart: "savatga qo'shildi!",
      delivZoneLabel: 'Yetkazish hududi *',
      delivInner: "Shahar ichi (10 000 so'm)",
      delivOuter: "Shahar tashqari (15 000 so'm)",
      delivInnerShort: 'Yetkazish (Shahar ichi): 10 000',
      delivOuterShort: 'Yetkazish (Tashqari): 15 000',
      serviceFeeLabel: 'Xizmat haqi',
      payMethodTitle: "To'lov usulini tanlang:",
      payCash: 'Naqd',
      cardHint: "Karta raqamini nusxalab, ilova orqali to'lov qiling:",
      copyBtn: 'Nusxalash',
      openAppPay: "ilovasini ochish va To'lash",
      afterPayHint: '2. To\'lov qilgach, pastdagi "Buyurtmani yuborish" tugmasini bosing 👇',
      waiterFloatSuffix: 'Ofitsiant & QR',
      tabWaiter: 'Ofitsiant chaqirish',
      tabQr: 'Stol QR-kodi',
      waiterTitle: 'Tezkor Stol Xizmati',
      waiterSub: 'Stolingizni tanlang va kerakli tugmani bosing — ofitsiant darhol yetib keladi:',
      waiterInputPh: 'Stol raqami (masalan: Stol #7 yoki VIP #2)',
      waiterNotePh: "Qo'shimcha izoh (ixtiyoriy: 2 ta ko'k choy, salfetka...)",
      wAct1Title: 'Ofitsiant chaqirish', wAct1Sub: 'Xizmatchi stolga keladi',
      wAct2Title: "Hisobni so'rash", wAct2Sub: "To'lov uchun chek",
      wAct3Title: 'Choy va Issiq non', wAct3Sub: "Tezkor qo'shimcha",
      wAct4Title: 'Stolni tozalash', wAct4Sub: 'Salfetka / idishlarni olish',
      qrScanHint: '📱 Menyuni ochish va Ofitsiant chaqirish',
      qrHallLbl: 'Zal turi:', qrNumLbl: 'Stol raqami:', qrPrintBtn: 'QR-Stendni Chop etish',
      goTgBotBtn: "Telegram botga o'tish (Jarayonni ko'rish)",
      orderAcceptedTitle: 'Buyurtmangiz qabul qilindi!',
      orderAcceptedSub: 'Buyurtma raqami:',
      orderAcceptedMsg: "📲 Buyurtmangiz tayyor bo'lish jarayonini Telegram botimizdagi «Open» tugmasi orqali jonli kuzatishingiz mumkin!",
      connectPhoneBtn: '+ Raqamni ulash',
      bookedWord: 'BAND',
      loadingWord: 'Yuklanmoqda...',
      tableWord: 'Stol', cabinWord: 'Kabina', placeWord: 'Joy',
      hallMain: 'Asosiy zal (35 ta stol)', hall2: '2-zal (8 ta stol)', hallVip: 'VIP kabina (9 ta)', hallOut: "Ko'cha / Tashqi ayvon (40 ta joy)"
    },
    ru: {
      priceLabel: 'Цена:',
      hitBadge: 'Хит',
      noDishes: 'Блюда не найдены',
      emptyCart: 'Корзина пуста',
      addedToCart: 'добавлено в корзину!',
      delivZoneLabel: 'Зона доставки *',
      delivInner: 'По городу (10 000 сум)',
      delivOuter: 'За городом (15 000 сум)',
      delivInnerShort: 'Доставка (По городу): 10 000',
      delivOuterShort: 'Доставка (За город): 15 000',
      serviceFeeLabel: 'Обслуживание',
      payMethodTitle: 'Выберите способ оплаты:',
      payCash: 'Наличными',
      cardHint: 'Скопируйте номер карты и оплатите через приложение:',
      copyBtn: 'Скопировать',
      openAppPay: '— открыть и оплатить',
      afterPayHint: '2. После оплаты нажмите кнопку «Отправить заказ» ниже 👇',
      waiterFloatSuffix: 'Официант & QR',
      tabWaiter: 'Вызов официанта',
      tabQr: 'QR-код стола',
      waiterTitle: 'Быстрое обслуживание стола',
      waiterSub: 'Выберите ваш стол и нажмите нужную кнопку — официант сразу подойдет:',
      waiterInputPh: 'Номер стола (например: Стол #7 или VIP #2)',
      waiterNotePh: 'Примечание (необязательно: 2 зеленых чая, салфетки...)',
      wAct1Title: 'Позвать официанта', wAct1Sub: 'Официант подойдет к столу',
      wAct2Title: 'Попросить счет', wAct2Sub: 'Чек для оплаты',
      wAct3Title: 'Чай и горячая лепешка', wAct3Sub: 'Быстрый дозаказ',
      wAct4Title: 'Убрать со стола', wAct4Sub: 'Салфетки / уборка посуды',
      qrScanHint: '📱 Открыть меню и вызвать официанта',
      qrHallLbl: 'Тип зала:', qrNumLbl: 'Номер стола:', qrPrintBtn: 'Распечатать QR-стенд',
      goTgBotBtn: 'Перейти в Telegram-бот (Отслеживать заказ)',
      orderAcceptedTitle: 'Ваш заказ принят!',
      orderAcceptedSub: 'Номер заказа:',
      orderAcceptedMsg: '📲 Отслеживайте процесс приготовления вашего заказа в реальном времени через кнопку «Open» в нашем Telegram-боте!',
      connectPhoneBtn: '+ Привязать номер',
      bookedWord: 'ЗАНЯТО',
      loadingWord: 'Загрузка...',
      tableWord: 'Стол', cabinWord: 'Кабина', placeWord: 'Место',
      hallMain: 'Основной зал (35 столов)', hall2: '2-й зал (8 столов)', hallVip: 'VIP кабина (9 кабинок)', hallOut: 'Терраса / Топчан (40 мест)'
    },
    en: {
      priceLabel: 'Price:',
      hitBadge: 'Hit',
      noDishes: 'No dishes found',
      emptyCart: 'Your cart is empty',
      addedToCart: 'added to cart!',
      delivZoneLabel: 'Delivery Zone *',
      delivInner: 'Inside city (10,000 UZS)',
      delivOuter: 'Outside city (15,000 UZS)',
      delivInnerShort: 'Delivery (City): 10,000',
      delivOuterShort: 'Delivery (Outskirts): 15,000',
      serviceFeeLabel: 'Service fee',
      payMethodTitle: 'Select payment method:',
      payCash: 'Cash',
      cardHint: 'Copy the card number and pay via the app:',
      copyBtn: 'Copy',
      openAppPay: '— Open App & Pay',
      afterPayHint: '2. After paying, click "Submit Order" below 👇',
      waiterFloatSuffix: 'Waiter & QR',
      tabWaiter: 'Call Waiter',
      tabQr: 'Table QR Code',
      waiterTitle: 'Quick Table Service',
      waiterSub: 'Select your table and tap a service button — our waiter will arrive right away:',
      waiterInputPh: 'Table number (e.g. Table #7 or VIP #2)',
      waiterNotePh: 'Extra note (optional: 2 green teas, napkins...)',
      wAct1Title: 'Call a Waiter', wAct1Sub: 'Waiter comes to your table',
      wAct2Title: 'Ask for the Bill', wAct2Sub: 'Bring receipt for payment',
      wAct3Title: 'Tea & Hot Bread', wAct3Sub: 'Quick add-on order',
      wAct4Title: 'Clean the Table', wAct4Sub: 'Napkins / clear dishes',
      qrScanHint: '📱 Open Menu & Call Waiter',
      qrHallLbl: 'Hall type:', qrNumLbl: 'Table number:', qrPrintBtn: 'Print QR Stand',
      goTgBotBtn: 'Open Telegram Bot (Track Order Live)',
      orderAcceptedTitle: 'Your Order is Accepted!',
      orderAcceptedSub: 'Order ID:',
      orderAcceptedMsg: '📲 You can track your meal preparation live via the "Open" button in our Telegram bot!',
      connectPhoneBtn: '+ Link Phone',
      bookedWord: 'BOOKED',
      loadingWord: 'Loading...',
      tableWord: 'Table', cabinWord: 'Cabin', placeWord: 'Seat',
      hallMain: 'Main Hall (35 tables)', hall2: '2nd Hall (8 tables)', hallVip: 'VIP Cabin (9 cabins)', hallOut: 'Outdoor Terrace (40 seats)'
    }
  };

  function tUI(key) {
    return (UI_TEXTS[currentLang] && UI_TEXTS[currentLang][key]) || UI_TEXTS.uz[key] || '';
  }

  window.copyRestaurantCard = function() {
    if (navigator.clipboard) navigator.clipboard.writeText(RESTAURANT_CARD_RAW).catch(() => {});
    showToast(`${RESTAURANT_CARD}`, 'fa-copy');
  };

  window.openPaymentApp = function(appKey) {
    const appInfo = PAYMENT_APPS[appKey];
    if (!appInfo) return;
    window.copyRestaurantCard();
    const ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) {
      window.location.href = appInfo.androidIntent;
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location.href = appInfo.appScheme;
      setTimeout(() => { if (!document.hidden) window.open(appInfo.webUrl, '_blank', 'noopener,noreferrer'); }, 1400);
    } else {
      window.open(appInfo.webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  /* ==========================================================================
     0.03 QR-STOL ANIQLASH + PRO OFITSIANT CHAQIRISH + STOL QR GENERATORI
     ========================================================================== */
  const qrTableParam = urlParams.get('table') || urlParams.get('stol');
  if (qrTableParam) {
    const formattedTable = isNaN(qrTableParam) ? qrTableParam : `Stol #${qrTableParam}`;
    localStorage.setItem('iqbol_qr_table', formattedTable);
    setTimeout(() => { showToast(`🪑 ${formattedTable}`, 'fa-chair'); }, 1500);
  }
  let savedQrTable = localStorage.getItem('iqbol_qr_table') || 'Stol #1';

  const cTableInputEl = document.getElementById('checkoutTable');
  if (cTableInputEl && savedQrTable) cTableInputEl.value = savedQrTable;

  const waiterBtn = document.createElement('button');
  waiterBtn.id = 'waiterFloatBtn';
  waiterBtn.type = 'button';
  waiterBtn.innerHTML = `
    <span class="bell-icon-wrap"><i class="fas fa-concierge-bell"></i></span>
    <span id="waiterBtnTxt">${savedQrTable} • ${tUI('waiterFloatSuffix')}</span>
  `;
  waiterBtn.onclick = () => window.openWaiterModal('waiter');
  document.body.appendChild(waiterBtn);

  const waiterModal = document.createElement('div');
  waiterModal.id = 'waiterServiceModal';
  waiterModal.className = 'modal-wrapper';
  waiterModal.innerHTML = `
    <div class="modal-overlay" onclick="window.closeWaiterModal()"></div>
    <div class="modal-card" style="max-width: 460px; padding: 1.75rem; text-align: center;">
      <button type="button" class="modal-close-btn" onclick="window.closeWaiterModal()"><i class="fas fa-times"></i></button>
      
      <div class="service-tabs-nav">
        <button type="button" id="tabBtnWaiter" class="service-tab-btn active" onclick="window.switchServiceTab('waiter')">
          <i class="fas fa-concierge-bell"></i> <span id="wTab1Txt">Ofitsiant chaqirish</span>
        </button>
        <button type="button" id="tabBtnQr" class="service-tab-btn" onclick="window.switchServiceTab('qr')">
          <i class="fas fa-qrcode"></i> <span id="wTab2Txt">Stol QR-kodi</span>
        </button>
      </div>

      <div id="serviceTabWaiter">
        <h3 id="wModalTitle" class="font-display" style="font-size: 1.55rem; color: var(--text-main); margin-bottom: 0.25rem;">Tezkor Stol Xizmati</h3>
        <p id="wModalSub" style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">Stolingizni tanlang va kerakli tugmani bosing — ofitsiant darhol yetib keladi:</p>

        <div class="quick-table-chips" id="quickTableChipsWrap">
          ${['Stol #1', 'Stol #2', 'Stol #3', 'Stol #5', 'Stol #7', 'Stol #10', 'VIP #1', 'VIP #2', 'VIP #3'].map(t => 
            `<button type="button" class="quick-table-chip ${t === savedQrTable ? 'active' : ''}" onclick="window.selectQuickTable('${t}')">${t}</button>`
          ).join('')}
        </div>

        <div style="text-align: left; margin-bottom: 0.75rem;">
          <input type="text" id="waiterTableInput" placeholder="Stol raqami" value="${savedQrTable}" style="width: 100%; padding: 0.7rem 0.95rem; font-size: 0.92rem; font-weight: 700; border-radius: 10px; border: 1.5px solid var(--border-gold); background: var(--bg-card); color: var(--text-main);" />
        </div>

        <div style="text-align: left; margin-bottom: 0.75rem;">
          <input type="text" id="waiterCustomNote" placeholder="Qo'shimcha izoh..." style="width: 100%; padding: 0.65rem 0.95rem; font-size: 0.84rem; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main);" />
        </div>

        <div id="waiterCooldownBox" style="display:none; padding:0.75rem; border-radius:12px; background:rgba(46,204,113,0.14); border:1px solid #2ecc71; color:#2ecc71; font-weight:700; font-size:0.84rem; margin-bottom:0.75rem;">
          <i class="fas fa-check-circle"></i> OK! (<span id="waiterCooldownTimer">45</span>s)
        </div>

        <div class="waiter-action-grid">
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('call', 'Ofitsiantni stolga chaqirish')">
            <i class="fas fa-user-tie"></i>
            <div>
              <div id="wAct1T">Ofitsiant chaqirish</div>
              <small id="wAct1S" style="font-weight:400; opacity:0.75; font-size:0.74rem;">Xizmatchi stolga keladi</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('bill', 'Hisobni (Chekni) olib kelish')">
            <i class="fas fa-file-invoice-dollar"></i>
            <div>
              <div id="wAct2T">Hisobni so'rash</div>
              <small id="wAct2S" style="font-weight:400; opacity:0.75; font-size:0.74rem;">To'lov uchun chek</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('tea_bread', 'Issiq non va choy olib kelish')">
            <i class="fas fa-mug-hot"></i>
            <div>
              <div id="wAct3T">Choy va Issiq non</div>
              <small id="wAct3S" style="font-weight:400; opacity:0.75; font-size:0.74rem;">Tezkor qo'shimcha</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('call', 'Stolni tozalash va salfetka olib kelish')">
            <i class="fas fa-broom"></i>
            <div>
              <div id="wAct4T">Stolni tozalash</div>
              <small id="wAct4S" style="font-weight:400; opacity:0.75; font-size:0.74rem;">Salfetka / idishlarni olish</small>
            </div>
          </button>
        </div>
      </div>

      <div id="serviceTabQr" style="display:none;">
        <div class="qr-stand-preview" id="qrPrintableCard">
          <div style="font-size:0.72rem; letter-spacing:0.22em; color:#f3d889; text-transform:uppercase; font-weight:700;">IQBOL RESTAURANT</div>
          <div id="qrPreviewTableTitle" class="font-display" style="font-size:1.7rem; font-weight:800; color:#ffffff; margin-top:2px;">${savedQrTable}</div>
          <div class="qr-img-box"><img id="qrCodeGeneratedImg" src="" alt="Stol QR Kodi" /></div>
          <div id="qrScanHintTxt" style="font-size:0.8rem; color:#f3d889; font-weight:700;">📱 Menyuni ochish va Ofitsiant chaqirish</div>
          <div id="qrPreviewUrlTxt" style="font-size:0.68rem; color:rgba(255,255,255,0.55); margin-top:4px; word-break:break-all;"></div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:0.85rem; text-align:left;">
          <div>
            <label id="qrHallLblTxt" style="font-size:0.74rem; font-weight:700; color:var(--text-main);">Zal turi:</label>
            <select id="qrGenHallSelect" onchange="window.updateGeneratedTableQr()" style="width:100%; padding:0.6rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main); font-weight:700; font-size:0.82rem;">
              <option value="Stol">Asosiy zal (1–35)</option>
              <option value="2-zal Stol">2-zal (1–8)</option>
              <option value="VIP">VIP kabina (1–9)</option>
              <option value="Ayvon">Tashqi ayvon (1–40)</option>
            </select>
          </div>
          <div>
            <label id="qrNumLblTxt" style="font-size:0.74rem; font-weight:700; color:var(--text-main);">Stol raqami:</label>
            <input type="number" id="qrGenNumInput" value="1" min="1" max="50" oninput="window.updateGeneratedTableQr()" style="width:100%; padding:0.6rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main); font-weight:700; font-size:0.85rem;" />
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-primary" style="flex:1;" onclick="window.printTableQrStand()">
            <i class="fas fa-print"></i> <span id="qrPrintBtnTxt">QR-Stendni Chop etish</span>
          </button>
          <button type="button" class="btn btn-outline-gold" onclick="window.copyTableQrLink()">
            <i class="fas fa-link"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(waiterModal);

  window.switchServiceTab = function(tab) {
    const isW = tab === 'waiter';
    document.getElementById('serviceTabWaiter').style.display = isW ? 'block' : 'none';
    document.getElementById('serviceTabQr').style.display = isW ? 'none' : 'block';
    document.getElementById('tabBtnWaiter').classList.toggle('active', isW);
    document.getElementById('tabBtnQr').classList.toggle('active', !isW);
    if (!isW) window.updateGeneratedTableQr();
  };

  window.selectQuickTable = function(tableName) {
    savedQrTable = tableName;
    localStorage.setItem('iqbol_qr_table', tableName);
    const inp = document.getElementById('waiterTableInput');
    if (inp) inp.value = tableName;
    if (cTableInputEl) cTableInputEl.value = tableName;
    const btnTxtEl = document.getElementById('waiterBtnTxt');
    if (btnTxtEl) btnTxtEl.textContent = `${tableName} • ${tUI('waiterFloatSuffix')}`;
    document.querySelectorAll('.quick-table-chip').forEach(c => {
      c.classList.toggle('active', c.textContent === tableName);
    });
  };

  window.updateGeneratedTableQr = function() {
    const hall = document.getElementById('qrGenHallSelect').value;
    const num = document.getElementById('qrGenNumInput').value || '1';
    const fullTableLabel = `${hall} #${num}`;
    const baseSiteUrl = window.location.origin && window.location.origin !== 'null'
      ? window.location.origin + window.location.pathname
      : 'https://iqbol2.vercel.app/';
    const fullQrUrl = `${baseSiteUrl}?table=${encodeURIComponent(fullTableLabel)}`;
    const qrApiImg = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(fullQrUrl)}`;

    const titleEl = document.getElementById('qrPreviewTableTitle');
    const imgEl = document.getElementById('qrCodeGeneratedImg');
    const urlEl = document.getElementById('qrPreviewUrlTxt');
    if (titleEl) titleEl.textContent = fullTableLabel;
    if (imgEl) imgEl.src = qrApiImg;
    if (urlEl) urlEl.textContent = fullQrUrl;
    window.selectQuickTable(fullTableLabel);
  };

  window.copyTableQrLink = function() {
    const urlEl = document.getElementById('qrPreviewUrlTxt');
    if (urlEl && navigator.clipboard) {
      navigator.clipboard.writeText(urlEl.textContent).catch(() => {});
      showToast('OK!', 'fa-copy');
    }
  };

  window.printTableQrStand = function() {
    const title = document.getElementById('qrPreviewTableTitle').textContent;
    const qrSrc = document.getElementById('qrCodeGeneratedImg').src;
    const printWin = window.open('', '_blank', 'width=500,height=650');
    if (!printWin) return;
    printWin.document.write(`
      <html>
        <head>
          <title>IQBOL QR - ${title}</title>
          <style>
            body { font-family: Georgia, serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; background:#f5f5f5; }
            .stand { width:320px; padding:28px; border-radius:24px; background:#091e16; color:#fff; border:4px solid #d4af37; text-align:center; }
            .sub { color:#f3d889; font-size:12px; letter-spacing:4px; text-transform:uppercase; }
            h1 { font-size:32px; margin:8px 0 4px 0; color:#fff; letter-spacing:3px; }
            h2 { font-size:24px; margin:4px 0 16px 0; color:#f3d889; }
            .qr-box { background:#fff; padding:14px; border-radius:18px; display:inline-block; border:3px solid #d4af37; }
            .qr-box img { width:210px; height:210px; display:block; }
            .foot { margin-top:16px; font-size:14px; color:#f3d889; font-family: sans-serif; font-weight:bold; }
          </style>
        </head>
        <body>
          <div class="stand">
            <div class="sub">Family Restaurant</div>
            <h1>IQBOL</h1>
            <h2>${title}</h2>
            <div class="qr-box"><img src="${qrSrc}" onload="setTimeout(() => { window.print(); }, 300);" /></div>
            <div class="foot">📱 Scan QR:<br>Menu • Order • Call Waiter</div>
          </div>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  window.openWaiterModal = function(defaultTab = 'waiter') {
    const inp = document.getElementById('waiterTableInput');
    if (inp && !inp.value && savedQrTable) inp.value = savedQrTable;
    window.switchServiceTab(defaultTab);
    waiterModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeWaiterModal = function() {
    waiterModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  let waiterCooldownInt = null;
  let isCallingWaiter = false;
  window.sendWaiterRequest = async function(actionType, defaultNote) {
    if (isCallingWaiter) return;
    const inp = document.getElementById('waiterTableInput');
    const customNoteEl = document.getElementById('waiterCustomNote');
    const tableVal = inp ? inp.value.trim() : '';
    if (!tableVal) {
      if (inp) inp.focus();
      return;
    }
    isCallingWaiter = true;
    window.selectQuickTable(tableVal);
    const noteVal = (customNoteEl && customNoteEl.value.trim()) ? `${defaultNote} (${customNoteEl.value.trim()})` : defaultNote;
    const customerName = currentUser ? currentUser.name : 'Mehmon';
    const customerPhone = currentUser ? (currentUser.phone || 'Kiritilmagan') : 'Kiritilmagan';

    let delivered = false;
    try {
      const res = await fetch(`${API_URL}/waiter/call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: tableVal, actionType, customerName, customerPhone, note: noteVal })
      });
      if (res.ok) delivered = true;
    } catch (e) {}

    if (!delivered) {
      const callId = Math.floor(1000 + Math.random() * 9000);
      let actionTitle = '🛎 OFITSIANT CHAQIRUVI!';
      if (actionType === 'bill') actionTitle = "🧾 HISOBNI (CHEKNI) SO'RASH!";
      if (actionType === 'tea_bread') actionTitle = "🫖 CHOY / NON QO'SHISH SO'ROVI!";
      const msgText = `🚨 ${actionTitle}\n\n🪑 Stol / Joy: ${tableVal}\n👤 Mijoz: ${customerName}\n📞 Tel: ${customerPhone}\n📝 Izoh: ${noteVal}\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`;
      delivered = await sendSingleFallbackTelegram(msgText, {
        inline_keyboard: [[{ text: "✅ Xizmat ko'rsatildi", callback_data: `waiter_done_${callId}` }]]
      });
    }

    isCallingWaiter = false;

    if (delivered) {
      if (customNoteEl) customNoteEl.value = '';
      showToast(`✅ ${tableVal}`, 'fa-check-circle');
      const cdBox = document.getElementById('waiterCooldownBox');
      const cdTimer = document.getElementById('waiterCooldownTimer');
      if (cdBox && cdTimer) {
        cdBox.style.display = 'block';
        let sec = 45;
        cdTimer.textContent = sec;
        if (waiterCooldownInt) clearInterval(waiterCooldownInt);
        waiterCooldownInt = setInterval(() => {
          sec--;
          cdTimer.textContent = sec;
          if (sec <= 0) {
            clearInterval(waiterCooldownInt);
            cdBox.style.display = 'none';
          }
        }, 1000);
      }
    }
  };

  /* ==========================================================================
     0.05 TO'LOVNI JONLI KUTISH VA TASDIQLASH OYNASI
     ========================================================================== */
  const payCheckModal = document.createElement('div');
  payCheckModal.id = 'paymentVerifyModal';
  payCheckModal.className = 'modal-wrapper';
  payCheckModal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-card" style="max-width: 440px; padding: 2.2rem 1.8rem; text-align: center;">
      <div id="payVerifySpinner" class="pay-spinner"></div>
      <div id="payVerifyIcon" style="display:none; width:64px; height:64px; border-radius:50%; margin:0 auto 1rem auto; align-items:center; justify-content:center; font-size:2rem;"></div>
      <h3 id="payVerifyTitle" class="font-display" style="font-size: 1.65rem; color: var(--text-main); margin-bottom: 0.5rem;">To'lov tekshirilmoqda...</h3>
      <p id="payVerifyDesc" style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;"></p>
      <div id="payVerifyActions" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
    </div>
  `;
  document.body.appendChild(payCheckModal);

  let payPollInterval = null;
  window.closePayVerifyModal = function() {
    if (payPollInterval) clearInterval(payPollInterval);
    payCheckModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ==========================================================================
     0.1 TELEGRAM OTP MODAL
     ========================================================================== */
  const otpModal = document.createElement('div');
  otpModal.id = 'otpAuthModal';
  otpModal.className = 'modal-wrapper';
  otpModal.innerHTML = `
    <div class="modal-overlay" onclick="window.closeOtpModal()"></div>
    <div class="modal-card" style="max-width: 440px; padding: 2rem; text-align: center;">
      <button type="button" class="modal-close-btn" onclick="window.closeOtpModal()"><i class="fas fa-times"></i></button>
      <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(36, 161, 222, 0.15); color: #24a1de; font-size: 1.7rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
        <i class="fab fa-telegram"></i>
      </div>
      <h3 class="font-display" style="font-size: 1.6rem; color: var(--text-main); margin-bottom: 0.35rem;">Raqamni hisobga ulash</h3>
      <p id="otpModalUserGreeting" style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.5rem;"></p>
      <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 1.2rem; line-height: 1.45;">
        Google hisobingizga telefon raqamingizni biriktirish uchun raqamingizni yozing va Telegram botimizdan <b>4 xonali kod</b> oling:
      </p>
      <div style="text-align: left; margin-bottom: 0.9rem;">
        <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.3rem;">1. Telefon raqamingiz:</label>
        <input type="tel" id="otpPhoneInput" placeholder="+998 90 123 45 67" style="width: 100%; padding: 0.75rem 1rem; font-size: 1rem; font-weight: 700; border-radius: 8px; border: 1.5px solid var(--border-color); background: var(--bg-card); color: var(--text-main);" />
      </div>
      <button type="button" id="getTelegramCodeBtn" class="btn" style="width: 100%; background: #24a1de; color: #ffffff; font-weight: 700; margin-bottom: 1.15rem;">
        <i class="fab fa-telegram" style="font-size: 1.1rem;"></i>
        <span>Telegram botdan kod olish</span>
      </button>
      <div style="text-align: left; margin-bottom: 1.15rem;">
        <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 0.3rem;">2. Bot bergan 4 xonali kod:</label>
        <input type="text" id="otpCodeVal" maxlength="4" placeholder="• • • •" style="width: 100%; padding: 0.7rem; font-size: 1.3rem; font-weight: 800; text-align: center; letter-spacing: 0.35em; border-radius: 8px; border: 1.5px solid var(--border-gold); background: var(--bg-card); color: var(--accent-gold);" />
      </div>
      <button type="button" id="confirmOtpCodeBtn" class="btn btn-primary" style="width: 100%;">
        <i class="fas fa-check-circle"></i>
        <span>Tasdiqlash va Raqamni ulash</span>
      </button>
    </div>
  `;
  document.body.appendChild(otpModal);

  let pendingCallbackAfterAuth = null;

  window.openOtpModal = function(callback) {
    pendingCallbackAfterAuth = callback || null;
    const greetEl = document.getElementById('otpModalUserGreeting');
    if (greetEl) greetEl.textContent = currentUser ? `Google: ${currentUser.email}` : '';
    otpModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeOtpModal = function() {
    otpModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.getElementById('getTelegramCodeBtn').addEventListener('click', async () => {
    const rawPhone = document.getElementById('otpPhoneInput').value;
    const digits = rawPhone.replace(/\D/g, '');
    if (digits.length !== 12 || !digits.startsWith('998')) {
      showToast('+998 XX XXX XX XX', 'fa-exclamation-triangle');
      return;
    }
    window.open(`https://t.me/${tgBotUsername}?start=login_${digits}`, '_blank', 'noopener,noreferrer');
  });

  document.getElementById('confirmOtpCodeBtn').addEventListener('click', async () => {
    const rawPhone = document.getElementById('otpPhoneInput').value;
    const digits = rawPhone.replace(/\D/g, '');
    const code = document.getElementById('otpCodeVal').value.trim();
    if (digits.length !== 12 || code.length !== 4) return;

    const btn = document.getElementById('confirmOtpCodeBtn');
    btn.disabled = true;
    try {
      const res = await fetch(`${API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: digits, code: code,
          googleId: currentUser ? currentUser.googleId : null,
          email: currentUser ? currentUser.email : null
        })
      });
      const data = await res.json();
      if (!data.success) {
        showToast(data.message || 'Xato!', 'fa-times-circle');
        btn.disabled = false;
        return;
      }
      if (currentUser) currentUser.phone = data.phone;
      else currentUser = { name: data.tgName || 'Mijoz', email: '', picture: '', phone: data.phone };

      localStorage.setItem('iqbol_user', JSON.stringify(currentUser));
      renderUserUI();
      window.closeOtpModal();
      if (typeof pendingCallbackAfterAuth === 'function') {
        const fn = pendingCallbackAfterAuth;
        pendingCallbackAfterAuth = null;
        fn();
      }
    } catch (err) {
      showToast("Error!", 'fa-wifi');
    } finally {
      btn.disabled = false;
    }
  });

  /* ==========================================================================
     0.2 GOOGLE SIGN-IN LOGIKASI
     ========================================================================== */
  function ensureHeaderGoogleContainerExists() {
    let headerContainer = document.getElementById('googleSignInContainer');
    if (!headerContainer && headerActions) {
      headerContainer = document.createElement('div');
      headerContainer.id = 'googleSignInContainer';
      headerContainer.className = 'google-signin-wrap';
      const chipEl = document.getElementById('userProfileChip');
      if (chipEl && chipEl.parentNode === headerActions) {
        headerActions.insertBefore(headerContainer, chipEl);
      } else {
        headerActions.appendChild(headerContainer);
      }
    }
    return headerContainer;
  }

  function drawGoogleButtons() {
    if (currentUser) return;
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) return;
    const compactConfig = { theme: 'outline', size: 'medium', text: 'signin', shape: 'pill', locale: currentLang };
    const largeConfig = { theme: 'outline', size: 'large', text: 'signin_with', shape: 'pill', locale: currentLang };

    const headerContainer = ensureHeaderGoogleContainerExists();
    if (headerContainer) {
      headerContainer.innerHTML = '';
      google.accounts.id.renderButton(headerContainer, compactConfig);
    }
    const mobileContainer = document.getElementById('mobileGoogleContainer');
    if (mobileContainer) {
      mobileContainer.innerHTML = '';
      google.accounts.id.renderButton(mobileContainer, { ...largeConfig, width: 260 });
    }
    const checkoutContainer = document.getElementById('checkoutGoogleContainer');
    if (checkoutContainer) {
      checkoutContainer.innerHTML = '';
      google.accounts.id.renderButton(checkoutContainer, largeConfig);
    }
  }

  const handleGoogleCredential = async (response) => {
    try {
      const res = await fetch(GOOGLE_AUTH_API, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });
      const data = await res.json();
      if (data.success) {
        const oldSaved = JSON.parse(localStorage.getItem('iqbol_user') || '{}');
        currentUser = { ...data.user, phone: data.user.phone || oldSaved.phone || null };
        localStorage.setItem('iqbol_user', JSON.stringify(currentUser));
        renderUserUI();
        if (!currentUser.phone) setTimeout(() => window.openOtpModal(), 400);
      }
    } catch (err) {}
  };

  function renderUserUI() {
    const chip = document.getElementById('userProfileChip');
    const mobileChip = document.getElementById('mobileUserChip');
    const googleWrap = document.getElementById('googleSignInContainer');
    const mobileGoogle = document.getElementById('mobileGoogleContainer');
    const checkoutNotice = document.getElementById('checkoutLoginNotice');

    const cName = document.getElementById('checkoutName');
    const cPhone = document.getElementById('checkoutPhone');
    const rName = document.getElementById('resName');
    const rPhone = document.getElementById('resPhone');

    if (currentUser) {
      const firstName = (currentUser.name || currentUser.email || 'Mijoz').split(' ')[0];
      const phoneHtml = currentUser.phone
        ? `<small title="${currentUser.email}"><i class="fas fa-check-circle" style="color:#2ecc71;"></i> ${currentUser.phone}</small>`
        : `<small onclick="window.closeMobileNav(); window.openOtpModal()" style="color:#ffb142; text-decoration:underline; cursor:pointer;">${tUI('connectPhoneBtn')}</small>`;

      if (googleWrap) googleWrap.remove();
      if (mobileGoogle) { mobileGoogle.innerHTML = ''; mobileGoogle.classList.add('force-hide-auth'); }
      if (checkoutNotice) checkoutNotice.classList.add('force-hide-auth');

      if (chip) {
        chip.removeAttribute('style');
        chip.classList.remove('force-hide-auth');
        const avatarEl = document.getElementById('userAvatar');
        if (avatarEl && currentUser.picture) { avatarEl.src = currentUser.picture; avatarEl.style.display = 'block'; }
        const uNameEl = document.getElementById('userName');
        if (uNameEl) uNameEl.innerHTML = `<span>${firstName}</span>${phoneHtml}`;
      }
      if (mobileChip) {
        mobileChip.removeAttribute('style');
        mobileChip.classList.remove('force-hide-auth');
        const mAvatar = document.getElementById('mobileUserAvatar');
        if (mAvatar && currentUser.picture) { mAvatar.src = currentUser.picture; mAvatar.style.display = 'block'; }
        const mNameEl = document.getElementById('mobileUserName');
        if (mNameEl) mNameEl.innerHTML = `${currentUser.name}<small>${currentUser.email}</small>${phoneHtml}`;
      }

      if (cName && !cName.value) cName.value = currentUser.name || '';
      if (rName && !rName.value) rName.value = currentUser.name || '';
      if (currentUser.phone) {
        if (cPhone) { cPhone.value = currentUser.phone; cPhone.readOnly = true; }
        if (rPhone) { rPhone.value = currentUser.phone; rPhone.readOnly = true; }
      }
    } else {
      if (chip) { chip.removeAttribute('style'); chip.classList.add('force-hide-auth'); }
      if (mobileChip) { mobileChip.removeAttribute('style'); mobileChip.classList.add('force-hide-auth'); }
      if (mobileGoogle) mobileGoogle.classList.remove('force-hide-auth');
      if (checkoutNotice) checkoutNotice.classList.remove('force-hide-auth');
      if (cPhone) cPhone.readOnly = false;
      if (rPhone) rPhone.readOnly = false;

      const restoredWrap = ensureHeaderGoogleContainerExists();
      if (restoredWrap && restoredWrap.children.length === 0) drawGoogleButtons();
    }
  }

  window.addEventListener('resize', renderUserUI);

  window.logoutUser = function() {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      try { google.accounts.id.disableAutoSelect(); } catch (e) {}
    }
    currentUser = null;
    localStorage.removeItem('iqbol_user');
    renderUserUI();
  };

  let googleInitialized = false;
  function initGoogleSignIn() {
    if (googleInitialized) return;
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      setTimeout(initGoogleSignIn, 350);
      return;
    }
    try {
      googleInitialized = true;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      renderUserUI();
    } catch (err) {}
  }
  renderUserUI();
  setTimeout(initGoogleSignIn, 150);

  /* ==========================================================================
     1. MENU DATABASE VA BARCHA 70 TA TAOMNING 3 TILDAGI TARJIMASI (UZ / RU / EN)
     ========================================================================== */
  const MENU_DATA = [
    { id: 'bt-1', name: 'Tushonka (xashlama)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 40000, portion: '1 porsiya', desc: "Mazali va to'yimli tushonka (xashlama) sho'rva.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1566_JFVMaw1_OiyJoRv.jpg', popular: true },
    { id: 'bt-2', name: 'Mastava', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: "An'anaviy o'zbekcha guruchli mastava sho'rva.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1514_ZlX2FhI.jpg', popular: true },
    { id: 'bt-3', name: 'Borsh', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: "Klassik qizil borsh sho'rva.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1515_XhkBdxt_s4FDJwk.jpg', popular: false },
    { id: 'bt-4', name: "Sho'rva (mol go'shti)", category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: "Mol go'shtidan tayyorlangan mazali sho'rva.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1549_m8tgXEs.jpg', popular: false },
    { id: 'bt-5', name: "Teftel sho'rva", category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: "Teftel solingan to'yimli birinchi taom.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1550_zst6bIR_QraUR3a.jpg', popular: false },
    { id: 'it-1', name: 'Mushak jiz', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 210000, portion: '1 porsiya', desc: 'Maxsus usulda pishirilgan mushak jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1588_vqt1uS2.jpg', popular: true },
    { id: 'it-2', name: 'Olot somsa', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 10000, portion: '1 dona', desc: 'Haqiqiy mazali Olot somsasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1613.jpg', popular: true },
    { id: 'it-3', name: 'Umakay jiz', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 porsiya', desc: 'Umakai jiz tansiq taomi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1611_IZss6f5.jpg', popular: true },
    { id: 'it-4', name: "Tandir go'sht", category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 300000, portion: '1 kg', desc: "Haqiqiy tandirda pishirilgan xushbo'y go'sht.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1559_ivfhlk7_b4QiKZs_1xvVAnx_91qKrDo_7q493Pq_BSjYFYO.jpg', popular: true },
    { id: 'it-5', name: 'Qovurilgan qanotchalar', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 80000, portion: '1 kg', desc: 'Qarsildoq qovurilgan tovuq qanotchalari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1562_evu0zuO.jpg', popular: false },
    { id: 'it-6', name: 'Kartoshka fri', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 25000, portion: '1 porsiya', desc: 'Qarsildoq fri kartoshkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1525.jpg', popular: false },
    { id: 'it-7', name: "Hasip (mol go'shti)", category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 170000, portion: '1 porsiya', desc: "Mol go'shtidan tayyorlangan milliy hasip.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1565_yA2Dqxy_zJlUJ12.jpg', popular: false },
    { id: 'it-8', name: 'Manchuri', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 220000, portion: '1 kg', desc: "Manchuri uslubidagi go'shtli taom.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1571_K8pdRQY.jpg', popular: false },
    { id: 'it-9', name: 'Buyrak jiz', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: 'Buyrakdan tayyorlangan maxsus jiz.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1564_5lGoSMd.jpg', popular: false },
    { id: 'it-10', name: 'Qozoncha (Qizilcha)', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 250000, portion: '1 kg', desc: "Maxsus qizilcha go'shtli taomi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1567_t8AkDY3_FRhAnBK.jpg', popular: false },
    { id: 'it-11', name: "Uyg'urcha jiz", category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 240000, portion: '1 kg', desc: "Uyg'ur uslubidagi mazali jiz.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1570_M6SWgAY_nrvaBzI.jpg', popular: true },
    { id: 'it-12', name: 'Manti', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 7000, portion: '1 dona', desc: "Bug'da pishirilgan shirador manti.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1526.jpg', popular: true },
    { id: 'sh-1', name: 'Jigar shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: 'Jigar va dumbadan tayyorlangan shashlik.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1631.jpg', popular: true },
    { id: 'sh-2', name: 'Tovuq kavkaz', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 28000, portion: '1 porsiya', desc: "Tovuq go'shtidan Kavkazcha shashlik.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1545_GKuqMgp.jpg', popular: false },
    { id: 'sh-3', name: 'Non shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 5000, portion: '1 dona', desc: "Ko'mirda pishirilgan mazali non va dumba shashlik.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1542.jpg', popular: false },
    { id: 'sh-4', name: "Kavkaz kuskovoy (qo'y go'shti)", category: 'shashlik', categoryName: 'Shashlik va assorti', price: 85000, portion: '1 porsiya', desc: "Qo'y go'shtidan Kavkazcha parcha shashlik.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1546_pEeqfr3.jpg', popular: true },
    { id: 'sh-5', name: "Kuskovoy (mol go'shti)", category: 'shashlik', categoryName: 'Shashlik va assorti', price: 79000, portion: '1 porsiya', desc: "Mol go'shtidan lahm va dumba parcha shashlik.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1540_gbbl3GL_dL6Bmkm_FAvbp8N.jpg', popular: true },
    { id: 'sh-6', name: "Shashlik G'ijduvon", category: 'shashlik', categoryName: 'Shashlik va assorti', price: 68000, portion: '1 porsiya', desc: "An'anaviy G'ijduvon qiyma shashligi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1544_9UVbHU1_x6uvel1_4Vitamw_Bg6I9sS.jpg', popular: true },
    { id: 'sh-7', name: 'Rulet shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 70000, portion: '1 porsiya', desc: "Maxsus go'shtli rulet kabobi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1622_gb9FC5R_HfLbXcj_KNOk2b7.jpg', popular: false },
    { id: 'sh-8', name: 'Sosiska (shirin)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Shirin sosiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1625_KrM9pRk.jpg', popular: false },
    { id: 'sh-9', name: 'Sosiska (achchiq)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 15000, portion: '1 dona', desc: 'Achchiq sosiska shashligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1623_fszUNpw.jpg', popular: false },
    { id: 'sh-10', name: 'Napoleon shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 72000, portion: '1 porsiya', desc: 'Maxsus qatlamali Napoleon kabobi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1626_RMYLZ0j_sCMPDEC.jpg', popular: true },
    { id: 'sh-11', name: 'Pomidor shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 20000, portion: '1 porsiya', desc: "Ko'mirda pishirilgan suvli pomidor shashligi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1629.jpg', popular: false },
    { id: 'sh-12', name: 'Dumba shashlik', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 40000, portion: '1 porsiya', desc: "Saralangan dumba yog'idan tayyorlangan shashlik.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1633.jpg', popular: false },
    { id: 'qt-1', name: 'Qarsildoq baqlajon', category: 'salatlar', categoryName: 'Salatlar', price: 62000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan baqlajon, pomidor va maxsus sous.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1555.jpg', popular: true },
    { id: 'sal-1', name: 'Svejiy salat', category: 'salatlar', categoryName: 'Salatlar', price: 18000, portion: '1 porsiya', desc: "Pomidor va bodringdan yig'ilgan yangi salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1529_Enmxvpq.jpg', popular: false },
    { id: 'sal-2', name: 'Shakarob', category: 'salatlar', categoryName: 'Salatlar', price: 19000, portion: '1 porsiya', desc: "An'anaviy piyoz va pomidor shakarobi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1530_bt4dHZM.jpg', popular: true },
    { id: 'sal-3', name: 'Iqbol firma salati', category: 'salatlar', categoryName: 'Salatlar', price: 53000, portion: '1 porsiya', desc: 'Restoranning maxsus firma salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1518_emfhioR.jpg', popular: true },
    { id: 'sal-4', name: 'Sezar', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: "Klassik sezar salati tovuq filesi va parmezan pishlog'i bilan.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1520.jpg', popular: true },
    { id: 'sal-5', name: 'Mevali salat', category: 'salatlar', categoryName: 'Salatlar', price: 47000, portion: '1 porsiya', desc: 'Mavsumiy mevalardan vitaminli shirin salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1523.jpg', popular: false },
    { id: 'sal-6', name: 'Mujskoy kapriz', category: 'salatlar', categoryName: 'Salatlar', price: 49000, portion: '1 porsiya', desc: "Go'sht mahsulotlari va pishloqli to'yimli salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1524_uFqW9ec.jpg', popular: true },
    { id: 'sal-7', name: 'Grecheskiy (Yunoncha)', category: 'salatlar', categoryName: 'Salatlar', price: 54000, portion: '1 porsiya', desc: "Feta pishlog'i, zaytun va sarxil sabzavotlardan yunoncha salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1557.jpg', popular: true },
    { id: 'sal-8', name: 'Pod vodochku', category: 'salatlar', categoryName: 'Salatlar', price: 44000, portion: '1 porsiya', desc: 'Maxsus ishtahaochar zakuska salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1522.jpg', popular: false },
    { id: 'sal-9', name: 'Yaponcha salat', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: 'Maxsus sousda tayyorlangan yaponcha salat.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1527.jpg', popular: false },
    { id: 'sal-10', name: 'Fransuzcha salat', category: 'salatlar', categoryName: 'Salatlar', price: 48000, portion: '1 porsiya', desc: "Qarsildoq kartoshka va go'shtli fransuzcha nafis salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1548_W2vkC83.jpg', popular: false },
    { id: 'sal-11', name: 'Smak', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: "Pomidor, pishloq va qarsildoq suxariklar qo'shilgan mazali Smak salati.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1521.jpg', popular: true },
    { id: 'sal-12', name: 'Svejiy (qatiqli)', category: 'salatlar', categoryName: 'Salatlar', price: 19000, portion: '1 porsiya', desc: "Qatiq va ko'katlar qo'shilgan sarxil pomidor-bodring salati.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1528_UMv33XI.jpg', popular: false },
    { id: 'sal-13', name: 'Olivye', category: 'salatlar', categoryName: 'Salatlar', price: 46000, portion: '1 porsiya', desc: "An'anaviy va sevimli klassik Olivye salati.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1561.jpg', popular: true },
    { id: 'sal-14', name: 'Svejiy assorti', category: 'salatlar', categoryName: 'Salatlar', price: 35000, portion: '1 porsiya', desc: "Sarxil sabzavotlar va ko'katlar to'plami.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1552.jpg', popular: false },
    { id: 'sal-15', name: 'Limon', category: 'salatlar', categoryName: 'Salatlar', price: 6000, portion: '1 porsiya', desc: "Yangi kesilgan xushbo'y limon bo'laklari.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1531.jpg', popular: false },
    { id: 'sal-16', name: 'Chakki (Suzma)', category: 'salatlar', categoryName: 'Salatlar', price: 10000, portion: '1 porsiya', desc: 'Tabiiy va mazali suzma (chakki).', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1532.jpg', popular: false },
    { id: 'sal-17', name: 'Chaban salati', category: 'salatlar', categoryName: 'Salatlar', price: 42000, portion: '1 porsiya', desc: "Sarxil sabzavotlar va ko'katlardan tayyorlangan Chaban salati.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1517.jpg', popular: false },
    { id: 'sal-18', name: 'Kaprize', category: 'salatlar', categoryName: 'Salatlar', price: 68000, portion: '1 porsiya', desc: "Pomidor, motsarella pishlog'i va pesto sousidan italyancha salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1569.jpg', popular: true },
    { id: 'sal-19', name: 'Sate', category: 'salatlar', categoryName: 'Salatlar', price: 45000, portion: '1 porsiya', desc: 'Maxsus retsept asosida tayyorlangan Sate salati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1578.jpg', popular: false },
    { id: 'sal-20', name: 'Tulum salati', category: 'salatlar', categoryName: 'Salatlar', price: 60000, portion: '1 porsiya', desc: "Tulum pishlog'i, cherri pomidori va ko'katlardan nafis salat.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1577.jpg', popular: true },
    { id: 'ich-1', name: 'DENA sharbati', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 18000, portion: '1 litr', desc: 'Tabiiy DENA meva sharbati.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1590.jpg', popular: false },
    { id: 'ich-2', name: 'KARLOVY VARY', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: 'Shifobaxsh mineral suv.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1587_j9z8Wv3_zGxwjgk.jpg', popular: false },
    { id: 'ich-3', name: 'Chernogolovka', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 14000, portion: '1 litr', desc: 'Mazali Tarxun / limonad.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1593_rJiNON9.jpg', popular: false },
    { id: 'ich-4', name: 'BLANC BLUE', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '1 litr', desc: 'Blanc Blue salqin ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1596_DqDuOH0.jpg', popular: false },
    { id: 'ich-5', name: 'RED BULL', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 20000, portion: '0.25 litr', desc: 'Red Bull energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1592_1iwuHz7.jpg', popular: true },
    { id: 'ich-6', name: 'Sayhun suvi', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 5000, portion: '1 litr', desc: 'Toza gazsiz ichimlik suvi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1591_lxwiL7V.jpg', popular: false },
    { id: 'ich-7', name: 'GORILLA energy', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '0.5 litr', desc: 'Gorilla energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1600_3CtcD64.jpg', popular: false },
    { id: 'ich-8', name: 'Ash-TAU', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 17000, portion: '0.45 litr', desc: 'Ash-Tau mineral suvi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1598_Bt0R3UE.jpg', popular: false },
    { id: 'ich-9', name: 'Adrenaline Rush', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 15000, portion: '0.5 litr', desc: 'Adrenaline Rush energetik ichimligi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1599_Z7szmMV.jpg', popular: false },
    { id: 'ich-10', name: 'Fanta', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: "Apelsin ta'mli Fanta.", image: 'https://admin.easymenu.uz/media/menu/items/Screenshot_20260316_111839_Google.jpg', popular: false },
    { id: 'ich-11', name: 'Coca-Cola', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 12000, portion: '1 litr', desc: 'Klassik muzdek Coca-Cola.', image: 'https://admin.easymenu.uz/media/menu/items/Screenshot_20260316_111747_Chrome.jpg', popular: true },
    { id: 'ich-12', name: 'Moxito Kivi', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 50000, portion: '1 litr', desc: 'Muzdek tetiklantiruvchi kivi moxitosi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1573.jpg', popular: true },
    { id: 'ich-13', name: 'Moxito Klassik', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 65000, portion: '1 litr', desc: 'Klassik laym va yalpizli moxito.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1554.jpg', popular: true },
    { id: 'ich-14', name: 'Tarxun limonad', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 litr', desc: "Xushbo'y firma tarxun ichimligi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1534.jpg', popular: false },
    { id: 'ich-15', name: 'Mango-Marakuya', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 65000, portion: '1 litr', desc: 'Ekzotik mango-marakuya moxitosi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1533.jpg', popular: true },
    { id: 'ich-16', name: 'Qulupnayli Moxito', category: 'ichimliklar', categoryName: 'Ichimliklar & Non', price: 60000, portion: '1 litr', desc: 'Qulupnayli shirin va salqin moxito.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1535.jpg', popular: false },
    { id: 'des-1', name: 'San-Sebastyan', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 dona', desc: 'Shokolad sousli San-Sebastyan chizkeyki.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1608.jpg', popular: true },
    { id: 'des-2', name: 'Rezavorli Opera', category: 'gazli', categoryName: 'Desertlar', price: 50000, portion: '1 dona', desc: "Mevali nafis opera torti bo'lagi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1609.jpg', popular: false },
    { id: 'des-3', name: 'Safia yong\'oqchalari', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 quti', desc: "Qaynatma quyultirilgan sutli yong'oqchalar.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1605.jpg', popular: true },
    { id: 'des-4', name: 'Millennium Air Bubble', category: 'gazli', categoryName: 'Desertlar', price: 20000, portion: '1 dona', desc: "G'ovakli shokolad plitkasi.", image: 'https://admin.easymenu.uz/media/menu/items/IMG_1603.jpg', popular: false }
  ];

  // BARCHA 70 TA TAOMNING RUS VA INGLIZ TILLARIDAGI TO'LIQ LUG'ATI
  const DISH_TRANSLATIONS = {
    'bt-1': { ru: ['Тушёнка (хашлама)', 'Вкусный и наваристый мясной суп хашлама.'], en: ['Tushonka (Khashlama)', 'Rich and hearty slow-simmered beef soup.'] },
    'bt-2': { ru: ['Мастава', 'Традиционный узбекский рисовый суп с мясом и овощами.'], en: ['Mastava', 'Traditional Uzbek rice soup with tender beef and vegetables.'] },
    'bt-3': { ru: ['Борщ', 'Классический красный борщ со свежей зеленью и говядиной.'], en: ['Borscht', 'Classic red beetroot soup with tender beef and herbs.'] },
    'bt-4': { ru: ['Шурпа (из говядины)', 'Наваристый бульон с крупными кусочками говядины и овощами.'], en: ['Beef Shurpa', 'Traditional clear broth soup with beef chunks and vegetables.'] },
    'bt-5': { ru: ['Суп с тефтелями', 'Сытный домашний суп с сочными мясными фрикадельками.'], en: ['Meatball Soup', 'Hearty soup with juicy seasoned beef meatballs.'] },
    'it-1': { ru: ['Мушак жиз', 'Нежная обжаренная говяжья голяшка по особому рецепту.'], en: ['Mushak Jiz', 'Tender pan-seared beef shank cooked in our signature style.'] },
    'it-2': { ru: ['Алатская самса', 'Настоящая сочная Алатская самса с рубленым мясом.'], en: ['Olot Samsa', 'Authentic flaky Olot pastry filled with juicy minced meat and onions.'] },
    'it-3': { ru: ['Умакай жиз', 'Фирменное мясное блюдо Умакай жиз со специями.'], en: ['Umakay Jiz', 'Signature roasted meat delicacy seasoned with traditional spices.'] },
    'it-4': { ru: ['Тандыр гушт (1 кг)', 'Ароматная баранина, запеченная в настоящем глиняном тандыре.'], en: ['Tandoor Meat (1 kg)', 'Aromatic lamb slow-roasted in a traditional clay tandoor oven.'] },
    'it-5': { ru: ['Жареные крылышки (1 кг)', 'Хрустящие обжаренные куриные крылышки в золотистой корочке.'], en: ['Crispy Chicken Wings (1 kg)', 'Golden crispy fried chicken wings with savory seasoning.'] },
    'it-6': { ru: ['Картофель фри', 'Хрустящий золотистый картофель фри.'], en: ['French Fries', 'Crispy golden potato fries.'] },
    'it-7': { ru: ['Хасип из говядины', 'Традиционная домашняя колбаса хасип из говядины с рисом.'], en: ['Beef Khasip', 'Traditional Uzbek homemade beef and rice sausage.'] },
    'it-8': { ru: ['Манчури (1 кг)', 'Сочное мясо по-манчжурски с овощами и соусом.'], en: ['Manchurian Beef (1 kg)', 'Savory Manchurian-style wok-seared meat with vegetables.'] },
    'it-9': { ru: ['Буйрак жиз (1 кг)', 'Деликатесный жиз из отборных почек со специями.'], en: ['Kidney Jiz (1 kg)', 'Traditional pan-roasted kidney delicacy with onions and spices.'] },
    'it-10': { ru: ['Казанча (Кизилча, 1 кг)', 'Нежная телятина, томленная в казане в собственном соку.'], en: ['Qozoncha Veal (1 kg)', 'Tender veal slow-braised in a traditional cast-iron kazan.'] },
    'it-11': { ru: ['Уйгурский жиз (1 кг)', 'Аппетитный жиз по-уйгурски с овощами и специями.'], en: ['Uyghur Jiz (1 kg)', 'Flavorful Uyghur-style stir-fried meat with bell peppers and spices.'] },
    'it-12': { ru: ['Манты (1 шт)', 'Сочные манты на пару с рубленым мясом и луком.'], en: ['Steamed Manti (1 pc)', 'Juicy steamed dumpling filled with minced beef and onions.'] },
    'sh-1': { ru: ['Шашлык из печени', 'Нежный шашлык из говяжьей печени с курдюком.'], en: ['Liver Shashlik', 'Tender beef liver skewer grilled over charcoal.'] },
    'sh-2': { ru: ['Куриный кавказский', 'Сочный кавказский шашлык из маринованного куриного филе.'], en: ['Caucasian Chicken Shashlik', 'Juicy marinated chicken skewer grilled over hot coals.'] },
    'sh-3': { ru: ['Нон шашлык', 'Ароматный шашлык из лепешки с курдючным жиром на углях.'], en: ['Bread & Tail-Fat Skewer', 'Charcoal-grilled traditional bread infused with lamb tail fat.'] },
    'sh-4': { ru: ['Кавказский кусковой (баранина)', 'Крупные сочные куски отборной баранины на мангале.'], en: ['Caucasian Lamb Shashlik', 'Large, juicy chunks of marinated lamb grilled on skewers.'] },
    'sh-5': { ru: ['Кусковой (говядина)', 'Отборная маринованная говяжья вырезка с курдюком на углях.'], en: ['Beef Fillet Shashlik', 'Marinated prime beef chunks grilled over charcoal.'] },
    'sh-6': { ru: ['Шашлык Гиждуван', 'Знаменитый гиждуванский молотый шашлык с ароматными специями.'], en: ['Gijduvan Minced Kebab', 'Famous Gijduvan-style minced meat kebab grilled over charcoal.'] },
    'sh-7': { ru: ['Рулет шашлык', 'Сочный мясной рулет с курдюком, обжаренный на углях.'], en: ['Rolled Meat Shashlik', 'Savory rolled beef kebab grilled to perfection.'] },
    'sh-8': { ru: ['Сосиска на углях (нежная)', 'Аппетитная сладковатая сосиска, запеченная на мангале.'], en: ['Grilled Sausage (Mild)', 'Charcoal-grilled mild sausage skewer.'] },
    'sh-9': { ru: ['Сосиска на углях (острая)', 'Пикантная острая сосиска, обжаренная на углях.'], en: ['Grilled Sausage (Spicy)', 'Charcoal-grilled spicy sausage skewer.'] },
    'sh-10': { ru: ['Шашлык Наполеон', 'Фирменный слоеный шашлык из тонких пластов нежного мяса.'], en: ['Napoleon Layered Kebab', 'Signature multi-layered tender beef fillet kebab.'] },
    'sh-11': { ru: ['Шашлык из помидоров', 'Сочные спелые помидоры, запеченные на углях.'], en: ['Grilled Tomato Skewer', 'Juicy ripe tomatoes roasted over hot coals.'] },
    'sh-12': { ru: ['Думба шашлык (курдюк)', 'Румяный хрустящий шашлык из отборного курдюка.'], en: ['Lamb Tail-Fat Shashlik', 'Crispy golden charcoal-grilled lamb tail fat.'] },
    'qt-1': { ru: ['Хрустящий баклажан', 'Хрустящие баклажаны со спелыми томатами и фирменным соусом.'], en: ['Crispy Eggplant Salad', 'Crispy fried eggplant tossed with ripe tomatoes and sweet chili glaze.'] },
    'sal-1': { ru: ['Свежий салат', 'Легкий салат из свежих помидоров, огурцов и зелени.'], en: ['Fresh Garden Salad', 'Sliced fresh tomatoes, cucumbers, and herbs.'] },
    'sal-2': { ru: ['Шакароб', 'Традиционный узбекский салат из тонко нарезанных томатов и лука.'], en: ['Shakarob', 'Traditional Uzbek thinly sliced tomato and onion salad.'] },
    'sal-3': { ru: ['Фирменный салат «Икбол»', 'Эксклюзивный фирменный салат от шеф-повара ресторана IQBOL.'], en: ['Signature IQBOL Salad', 'Our chef’s special house salad with premium ingredients.'] },
    'sal-4': { ru: ['Цезарь', 'Классический салат Цезарь с куриным филе, сухариками и пармезаном.'], en: ['Caesar Salad', 'Classic Caesar salad with chicken breast, croutons, and parmesan.'] },
    'sal-5': { ru: ['Фруктовый салат', 'Сладкий витаминный салат из свежих сезонных фруктов.'], en: ['Fresh Fruit Salad', 'Sweet vitamin-rich medley of seasonal fresh fruits.'] },
    'sal-6': { ru: ['Мужской каприз', 'Сытный мясной салат с говядиной, колбасой, сыром и майонезом.'], en: ['Men’s Caprice Salad', 'Hearty layered meat and cheese salad with creamy dressing.'] },
    'sal-7': { ru: ['Греческий салат', 'Свежие овощи, маслины и сыр фета с оливковым маслом.'], en: ['Greek Salad', 'Fresh vegetables, olives, and feta cheese with olive oil dressing.'] },
    'sal-8': { ru: ['Салат «Под водочку»', 'Пикантный закусочный салат с маринованными овощами и мясом.'], en: ['Appetizer Pickled Salad', 'Zesty savory salad with pickled vegetables and tender beef.'] },
    'sal-9': { ru: ['Японский салат', 'Пикантный салат с телятиной и овощами в соево-кунжутной заправке.'], en: ['Japanese Style Salad', 'Tender beef and crisp vegetables in a soy-sesame dressing.'] },
    'sal-10': { ru: ['Французский салат', 'Изысканный салат с хрустящим картофелем пай, мясом и свежими овощами.'], en: ['French Salad', 'Delicate salad with julienne meat, vegetables, and shoestring potatoes.'] },
    'sal-11': { ru: ['Салат «Смак»', 'Сочные помидоры, сыр, чеснок и хрустящие сухарики с майонезом.'], en: ['Smak Salad', 'Ripe tomatoes, grated cheese, garlic, and crunchy croutons.'] },
    'sal-12': { ru: ['Свежий с катыком', 'Свежие помидоры и огурцы, заправленные домашним катыком и зеленью.'], en: ['Fresh Salad with Yogurt', 'Fresh tomatoes and cucumbers tossed with traditional yogurt and herbs.'] },
    'sal-13': { ru: ['Оливье', 'Любимый классический салат Оливье с нежным мясом и горошком.'], en: ['Olivier Salad', 'Classic traditional potato, meat, and green pea salad.'] },
    'sal-14': { ru: ['Свежее ассорти', 'Большая нарезка свежих сезонных овощей и ароматной зелени.'], en: ['Fresh Vegetable Platter', 'Generous platter of assorted fresh seasonal vegetables and herbs.'] },
    'sal-15': { ru: ['Лимон', 'Тонко нарезанные дольки свежего ароматного лимона.'], en: ['Fresh Lemon Slices', 'Thinly sliced aromatic fresh lemon.'] },
    'sal-16': { ru: ['Чакки (Сузьма)', 'Натуральная густая домашняя сузьма со свежей зеленью.'], en: ['Chakki (Strained Yogurt)', 'Traditional thick strained yogurt dip with fresh herbs.'] },
    'sal-17': { ru: ['Салат «Чабан»', 'Мелко нарезанные свежие овощи, зелень и брынза с восточной заправкой.'], en: ['Chaban Shepherd Salad', 'Finely diced fresh vegetables, herbs, and white cheese.'] },
    'sal-18': { ru: ['Капрезе', 'Итальянский салат со спелыми томатами, моцареллой, рукколой и соусом песто.'], en: ['Caprese Salad', 'Italian classic with ripe tomatoes, fresh mozzarella, arugula, and pesto.'] },
    'sal-19': { ru: ['Салат «Сате»', 'Оригинальный закусочный салат из баклажанов и овощей по особому рецепту.'], en: ['Sate Salad', 'Specialty rolled eggplant and vegetable appetizer salad.'] },
    'sal-20': { ru: ['Салат «Тулум»', 'Изысканный салат с сыром тулум, черри, кукурузой и свежими листьями салата.'], en: ['Tulum Cheese Salad', 'Gourmet salad with Tulum cheese, cherry tomatoes, corn, and greens.'] },
    'ich-1': { ru: ['Сок DENA (1 л)', 'Натуральный фруктовый сок DENA в ассортименте.'], en: ['DENA Fruit Juice (1 L)', 'Natural assorted fruit juice.'] },
    'ich-2': { ru: ['KARLOVY VARY (1 л)', 'Лечебно-столовая минеральная вода.'], en: ['Karlovy Vary Mineral Water (1 L)', 'Refreshing sparkling mineral water.'] },
    'ich-3': { ru: ['Черноголовка (1 л)', 'Освежающий классический лимонад Черноголовка.'], en: ['Chernogolovka Lemonade (1 L)', 'Classic refreshing bottled lemonade.'] },
    'ich-4': { ru: ['BLANC BLUE (1 л)', 'Освежающий газированный напиток Blanc Blue.'], en: ['Blanc Blue Drink (1 L)', 'Chilled refreshing sparkling beverage.'] },
    'ich-5': { ru: ['RED BULL (0.25 л)', 'Энергетический напиток Red Bull.'], en: ['Red Bull Energy Drink (0.25 L)', 'Original Red Bull energy drink.'] },
    'ich-6': { ru: ['Вода Sayhun (1 л)', 'Чистая питьевая вода без газа.'], en: ['Sayhun Still Water (1 L)', 'Pure bottled drinking water.'] },
    'ich-7': { ru: ['GORILLA Energy (0.5 л)', 'Энергетический напиток Gorilla.'], en: ['Gorilla Energy Drink (0.5 L)', 'Chilled Gorilla energy drink.'] },
    'ich-8': { ru: ['Аш-ТАУ (0.45 л)', 'Природная минеральная вода Аш-Тау.'], en: ['Ash-Tau Mineral Water (0.45 L)', 'Natural mountain mineral water.'] },
    'ich-9': { ru: ['Adrenaline Rush (0.5 л)', 'Тонизирующий энергетический напиток.'], en: ['Adrenaline Rush (0.5 L)', 'Revitalizing energy drink.'] },
    'ich-10': { ru: ['Fanta (1 л)', 'Освежающий апельсиновый напиток Fanta.'], en: ['Fanta Orange (1 L)', 'Chilled orange-flavored soda.'] },
    'ich-11': { ru: ['Coca-Cola (1 л)', 'Классическая охлажденная Coca-Cola.'], en: ['Coca-Cola (1 L)', 'Classic ice-cold Coca-Cola.'] },
    'ich-12': { ru: ['Мохито Киви (1 л)', 'Холодный освежающий графин мохито со вкусом киви и мяты.'], en: ['Kiwi Mojito Pitcher (1 L)', 'Ice-cold refreshing kiwi, lime, and mint mojito pitcher.'] },
    'ich-13': { ru: ['Мохито Классический (1 л)', 'Фирменный освежающий мохито со свежим лаймом и мятой.'], en: ['Classic Mojito Pitcher (1 L)', 'Signature non-alcoholic mojito with fresh lime, mint, and ice.'] },
    'ich-14': { ru: ['Тархун разливной (1 л)', 'Ароматный домашний лимонад Тархун со льдом.'], en: ['Tarragon Lemonade Pitcher (1 L)', 'Aromatic house-made tarragon lemonade served over ice.'] },
    'ich-15': { ru: ['Манго-Маракуйя (1 л)', 'Экзотический холодный лимонад с манго и маракуйей.'], en: ['Mango-Passionfruit Mojito (1 L)', 'Exotic chilled mango and passionfruit cooler.'] },
    'ich-16': { ru: ['Мохито Клубничный (1 л)', 'Сладкий освежающий клубничный мохито со свежей мятой.'], en: ['Strawberry Mojito Pitcher (1 L)', 'Sweet and refreshing strawberry-mint mojito pitcher.'] },
    'des-1': { ru: ['Чизкейк Сан-Себастьян', 'Нежный испанский чизкейк с горячим шоколадным соусом.'], en: ['San Sebastian Cheesecake', 'Creamy Basque burnt cheesecake served with warm chocolate sauce.'] },
    'des-2': { ru: ['Ягодная Опера', 'Изысканное пирожное Опера с ягодной прослойкой.'], en: ['Berry Opera Cake', 'Delicate layered French Opera cake with berry glaze.'] },
    'des-3': { ru: ['Орешки Safia (1 кор.)', 'Песочные орешки с нежной вареной сгущенкой.'], en: ['Safia Caramel Walnuts (1 box)', 'Shortbread walnut-shaped cookies filled with dulce de leche.'] },
    'des-4': { ru: ['Шоколад Millennium Air Bubble', 'Пористый молочный/темный шоколад Millennium.'], en: ['Millennium Air Bubble Chocolate', 'Aerated milk and dark chocolate bar.'] }
  };

  let selectedPaymentMethod = 'Naqd';

  const CATEGORY_TRANSLATIONS = {
    uz: { 'Birinchi taomlar': 'Birinchi taomlar', 'Ikkinchi taomlar': 'Ikkinchi taomlar', 'Shashlik va assorti': 'Shashlik va assorti', 'Salatlar': 'Salatlar', 'Ichimliklar & Non': 'Ichimliklar & Non', 'Desertlar': 'Desertlar' },
    ru: { 'Birinchi taomlar': 'Первые блюда', 'Ikkinchi taomlar': 'Вторые блюда', 'Shashlik va assorti': 'Шашлыки и ассорти', 'Salatlar': 'Салаты', 'Ichimliklar & Non': 'Напитки и Хлеб', 'Desertlar': 'Десерты' },
    en: { 'Birinchi taomlar': 'First Courses', 'Ikkinchi taomlar': 'Main Courses', 'Shashlik va assorti': 'Shashlik & Grill', 'Salatlar': 'Salads', 'Ichimliklar & Non': 'Drinks & Bread', 'Desertlar': 'Desserts' }
  };

  const PORTION_TRANSLATIONS = {
    uz: { '1 porsiya': '1 porsiya', '1 dona': '1 dona', '1 kg': '1 kg', '1 litr': '1 litr', '0.5 litr': '0.5 litr', '0.45 litr': '0.45 litr', '0.25 litr': '0.25 litr', '1 quti': '1 quti' },
    ru: { '1 porsiya': '1 порция', '1 dona': '1 шт', '1 kg': '1 кг', '1 litr': '1 литр', '0.5 litr': '0.5 литра', '0.45 litr': '0.45 литра', '0.25 litr': '0.25 литра', '1 quti': '1 коробка' },
    en: { '1 porsiya': '1 portion', '1 dona': '1 pc', '1 kg': '1 kg', '1 litr': '1 liter', '0.5 litr': '0.5 L', '0.45 litr': '0.45 L', '0.25 litr': '0.25 L', '1 quti': '1 box' }
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
  function getCategoryName(catName) { return (CATEGORY_TRANSLATIONS[currentLang] && CATEGORY_TRANSLATIONS[currentLang][catName]) || catName; }
  function getPortionName(portion) { return (PORTION_TRANSLATIONS[currentLang] && PORTION_TRANSLATIONS[currentLang][portion]) || portion; }

  /* ==========================================================================
     BUTUN SAYT BO'LIMLARI, FORMALAR VA TUGMALARNING 3 TILDAGI TARJIMASI
     ========================================================================== */
  const PAGE_SELECTORS_I18N = [
    // Header & Mobile Nav
    { sel: '.logo-sub', uz: 'Oilaviy restoran', ru: 'Семейный ресторан', en: 'Family Restaurant' },
    { sel: '#desktopNav a[href="#home"], .drawer-links a[href="#home"]', html: true, uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    { sel: '#desktopNav a[href="#about"], .drawer-links a[href="#about"]', html: true, uz: 'Biz haqimizda', ru: 'О нас', en: 'About Us' },
    { sel: '#desktopNav a[href="#why"], .drawer-links a[href="#why"]', html: true, uz: 'Afzalliklar', ru: 'Преимущества', en: 'Why IQBOL' },
    { sel: '#desktopNav a[href="#menu"], .drawer-links a[href="#menu"]', html: true, uz: 'Menyu', ru: 'Меню', en: 'Menu' },
    { sel: '#desktopNav a[href="#reservation"], .drawer-links a[href="#reservation"]', html: true, uz: 'Stol band qilish', ru: 'Бронь стола', en: 'Book a Table' },
    { sel: '#desktopNav a[href="#gallery"], .drawer-links a[href="#gallery"]', html: true, uz: 'Galereya', ru: 'Галерея', en: 'Gallery' },
    { sel: '#desktopNav a[href="#testimonials"], .drawer-links a[href="#testimonials"]', html: true, uz: 'Sharhlar', ru: 'Отзывы', en: 'Reviews' },
    { sel: '#desktopNav a[href="#contact"], .drawer-links a[href="#contact"]', html: true, uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
    { sel: '#headerReservationBtn span', uz: 'Stol band qilish', ru: 'Бронь стола', en: 'Book a Table' },

    // Hero Section
    { sel: '.hero-badge span', uz: "Qarshi shahrida mehmondo'stlik maskani", ru: 'Место гостеприимства в городе Карши', en: 'A Hub of Hospitality in Karshi' },
    { sel: '.hero-title', html: true, uz: 'IQBOL — <span class="gold-gradient-text">Ta\'m va mehmondo\'stlik</span> uyg\'unligi', ru: 'IQBOL — Гармония <span class="gold-gradient-text">вкуса и гостеприимства</span>', en: 'IQBOL — Harmony of <span class="gold-gradient-text">Taste & Hospitality</span>' },
    { sel: '.hero-subtitle', uz: "An'anaviy o'zbek va uyg'ur taomlari, iliq muhit va unutilmas ta'mlar. Saralangan go'sht, haqiqiy tandir va mehr bilan pishirilgan lazzatlar oilangizni kutmoqda.", ru: 'Традиционные узбекские и уйгурские блюда, теплая атмосфера и незабываемые вкусы. Отборное мясо, настоящий тандыр и приготовленные с любовью блюда ждут вашу семью.', en: 'Traditional Uzbek and Uyghur cuisine, warm ambiance, and unforgettable flavors. Selected meats, authentic clay tandoor, and dishes cooked with love await your family.' },
    { sel: '#heroMenuBtn span', uz: "Menuni ko'rish", ru: 'Смотреть меню', en: 'Explore Menu' },
    { sel: '#heroReservationBtn span', uz: 'Stol band qilish', ru: 'Забронировать стол', en: 'Book a Table' },

    // About Section
    { sel: '#about .section-tag', uz: 'Bizning tarix va qadriyatlar', ru: 'Наша история и ценности', en: 'Our Story & Values' },
    { sel: '#about .section-title', html: true, uz: 'Oilaviy iliqlik va <span>Sharqona lazzat</span> maskani', ru: 'Обитель семейного тепла и <span>восточного вкуса</span>', en: 'A Sanctuary of Family Warmth & <span>Oriental Flavor</span>' },
    { sel: '.about-lead', uz: "Qarshi shahrining markazida joylashgan «IQBOL» restorani — bu shunchaki ovqatlanish joyi emas, balki yaqinlar bilan diydorlashuv va haqiqiy gastronomik zavq maskanidir.", ru: 'Расположенный в центре города Карши ресторан «IQBOL» — это не просто место для трапезы, а пространство для теплых встреч с близкими и истинного гастрономического удовольствия.', en: 'Located in the heart of Karshi, IQBOL Restaurant is more than just a dining spot — it is a place for warm family gatherings and true gastronomic pleasure.' },
    { sel: '.about-text', uz: "Biz har bir taomni saralangan halol mahsulotlardan, milliy va uyg'ur oshxonasining asriy an'analariga sodiq qolgan holda tayyorlaymiz. Keng va yorug' zallarimiz, shinam VIP kabinalarimiz hamda yashil ayvonimiz har qanday oilaviy tadbir yoki do'stlar davrasi uchun mos keladi.", ru: 'Мы готовим каждое блюдо из отборных халяльных продуктов, сохраняя вековые традиции национальной и уйгурской кухни. Наши просторные залы, уютные VIP-кабинки и зеленая терраса идеально подходят для семейного отдыха.', en: 'We prepare every dish from selected 100% Halal ingredients, honoring centuries-old Uzbek and Uyghur culinary traditions. Our spacious halls, cozy VIP cabins, and lush terrace are ideal for any gathering.' },

    // Why Us Section
    { sel: '#why .section-tag', uz: 'Nega aynan biz?', ru: 'Почему выбирают нас?', en: 'Why Choose Us?' },
    { sel: '#why .section-title', html: true, uz: 'IQBOL Restoranining <span>ustunliklari</span>', ru: 'Преимущества <span>Ресторана IQBOL</span>', en: 'The <span>IQBOL</span> Advantage' },
    { sel: '#why .section-subtitle', uz: "Har bir mehmonimiz o'zini xuddi o'z uyidagidek erkin va qadrli his qilishi uchun barcha qulayliklarni yaratganmiz.", ru: 'Мы создали все условия, чтобы каждый гость чувствовал себя комфортно, свободно и желанно, как дома.', en: 'We have crafted every detail so that each guest feels welcomed, valued, and right at home.' },

    // Menu Section & Category Tabs
    { sel: '#menu .section-tag', uz: 'Bizning taomnoma', ru: 'Наше меню', en: 'Our Culinary Menu' },
    { sel: '#menu .section-title', html: true, uz: 'IQBOL <span>Restoran Menyu</span>', ru: 'Меню <span>Ресторана IQBOL</span>', en: 'IQBOL <span>Restaurant Menu</span>' },
    { sel: '#menu .section-subtitle', uz: "60 dan ortiq saralangan milliy, uyg'ur va yevropa taomlari — issiq sho'rvalar, tandir va jizlar, cho'g'da pishgan shashliklar hamda muzdek ichimliklar.", ru: 'Более 60 отборных блюд национальной, уйгурской и европейской кухни — горячие супы, тандыр и жиз, шашлыки на углях и прохладительные напитки.', en: 'Over 60 curated Uzbek, Uyghur, and European dishes — hot soups, clay-oven tandoor meats, charcoal shashliks, fresh salads, and chilled drinks.' },
    { sel: '.cat-tab-btn[data-category="all"] span', uz: 'Barchasi', ru: 'Все блюда', en: 'All Dishes' },
    { sel: '.cat-tab-btn[data-category="birinchi"] span', uz: 'Birinchi taomlar', ru: 'Первые блюда', en: 'First Courses' },
    { sel: '.cat-tab-btn[data-category="ikkinchi"] span', uz: 'Ikkinchi taomlar', ru: 'Вторые блюда', en: 'Main Courses' },
    { sel: '.cat-tab-btn[data-category="shashlik"] span', uz: 'Shashlik va assorti', ru: 'Шашлыки и гриль', en: 'Shashlik & Grill' },
    { sel: '.cat-tab-btn[data-category="salatlar"] span', uz: 'Salatlar', ru: 'Салаты', en: 'Salads' },
    { sel: '.cat-tab-btn[data-category="ichimliklar"] span', uz: 'Ichimliklar', ru: 'Напитки', en: 'Drinks' },
    { sel: '.cat-tab-btn[data-category="gazli"] span', uz: 'Desertlar', ru: 'Десерты', en: 'Desserts' },

    // Reservation Section
    { sel: '#reservation .section-tag', uz: 'Oldindan joy band qilish', ru: 'Предварительная бронь', en: 'Advance Table Booking' },
    { sel: '#reservation .section-title', html: true, uz: 'Oilaviy kechalar uchun <span>Stol band qiling</span>', ru: 'Забронируйте стол для <span>семейного вечера</span>', en: 'Reserve a Table for <span>Your Family Evening</span>' },
    { sel: '#reservation .form-title', uz: 'Stol band qilish', ru: 'Бронирование стола', en: 'Table Reservation' },
    { sel: 'label[for="resName"]', uz: 'Ismingiz *', ru: 'Ваше имя *', en: 'Your Name *' },
    { sel: 'label[for="resPhone"]', uz: 'Telefon raqamingiz *', ru: 'Номер телефона *', en: 'Phone Number *' },
    { sel: 'label[for="resDate"]', uz: 'Sana *', ru: 'Дата *', en: 'Date *' },
    { sel: 'label[for="resTime"]', uz: 'Vaqt *', ru: 'Время *', en: 'Time *' },
    { sel: 'label[for="resGuests"]', uz: 'Mehmonlar soni *', ru: 'Количество гостей *', en: 'Number of Guests *' },
    { sel: 'label[for="resTableType"]', uz: 'Joy turi (Zal) *', ru: 'Выберите зал *', en: 'Seating Area (Hall) *' },
    { sel: 'label[for="resTableNumber"]', uz: 'Stol / Kabina raqami *', ru: 'Номер стола / кабины *', en: 'Table / Cabin Number *' },
    { sel: 'label[for="resNotes"]', uz: "Qo'shimcha izoh", ru: 'Дополнительные пожелания', en: 'Special Requests' },
    { sel: '#reservationForm button[type="submit"] span', uz: 'Stol band qilish', ru: 'Забронировать стол', en: 'Confirm Reservation' },

    // Gallery, Testimonials, Contact
    { sel: '#gallery .section-tag', uz: 'Foto lavhalar', ru: 'Фотогалерея', en: 'Photo Gallery' },
    { sel: '#gallery .section-title', html: true, uz: 'IQBOL <span>Galereyasi</span>', ru: 'Галерея <span>IQBOL</span>', en: 'IQBOL <span>Gallery</span>' },
    { sel: '#gallery .section-subtitle', uz: "Restoranimizning shinam muhiti, milliy bezaklari va ishtahaochar taomlaridan jonli lavhalar.", ru: 'Живые кадры уютной атмосферы нашего ресторана, восточного интерьера и аппетитных блюд.', en: 'A glimpse into our cozy ambiance, traditional oriental decor, and mouthwatering dishes.' },
    { sel: '#testimonials .section-tag', uz: 'Mijozlarimiz fikri', ru: 'Отзывы гостей', en: 'Guest Reviews' },
    { sel: '#testimonials .section-title', html: true, uz: 'Mehmonlarimiz <span>nima deydi?</span>', ru: 'Что говорят <span>наши гости?</span>', en: 'What Our <span>Guests Say</span>' },
    { sel: '#contact .section-tag', uz: 'Manzil va Aloqa', ru: 'Адрес и Контакты', en: 'Location & Contact' },
    { sel: '#contact .section-title', html: true, uz: 'Biz bilan <span>bog\'laning</span>', ru: 'Свяжитесь <span>с нами</span>', en: 'Get in <span>Touch</span>' },

    // Cart & Checkout Modals
    { sel: '.cart-title span', uz: 'Sizning buyurtmangiz', ru: 'Ваш заказ', en: 'Your Order' },
    { sel: '.order-type-btn[data-type="dine_in"]', html: true, uz: '<i class="fas fa-utensils"></i> Restoranda', ru: '<i class="fas fa-utensils"></i> В ресторане', en: '<i class="fas fa-utensils"></i> Dine-in' },
    { sel: '.order-type-btn[data-type="delivery"]', html: true, uz: '<i class="fas fa-motorcycle"></i> Yetkazib berish', ru: '<i class="fas fa-motorcycle"></i> Доставка', en: '<i class="fas fa-motorcycle"></i> Delivery' },
    { sel: '.cart-footer .btn-primary span', uz: 'Buyurtmani rasmiylashtirish', ru: 'Оформить заказ', en: 'Proceed to Checkout' },
    { sel: '#dishModal .modal-actions .btn-primary span', uz: "Buyurtmaga qo'shish", ru: 'Добавить в заказ', en: 'Add to Order' },
    { sel: '#checkoutModal h3.font-display', uz: 'Buyurtmani tasdiqlash', ru: 'Подтверждение заказа', en: 'Confirm Order' },
    { sel: 'label[for="checkoutName"]', uz: 'Ismingiz *', ru: 'Ваше имя *', en: 'Your Name *' },
    { sel: 'label[for="checkoutPhone"]', uz: 'Telefon raqamingiz *', ru: 'Номер телефона *', en: 'Phone Number *' },
    { sel: 'label[for="checkoutTable"]', uz: 'Stol yoki Kabina raqami', ru: 'Номер стола или кабины', en: 'Table or Cabin Number' },
    { sel: 'label[for="checkoutAddress"]', uz: 'Yetkazib berish manzili *', ru: 'Адрес доставки *', en: 'Delivery Address *' },
    { sel: 'label[for="checkoutNote"]', uz: 'Buyurtmaga izoh', ru: 'Комментарий к заказу', en: 'Order Notes' },
    { sel: '#checkoutForm button[type="submit"] span', uz: 'Buyurtmani yuborish', ru: 'Отправить заказ', en: 'Submit Order' }
  ];

  /* ==========================================================================
     2. APP STATE & STORAGE
     ========================================================================== */
  let cart = [];
  try { const rawCart = JSON.parse(localStorage.getItem('iqbol_cart')) || []; cart = rawCart.filter(item => item && MENU_DATA.some(d => d.id === item.id)); } catch(e) { cart = []; }
  let favorites = [];
  try { favorites = JSON.parse(localStorage.getItem('iqbol_favorites')) || []; } catch(e) { favorites = []; }

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
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

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
    setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3200);
  }
  function makeStrikethrough(text) { return text.split('').map(char => char + '\u0336').join(''); }

  /* ==========================================================================
     3. RENDER MENU
     ========================================================================== */
  function renderMenu() {
    if (!dishesGrid) return;
    let filtered = MENU_DATA;
    if (activeCategory !== 'all') filtered = filtered.filter(item => item.category === activeCategory);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        getDishName(item).toLowerCase().includes(q) ||
        getDishDesc(item).toLowerCase().includes(q)
      );
    }
    if (filtered.length === 0) {
      dishesGrid.innerHTML = `<div class="no-dishes-found"><i class="fas fa-utensils"></i><h3>${tUI('noDishes')}</h3></div>`;
      return;
    }

    const priceLbl = tUI('priceLabel');
    const hitLbl = tUI('hitBadge');
    dishesGrid.innerHTML = filtered.map(dish => {
      const isFav = favorites.includes(dish.id);
      const dName = getDishName(dish);
      const dDesc = getDishDesc(dish);
      const dCat = getCategoryName(dish.categoryName);
      const dPortion = getPortionName(dish.portion);

      return `
        <article class="dish-card" data-id="${dish.id}">
          <div class="dish-img-wrap" onclick="window.openDishModal('${dish.id}')">
            <img src="${dish.image}" alt="${dName}" loading="lazy" />
            <div class="dish-badges">${dish.popular ? `<span class="badge badge-gold"><i class="fas fa-star"></i> ${hitLbl}</span>` : ''}${dish.portion ? `<span class="badge badge-portion">${dPortion}</span>` : ''}</div>
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
    }).join('');
  }

  categoryTabs.forEach(btn => btn.addEventListener('click', () => {
    categoryTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderMenu();
  }));
  if (searchInput) searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (clearSearchBtn) clearSearchBtn.classList.toggle('visible', searchQuery.length > 0);
    renderMenu();
  });
  if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.remove('visible');
    renderMenu();
    searchInput.focus();
  });

  window.toggleFavorite = function(dishId) {
    const idx = favorites.indexOf(dishId);
    if (idx > -1) favorites.splice(idx, 1); else favorites.push(dishId);
    localStorage.setItem('iqbol_favorites', JSON.stringify(favorites));
    renderMenu();
  };

  let selectedModalDish = null; let modalQuantity = 1;
  window.openDishModal = function(dishId) {
    const dish = MENU_DATA.find(d => d.id === dishId); if (!dish || !dishModal) return;
    selectedModalDish = dish; modalQuantity = 1;
    document.getElementById('modalImg').src = dish.image;
    document.getElementById('modalTitle').textContent = getDishName(dish);
    document.getElementById('modalPrice').textContent = formatPrice(dish.price) + (dish.portion ? ` (${getPortionName(dish.portion)})` : '');
    document.getElementById('modalDesc').textContent = getDishDesc(dish);
    document.getElementById('modalCategoryBadge').textContent = getCategoryName(dish.categoryName);
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
      cartItemsList.innerHTML = `<div class="empty-cart-view"><i class="fas fa-shopping-basket"></i><h4>${tUI('emptyCart')}</h4></div>`;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(0); 
      if (cartTotalEl) cartTotalEl.textContent = formatPrice(0); 
      return;
    }
    
    let subtotal = 0;
    cartItemsList.innerHTML = cart.map(item => {
      const dish = MENU_DATA.find(d => d.id === item.id); if (!dish) return '';
      const itemTotal = dish.price * item.quantity; subtotal += itemTotal;
      return `
        <div class="cart-item">
          <img src="${dish.image}" class="cart-item-thumb" />
          <div class="cart-item-details"><h5 class="cart-item-name">${getDishName(dish)}</h5><div class="cart-item-price">${formatPrice(dish.price)} x ${item.quantity} = <strong>${formatPrice(itemTotal)}</strong></div></div>
          <div class="cart-item-actions">
            <div class="quantity-control"><button class="qty-btn" onclick="window.changeCartQty('${dish.id}', -1)">-</button><span class="qty-val">${item.quantity}</span><button class="qty-btn" onclick="window.changeCartQty('${dish.id}', 1)">+</button></div>
            <button class="btn-remove-item" onclick="window.removeFromCart('${dish.id}')"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>`;
    }).join('');
    
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);

    let extraFee = 0; let feeDescription = '';
    if (orderType === 'delivery') {
      const zoneSelect = document.getElementById('deliveryZone');
      const zoneVal = zoneSelect ? zoneSelect.value : 'ichki';
      extraFee = zoneVal === 'tashqi' ? 15000 : 10000;
      feeDescription = zoneVal === 'tashqi' ? tUI('delivOuterShort') : tUI('delivInnerShort');
    } else {
      let serviceFeePercent = 0.07;
      const tableInputVal = document.getElementById('checkoutTable') ? document.getElementById('checkoutTable').value.toLowerCase() : '';
      if (tableInputVal.includes('vip') || tableInputVal.includes('kabina')) serviceFeePercent = 0.10;
      extraFee = Math.round(subtotal * serviceFeePercent);
      feeDescription = `${tUI('serviceFeeLabel')} (${Math.round(serviceFeePercent * 100)}%): ${formatPrice(extraFee)}`;
    }

    let grandTotal = subtotal + extraFee;
    if (cartTotalEl) cartTotalEl.innerHTML = `${formatPrice(grandTotal)} <br><small style="font-size:0.75rem; color:var(--accent-gold);">(${feeDescription})</small>`;
  }

  window.addToCart = function(dishId, qty = 1) {
    const dish = MENU_DATA.find(d => d.id === dishId); if (!dish) return;
    const existing = cart.find(item => item.id === dishId);
    if (existing) existing.quantity += qty; else cart.push({ id: dishId, quantity: qty });
    saveCart(); showToast(`"${getDishName(dish)}" ${tUI('addedToCart')}`, 'fa-shopping-cart');
  };
  window.changeCartQty = function(dishId, delta) { const item = cart.find(i => i.id === dishId); if (!item) return; item.quantity += delta; if (item.quantity <= 0) cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.removeFromCart = function(dishId) { cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.openCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; updateCartUI(); } };
  window.closeCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; } };

  /* ==========================================================================
     4. CHECKOUT
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  window.openCheckout = function() {
    if (cart.length === 0) return showToast(tUI('emptyCart'), 'fa-exclamation-circle');
    window.closeCart();
    if (checkoutModal) {
      checkoutModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (cTableInputEl && !cTableInputEl.value && savedQrTable) cTableInputEl.value = savedQrTable;
      ensureDeliveryZoneSelect();
      ensurePaymentSelectorUI();
      renderUserUI();
      updateCartUI();
    }
  };
  window.closeCheckout = function() { if (checkoutModal) { checkoutModal.classList.remove('open'); document.body.style.overflow = ''; } };

  function ensureDeliveryZoneSelect() {
    const addressGroup = document.getElementById('checkoutAddressGroup');
    if (addressGroup && !document.getElementById('deliveryZone')) {
      const zoneDiv = document.createElement('div'); zoneDiv.className = 'form-group'; zoneDiv.style.marginTop = '10px';
      zoneDiv.innerHTML = `<label id="delivZoneLbl" for="deliveryZone">${tUI('delivZoneLabel')}</label><select id="deliveryZone" style="width:100%; padding:0.8rem 1rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main);"><option value="ichki">${tUI('delivInner')}</option><option value="tashqi">${tUI('delivOuter')}</option></select>`;
      addressGroup.appendChild(zoneDiv);
      document.getElementById('deliveryZone').addEventListener('change', updateCartUI);
    }
  }

  function renderSelectedAppButton() {
    const btnWrap = document.getElementById('selectedAppActionWrap');
    if (!btnWrap) return;
    const appInfo = PAYMENT_APPS[selectedPaymentMethod];
    if (!appInfo) { btnWrap.innerHTML = ''; return; }
    btnWrap.innerHTML = `
      <button type="button" class="open-app-btn" style="background:${appInfo.color};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
        <i class="fas fa-external-link-alt"></i>
        <span>1. ${appInfo.name} ${tUI('openAppPay')}</span>
      </button>
    `;
  }

  function ensurePaymentSelectorUI() {
    const checkoutFormEl = document.getElementById('checkoutForm'); if (!checkoutFormEl || document.getElementById('paymentMethodsBox')) return;
    const submitBtn = checkoutFormEl.querySelector('button[type="submit"]');
    const payBox = document.createElement('div'); payBox.id = 'paymentMethodsBox'; payBox.className = 'payment-methods-box';
    payBox.innerHTML = `
      <div class="payment-methods-title"><i class="fas fa-wallet" style="color:var(--accent-gold);"></i><span id="payMethodsTitleText">${tUI('payMethodTitle')}</span></div>
      <div class="payment-methods-grid">
        <button type="button" class="pay-option-btn active" data-pay="Naqd"><i class="fas fa-money-bill-wave"></i> <span id="payBtnCashText">${tUI('payCash')}</span></button>
        <button type="button" class="pay-option-btn" data-pay="Click"><i class="fas fa-credit-card"></i> <span>Click</span></button>
        <button type="button" class="pay-option-btn" data-pay="Payme"><i class="fas fa-mobile-alt"></i> <span>Payme</span></button>
        <button type="button" class="pay-option-btn" data-pay="Paynet"><i class="fas fa-bolt"></i> <span>Paynet</span></button>
      </div>
      <div id="cardDisplayBox" class="card-Display-box">
        <span style="font-size:0.78rem; color:var(--text-muted);" id="cardTransferHint">${tUI('cardHint')}</span>
        <div class="card-number-row">
          <span class="card-number-val">${RESTAURANT_CARD}</span>
          <button type="button" class="btn-copy-card" onclick="window.copyRestaurantCard()"><i class="fas fa-copy"></i> <span id="copyCardBtnTxt">${tUI('copyBtn')}</span></button>
        </div>
        <div id="selectedAppActionWrap"></div>
        <small id="afterPayHintTxt" style="color:var(--accent-gold); font-size:0.75rem;">${tUI('afterPayHint')}</small>
      </div>
    `;
    checkoutFormEl.insertBefore(payBox, submitBtn);

    const cardBox = document.getElementById('cardDisplayBox');
    payBox.querySelectorAll('.pay-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        payBox.querySelectorAll('.pay-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedPaymentMethod = btn.dataset.pay;
        const isOnline = selectedPaymentMethod !== 'Naqd';
        if (cardBox) cardBox.classList.toggle('visible', isOnline);
        if (isOnline) {
          window.copyRestaurantCard();
          renderSelectedAppButton();
        }
      });
    });
  }

  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => { 
      orderTypeBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); orderType = btn.dataset.type; 
      document.getElementById('checkoutAddressGroup').style.display = orderType === 'delivery' ? 'flex' : 'none'; 
      document.getElementById('checkoutTableGroup').style.display = orderType === 'delivery' ? 'none' : 'flex'; 
      if (orderType === 'delivery') ensureDeliveryZoneSelect(); updateCartUI();
    });
  });

  const checkoutTableInput = document.getElementById('checkoutTable'); if (checkoutTableInput) checkoutTableInput.addEventListener('input', updateCartUI);

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    let isSubmitting = false;
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      if (!currentUser) {
        const noticeEl = document.getElementById('checkoutLoginNotice');
        if (noticeEl) noticeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (!currentUser.phone) {
        window.openOtpModal(() => {
          renderUserUI();
          checkoutForm.requestSubmit();
        });
        return;
      }

      const name = document.getElementById('checkoutName').value.trim(); 
      const phone = currentUser.phone;
      const address = document.getElementById('checkoutAddress').value.trim(); 
      const table = document.getElementById('checkoutTable').value.trim(); 
      const noteEl = document.getElementById('checkoutNote'); const note = noteEl ? noteEl.value.trim() : '';
      
      if (!name || !phone) return;
      if (orderType === 'delivery' && !address) return;
      
      let subtotal = 0; 
      let orderLinesText = cart.map(item => { const dish = MENU_DATA.find(d => d.id === item.id); const lineTotal = dish ? dish.price * item.quantity : 0; subtotal += lineTotal; return `• ${getDishName(dish)} x ${item.quantity} = ${formatPrice(lineTotal)}`; }).join('\n');

      let extraFee = 0; let feeTitle = '';
      if (orderType === 'delivery') {
        const zoneSelect = document.getElementById('deliveryZone'); const zoneVal = zoneSelect ? zoneSelect.value : 'ichki';
        extraFee = zoneVal === 'tashqi' ? 15000 : 10000; feeTitle = zoneVal === 'tashqi' ? 'Yetkazish (Shahar tashqari)' : 'Yetkazish (Shahar ichi)';
      } else {
        let serviceFeePercent = 0.07; if (table.toLowerCase().includes('vip') || table.toLowerCase().includes('kabina')) serviceFeePercent = 0.10;
        extraFee = Math.round(subtotal * serviceFeePercent); feeTitle = `Xizmat haqi (${Math.round(serviceFeePercent * 100)}%)`;
      }

      let totalSum = subtotal + extraFee;
      const orderId = 'IQB-' + Math.floor(100000 + Math.random() * 900000);
      const deliveryText = orderType === 'delivery' ? `Yetkazish: ${address} (${feeTitle})` : `Restoranda: ${table || savedQrTable || 'Tanlanmagan'}`;
      const receiptSummaryText = `📍 ${deliveryText}\n💳 To'lov: ${selectedPaymentMethod} | Jami: ${formatPrice(totalSum)}\n\n${orderLinesText}`;

      localStorage.setItem('iqbol_active_order', orderId);
      localStorage.setItem('iqbol_active_order_details', receiptSummaryText);

      if (selectedPaymentMethod === 'Naqd') {
        isSubmitting = true;
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        let sentByServer = false;
        try {
          const res = await fetch(`${API_URL}/order/create-cash`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId, name, phone, email: currentUser.email,
              deliveryText, orderLinesText,
              subtotalText: formatPrice(subtotal),
              feeTitle, extraFeeText: formatPrice(extraFee),
              totalText: formatPrice(totalSum), note
            })
          });
          if (res.ok) {
            const d = await res.json();
            if (d && d.botUsername) tgBotUsername = d.botUsername;
            sentByServer = true;
          }
        } catch (err) {}

        if (!sentByServer) {
          const tgText = `📦 YANGI TAOM BUYURTMASI! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${currentUser.email}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n💳 To'lov usuli: Naqd\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 Jami to'lov: ${formatPrice(totalSum)}\n📝 Izoh: ${note || "Yo'q"}\n\n👨‍🍳 CHEF VA 🛵 DASTAVSHIK BOSHQARUVI:`;
          await sendSingleFallbackTelegram(tgText, buildChefAndCourierInlineKeyboard(orderId));
        }

        window.closeCheckout();
        showSuccessModal({
          title: tUI('orderAcceptedTitle'),
          subtitle: `${tUI('orderAcceptedSub')} #${orderId}`,
          message: tUI('orderAcceptedMsg'),
          details: receiptSummaryText,
          orderId: orderId,
          showTelegramBotBtn: true
        });
        cart = []; saveCart(); isSubmitting = false; if (submitBtn) submitBtn.disabled = false;
        return;
      }

      isSubmitting = true;
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      let paySentByServer = false;
      try {
        const res = await fetch(`${API_URL}/payment/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId, name, phone, email: currentUser.email,
            deliveryText, payMethod: `${selectedPaymentMethod} (${RESTAURANT_CARD})`,
            orderLinesText, subtotalText: formatPrice(subtotal),
            feeTitle, extraFeeText: formatPrice(extraFee),
            totalText: formatPrice(totalSum), note
          })
        });
        if (res.ok) {
          const d = await res.json();
          if (d && d.botUsername) tgBotUsername = d.botUsername;
          paySentByServer = true;
        }
      } catch (err) {}

      if (!paySentByServer) {
        const tgPayText = `💳 TO'LOV TEKSHIRUVI KUTILMOQDA! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${currentUser.email}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n🏦 To'lov usuli: ${selectedPaymentMethod} (${RESTAURANT_CARD})\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 Kutilayotgan summa: ${formatPrice(totalSum)}\n📝 Izoh: ${note || "Yo'q"}\n\n⚠️ DIQQAT: 9860 1701 1569 3682 kartaga ${formatPrice(totalSum)} tushganini tekshirib, pastdagi tugmani bosing:`;
        await sendSingleFallbackTelegram(tgPayText, {
          inline_keyboard: [[
            { text: "✅ Pul tushdi (Chefga o'tkazish)", callback_data: `p_ok_${orderId}` },
            { text: "❌ Tushmadi (Rad etish)", callback_data: `p_no_${orderId}` }
          ]]
        });
      }

      window.closeCheckout();

      const spinnerEl = document.getElementById('payVerifySpinner');
      const iconEl = document.getElementById('payVerifyIcon');
      const titleEl = document.getElementById('payVerifyTitle');
      const descEl = document.getElementById('payVerifyDesc');
      const actEl = document.getElementById('payVerifyActions');

      spinnerEl.style.display = 'block';
      iconEl.style.display = 'none';
      titleEl.textContent = "To'lov tekshirilmoqda...";
      descEl.innerHTML = `<b>${RESTAURANT_CARD}</b> — <b>${selectedPaymentMethod}</b> (${formatPrice(totalSum)})`;
      
      const appInfo = PAYMENT_APPS[selectedPaymentMethod];
      actEl.innerHTML = `
        <button type="button" class="open-app-btn" style="background:${appInfo ? appInfo.color : '#0099ff'};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
          <i class="fas fa-external-link-alt"></i> ${selectedPaymentMethod} (${formatPrice(totalSum)})
        </button>
        <button type="button" class="btn btn-outline-gold" onclick="window.closePayVerifyModal()" style="margin-top:6px;">X</button>
      `;

      payCheckModal.classList.add('open');
      document.body.style.overflow = 'hidden';

      if (payPollInterval) clearInterval(payPollInterval);
      payPollInterval = setInterval(async () => {
        try {
          const stRes = await fetch(`${API_URL}/payment/status/${orderId}`);
          const stData = await stRes.json();

          if (stData.status === 'approved') {
            clearInterval(payPollInterval);
            spinnerEl.style.display = 'none';
            iconEl.style.display = 'flex';
            iconEl.style.background = 'rgba(46, 204, 113, 0.18)';
            iconEl.style.color = '#2ecc71';
            iconEl.innerHTML = '<i class="fas fa-check"></i>';
            titleEl.textContent = "✅ OK!";
            descEl.innerHTML = `${tUI('orderAcceptedMsg')}`;
            const botLink = window.getTelegramBotOrderUrl(orderId);
            actEl.innerHTML = `
              <a href="${botLink}" target="_blank" rel="noopener noreferrer" class="btn-go-tg-bot">
                <i class="fab fa-telegram-plane"></i>
                <span>${tUI('goTgBotBtn')}</span>
              </a>
              <button type="button" class="btn btn-outline-gold" onclick="window.closePayVerifyModal()">OK</button>
            `;
            cart = []; saveCart();
          } else if (stData.status === 'rejected') {
            clearInterval(payPollInterval);
            spinnerEl.style.display = 'none';
            iconEl.style.display = 'flex';
            iconEl.style.background = 'rgba(255, 107, 107, 0.18)';
            iconEl.style.color = '#ff6b6b';
            iconEl.innerHTML = '<i class="fas fa-times"></i>';
            titleEl.textContent = "❌";
            descEl.innerHTML = `${RESTAURANT_CARD} — ${formatPrice(totalSum)}`;
            actEl.innerHTML = `
              <button type="button" class="open-app-btn" style="background:${appInfo ? appInfo.color : '#0099ff'};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
                <i class="fas fa-redo"></i> ${selectedPaymentMethod}
              </button>
              <button type="button" class="btn btn-outline-gold" onclick="window.closePayVerifyModal()" style="margin-top:6px;">X</button>
            `;
          }
        } catch (e) {}
      }, 2000);

      isSubmitting = false;
      if (submitBtn) submitBtn.disabled = false;
    });
  }

  /* ==========================================================================
     5. TABLE RESERVATION SYSTEM
     ========================================================================== */
  const reservationForm = document.getElementById('reservationForm');
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
    const type = tableTypeSelect.value; const date = resDateInput.value; const time = resTimeSelect.value;
    let max = 0; let label = tUI('tableWord'); let tableTypeName = '';
    switch (type) {
      case 'asosiy-zal': max = 35; label = tUI('tableWord'); tableTypeName = 'Asosiy zal'; break;
      case 'zal-2': max = 8; label = tUI('tableWord'); tableTypeName = '2-zal'; break;
      case 'vip': max = 9; label = tUI('cabinWord'); tableTypeName = 'VIP kabina'; break;
      case 'tashqi': max = 40; label = tUI('placeWord'); tableTypeName = "Ko'cha / Tashqi ayvon"; break;
    }
    tableNumberSelect.innerHTML = `<option value="">${tUI('loadingWord')}</option>`;
    try {
      const response = await fetch(`${API_URL}/booked`); const bookedTables = await response.json();
      tableNumberSelect.innerHTML = '';
      for (let i = 1; i <= max; i++) {
        const keyOptionVal = `Stol #${i}`;
        const displayVal = `${label} #${i}`;
        const opt = document.createElement('option'); opt.value = displayVal;
        const bookingKey = `${date}_${time}_${tableTypeName}_${keyOptionVal}`;
        if (bookedTables[bookingKey] || bookedTables[`${date}_${time}_${tableTypeName}_${displayVal}`]) {
          opt.disabled = true;
          opt.textContent = makeStrikethrough(displayVal) + ` (${tUI('bookedWord')})`;
          opt.style.color = "red"; opt.style.backgroundColor = "#ffe6e6";
        } else {
          opt.textContent = displayVal;
        }
        tableNumberSelect.appendChild(opt);
      }
    } catch (err) {
      tableNumberSelect.innerHTML = '';
      for (let i = 1; i <= max; i++) {
        const displayVal = `${label} #${i}`;
        const opt = document.createElement('option'); opt.value = displayVal; opt.textContent = displayVal;
        tableNumberSelect.appendChild(opt);
      }
    }
  }

  if (reservationForm) {
    tableTypeSelect.addEventListener('change', checkAndFilterBookedTables);
    resDateInput.addEventListener('change', checkAndFilterBookedTables);
    resTimeSelect.addEventListener('change', checkAndFilterBookedTables);
    checkAndFilterBookedTables();

    let isResSubmitting = false;
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault(); if (isResSubmitting) return;

      if (!currentUser) {
        window.openOtpModal(() => {
          renderUserUI();
          reservationForm.requestSubmit();
        });
        return;
      }

      const name = document.getElementById('resName').value.trim();
      const phone = currentUser.phone || document.getElementById('resPhone').value.trim();
      const date = resDateInput.value; const time = resTimeSelect.value; const guests = document.getElementById('resGuests').value;
      const tableType = tableTypeSelect.value; const tableNumber = tableNumberSelect.value; const notesEl = document.getElementById('resNotes'); const notes = notesEl ? notesEl.value.trim() : '';

      if (!name || !phone || !date || !time || !tableNumber) return;

      isResSubmitting = true; let tableTypeName = '';
      if (tableType === 'asosiy-zal') tableTypeName = 'Asosiy zal'; else if (tableType === 'zal-2') tableTypeName = '2-zal'; else if (tableType === 'vip') tableTypeName = 'VIP kabina'; else if (tableType === 'tashqi') tableTypeName = "Ko'cha / Tashqi ayvon";

      const submitBtn = reservationForm.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/book`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, email: currentUser ? currentUser.email : '', date, time, tableType: tableTypeName, tableNumber, guests, notes }) });
        const result = await response.json();
        if (!result.success) { showToast(result.message, 'fa-exclamation-triangle'); checkAndFilterBookedTables(); isResSubmitting = false; if (submitBtn) submitBtn.disabled = false; return; }
        const bookingCode = 'STOL-' + Math.floor(1000 + Math.random() * 9000);
        showSuccessModal({
          title: 'OK!',
          subtitle: `#${bookingCode}`,
          message: `${name}`,
          details: `${tableTypeName} | ${tableNumber}\nTel: ${phone}`,
          showTelegramBotBtn: false
        });
        reservationForm.reset();
        renderUserUI();
        checkAndFilterBookedTables(); 
      } catch (err) {} finally { isResSubmitting = false; if (submitBtn) submitBtn.disabled = false; }
    });
  }

  /* ==========================================================================
     6. SUCCESS MODAL, THEME & GALLERY (3 TILLI TARJIMA BILAN)
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

    let goBotBtn = document.getElementById('successGoTelegramBotBtn');
    const modalCard = successModal.querySelector('.modal-card');
    const closeBtn = modalCard ? modalCard.querySelector('button:not(.modal-close-btn)') : null;

    if (!goBotBtn && modalCard) {
      goBotBtn = document.createElement('a');
      goBotBtn.id = 'successGoTelegramBotBtn';
      goBotBtn.className = 'btn-go-tg-bot';
      goBotBtn.target = '_blank';
      goBotBtn.rel = 'noopener noreferrer';
      if (closeBtn) modalCard.insertBefore(goBotBtn, closeBtn);
      else modalCard.appendChild(goBotBtn);
    }

    if (goBotBtn) {
      goBotBtn.innerHTML = `<i class="fab fa-telegram-plane"></i> <span>${tUI('goTgBotBtn')}</span>`;
      if (data.showTelegramBotBtn !== false) {
        goBotBtn.href = window.getTelegramBotOrderUrl(data.orderId);
        goBotBtn.style.display = 'inline-flex';
      } else {
        goBotBtn.style.display = 'none';
      }
    }

    successModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  window.closeSuccessModal = function() { if (successModal) { successModal.classList.remove('open'); document.body.style.overflow = ''; } };

  const savedTheme = localStorage.getItem('iqbol_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme'); const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next); localStorage.setItem('iqbol_theme', next); updateThemeIcon(next);
    });
  }
  function updateThemeIcon(theme) { if (!themeToggleBtn) return; themeToggleBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun" style="color: #f3d889;"></i>' : '<i class="fas fa-moon"></i>'; }

  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (header) header.classList.toggle('scrolled', scrollY > 50);
    if (backToTopBtn) backToTopBtn.classList.toggle('visible', scrollY > 400);
  });
  if (backToTopBtn) backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => { if (mobileNavDrawer) mobileNavDrawer.classList.add('open'); if (mobileNavOverlay) mobileNavOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; });
  window.closeMobileNav = function() { if (mobileNavDrawer) { mobileNavDrawer.classList.remove('open'); mobileNavOverlay.classList.remove('open'); document.body.style.overflow = ''; } };

  const GALLERY_IMAGES = [
    { url: 'gal1.jpg', featured: true, uz: ["IQBOL Restorani — Mehmondo'stlik maskani", 'IQBOL Restoran'], ru: ['Ресторан IQBOL — Обитель гостеприимства', 'Ресторан IQBOL'], en: ['IQBOL Restaurant — Hub of Hospitality', 'IQBOL Restaurant'] },
    { url: 'gal2.jpg', featured: false, uz: ['Yuqori darajadagi xizmat va shinam zal', 'Restoran muhiti'], ru: ['Высокий сервис и уютный зал', 'Атмосфера'], en: ['High-end Service & Cozy Hall', 'Ambiance'] },
    { url: 'gal3.jpg', featured: false, uz: ["Milliy qadriyatlar va an'anaviy kolorit", 'Sharqona bezak'], ru: ['Национальные ценности и восточный колорит', 'Восточный декор'], en: ['National Heritage & Traditional Style', 'Oriental Decor'] },
    { url: 'gal4.jpg', featured: false, uz: ["Yashilliklar orasidagi qulay o'rindiqlar", 'Shinam muhit'], ru: ['Уютные места среди зелени', 'Уютная зона'], en: ['Comfortable Seating Among Greenery', 'Cozy Terrace'] },
    { url: 'gal5.jpg', featured: false, uz: ["Oilaviy va do'stlar davrasi uchun keng zal", 'Oilaviy zal'], ru: ['Просторный зал для семьи и друзей', 'Семейный зал'], en: ['Spacious Hall for Family & Friends', 'Family Hall'] },
    { url: 'gal6.jpg', featured: false, uz: ['Alangada pishirilgan tansiq taomlar', 'Oshxona sirlari'], ru: ['Изысканные блюда, приготовленные на огне', 'Секреты кухни'], en: [' signature Flame-Cooked Delicacies', 'Chef Secrets'] },
    { url: 'gal7.jpg', featured: false, uz: ["Nafis sharqona naqshlar uyg'unligi", 'Interyer'], ru: ['Гармония изящных восточных узоров', 'Интерьер'], en: ['Harmony of Fine Oriental Patterns', 'Interior'] },
    { url: 'gal8.jpg', featured: false, uz: ["Milliy sopol laganlar va so'zana", 'Milliy ruh'], ru: ['Национальные ляганы и сюзане', 'Национальный дух'], en: ['Traditional Ceramic Plates & Suzani', 'Tradition'] },
    { url: 'gal9.jpg', featured: false, uz: ['Maxsus steyk va ishtahaochar taomlarimiz', 'Maxsus taomlar'], ru: ['Фирменные стейки и аппетитные блюда', 'Фирменные блюда'], en: ['Special Steaks & Mouthwatering Dishes', 'Specialties'] }
  ];

  const filterTabsContainer = document.querySelector('.gallery-filter-tabs'); if (filterTabsContainer) filterTabsContainer.style.display = 'none';
  let activeLightboxIndex = 0;
  const galleryGrid = document.getElementById('galleryGrid'); const lightboxModal = document.getElementById('lightboxModal'); const lightboxImg = document.getElementById('lightboxImg'); const lightboxCaption = document.getElementById('lightboxCaption');

  function getGalCaption(item) { return (item[currentLang] && item[currentLang][0]) || item.uz[0]; }
  function getGalTag(item) { return (item[currentLang] && item[currentLang][1]) || item.uz[1]; }

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = GALLERY_IMAGES.map((item, index) => `
      <div class="gallery-item ${item.featured ? 'featured' : ''}" onclick="window.openLightbox(${index})">
        <img src="${item.url}" alt="${getGalCaption(item)}" loading="lazy" />
        <div class="gallery-overlay"><span class="gallery-tag">${getGalTag(item)}</span><h4 class="gallery-caption">${getGalCaption(item)}</h4></div>
      </div>
    `).join('');
  }

  window.openLightbox = function(index) { activeLightboxIndex = index; const item = GALLERY_IMAGES[activeLightboxIndex]; if (!item || !lightboxModal) return; lightboxImg.src = item.url; lightboxCaption.textContent = getGalCaption(item); lightboxModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
  window.closeLightbox = function() { if (!lightboxModal) return; lightboxModal.classList.remove('open'); document.body.style.overflow = ''; };
  window.changeLightbox = function(step) { activeLightboxIndex += step; if (activeLightboxIndex < 0) activeLightboxIndex = GALLERY_IMAGES.length - 1; if (activeLightboxIndex >= GALLERY_IMAGES.length) activeLightboxIndex = 0; const item = GALLERY_IMAGES[activeLightboxIndex]; if (item) { lightboxImg.src = item.url; lightboxCaption.textContent = getGalCaption(item); } };

  /* ==========================================================================
     TIL O'ZGARISHI FUNKSIYASI (CHANGE LANGUAGE — HAMMA NARSANI O'ZGARTIRADI)
     ========================================================================== */
  window.changeLanguage = function(lang) {
    currentLang = lang;
    localStorage.setItem('iqbol_lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));

    PAGE_SELECTORS_I18N.forEach(item => {
      document.querySelectorAll(item.sel).forEach(el => {
        if (item.html) el.innerHTML = item[lang];
        else el.textContent = item[lang];
      });
    });

    // Qidiruv va Forma placeholderlarini tarjima qilish
    if (searchInput) {
      searchInput.placeholder = lang === 'ru' ? 'Поиск блюда по названию или составу...' : lang === 'en' ? 'Search dish by name or ingredients...' : 'Taom nomi yoki tarkibini qidiring...';
    }
    const rNameInp = document.getElementById('resName');
    if (rNameInp) rNameInp.placeholder = lang === 'ru' ? 'Введите ваше имя' : lang === 'en' ? 'Enter your name' : 'Ismingizni kiriting';
    const rNotesInp = document.getElementById('resNotes');
    if (rNotesInp) rNotesInp.placeholder = lang === 'ru' ? 'Пожелания к столу или заказу...' : lang === 'en' ? 'Any special requests...' : "Maxsus istaklar bo'lsa yozing...";
    const cAddrInp = document.getElementById('checkoutAddress');
    if (cAddrInp) cAddrInp.placeholder = lang === 'ru' ? 'Улица, дом, ориентир...' : lang === 'en' ? 'Street, house, landmark...' : "Ko'cha, uy raqami, mo'ljal...";

    // Zal turlarini tarjima qilish
    if (tableTypeSelect) {
      const optMain = tableTypeSelect.querySelector('option[value="asosiy-zal"]');
      const opt2 = tableTypeSelect.querySelector('option[value="zal-2"]');
      const optVip = tableTypeSelect.querySelector('option[value="vip"]');
      const optOut = tableTypeSelect.querySelector('option[value="tashqi"]');
      if (optMain) optMain.textContent = tUI('hallMain');
      if (opt2) opt2.textContent = tUI('hall2');
      if (optVip) optVip.textContent = tUI('hallVip');
      if (optOut) optOut.textContent = tUI('hallOut');
    }

    // Ofitsiant va QR modal matnlarini yangilash
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setTxt('waiterBtnTxt', `${savedQrTable} • ${tUI('waiterFloatSuffix')}`);
    setTxt('wTab1Txt', tUI('tabWaiter'));
    setTxt('wTab2Txt', tUI('tabQr'));
    setTxt('wModalTitle', tUI('waiterTitle'));
    setTxt('wModalSub', tUI('waiterSub'));
    setTxt('wAct1T', tUI('wAct1Title')); setTxt('wAct1S', tUI('wAct1Sub'));
    setTxt('wAct2T', tUI('wAct2Title')); setTxt('wAct2S', tUI('wAct2Sub'));
    setTxt('wAct3T', tUI('wAct3Title')); setTxt('wAct3S', tUI('wAct3Sub'));
    setTxt('wAct4T', tUI('wAct4Title')); setTxt('wAct4S', tUI('wAct4Sub'));
    setTxt('qrScanHintTxt', tUI('qrScanHint'));
    setTxt('qrHallLblTxt', tUI('qrHallLbl'));
    setTxt('qrNumLblTxt', tUI('qrNumLbl'));
    setTxt('qrPrintBtnTxt', tUI('qrPrintBtn'));
    setTxt('payMethodsTitleText', tUI('payMethodTitle'));
    setTxt('payBtnCashText', tUI('payCash'));
    setTxt('cardTransferHint', tUI('cardHint'));
    setTxt('copyCardBtnTxt', tUI('copyBtn'));
    setTxt('afterPayHintTxt', tUI('afterPayHint'));

    const wInp = document.getElementById('waiterTableInput');
    if (wInp) wInp.placeholder = tUI('waiterInputPh');
    const wNote = document.getElementById('waiterCustomNote');
    if (wNote) wNote.placeholder = tUI('waiterNotePh');

    renderMenu();
    updateCartUI();
    renderGallery();
    renderUserUI();
    checkAndFilterBookedTables();
    renderSelectedAppButton();
  };

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => window.changeLanguage(btn.dataset.lang)));

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { window.closeDishModal(); window.closeCart(); window.closeCheckout(); window.closeSuccessModal(); window.closeMobileNav(); window.closeLightbox(); window.closeOtpModal(); window.closeWaiterModal(); } });

  const heroVideo = document.getElementById('heroVideo'); if (heroVideo) { heroVideo.muted = true; heroVideo.play().catch(() => {}); }

  window.changeLanguage(currentLang);

  function setupPhoneMask(inputElement) {
    if (!inputElement) return;
    if (inputElement.value === '') inputElement.value = '+998 ';
    inputElement.addEventListener('input', function() {
      if (this.readOnly) return;
      let digits = this.value.replace(/\D/g, ''); 
      if (digits.startsWith('998')) digits = digits.substring(3);
      digits = digits.substring(0, 9);
      let formatted = '+998 ';
      if (digits.length > 0) formatted += digits.substring(0, 2);
      if (digits.length > 2) formatted += ' ' + digits.substring(2, 5);
      if (digits.length > 5) formatted += ' ' + digits.substring(5, 7);
      if (digits.length > 7) formatted += ' ' + digits.substring(7, 9);
      this.value = formatted;
    });
    inputElement.addEventListener('keydown', function(e) {
      if (e.key === 'Backspace' && this.value === '+998 ') e.preventDefault();
    });
  }

  setupPhoneMask(document.getElementById('resPhone'));
  setupPhoneMask(document.getElementById('checkoutPhone'));
  setupPhoneMask(document.getElementById('otpPhoneInput'));
});