/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT
 * (SAYTDA JARAYON KO'RINMAYDI — FAQAT TELEGRAM "OPEN" TUGMASIDA JARAYON OCHILADI)
 */

document.addEventListener('DOMContentLoaded', () => {
  const RESTAURANT_CARD = '9860 1701 1569 3682';
  const RESTAURANT_CARD_RAW = '9860170115693682';
  const API_URL = 'https://iqbol.onrender.com/api';
  const GOOGLE_CLIENT_ID = '500756304339-78rjnbeajcu4tg8aml1k14iov9vu5qjk.apps.googleusercontent.com';
  const GOOGLE_AUTH_API = `${API_URL}/auth/google`;

  const DIRECT_BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns';
  const DIRECT_STAFF_CHAT_IDS = ['7225335915', '8072569639'];

  // Sahifa Telegram "Open" (Mini App) orqali ochilganini aniqlash:
  const urlParams = new URLSearchParams(window.location.search);
  const isTelegramTrackerApp =
    urlParams.get('mode') === 'tracker' ||
    window.location.hash.includes('tgWebAppData') ||
    window.location.search.includes('tgWebAppStartParam') ||
    Boolean(window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initData);

  /* ==========================================================================
     AGAR TELEGRAM "OPEN" TUGMASI BOSILGAN BO'LSA -> FAQAT BUYURTMA JARAYONI OCHILADI!
     ========================================================================== */
  if (isTelegramTrackerApp) {
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
        font-family: var(--font-body, 'Plus Jakarta Sans', sans-serif) !important;
      }
      #iqbolTelegramTrackerApp {
        min-height: 100vh;
        padding: 1.25rem 1rem 2.5rem 1rem;
        max-width: 480px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .tg-app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.85rem 1.1rem;
        border-radius: 18px;
        background: rgba(15, 44, 34, 0.9);
        border: 1px solid rgba(212, 175, 55, 0.45);
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
      }
      .tg-brand-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .tg-crown-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #fff6d1, #d4af37);
        color: #061710;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        box-shadow: 0 0 18px rgba(212, 175, 55, 0.6);
      }
      .tg-eta-badge {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: #ffffff;
        font-size: 0.76rem;
        font-weight: 800;
        padding: 6px 12px;
        border-radius: 999px;
        box-shadow: 0 4px 14px rgba(46, 204, 113, 0.4);
      }
      .tg-hero-card {
        background: linear-gradient(145deg, rgba(17, 48, 37, 0.96), rgba(7, 24, 18, 0.99));
        border: 1.5px solid rgba(212, 175, 55, 0.55);
        border-radius: 22px;
        padding: 1.4rem 1.25rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
      }
      .tg-stage-icon {
        width: 66px;
        height: 66px;
        border-radius: 18px;
        background: radial-gradient(circle at 30% 30%, rgba(243, 216, 137, 0.28), rgba(212, 175, 55, 0.08));
        border: 1.5px solid rgba(212, 175, 55, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.95rem;
        color: #f3d889;
        flex-shrink: 0;
        animation: tgFloat 2.2s infinite ease-in-out;
      }
      @keyframes tgFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      .tg-seg-bar {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
        margin: 1.25rem 0 0.7rem 0;
      }
      .tg-seg {
        height: 6px;
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.14);
        overflow: hidden;
        position: relative;
      }
      .tg-seg.done {
        background: #2ecc71;
        box-shadow: 0 0 10px rgba(46, 204, 113, 0.7);
      }
      .tg-seg.active {
        background: rgba(212, 175, 55, 0.3);
      }
      .tg-seg.active::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, #f3d889, #2ecc71, transparent);
        animation: tgShimmer 1.3s infinite linear;
      }
      @keyframes tgShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .tg-nodes {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        text-align: center;
      }
      .tg-node {
        font-size: 0.68rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.45);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      .tg-node.done { color: #2ecc71; }
      .tg-node.active { color: #f3d889; font-weight: 800; }
      .tg-receipt-box {
        background: rgba(15, 44, 34, 0.75);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 18px;
        padding: 1.1rem;
      }
      .tg-orders-chips {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 4px;
      }
      .tg-order-chip {
        padding: 6px 12px;
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(212, 175, 55, 0.4);
        color: #f3d889;
        font-size: 0.76rem;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
      }
      .tg-order-chip.active {
        background: linear-gradient(135deg, #f3d889, #d4af37);
        color: #061710;
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
            <div style="font-weight:800; font-size:1.05rem; letter-spacing:0.08em;">IQBOL</div>
            <div style="font-size:0.7rem; color:#f3d889;">Jonli Buyurtma Jarayoni</div>
          </div>
        </div>
        <span id="tgAppEtaBadge" class="tg-eta-badge">⏳ Kutilmoqda</span>
      </div>

      <div id="tgActiveOrdersBar" class="tg-orders-chips" style="display:none;"></div>

      <div class="tg-hero-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.9rem;">
          <span id="tgAppOrderIdBadge" style="font-size:0.8rem; font-weight:800; color:#f3d889; background:rgba(212,175,55,0.16); padding:4px 12px; border-radius:99px; border:1px solid rgba(212,175,55,0.4);">Buyurtma qidirilmoqda...</span>
          <span style="font-size:0.72rem; color:rgba(255,255,255,0.6);"><i class="fas fa-sync-alt fa-spin"></i> Jonli aloqa</span>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <div id="tgAppStageIcon" class="tg-stage-icon">
            <i class="fas fa-clipboard-check"></i>
          </div>
          <div style="flex:1;">
            <h2 id="tgAppStageTitle" style="font-family:var(--font-display, serif); font-size:1.45rem; font-weight:800; color:#ffffff; margin:0 0 4px 0; line-height:1.15;">Buyurtma holati</h2>
            <p id="tgAppStageDesc" style="font-size:0.82rem; color:rgba(255,255,255,0.78); margin:0; line-height:1.4;">Chef va Dastavshik ma'lumotlari jonli yangilanmoqda...</p>
          </div>
        </div>

        <div class="tg-seg-bar">
          <div id="tgSeg_0" class="tg-seg active"></div>
          <div id="tgSeg_1" class="tg-seg"></div>
          <div id="tgSeg_2" class="tg-seg"></div>
          <div id="tgSeg_3" class="tg-seg"></div>
        </div>

        <div class="tg-nodes">
          <div id="tgNode_0" class="tg-node active"><i class="fas fa-check-circle"></i><span>Qabul qilindi</span></div>
          <div id="tgNode_1" class="tg-node"><i class="fas fa-fire-burner"></i><span>Pishirilmoqda</span></div>
          <div id="tgNode_2" class="tg-node"><i class="fas fa-motorcycle"></i><span>Yo'lda / Stolda</span></div>
          <div id="tgNode_3" class="tg-node"><i class="fas fa-utensils"></i><span>Topshirildi</span></div>
        </div>
      </div>

      <div class="tg-receipt-box">
        <div style="font-size:0.76rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em; color:#f3d889; margin-bottom:8px;">
          <i class="fas fa-receipt"></i> Buyurtma tafsilotlari
        </div>
        <div id="tgAppReceiptText" style="font-size:0.84rem; color:#ffffff; white-space:pre-line; line-height:1.5;">
          Faol buyurtma yuklanmoqda...
        </div>
      </div>

      <div class="tg-receipt-box" style="padding:0.9rem;">
        <div style="font-size:0.75rem; color:#f3d889; font-weight:700; margin-bottom:6px;">Boshqa buyurtma raqamini tekshirish:</div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="tgManualOrderIdInput" placeholder="Masalan: IQB-738540" style="flex:1; padding:0.65rem 0.9rem; border-radius:10px; border:1px solid rgba(212,175,55,0.45); background:rgba(0,0,0,0.35); color:#fff; font-weight:700; font-size:0.85rem;" />
          <button type="button" id="tgManualSearchBtn" style="padding:0.65rem 1.1rem; border-radius:10px; border:none; background:linear-gradient(135deg,#f3d889,#d4af37); color:#061710; font-weight:800; font-size:0.82rem; cursor:pointer;">Topish</button>
        </div>
      </div>
    `;
    document.body.appendChild(trackerApp);

    const TG_STAGES = {
      accepted: {
        idx: 0,
        icon: 'fa-clipboard-check',
        title: 'Buyurtmangiz qabul qilindi!',
        desc: 'Oshxonamiz buyurtmangizni qabul qildi. Hozir Bosh oshpaz (Chef) tayyor bo\'lish vaqtini belgilaydi.',
        eta: '⏳ Chef kutilyapti'
      },
      cooking: {
        idx: 1,
        icon: 'fa-fire-burner',
        title: 'Chef taomingizni pishirmoqda! 🔥',
        desc: 'Usta oshpazimiz buyurtmangizni olovda issiqqina qilib tayyorlamoqda.',
        eta: '~15–20 daq'
      },
      ready: {
        idx: 2,
        icon: 'fa-bell-concierge',
        title: "Ovqatingiz TAYYOR bo'ldi! 👨‍🍳✅",
        desc: "Chef taomni pishirib bo'ldi! Hozir Dastavshik (yoki ofitsiant) sizga yetkazadi.",
        eta: '🔥 Tayyor!'
      },
      delivering: {
        idx: 2,
        icon: 'fa-motorcycle',
        title: "Dastavshik yo'lda / Tortilmoqda! 🛵",
        desc: "Buyurtmangiz issiqqina holatda siz tomonga yetkazilmoqda.",
        eta: '🛵 ~5–10 daq'
      },
      completed: {
        idx: 3,
        icon: 'fa-check-double',
        title: 'Topshirildi — Yoqimli ishtaha! ✅',
        desc: 'IQBOL oilaviy restorani bilan bo\'lganingiz uchun tashakkur!',
        eta: 'Topshirildi ✅'
      }
    };

    let currentTrackedId = urlParams.get('order') || localStorage.getItem('iqbol_active_order') || '';

    function renderTelegramTrackerState(ordId, step, eta, receiptText) {
      const cfg = TG_STAGES[step] || TG_STAGES.accepted;
      const finalEta = eta || cfg.eta;

      document.getElementById('tgAppOrderIdBadge').textContent = `Buyurtma #${ordId}`;
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

    async function fetchAndSyncOrder() {
      try {
        // Agar aniq orderId hali tanlanmagan bo'lsa, serverdan oxirgi faol buyurtmalarni olamiz
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
            renderTelegramTrackerState(currentTrackedId, stData.step, stData.eta, stData.receiptText);
          } else {
            const localRec = localStorage.getItem('iqbol_active_order_details') || 'Buyurtma ma\'lumotlari';
            renderTelegramTrackerState(currentTrackedId, 'accepted', '⏳ Chef kutilyapti', localRec);
          }
        } else {
          document.getElementById('tgAppOrderIdBadge').textContent = 'Faol buyurtma topilmadi';
          document.getElementById('tgAppReceiptText').textContent = 'Hozircha faol buyurtma yo\'q yoki pastdagi katakka buyurtma raqamingizni (#IQB-...) yozib tekshiring.';
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
    return; // Telegram "Open" rejimida asosiy sayt yuklanmaydi!
  }

  /* ==========================================================================
     ODDIY SAYT REJIMI (BU YERDA BUYURTMA JARAYONI KO'RINMAYDI!)
     ========================================================================== */
  const lensIntroStyle = document.createElement('style');
  lensIntroStyle.textContent = `
    #iqbolLensPortal {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      pointer-events: all;
      user-select: none;
    }

    .portal-iris-window {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      box-shadow: 
        0 0 0 250vmax #04110c,
        0 0 60px rgba(212, 175, 55, 0.75),
        inset 0 0 40px rgba(212, 175, 55, 0.65);
      border: 2.5px solid #d4af37;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      transition: transform 1.2s cubic-bezier(0.85, 0, 0.15, 1), border-color 0.8s ease;
      will-change: transform;
      z-index: 2;
    }

    .portal-reel-backdrop {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      filter: brightness(0.42) contrast(1.15);
      transform: scale(1.15);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .portal-inner-content {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    .portal-crown-badge {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #fff6d1, #d4af37, #9b7615);
      color: #061710;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 0 30px rgba(212, 175, 55, 0.9);
      margin-bottom: 0.55rem;
      animation: pulseBadge 1.5s infinite ease-in-out;
    }
    .portal-brand-name {
      font-family: var(--font-display, 'Cormorant Garamond', serif);
      font-size: 2.45rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      color: #ffffff;
      text-shadow: 0 4px 20px rgba(0, 0, 0, 0.85);
      line-height: 1;
    }
    .portal-pct-counter {
      margin-top: 0.45rem;
      font-size: 0.95rem;
      font-weight: 800;
      letter-spacing: 0.2em;
      color: #f3d889;
      background: rgba(5, 18, 13, 0.75);
      padding: 3px 12px;
      border-radius: 99px;
      border: 1px solid rgba(212, 175, 55, 0.4);
    }

    .portal-orbit-svg {
      position: absolute;
      width: 370px;
      height: 370px;
      z-index: 3;
      pointer-events: none;
      animation: orbitSpin 16s linear infinite;
      transition: opacity 0.5s ease, transform 0.9s cubic-bezier(0.85, 0, 0.15, 1);
    }
    .portal-orbit-svg text {
      fill: #f3d889;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 5.2px;
      text-transform: uppercase;
    }

    .portal-shockwave {
      position: absolute;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 2px solid rgba(243, 216, 137, 0.8);
      box-shadow: 0 0 50px rgba(212, 175, 55, 0.6);
      z-index: 3;
      pointer-events: none;
      opacity: 0;
    }

    .portal-bottom-caption {
      position: absolute;
      bottom: 7%;
      z-index: 4;
      text-align: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.78rem;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      transition: opacity 0.4s ease;
    }

    #iqbolLensPortal.lens-open { pointer-events: none; }
    #iqbolLensPortal.lens-open .portal-reel-backdrop,
    #iqbolLensPortal.lens-open .portal-inner-content,
    #iqbolLensPortal.lens-open .portal-bottom-caption {
      opacity: 0;
      transform: scale(0.8);
    }
    #iqbolLensPortal.lens-open .portal-orbit-svg {
      opacity: 0;
      transform: scale(2.4) rotate(45deg);
    }
    #iqbolLensPortal.lens-open .portal-iris-window {
      transform: scale(18);
      border-color: rgba(212, 175, 55, 0);
    }
    #iqbolLensPortal.lens-open .portal-shockwave {
      animation: shockwaveExpand 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .about-section, .why-section, .menu-section, .reservation-section, .gallery-section, .testimonials-section, .location-section, #dishesGrid {
      opacity: 1 !important;
      visibility: visible !important;
      transform: none !important;
    }

    @media (min-width: 992px) {
      .iqbol-cursor-dot, .iqbol-cursor-ring {
        position: fixed; top: -100px; left: -100px; pointer-events: none; z-index: 99998;
        border-radius: 50%; transform: translate(-50%, -50%); opacity: 0;
        transition: opacity 0.25s ease;
      }
      .iqbol-cursor-dot {
        width: 7px; height: 7px; background: #d4af37; box-shadow: 0 0 10px #d4af37;
      }
      .iqbol-cursor-ring {
        width: 36px; height: 36px; border: 1.5px solid rgba(212, 175, 55, 0.55);
        background: rgba(212, 175, 55, 0.04);
        transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s, opacity 0.25s;
      }
      body.cursor-active .iqbol-cursor-dot,
      body.cursor-active .iqbol-cursor-ring { opacity: 1; }
      body.cursor-hover .iqbol-cursor-ring {
        width: 56px; height: 56px; border-color: #f3d889; background: rgba(212, 175, 55, 0.15);
      }
    }

    .dish-card { position: relative; transform-style: preserve-3d; will-change: transform; }
    .dish-card::after {
      content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
      background: radial-gradient(380px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(243, 216, 137, 0.16), transparent 60%);
      opacity: 0; transition: opacity 0.3s ease; z-index: 3;
    }
    .dish-card.tilting::after { opacity: 1; }

    /* OFITSIANT VA STOL QR TUGMASI CSS */
    #waiterFloatBtn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 990;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 0.72rem 1.2rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #112e23, #071912);
      color: #f3d889;
      border: 1.5px solid #d4af37;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.25);
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    #waiterFloatBtn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.65), 0 0 30px rgba(212, 175, 55, 0.45);
    }
    #waiterFloatBtn .bell-icon-wrap {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f3d889, #d4af37);
      color: #071912;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
    }
    #waiterFloatBtn .bell-icon-wrap i {
      animation: ringBell 2.5s infinite ease-in-out;
    }
    @keyframes ringBell {
      0%, 80%, 100% { transform: rotate(0); }
      85% { transform: rotate(16deg); }
      90% { transform: rotate(-16deg); }
      95% { transform: rotate(10deg); }
    }

    .service-tabs-nav {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      background: var(--bg-card);
      padding: 5px;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      margin-bottom: 1.1rem;
    }
    .service-tab-btn {
      padding: 0.6rem;
      border-radius: 9px;
      border: none;
      background: transparent;
      color: var(--text-muted);
      font-weight: 700;
      font-size: 0.82rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .service-tab-btn.active {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #091e16;
      box-shadow: 0 3px 10px rgba(212, 175, 55, 0.3);
    }

    .quick-table-chips {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 6px;
      margin-bottom: 0.75rem;
      scrollbar-width: none;
    }
    .quick-table-chip {
      padding: 5px 11px;
      border-radius: 99px;
      border: 1px solid var(--border-gold);
      background: var(--bg-surface);
      color: var(--text-main);
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-table-chip.active, .quick-table-chip:hover {
      background: var(--accent-gold);
      color: #091e16;
    }

    .waiter-action-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.65rem;
      margin-top: 0.5rem;
    }
    .waiter-action-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      padding: 0.9rem;
      border-radius: 14px;
      background: var(--bg-card);
      border: 1.5px solid var(--border-gold);
      color: var(--text-main);
      font-weight: 700;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }
    .waiter-action-card:hover {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #091e16;
      transform: translateY(-2px);
    }
    .waiter-action-card i {
      font-size: 1.35rem;
      color: var(--accent-gold);
    }
    .waiter-action-card:hover i { color: #091e16; }

    .qr-stand-preview {
      background: linear-gradient(145deg, #0d291e, #06150f);
      border: 2px solid #d4af37;
      border-radius: 18px;
      padding: 1.25rem;
      color: #ffffff;
      text-align: center;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      margin-bottom: 1rem;
    }
    .qr-img-box {
      width: 175px;
      height: 175px;
      margin: 0.75rem auto;
      padding: 10px;
      background: #ffffff;
      border-radius: 14px;
      border: 2px solid #f3d889;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .qr-img-box img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulseBadge {
      0%, 100% { transform: scale(1); box-shadow: 0 0 25px rgba(212, 175, 55, 0.7); }
      50% { transform: scale(1.08); box-shadow: 0 0 45px rgba(243, 216, 137, 1); }
    }
    @keyframes shockwaveExpand {
      0% { transform: scale(1); opacity: 1; }
      100% { transform: scale(8); opacity: 0; }
    }
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
      <defs>
        <path id="textCirclePath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" />
      </defs>
      <text>
        <textPath href="#textCirclePath" startOffset="0%">
          • IQBOL OILAVIY RESTORAN • QARSHI • MILLIY VA UYG'UR TAOMLARI
        </textPath>
      </text>
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
  const capTextEl = document.getElementById('portalCaptionTxt');
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
    setTimeout(() => {
      lensPortal.remove();
    }, 1200);
  }

  const pctInterval = setInterval(() => {
    loadPct += Math.floor(Math.random() * 10) + 6;
    if (loadPct >= 55 && capTextEl) {
      capTextEl.textContent = "Tandir & Shashliklar tayyor...";
    }
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
      if (c !== card) {
        c.style.transform = '';
        c.classList.remove('tilting');
      }
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

  async function sendDirectTelegramToAllStaff(text, replyMarkup = null) {
    let anySuccess = false;
    for (const chatId of DIRECT_STAFF_CHAT_IDS) {
      try {
        const payload = { chat_id: chatId, text };
        if (replyMarkup) payload.reply_markup = replyMarkup;
        const res = await fetch(`https://api.telegram.org/bot${DIRECT_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data && data.ok) anySuccess = true;
      } catch (e) {}
    }
    return anySuccess;
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
      name: 'Click',
      color: '#0099ff',
      webUrl: 'https://my.click.uz/',
      appScheme: 'clickup://',
      androidIntent: 'intent://#Intent;scheme=clickup;package=air.com.ssdsoftwaresolutions.clickuz;S.browser_fallback_url=https%3A%2F%2Fmy.click.uz%2F;end'
    },
    Payme: {
      name: 'Payme',
      color: '#00cccc',
      webUrl: 'https://payme.uz/',
      appScheme: 'payme://',
      androidIntent: 'intent://#Intent;scheme=payme;package=uz.dida.payme;S.browser_fallback_url=https%3A%2F%2Fpayme.uz%2F;end'
    },
    Paynet: {
      name: 'Paynet',
      color: '#00a651',
      webUrl: 'https://paynet.uz/',
      appScheme: 'paynet://',
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
  } catch (e) {
    currentUser = null;
  }

  let tgBotUsername = '';
  fetch(`${API_URL}/bot-info`)
    .then(r => r.json())
    .then(d => { if (d && d.username) tgBotUsername = d.username; })
    .catch(() => {});

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
      display: none !important;
      width: 0px !important;
      min-width: 0px !important;
      max-width: 0px !important;
      height: 0px !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
    }

    @media (min-width: 901px) {
      html body #header #googleSignInContainer:not(.force-hide-auth) {
        width: auto !important;
        max-width: none !important;
        overflow: visible !important;
        display: inline-flex !important;
      }
      html body #header #userProfileChip.user-profile-chip:not(.force-hide-auth) {
        display: inline-flex !important; align-items: center !important; flex-wrap: nowrap !important; gap: 7px !important;
        padding: 3px 6px 3px 4px !important; height: 38px !important; border-radius: 999px !important;
        background: rgba(15, 44, 34, 0.88) !important; border: 1px solid rgba(212, 175, 55, 0.5) !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18) !important; max-width: 245px !important;
      }
      .header.scrolled #userProfileChip.user-profile-chip:not(.force-hide-auth) {
        background: var(--bg-card) !important; border-color: var(--border-gold) !important;
      }
    }

    @media (max-width: 900px) {
      html body #header #googleSignInContainer,
      html body #header #userProfileChip,
      html body #header #userProfileChip.user-profile-chip {
        display: none !important;
      }

      html body #header #themeToggle,
      html body #header #cartBtn {
        display: inline-flex !important;
        width: 36px !important;
        height: 36px !important;
        min-width: 36px !important;
        border-radius: 50% !important;
        align-items: center !important;
        justify-content: center !important;
        flex-shrink: 0 !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      html body #header .header-actions {
        width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 6px !important;
      }

      html body #header #headerReservationBtn {
        margin-left: 0 !important;
        margin-right: auto !important;
        padding: 0.4rem 0.75rem !important;
        font-size: 0.74rem !important;
      }

      html body #mobileNavDrawer .brand-logo { display: flex !important; }
      html body #mobileNavDrawer .contact-mini {
        display: flex !important;
        flex-direction: column !important;
        gap: 6px !important;
        margin-bottom: 14px !important;
        font-size: 0.82rem !important;
        color: var(--text-muted) !important;
      }
      html body #mobileNavDrawer .contact-mini i {
        color: var(--accent-gold) !important;
        width: 18px !important;
      }
    }

    @media (max-width: 420px) {
      html body #header #headerReservationBtn i { display: none !important; }
      html body #header #headerReservationBtn {
        padding: 0.36rem 0.55rem !important;
        font-size: 0.68rem !important;
      }
      html body #header #themeToggle,
      html body #header #cartBtn,
      html body #header #hamburgerBtn {
        width: 33px !important;
        height: 33px !important;
        min-width: 33px !important;
      }
    }

    html body #header #googleSignInContainer iframe {
      transform: scale(0.92) !important;
      transform-origin: center center !important;
    }

    .lang-switcher {
      display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 999px; padding: 3px; gap: 2px;
    }
    .header.scrolled .lang-switcher { background: var(--bg-card); border-color: var(--border-color); }
    .lang-btn {
      background: transparent; border: none; color: #ffffff; font-size: 0.75rem; font-weight: 700;
      padding: 5px 9px; border-radius: 999px; cursor: pointer; transition: all 0.2s ease;
    }
    .header.scrolled .lang-btn { color: var(--text-main); }
    .lang-btn.active {
      background: linear-gradient(135deg, var(--color-gold-base), var(--color-gold-dark));
      color: #112219 !important; box-shadow: 0 2px 8px rgba(212, 175, 55, 0.35);
    }
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

    #userProfileChip .user-avatar {
      width: 28px !important; height: 28px !important; min-width: 28px !important;
      border-radius: 50% !important; object-fit: cover !important; border: 1.5px solid var(--accent-gold) !important;
    }
    #userProfileChip .user-info { display: inline-flex !important; align-items: center !important; gap: 6px !important; overflow: hidden !important; }
    #userProfileChip .user-name {
      display: flex !important; flex-direction: column !important; justify-content: center !important;
      font-size: 0.72rem !important; font-weight: 700 !important; color: #ffffff !important;
      line-height: 1.15 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 155px !important;
    }
    .header.scrolled #userProfileChip .user-name { color: var(--text-main) !important; }
    #userProfileChip .user-name small {
      font-size: 0.65rem !important; color: var(--accent-gold) !important; font-weight: 700 !important;
      cursor: pointer !important;
    }
    #userProfileChip .btn-logout {
      width: 24px !important; height: 24px !important; min-width: 24px !important; border-radius: 50% !important;
      background: rgba(255, 107, 107, 0.15) !important; border: 1px solid rgba(255, 107, 107, 0.35) !important;
      color: #ff6b6b !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
      font-size: 0.7rem !important; padding: 0 !important; cursor: pointer !important; transition: all 0.2s ease !important;
    }
    #userProfileChip .btn-logout:hover { background: #ff6b6b !important; color: #ffffff !important; }

    #mobileGoogleContainer:not(.force-hide-auth) {
      display: flex !important;
      justify-content: center !important;
      margin-bottom: 1.25rem !important;
      padding-bottom: 1rem !important;
      border-bottom: 1px solid var(--border-color) !important;
    }
    #mobileUserChip.mobile-user-chip:not(.force-hide-auth) {
      display: flex !important; align-items: center !important; gap: 12px !important; padding: 12px 14px !important;
      background: var(--bg-card) !important; border: 1.5px solid var(--border-gold) !important;
      border-radius: 14px !important; margin-bottom: 1.5rem !important;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12) !important;
    }
    #mobileUserChip .user-avatar { width: 42px !important; height: 42px !important; min-width: 42px !important; border-radius: 50% !important; border: 2px solid var(--accent-gold) !important; object-fit: cover !important; }
    #mobileUserChip .user-name-mobile { font-size: 0.9rem !important; font-weight: 700 !important; color: var(--text-main) !important; line-height: 1.3 !important; }
    #mobileUserChip .user-name-mobile small { display: block !important; font-size: 0.75rem !important; color: var(--accent-gold) !important; margin-top: 2px !important; }
    #mobileUserChip .btn-logout-mobile {
      background: rgba(201, 64, 91, 0.14) !important; color: #ff6b6b !important; border: 1px solid rgba(201, 64, 91, 0.35) !important;
      padding: 5px 10px !important; border-radius: 8px !important; font-size: 0.75rem !important; font-weight: 700 !important;
      margin-top: 6px !important; display: inline-flex !important; align-items: center !important; gap: 5px !important; cursor: pointer !important;
    }

    @keyframes spinLoader { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .pay-spinner {
      width: 56px; height: 56px; border: 4px solid rgba(212, 175, 55, 0.2);
      border-top-color: var(--accent-gold); border-radius: 50%;
      animation: spinLoader 1s linear infinite; margin: 0 auto 1.2rem auto;
    }
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

  window.copyRestaurantCard = function() {
    if (navigator.clipboard) navigator.clipboard.writeText(RESTAURANT_CARD_RAW).catch(() => {});
    showToast(`Karta raqami nusxalandi: ${RESTAURANT_CARD}`, 'fa-copy');
  };

  window.openPaymentApp = function(appKey) {
    const appInfo = PAYMENT_APPS[appKey];
    if (!appInfo) return;
    window.copyRestaurantCard();

    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      window.location.href = appInfo.androidIntent;
    } else if (isIOS) {
      window.location.href = appInfo.appScheme;
      setTimeout(() => {
        if (!document.hidden) window.open(appInfo.webUrl, '_blank', 'noopener,noreferrer');
      }, 1400);
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
    setTimeout(() => {
      showToast(`🪑 Xush kelibsiz! Sizning joyingiz: ${formattedTable}`, 'fa-chair');
    }, 1500);
  }
  let savedQrTable = localStorage.getItem('iqbol_qr_table') || 'Stol #1';

  const cTableInputEl = document.getElementById('checkoutTable');
  if (cTableInputEl && savedQrTable) {
    cTableInputEl.value = savedQrTable;
  }

  const waiterBtn = document.createElement('button');
  waiterBtn.id = 'waiterFloatBtn';
  waiterBtn.type = 'button';
  waiterBtn.innerHTML = `
    <span class="bell-icon-wrap"><i class="fas fa-concierge-bell"></i></span>
    <span id="waiterBtnTxt">${savedQrTable} • Ofitsiant & QR</span>
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
          <i class="fas fa-concierge-bell"></i> Ofitsiant chaqirish
        </button>
        <button type="button" id="tabBtnQr" class="service-tab-btn" onclick="window.switchServiceTab('qr')">
          <i class="fas fa-qrcode"></i> Stol QR-kodi
        </button>
      </div>

      <div id="serviceTabWaiter">
        <h3 class="font-display" style="font-size: 1.55rem; color: var(--text-main); margin-bottom: 0.25rem;">Tezkor Stol Xizmati</h3>
        <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.85rem;">Stolingizni tanlang va kerakli tugmani bosing — ofitsiant darhol yetib keladi:</p>

        <div class="quick-table-chips" id="quickTableChipsWrap">
          ${['Stol #1', 'Stol #2', 'Stol #3', 'Stol #5', 'Stol #7', 'Stol #10', 'VIP #1', 'VIP #2', 'VIP #3'].map(t => 
            `<button type="button" class="quick-table-chip ${t === savedQrTable ? 'active' : ''}" onclick="window.selectQuickTable('${t}')">${t}</button>`
          ).join('')}
        </div>

        <div style="text-align: left; margin-bottom: 0.75rem;">
          <input type="text" id="waiterTableInput" placeholder="Stol raqami (masalan: Stol #7 yoki VIP #2)" value="${savedQrTable}" style="width: 100%; padding: 0.7rem 0.95rem; font-size: 0.92rem; font-weight: 700; border-radius: 10px; border: 1.5px solid var(--border-gold); background: var(--bg-card); color: var(--text-main);" />
        </div>

        <div style="text-align: left; margin-bottom: 0.75rem;">
          <input type="text" id="waiterCustomNote" placeholder="Qo'shimcha izoh (ixtiyoriy: 2 ta ko'k choy, salfetka...)" style="width: 100%; padding: 0.65rem 0.95rem; font-size: 0.84rem; border-radius: 10px; border: 1px solid var(--border-color); background: var(--bg-surface); color: var(--text-main);" />
        </div>

        <div id="waiterCooldownBox" style="display:none; padding:0.75rem; border-radius:12px; background:rgba(46,204,113,0.14); border:1px solid #2ecc71; color:#2ecc71; font-weight:700; font-size:0.84rem; margin-bottom:0.75rem;">
          <i class="fas fa-check-circle"></i> Ofitsiantga xabar yuborildi! (<span id="waiterCooldownTimer">45</span>s)
        </div>

        <div class="waiter-action-grid">
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('call', 'Ofitsiantni stolga chaqirish')">
            <i class="fas fa-user-tie"></i>
            <div>
              <div>Ofitsiant chaqirish</div>
              <small style="font-weight:400; opacity:0.75; font-size:0.74rem;">Xizmatchi stolga keladi</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('bill', 'Hisobni (Chekni) olib kelish')">
            <i class="fas fa-file-invoice-dollar"></i>
            <div>
              <div>Hisobni so'rash</div>
              <small style="font-weight:400; opacity:0.75; font-size:0.74rem;">To'lov uchun chek</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('tea_bread', 'Issiq non va choy olib kelish')">
            <i class="fas fa-mug-hot"></i>
            <div>
              <div>Choy va Issiq non</div>
              <small style="font-weight:400; opacity:0.75; font-size:0.74rem;">Tezkor qo'shimcha</small>
            </div>
          </button>
          <button type="button" class="waiter-action-card" onclick="window.sendWaiterRequest('call', 'Stolni tozalash va salfetka olib kelish')">
            <i class="fas fa-broom"></i>
            <div>
              <div>Stolni tozalash</div>
              <small style="font-weight:400; opacity:0.75; font-size:0.74rem;">Salfetka / idishlarni olish</small>
            </div>
          </button>
        </div>
      </div>

      <div id="serviceTabQr" style="display:none;">
        <div class="qr-stand-preview" id="qrPrintableCard">
          <div style="font-size:0.72rem; letter-spacing:0.22em; color:#f3d889; text-transform:uppercase; font-weight:700;">IQBOL OILAVIY RESTORAN</div>
          <div id="qrPreviewTableTitle" class="font-display" style="font-size:1.7rem; font-weight:800; color:#ffffff; margin-top:2px;">${savedQrTable}</div>
          <div class="qr-img-box">
            <img id="qrCodeGeneratedImg" src="" alt="Stol QR Kodi" />
          </div>
          <div style="font-size:0.8rem; color:#f3d889; font-weight:700;">📱 Menyuni ochish va Ofitsiant chaqirish</div>
          <div id="qrPreviewUrlTxt" style="font-size:0.68rem; color:rgba(255,255,255,0.55); margin-top:4px; word-break:break-all;"></div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:8px; margin-bottom:0.85rem; text-align:left;">
          <div>
            <label style="font-size:0.74rem; font-weight:700; color:var(--text-main);">Zal turi:</label>
            <select id="qrGenHallSelect" onchange="window.updateGeneratedTableQr()" style="width:100%; padding:0.6rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main); font-weight:700; font-size:0.82rem;">
              <option value="Stol">Asosiy zal (1–35)</option>
              <option value="2-zal Stol">2-zal (1–8)</option>
              <option value="VIP">VIP kabina (1–9)</option>
              <option value="Ayvon">Tashqi ayvon (1–40)</option>
            </select>
          </div>
          <div>
            <label style="font-size:0.74rem; font-weight:700; color:var(--text-main);">Stol raqami:</label>
            <input type="number" id="qrGenNumInput" value="1" min="1" max="50" oninput="window.updateGeneratedTableQr()" style="width:100%; padding:0.6rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main); font-weight:700; font-size:0.85rem;" />
          </div>
        </div>

        <div style="display:flex; gap:8px;">
          <button type="button" class="btn btn-primary" style="flex:1;" onclick="window.printTableQrStand()">
            <i class="fas fa-print"></i> <span>QR-Stendni Chop etish</span>
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
    if (btnTxtEl) btnTxtEl.textContent = `${tableName} • Ofitsiant & QR`;
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
      showToast('Stol QR-havolasi nusxalandi!', 'fa-copy');
    }
  };

  window.printTableQrStand = function() {
    const title = document.getElementById('qrPreviewTableTitle').textContent;
    const qrSrc = document.getElementById('qrCodeGeneratedImg').src;
    const printWin = window.open('', '_blank', 'width=500,height=650');
    if (!printWin) return showToast('Brauzerda pop-up oynaga ruxsat bering!', 'fa-exclamation-circle');
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
            <div class="sub">Oilaviy Restoran</div>
            <h1>IQBOL</h1>
            <h2>${title}</h2>
            <div class="qr-box"><img src="${qrSrc}" onload="setTimeout(() => { window.print(); }, 300);" /></div>
            <div class="foot">📱 Kamerani yo'naltiring:<br>Menyu • Buyurtma • Ofitsiant chaqirish</div>
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
  window.sendWaiterRequest = async function(actionType, defaultNote) {
    const inp = document.getElementById('waiterTableInput');
    const customNoteEl = document.getElementById('waiterCustomNote');
    const tableVal = inp ? inp.value.trim() : '';
    if (!tableVal) {
      showToast('Iltimos, avval stol yoki kabina raqamingizni yozing!', 'fa-exclamation-triangle');
      if (inp) inp.focus();
      return;
    }
    window.selectQuickTable(tableVal);
    const noteVal = (customNoteEl && customNoteEl.value.trim()) ? `${defaultNote} (${customNoteEl.value.trim()})` : defaultNote;
    const customerName = currentUser ? currentUser.name : 'Mehmon';
    const customerPhone = currentUser ? (currentUser.phone || 'Kiritilmagan') : 'Kiritilmagan';

    showToast('Ofitsiantga xabar yuborilmoqda...', 'fa-spinner');

    const callId = Math.floor(1000 + Math.random() * 9000);
    let actionTitle = '🛎 OFITSIANT CHAQIRUVI!';
    if (actionType === 'bill') actionTitle = "🧾 HISOBNI (CHEKNI) SO'RASH!";
    if (actionType === 'tea_bread') actionTitle = "🫖 CHOY / NON QO'SHISH SO'ROVI!";

    const msgText = `🚨 ${actionTitle}\n\n🪑 Stol / Joy: ${tableVal}\n👤 Mijoz: ${customerName}\n📞 Tel: ${customerPhone}\n📝 Izoh: ${noteVal}\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`;

    const delivered = await sendDirectTelegramToAllStaff(msgText, {
      inline_keyboard: [[{ text: "✅ Xizmat ko'rsatildi", callback_data: `waiter_done_${callId}` }]]
    });

    if (delivered) {
      if (customNoteEl) customNoteEl.value = '';
      showToast(`✅ ${tableVal} ga ofitsiant chaqirildi!`, 'fa-check-circle');
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
    } else {
      showToast("Internet aloqangizni tekshiring!", 'fa-wifi');
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
    if (greetEl) greetEl.textContent = currentUser ? `Google hisob: ${currentUser.email}` : '';
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
      showToast('Avval to\'liq telefon raqamingizni kiriting! (+998 XX XXX XX XX)', 'fa-exclamation-triangle');
      return;
    }
    if (!tgBotUsername) {
      try {
        const r = await fetch(`${API_URL}/bot-info`);
        const d = await r.json();
        if (d && d.username) tgBotUsername = d.username;
      } catch (e) {}
    }
    window.open(`https://t.me/${tgBotUsername}?start=login_${digits}`, '_blank', 'noopener,noreferrer');
    showToast('Telegram bot ochildi! Botdagi "Raqamni tasdiqlash" tugmasini bosing.', 'fa-paper-plane');
  });

  document.getElementById('confirmOtpCodeBtn').addEventListener('click', async () => {
    const rawPhone = document.getElementById('otpPhoneInput').value;
    const digits = rawPhone.replace(/\D/g, '');
    const code = document.getElementById('otpCodeVal').value.trim();

    if (digits.length !== 12) return showToast('Telefon raqamingizni to\'liq kiriting!', 'fa-exclamation-triangle');
    if (code.length !== 4) return showToast('Bot bergan 4 xonali kodni kiriting!', 'fa-exclamation-triangle');

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
        showToast(data.message || 'Kod xato!', 'fa-times-circle');
        btn.disabled = false;
        return;
      }

      if (currentUser) {
        currentUser.phone = data.phone;
      } else {
        currentUser = { name: data.tgName || 'Mijoz', email: '', picture: '', phone: data.phone };
      }

      localStorage.setItem('iqbol_user', JSON.stringify(currentUser));
      renderUserUI();
      window.closeOtpModal();
      showToast(`Raqam Google hisobingizga ulandi: ${currentUser.phone}`, 'fa-check-circle');

      if (typeof pendingCallbackAfterAuth === 'function') {
        const fn = pendingCallbackAfterAuth;
        pendingCallbackAfterAuth = null;
        fn();
      }
    } catch (err) {
      showToast('Server bilan aloqa yo\'q!', 'fa-wifi');
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

    const compactConfig = { theme: 'outline', size: 'medium', text: 'signin', shape: 'pill', locale: 'uz' };
    const largeConfig = { theme: 'outline', size: 'large', text: 'signin_with', shape: 'pill', locale: 'uz' };

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
      showToast('Google hisob tekshirilmoqda...', 'fa-spinner');
      const res = await fetch(GOOGLE_AUTH_API, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      });
      const data = await res.json();

      if (data.success) {
        const oldSaved = JSON.parse(localStorage.getItem('iqbol_user') || '{}');
        currentUser = {
          ...data.user,
          phone: data.user.phone || oldSaved.phone || null
        };
        localStorage.setItem('iqbol_user', JSON.stringify(currentUser));
        renderUserUI();

        if (!currentUser.phone) {
          showToast(`Xush kelibsiz, ${currentUser.name}! Endi telefon raqamingizni ulang.`, 'fa-info-circle');
          setTimeout(() => window.openOtpModal(), 400);
        } else {
          showToast(`Xush kelibsiz, ${currentUser.name} (${currentUser.phone})!`, 'fa-check-circle');
        }
      } else {
        showToast('Kirish amalga oshmadi: ' + (data.message || 'Xatolik'), 'fa-exclamation-triangle');
      }
    } catch (err) { showToast("Server bilan aloqa yo'q", 'fa-wifi'); }
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
        : `<small onclick="window.closeMobileNav(); window.openOtpModal()" style="color:#ffb142; text-decoration:underline; cursor:pointer;">+ Raqamni ulash</small>`;

      if (googleWrap) googleWrap.remove();
      if (mobileGoogle) {
        mobileGoogle.innerHTML = '';
        mobileGoogle.classList.add('force-hide-auth');
      }
      if (checkoutNotice) checkoutNotice.classList.add('force-hide-auth');

      if (chip) {
        chip.removeAttribute('style');
        chip.classList.remove('force-hide-auth');
        const avatarEl = document.getElementById('userAvatar');
        if (avatarEl && currentUser.picture) { avatarEl.src = currentUser.picture; avatarEl.style.display = 'block'; }
        const uNameEl = document.getElementById('userName');
        if (uNameEl) {
          uNameEl.innerHTML = `<span>${firstName}</span>${phoneHtml}`;
          uNameEl.title = `${currentUser.name} | ${currentUser.email} | ${currentUser.phone || 'Raqam ulanmagan'}`;
        }
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
      if (chip) {
        chip.removeAttribute('style');
        chip.classList.add('force-hide-auth');
      }
      if (mobileChip) {
        mobileChip.removeAttribute('style');
        mobileChip.classList.add('force-hide-auth');
      }
      if (mobileGoogle) mobileGoogle.classList.remove('force-hide-auth');
      if (checkoutNotice) checkoutNotice.classList.remove('force-hide-auth');
      if (cPhone) cPhone.readOnly = false;
      if (rPhone) rPhone.readOnly = false;

      const restoredWrap = ensureHeaderGoogleContainerExists();
      if (restoredWrap && restoredWrap.children.length === 0) {
        drawGoogleButtons();
      }
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
    showToast('Hisobdan chiqdingiz', 'fa-sign-out-alt');
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
    } catch (err) {
      console.error('[Google Auth] Init xatosi:', err);
    }
  }
  renderUserUI();
  setTimeout(initGoogleSignIn, 150);

  /* ==========================================================================
     1. MENU DATABASE (Barcha 60 ta taom)
     ========================================================================== */
  const MENU_DATA = [
    { id: 'bt-1', name: 'Тушёнка (хашлама)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 40000, portion: '1 porsiya', desc: 'Mazali va to\'yimli tushonka (xashlama) sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1566_JFVMaw1_OiyJoRv.jpg', tags: ['Issiq taom'], popular: true },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'An\'anaviy o\'zbekcha guruchli mastava sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1514_ZlX2FhI.jpg', tags: ['Milliy'], popular: true },
    { id: 'bt-3', name: 'Борщ', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'Klassik qizil borsh sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1515_XhkBdxt_s4FDJwk.jpg', tags: ['Sho\'rva'], popular: false },
    { id: 'bt-4', name: 'Шўрва (мол гўшт)', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Mol go\'shtidan tayyorlangan mazali sho\'rva.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1549_m8tgXEs.jpg', tags: ['Mol go\'shti'], popular: false },
    { id: 'bt-5', name: 'Тефтель шўрва', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 29000, portion: '1 porsiya', desc: 'Teftel solingan to\'yimli birinchi taom.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1550_zst6bIR_QraUR3a.jpg', tags: ['Teftel'], popular: false },
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
    { id: 'des-1', name: 'San sebastian', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 dona', desc: 'Ispancha shokoladli/karamelli San-Sebastyan cheyzkeyki.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1608.jpg', tags: ['Desert'], popular: true },
    { id: 'des-2', name: 'Yagodniy opera', category: 'gazli', categoryName: 'Desertlar', price: 50000, portion: '1 dona', desc: 'Mevali nafis opera torti bo\'lagi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1609.jpg', tags: ['Desert'], popular: false },
    { id: 'des-3', name: 'Орешки safia', category: 'gazli', categoryName: 'Desertlar', price: 60000, portion: '1 quti', desc: 'Qaynatma shokoladli safia yong\'oqlari.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1605.jpg', tags: ['Shirinlik'], popular: true },
    { id: 'des-4', name: 'MILLENNIUM air bubble', category: 'gazli', categoryName: 'Desertlar', price: 20000, portion: '1 dona', desc: 'G\'ovakli shokolad plitkasi.', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1603.jpg', tags: ['Shokolad'], popular: false }
  ];

  let currentLang = localStorage.getItem('iqbol_lang') || 'uz';
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

  const DISH_TRANSLATIONS = {
    'bt-1': { ru: ['Тушёнка (хашлама)', 'Вкусный и сытный суп тушенка (хашлама).'], en: ['Tushonka (Khashlama)', 'Delicious and hearty beef stew soup.'] },
    'bt-2': { ru: ['Мастава', 'Традиционный узбекский рисовый суп мастава.'], en: ['Mastava', 'Traditional Uzbek rice soup with tender meat.'] },
    'bt-3': { ru: ['Борщ', 'Классический красный борщ со свежей зеленью.'], en: ['Borscht', 'Classic red beetroot soup with beef.'] }
  };

  function getDishName(dish) { if (currentLang !== 'uz' && DISH_TRANSLATIONS[dish.id] && DISH_TRANSLATIONS[dish.id][currentLang]) return DISH_TRANSLATIONS[dish.id][currentLang][0]; return dish.name; }
  function getDishDesc(dish) { if (currentLang !== 'uz' && DISH_TRANSLATIONS[dish.id] && DISH_TRANSLATIONS[dish.id][currentLang]) return DISH_TRANSLATIONS[dish.id][currentLang][1]; return dish.desc; }
  function getCategoryName(catName) { return (CATEGORY_TRANSLATIONS[currentLang] && CATEGORY_TRANSLATIONS[currentLang][catName]) || catName; }
  function getPortionName(portion) { return (PORTION_TRANSLATIONS[currentLang] && PORTION_TRANSLATIONS[currentLang][portion]) || portion; }

  const PAGE_SELECTORS_I18N = [
    { sel: '.logo-sub', uz: 'Oilaviy restoran', ru: 'Семейный ресторан', en: 'Family Restaurant' },
    { sel: '#desktopNav a[href="#home"]', uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
    { sel: '#desktopNav a[href="#about"]', uz: 'Biz haqimizda', ru: 'О нас', en: 'About' },
    { sel: '#desktopNav a[href="#why"]', uz: 'Afzalliklar', ru: 'Преимущества', en: 'Features' },
    { sel: '#desktopNav a[href="#menu"]', uz: 'Menyu', ru: 'Меню', en: 'Menu' },
    { sel: '#desktopNav a[href="#gallery"]', uz: 'Galereya', ru: 'Галерея', en: 'Gallery' },
    { sel: '#desktopNav a[href="#testimonials"]', uz: 'Sharhlar', ru: 'Отзывы', en: 'Reviews' },
    { sel: '#desktopNav a[href="#contact"]', uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
    { sel: '#headerReservationBtn span', uz: 'Stol band qilish', ru: 'Бронь стола', en: 'Book a Table' }
  ];

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
    renderMenu(); updateCartUI(); renderGallery();
  };

  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => window.changeLanguage(btn.dataset.lang)));

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

  function formatPrice(num) { const unit = currentLang === 'ru' ? ' сум' : currentLang === 'en' ? ' UZS' : " so'm"; return Number(num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + unit; }
  function showToast(message, icon = 'fa-check-circle') { if (!toastContainer) return; const toast = document.createElement('div'); toast.className = 'toast'; toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span class="toast-text">${message}</span>`; toastContainer.appendChild(toast); setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3200); }
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
      filtered = filtered.filter(item => item.name.toLowerCase().includes(q) || getDishName(item).toLowerCase().includes(q) || item.desc.toLowerCase().includes(q));
    }
    if (filtered.length === 0) {
      dishesGrid.innerHTML = `<div class="no-dishes-found"><i class="fas fa-utensils"></i><h3>Hech qanday taom topilmadi</h3></div>`;
      return;
    }

    const priceLbl = currentLang === 'ru' ? 'Цена:' : currentLang === 'en' ? 'Price:' : 'Narxi:';
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
            <div class="dish-badges">${dish.popular ? '<span class="badge badge-gold"><i class="fas fa-star"></i> Hit</span>' : ''}${dish.portion ? `<span class="badge badge-portion">${dPortion}</span>` : ''}</div>
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

  categoryTabs.forEach(btn => btn.addEventListener('click', () => { categoryTabs.forEach(b => b.classList.remove('active')); btn.classList.add('active'); activeCategory = btn.dataset.category; renderMenu(); }));
  if (searchInput) searchInput.addEventListener('input', (e) => { searchQuery = e.target.value; if (clearSearchBtn) clearSearchBtn.classList.toggle('visible', searchQuery.length > 0); renderMenu(); });
  if (clearSearchBtn) clearSearchBtn.addEventListener('click', () => { searchInput.value = ''; searchQuery = ''; clearSearchBtn.classList.remove('visible'); renderMenu(); searchInput.focus(); });

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
      cartItemsList.innerHTML = `<div class="empty-cart-view"><i class="fas fa-shopping-basket"></i><h4>Savat bo'sh</h4></div>`;
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
      feeDescription = zoneVal === 'tashqi' ? 'Yetkazish (Tashqari): 15 000' : 'Yetkazish (Shahar ichi): 10 000';
    } else {
      let serviceFeePercent = 0.07;
      const tableInputVal = document.getElementById('checkoutTable') ? document.getElementById('checkoutTable').value.toLowerCase() : '';
      if (tableInputVal.includes('vip') || tableInputVal.includes('kabina')) serviceFeePercent = 0.10;
      extraFee = Math.round(subtotal * serviceFeePercent);
      feeDescription = `Xizmat haqi (${Math.round(serviceFeePercent * 100)}%): ${formatPrice(extraFee)}`;
    }

    let grandTotal = subtotal + extraFee;
    if (cartTotalEl) cartTotalEl.innerHTML = `${formatPrice(grandTotal)} <br><small style="font-size:0.75rem; color:var(--accent-gold);">(${feeDescription})</small>`;
  }

  window.addToCart = function(dishId, qty = 1) {
    const dish = MENU_DATA.find(d => d.id === dishId); if (!dish) return;
    const existing = cart.find(item => item.id === dishId);
    if (existing) existing.quantity += qty; else cart.push({ id: dishId, quantity: qty });
    saveCart(); showToast(`"${getDishName(dish)}" savatga qo'shildi!`, 'fa-shopping-cart');
  };
  window.changeCartQty = function(dishId, delta) { const item = cart.find(i => i.id === dishId); if (!item) return; item.quantity += delta; if (item.quantity <= 0) cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.removeFromCart = function(dishId) { cart = cart.filter(i => i.id !== dishId); saveCart(); };
  window.openCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; updateCartUI(); } };
  window.closeCart = function() { if (cartDrawer && cartOverlay) { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; } };

  /* ==========================================================================
     4. CHECKOUT (BUYURTMA BERILGACH JARAYON SAYTDA EMAS, TELEGRAM "OPEN" DA KUZATILADI)
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  window.openCheckout = function() {
    if (cart.length === 0) return showToast('Savat bo\'sh!', 'fa-exclamation-circle');
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
      zoneDiv.innerHTML = `<label for="deliveryZone">Yetkazish hududi *</label><select id="deliveryZone" style="width:100%; padding:0.8rem 1rem; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-card); color:var(--text-main);"><option value="ichki">Shahar ichi (10 000 so'm)</option><option value="tashqi">Shahar tashqari (15 000 so'm)</option></select>`;
      addressGroup.appendChild(zoneDiv);
      document.getElementById('deliveryZone').addEventListener('change', updateCartUI);
    }
  }

  function renderSelectedAppButton() {
    const btnWrap = document.getElementById('selectedAppActionWrap');
    if (!btnWrap) return;
    const appInfo = PAYMENT_APPS[selectedPaymentMethod];
    if (!appInfo) {
      btnWrap.innerHTML = '';
      return;
    }
    btnWrap.innerHTML = `
      <button type="button" class="open-app-btn" style="background:${appInfo.color};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
        <i class="fas fa-external-link-alt"></i>
        <span>1. ${appInfo.name} ilovasini ochish va To'lash</span>
      </button>
    `;
  }

  function ensurePaymentSelectorUI() {
    const checkoutFormEl = document.getElementById('checkoutForm'); if (!checkoutFormEl || document.getElementById('paymentMethodsBox')) return;
    const submitBtn = checkoutFormEl.querySelector('button[type="submit"]');
    const payBox = document.createElement('div'); payBox.id = 'paymentMethodsBox'; payBox.className = 'payment-methods-box';
    payBox.innerHTML = `
      <div class="payment-methods-title"><i class="fas fa-wallet" style="color:var(--accent-gold);"></i><span id="payMethodsTitleText">To'lov usulini tanlang:</span></div>
      <div class="payment-methods-grid">
        <button type="button" class="pay-option-btn active" data-pay="Naqd"><i class="fas fa-money-bill-wave"></i> <span>Naqd</span></button>
        <button type="button" class="pay-option-btn" data-pay="Click"><i class="fas fa-credit-card"></i> <span>Click</span></button>
        <button type="button" class="pay-option-btn" data-pay="Payme"><i class="fas fa-mobile-alt"></i> <span>Payme</span></button>
        <button type="button" class="pay-option-btn" data-pay="Paynet"><i class="fas fa-bolt"></i> <span>Paynet</span></button>
      </div>
      <div id="cardDisplayBox" class="card-Display-box">
        <span style="font-size:0.78rem; color:var(--text-muted);" id="cardTransferHint">Karta raqamini nusxalab, ilova orqali to'lov qiling:</span>
        <div class="card-number-row">
          <span class="card-number-val">${RESTAURANT_CARD}</span>
          <button type="button" class="btn-copy-card" onclick="window.copyRestaurantCard()"><i class="fas fa-copy"></i> Nusxalash</button>
        </div>
        <div id="selectedAppActionWrap"></div>
        <small style="color:var(--accent-gold); font-size:0.75rem;">2. To'lov qilgach, pastdagi "Buyurtmani yuborish" tugmasini bosing 👇</small>
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
        showToast('Iltimos, avval Google hisobingiz bilan kiring!', 'fa-exclamation-triangle');
        const noticeEl = document.getElementById('checkoutLoginNotice');
        if (noticeEl) noticeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (!currentUser.phone) {
        showToast('Google hisobingizga telefon raqamingizni ulang!', 'fa-phone');
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
      
      if (!name || !phone) return showToast('Ism va telefonni kiriting!', 'fa-exclamation-triangle');
      if (orderType === 'delivery' && !address) return showToast('Yetkazish manzilini kiriting!', 'fa-exclamation-triangle');
      
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

        const tgText = `📦 YANGI TAOM BUYURTMASI! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${currentUser.email}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n💳 To'lov usuli: Naqd\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 Jami to'lov: ${formatPrice(totalSum)}\n📝 Izoh: ${note || "Yo'q"}\n\n👨‍🍳 CHEF VA 🛵 DASTAVSHIK BOSHQARUVI:`;

        await sendDirectTelegramToAllStaff(tgText, buildChefAndCourierInlineKeyboard(orderId));

        fetch(`${API_URL}/order/create-cash`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId, name, phone, email: currentUser.email,
            deliveryText, orderLinesText,
            subtotalText: formatPrice(subtotal),
            feeTitle, extraFeeText: formatPrice(extraFee),
            totalText: formatPrice(totalSum), note
          })
        }).catch(() => {});

        window.closeCheckout();
        showSuccessModal({
          title: 'Buyurtmangiz qabul qilindi!',
          subtitle: `Buyurtma raqami: #${orderId}`,
          message: `📲 Buyurtmangiz tayyor bo'lish jarayonini Telegram botimizdagi «Open» tugmasi orqali jonli kuzatishingiz mumkin!`,
          details: receiptSummaryText
        });
        cart = []; saveCart(); isSubmitting = false; if (submitBtn) submitBtn.disabled = false;
        return;
      }

      isSubmitting = true;
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const tgPayText = `💳 TO'LOV TEKSHIRUVI KUTILMOQDA! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${currentUser.email}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n🏦 To'lov usuli: ${selectedPaymentMethod} (${RESTAURANT_CARD})\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 Kutilayotgan summa: ${formatPrice(totalSum)}\n📝 Izoh: ${note || "Yo'q"}\n\n⚠️ DIQQAT: 9860 1701 1569 3682 kartaga ${formatPrice(totalSum)} tushganini tekshirib, pastdagi tugmani bosing:`;

      await sendDirectTelegramToAllStaff(tgPayText, {
        inline_keyboard: [[
          { text: "✅ Pul tushdi (Chefga o'tkazish)", callback_data: `p_ok_${orderId}` },
          { text: "❌ Tushmadi (Rad etish)", callback_data: `p_no_${orderId}` }
        ]]
      });

      fetch(`${API_URL}/payment/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId, name, phone, email: currentUser.email,
          deliveryText, payMethod: `${selectedPaymentMethod} (${RESTAURANT_CARD})`,
          orderLinesText, subtotalText: formatPrice(subtotal),
          feeTitle, extraFeeText: formatPrice(extraFee),
          totalText: formatPrice(totalSum), note
        })
      }).catch(() => {});

      window.closeCheckout();

      const spinnerEl = document.getElementById('payVerifySpinner');
      const iconEl = document.getElementById('payVerifyIcon');
      const titleEl = document.getElementById('payVerifyTitle');
      const descEl = document.getElementById('payVerifyDesc');
      const actEl = document.getElementById('payVerifyActions');

      spinnerEl.style.display = 'block';
      iconEl.style.display = 'none';
      titleEl.textContent = "To'lov tekshirilmoqda...";
      descEl.innerHTML = `<b>${RESTAURANT_CARD}</b> kartasiga <b>${selectedPaymentMethod}</b> orqali <b>${formatPrice(totalSum)}</b> tushishi kutilmoqda.<br><br><small>Agar hali to'lov qilmagan bo'lsangiz, pastdagi tugma orqali ${selectedPaymentMethod} ilovasida to'lovni amalga oshiring:</small>`;
      
      const appInfo = PAYMENT_APPS[selectedPaymentMethod];
      actEl.innerHTML = `
        <button type="button" class="open-app-btn" style="background:${appInfo ? appInfo.color : '#0099ff'};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
          <i class="fas fa-external-link-alt"></i> ${selectedPaymentMethod} ilovasini ochish (${formatPrice(totalSum)})
        </button>
        <button type="button" class="btn btn-outline-gold" onclick="window.closePayVerifyModal()" style="margin-top:6px;">Bekor qilish</button>
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
            titleEl.textContent = "✅ To'lov tasdiqlandi!";
            descEl.innerHTML = `<b>${formatPrice(totalSum)}</b> to'lovingiz qabul qilindi (#${orderId}).<br><br>📲 Ovqat tayyor bo'lish jarayonini Telegram botimizdagi <b>«Open»</b> tugmasi orqali kuzatishingiz mumkin!`;
            actEl.innerHTML = `<button type="button" class="btn btn-primary" onclick="window.closePayVerifyModal()">Yopish</button>`;
            cart = []; saveCart();
          } else if (stData.status === 'rejected') {
            clearInterval(payPollInterval);
            spinnerEl.style.display = 'none';
            iconEl.style.display = 'flex';
            iconEl.style.background = 'rgba(255, 107, 107, 0.18)';
            iconEl.style.color = '#ff6b6b';
            iconEl.innerHTML = '<i class="fas fa-times"></i>';
            titleEl.textContent = "❌ To'lov tasdiqlanmadi!";
            descEl.innerHTML = `<b>${RESTAURANT_CARD}</b> kartasiga <b>${formatPrice(totalSum)}</b> tushmadi!<br>Iltimos, to'lovni amalga oshirib qaytadan urinib ko'ring.`;
            actEl.innerHTML = `
              <button type="button" class="open-app-btn" style="background:${appInfo ? appInfo.color : '#0099ff'};" onclick="window.openPaymentApp('${selectedPaymentMethod}')">
                <i class="fas fa-redo"></i> ${selectedPaymentMethod} orqali qayta to'lash
              </button>
              <button type="button" class="btn btn-outline-gold" onclick="window.closePayVerifyModal()" style="margin-top:6px;">Yopish</button>
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

  if (reservationForm) {
    const resDateInput = document.getElementById('resDate'); const resTimeSelect = document.getElementById('resTime');
    const tableTypeSelect = document.getElementById('resTableType'); const tableNumberSelect = document.getElementById('resTableNumber');

    if (resDateInput) { resDateInput.min = new Date().toISOString().split('T')[0]; resDateInput.value = new Date().toISOString().split('T')[0]; }

    async function checkAndFilterBookedTables() {
      if (!tableTypeSelect || !tableNumberSelect || !resDateInput || !resTimeSelect) return;
      const type = tableTypeSelect.value; const date = resDateInput.value; const time = resTimeSelect.value;
      let max = 0; let label = 'Stol'; let tableTypeName = '';
      switch (type) {
        case 'asosiy-zal': max = 35; label = 'Stol'; tableTypeName = 'Asosiy zal'; break;
        case 'zal-2': max = 8; label = 'Stol'; tableTypeName = '2-zal'; break;
        case 'vip': max = 9; label = 'Kabina'; tableTypeName = 'VIP kabina'; break;
        case 'tashqi': max = 40; label = 'Joy'; tableTypeName = "Ko'cha / Tashqi ayvon"; break;
      }
      tableNumberSelect.innerHTML = '<option value="">Yuklanmoqda...</option>';
      try {
        const response = await fetch(`${API_URL}/booked`); const bookedTables = await response.json();
        tableNumberSelect.innerHTML = '';
        for (let i = 1; i <= max; i++) {
          const optionValue = `${label} #${i}`; const opt = document.createElement('option'); opt.value = optionValue;
          const bookingKey = `${date}_${time}_${tableTypeName}_${optionValue}`;
          if (bookedTables[bookingKey]) { opt.disabled = true; opt.textContent = makeStrikethrough(optionValue) + " (BAND)"; opt.style.color = "red"; opt.style.backgroundColor = "#ffe6e6"; } else { opt.textContent = optionValue; }
          tableNumberSelect.appendChild(opt);
        }
      } catch (err) {
        tableNumberSelect.innerHTML = '';
        for (let i = 1; i <= max; i++) { const optionValue = `${label} #${i}`; const opt = document.createElement('option'); opt.value = optionValue; opt.textContent = optionValue; tableNumberSelect.appendChild(opt); }
      }
    }

    tableTypeSelect.addEventListener('change', checkAndFilterBookedTables);
    resDateInput.addEventListener('change', checkAndFilterBookedTables);
    resTimeSelect.addEventListener('change', checkAndFilterBookedTables);
    checkAndFilterBookedTables();

    let isResSubmitting = false;
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault(); if (isResSubmitting) return;

      if (!currentUser) {
        showToast("Stol band qilish uchun avval Google va Telegram orqali kiring!", 'fa-shield-halved');
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

      if (!name || !phone || !date || !time || !tableNumber) return showToast("Iltimos, barcha maydonlarni to'ldiring!", 'fa-exclamation-triangle');

      isResSubmitting = true; let tableTypeName = '';
      if (tableType === 'asosiy-zal') tableTypeName = 'Asosiy zal'; else if (tableType === 'zal-2') tableTypeName = '2-zal'; else if (tableType === 'vip') tableTypeName = 'VIP kabina'; else if (tableType === 'tashqi') tableTypeName = "Ko'cha / Tashqi ayvon";

      showToast("Tizimga yuborilmoqda...", 'fa-spinner'); const submitBtn = reservationForm.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/book`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, email: currentUser ? currentUser.email : '', date, time, tableType: tableTypeName, tableNumber, guests, notes }) });
        const result = await response.json();
        if (!result.success) { showToast(result.message, 'fa-exclamation-triangle'); checkAndFilterBookedTables(); isResSubmitting = false; if (submitBtn) submitBtn.disabled = false; return; }
        const bookingCode = 'STOL-' + Math.floor(1000 + Math.random() * 9000);
        showSuccessModal({ title: 'Stol muvaffaqiyatli band qilindi!', subtitle: `Kod: #${bookingCode}`, message: `Hurmatli ${name}, joyingiz ro'yxatga olindi. Sizni kutamiz!`, details: `Joy turi: ${tableTypeName}\nStol: ${tableNumber}\nTelefon: ${phone}` });
        reservationForm.reset();
        renderUserUI();
        checkAndFilterBookedTables(); 
      } catch (err) { showToast("Server bilan aloqa yo'q!", 'fa-wifi'); } finally { isResSubmitting = false; if (submitBtn) submitBtn.disabled = false; }
    });
  }

  /* ==========================================================================
     6. SUCCESS MODAL, THEME & GALLERY
     ========================================================================== */
  const successModal = document.getElementById('successModal');
  function showSuccessModal(data) {
    if (!successModal) return;
    const titleEl = document.getElementById('successTitle'); const subEl = document.getElementById('successSubtitle'); const msgEl = document.getElementById('successMessage'); const detEl = document.getElementById('successDetails');
    if (titleEl) titleEl.textContent = data.title || ''; if (subEl) subEl.textContent = data.subtitle || ''; if (msgEl) msgEl.textContent = data.message || ''; if (detEl) detEl.textContent = data.details || '';
    successModal.classList.add('open'); document.body.style.overflow = 'hidden';
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

  const filterTabsContainer = document.querySelector('.gallery-filter-tabs'); if (filterTabsContainer) filterTabsContainer.style.display = 'none';
  let activeLightboxIndex = 0;
  const galleryGrid = document.getElementById('galleryGrid'); const lightboxModal = document.getElementById('lightboxModal'); const lightboxImg = document.getElementById('lightboxImg'); const lightboxCaption = document.getElementById('lightboxCaption');

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = GALLERY_IMAGES.map((item, index) => `
      <div class="gallery-item ${item.featured ? 'featured' : ''}" onclick="window.openLightbox(${index})">
        <img src="${item.url}" alt="${item.caption}" loading="lazy" />
        <div class="gallery-overlay"><span class="gallery-tag">${item.tag}</span><h4 class="gallery-caption">${item.caption}</h4></div>
      </div>
    `).join('');
  }

  window.openLightbox = function(index) { activeLightboxIndex = index; const item = GALLERY_IMAGES[activeLightboxIndex]; if (!item || !lightboxModal) return; lightboxImg.src = item.url; lightboxCaption.textContent = item.caption; lightboxModal.classList.add('open'); document.body.style.overflow = 'hidden'; };
  window.closeLightbox = function() { if (!lightboxModal) return; lightboxModal.classList.remove('open'); document.body.style.overflow = ''; };
  window.changeLightbox = function(step) { activeLightboxIndex += step; if (activeLightboxIndex < 0) activeLightboxIndex = GALLERY_IMAGES.length - 1; if (activeLightboxIndex >= GALLERY_IMAGES.length) activeLightboxIndex = 0; const item = GALLERY_IMAGES[activeLightboxIndex]; if (item) { lightboxImg.src = item.url; lightboxCaption.textContent = item.caption; } };

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