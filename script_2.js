/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT
 * (GOOGLE SIGN-IN + TELEGRAM RAQAM TASDIQLASH BILAN BIRGA — XATOLAR TUZATILGAN)
 */

document.addEventListener('DOMContentLoaded', () => {
  const RESTAURANT_CARD = '9860 1701 1569 3682';
  const RESTAURANT_CARD_RAW = '9860170115693682';
  const API_URL = 'https://iqbol.onrender.com/api';
  const GOOGLE_CLIENT_ID = '500756304339-78rjnbeajcu4tg8aml1k14iov9vu5qjk.apps.googleusercontent.com';
  const GOOGLE_AUTH_API = `${API_URL}/auth/google`;

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

  /* ==========================================================================
     0. CSS VA INTERFEYS DIZAYNI (GOOGLE + TELEFON RAQAM KAPSULASI)
     ========================================================================== */
  const customStyle = document.createElement('style');
  customStyle.textContent = `
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

    /* Google Sign-In & Ixcham User Profile Chip */
    .google-signin-wrap { display: flex; align-items: center; justify-content: center; }
    #userProfileChip.user-profile-chip {
      display: none; align-items: center; flex-wrap: nowrap !important; gap: 7px !important;
      padding: 3px 6px 3px 4px !important; height: 38px !important; border-radius: 999px !important;
      background: rgba(15, 44, 34, 0.88) !important; border: 1px solid rgba(212, 175, 55, 0.5) !important;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18) !important; max-width: 245px !important;
    }
    .header.scrolled #userProfileChip.user-profile-chip { background: var(--bg-card) !important; border-color: var(--border-gold) !important; }
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

    /* Mobil menyu ichidagi Google profil bloki */
    #mobileUserChip.mobile-user-chip {
      display: none; align-items: center; gap: 10px !important; padding: 10px 12px !important;
      background: var(--bg-card) !important; border: 1px solid var(--border-gold) !important;
      border-radius: 12px !important; margin-bottom: 12px !important;
    }
    #mobileUserChip .user-avatar { width: 38px !important; height: 38px !important; border-radius: 50% !important; border: 2px solid var(--accent-gold) !important; }
    #mobileUserChip .user-name-mobile { font-size: 0.85rem !important; font-weight: 700 !important; color: var(--text-main) !important; line-height: 1.25 !important; }
    #mobileUserChip .user-name-mobile small { display: block !important; font-size: 0.74rem !important; color: var(--accent-gold) !important; margin-top: 2px !important; }
    #mobileUserChip .btn-logout-mobile {
      background: rgba(201, 64, 91, 0.12) !important; color: #ff6b6b !important; border: 1px solid rgba(201, 64, 91, 0.35) !important;
      padding: 4px 9px !important; border-radius: 6px !important; font-size: 0.72rem !important; font-weight: 700 !important;
      margin-top: 5px !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; cursor: pointer !important;
    }
    @media (max-width: 900px) { #googleSignInContainer:not(.mobile-google), #userProfileChip.user-profile-chip { display: none !important; } }
    @media (max-width: 576px) { .lang-btn { padding: 4px 6px; font-size: 0.68rem; } .card-number-val { font-size: 0.92rem; } }

    /* GOOGLE TUGMASI VA ONE-TAP OYNASINI MAJBURAN YO'QOTISH */
    body.logged-in #googleSignInContainer,
    body.logged-in #mobileGoogleContainer,
    body.logged-in #checkoutGoogleContainer,
    body.logged-in iframe[src*="accounts.google.com"],
    body.logged-in #credential_picker_container,
    body.logged-in .g_id_signin {
      display: none !important;
      visibility: hidden !important;
      width: 0 !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      left: -9999px !important;
      z-index: -9999 !important;
    }
  `;
  document.head.appendChild(customStyle);

  // Headerga UZ | RU | EN tugmalarini qo'shish
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

  /* ==========================================================================
     0.1 TELEFON RAQAMNI GOOGLE HISOBGA BOG'LASH MODALI (TELEGRAM OTP)
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
    if (greetEl) {
      greetEl.textContent = currentUser ? `Google hisob: ${currentUser.email}` : '';
    }
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

    if (!tgBotUsername) {
      showToast('Server uyg\'onmoqda, 3 soniyadan so\'ng qayta bosing!', 'fa-spinner');
      return;
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
          phone: digits,
          code: code,
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
     0.2 GOOGLE SIGN-IN LOGIKASI (RAQAM BILAN BIRGA KO'RSATISH)
     ========================================================================== */
  const handleGoogleCredential = async (response) => {
    try {
      showToast('Google hisob tekshirilmoqda...', 'fa-spinner');
      const res = await fetch(GOOGLE_AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch (err) {
      showToast("Server bilan aloqa yo'q", 'fa-wifi');
    }
  };

  function renderUserUI() {
    const chip = document.getElementById('userProfileChip');
    const mobileChip = document.getElementById('mobileUserChip');
    const googleWrap = document.getElementById('googleSignInContainer');
    const mobileGoogle = document.getElementById('mobileGoogleContainer');
    const checkoutNotice = document.getElementById('checkoutLoginNotice');
    const checkoutGoogle = document.getElementById('checkoutGoogleContainer');

    const cName = document.getElementById('checkoutName');
    const cPhone = document.getElementById('checkoutPhone');
    const rName = document.getElementById('resName');
    const rPhone = document.getElementById('resPhone');

    const isMobileScreen = window.innerWidth <= 900;

    if (currentUser) {
      document.body.classList.add('logged-in'); // CSS ORQALI HAMMASINI YO'QOTISH

      // JS orqali ham Google tugmalarini va One Tap oynasini majburan o'chirish
      if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        try { google.accounts.id.cancel(); } catch(e) {}
      }
      const picker = document.getElementById('credential_picker_container');
      if (picker) picker.style.display = 'none';

      const firstName = (currentUser.name || currentUser.email || 'Mijoz').split(' ')[0];
      const phoneHtml = currentUser.phone
        ? `<small title="${currentUser.email}"><i class="fas fa-check-circle" style="color:#2ecc71;"></i> ${currentUser.phone}</small>`
        : `<small onclick="window.openOtpModal()" style="color:#ffb142; text-decoration:underline;">+ Raqamni ulash</small>`;

      if (chip) {
        chip.style.display = isMobileScreen ? 'none' : 'inline-flex';
        const avatarEl = document.getElementById('userAvatar');
        if (avatarEl) {
          if (currentUser.picture) {
            avatarEl.src = currentUser.picture;
            avatarEl.style.display = 'block';
          } else {
            avatarEl.style.display = 'none';
          }
        }
        const uNameEl = document.getElementById('userName');
        if (uNameEl) {
          uNameEl.innerHTML = `<span>${firstName}</span>${phoneHtml}`;
          uNameEl.title = `${currentUser.name} | ${currentUser.email} | ${currentUser.phone || 'Raqam ulanmagan'}`;
        }
      }

      if (mobileChip) {
        mobileChip.style.display = 'flex';
        const mAvatar = document.getElementById('mobileUserAvatar');
        if (mAvatar) {
          if (currentUser.picture) {
            mAvatar.src = currentUser.picture;
            mAvatar.style.display = 'block';
          } else {
            mAvatar.style.display = 'none';
          }
        }
        const mNameEl = document.getElementById('mobileUserName');
        if (mNameEl) {
          mNameEl.innerHTML = `${currentUser.name}<small>${currentUser.email}</small>${phoneHtml}`;
        }
      }

      // GOOGLE TUGMALARINI BUTUNLAY YO'QOTISH (Agar tizimga kirgan bo'lsa)
      if (googleWrap) { googleWrap.style.display = 'none'; googleWrap.innerHTML = ''; }
      if (mobileGoogle) { mobileGoogle.style.display = 'none'; mobileGoogle.innerHTML = ''; }
      if (checkoutGoogle) { checkoutGoogle.style.display = 'none'; checkoutGoogle.innerHTML = ''; }
      if (checkoutNotice) checkoutNotice.style.display = 'none';

      if (cName && !cName.value) cName.value = currentUser.name || '';
      if (rName && !rName.value) rName.value = currentUser.name || '';

      if (currentUser.phone) {
        if (cPhone) { cPhone.value = currentUser.phone; cPhone.readOnly = true; }
        if (rPhone) { rPhone.value = currentUser.phone; rPhone.readOnly = true; }
      }
    } else {
      document.body.classList.remove('logged-in'); // GOOGLE TUGMASINI QAYTA KO'RSATISH UCHUN

      if (chip) chip.style.display = 'none';
      if (mobileChip) mobileChip.style.display = 'none';
      if (googleWrap) googleWrap.style.display = isMobileScreen ? 'none' : 'flex';
      if (mobileGoogle) mobileGoogle.style.display = 'flex';
      if (checkoutNotice) checkoutNotice.style.display = 'block';
      if (checkoutGoogle) checkoutGoogle.style.display = 'flex';
      if (cPhone) cPhone.readOnly = false;
      if (rPhone) rPhone.readOnly = false;

      // Tizimdan chiqqanda Google tugmasini qayta yuklash
      if (typeof google !== 'undefined' && google.accounts) {
        const config = { theme: 'outline', size: 'medium', text: 'signin_with', shape: 'pill', locale: 'uz' };
        if (googleWrap && googleWrap.innerHTML === '') google.accounts.id.renderButton(googleWrap, config);
        if (mobileGoogle && mobileGoogle.innerHTML === '') google.accounts.id.renderButton(mobileGoogle, { ...config, size: 'large', width: 280 });
        if (checkoutGoogle && checkoutGoogle.innerHTML === '') google.accounts.id.renderButton(checkoutGoogle, { ...config, size: 'large' });
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

  function initGoogleSignIn() {
    // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, Google skripti umuman ishlamasin!
    if (currentUser) return;

    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      setTimeout(initGoogleSignIn, 400);
      return;
    }
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      const config = { theme: 'outline', size: 'medium', text: 'signin_with', shape: 'pill', locale: 'uz' };

      const headerContainer = document.getElementById('googleSignInContainer');
      if (headerContainer) google.accounts.id.renderButton(headerContainer, config);

      const mobileContainer = document.getElementById('mobileGoogleContainer');
      if (mobileContainer) google.accounts.id.renderButton(mobileContainer, { ...config, size: 'large', width: 280 });

      const checkoutContainer = document.getElementById('checkoutGoogleContainer');
      if (checkoutContainer) google.accounts.id.renderButton(checkoutContainer, { ...config, size: 'large' });
      
      renderUserUI();
    } catch (err) {
      console.error('[Google Auth] Init xatosi:', err);
    }
  }
  setTimeout(initGoogleSignIn, 150);
  window.addEventListener('load', initGoogleSignIn);

  /* ==========================================================================
     1. MENU DATABASE (Barcha 60 ta taom joyida)
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
    { id: 'sal-19', name: 'Тулум', category: 'salatlar', categoryName: 'Salatlar', price: 45000, portion: '1 porsiya', desc: 'Tulum pishlogi arashlagan', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1578.jpg', tags: ['Maxsus'], popular: false },
    { id: 'sal-20', name: 'Сате', category: 'salatlar', categoryName: 'Salatlar', price: 60000, portion: '1 porsiya', desc: 'Maxsus retsept asosida rulet shaklida tayyorlangan Sate salati..', image: 'https://admin.easymenu.uz/media/menu/items/IMG_1577.jpg', tags: ['Tulum'], popular: true },
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
     4. CHECKOUT & TELEGRAM (Google + Tasdiqlangan Raqam bilan)
     ========================================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  window.openCheckout = function() {
    if (cart.length === 0) return showToast('Savat bo\'sh!', 'fa-exclamation-circle');
    window.closeCart();
    if (checkoutModal) {
      checkoutModal.classList.add('open');
      document.body.style.overflow = 'hidden';
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

  function ensurePaymentSelectorUI() {
    const checkoutFormEl = document.getElementById('checkoutForm'); if (!checkoutFormEl || document.getElementById('paymentMethodsBox')) return;
    const submitBtn = checkoutFormEl.querySelector('button[type="submit"]');
    const payBox = document.createElement('div'); payBox.id = 'paymentMethodsBox'; payBox.className = 'payment-methods-box';
    payBox.innerHTML = `
      <div class="payment-methods-title"><i class="fas fa-wallet" style="color:var(--accent-gold);"></i><span id="payMethodsTitleText">To'lov usulini tanlang:</span></div>
      <div class="payment-methods-grid">
        <button type="button" class="pay-option-btn active" data-pay="Naqd"><i class="fas fa-money-bill-wave"></i> <span id="payBtnCashText">Naqd</span></button>
        <button type="button" class="pay-option-btn" data-pay="Karta"><i class="fas fa-credit-card"></i> <span id="payBtnCardText">Karta orqali</span></button>
      </div>
      <div id="cardDisplayBox" class="card-Display-box">
        <span style="font-size:0.78rem; color:var(--text-muted);" id="cardTransferHint">To'lov uchun karta raqami (Click / Payme / Paynet):</span>
        <div class="card-number-row"><span class="card-number-val">${RESTAURANT_CARD}</span><button type="button" class="btn-copy-card" onclick="window.copyRestaurantCard()"><i class="fas fa-copy"></i> Nusxalash</button></div>
      </div>
    `;
    checkoutFormEl.insertBefore(payBox, submitBtn);

    const cardBox = document.getElementById('cardDisplayBox');
    payBox.querySelectorAll('.pay-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        payBox.querySelectorAll('.pay-option-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
        selectedPaymentMethod = btn.dataset.pay;
        const isCard = selectedPaymentMethod === 'Karta'; if (cardBox) cardBox.classList.toggle('visible', isCard); if (isCard) window.copyRestaurantCard();
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
      
      isSubmitting = true; const submitBtn = checkoutForm.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.disabled = true;

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
      const deliveryText = orderType === 'delivery' ? `Yetkazish: ${address} (${feeTitle})` : `Restoranda: ${table || 'Tanlanmagan'}`;
      const payInfoLine = selectedPaymentMethod === 'Naqd' ? 'Naqd' : `Karta orqali (${RESTAURANT_CARD} - Click/Payme/Paynet)`;
      
      showToast("Yuborilmoqda...", 'fa-spinner');

      const BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
      const FOOD_CHAT_ID = '8072569639';
      
      const tgText = `📦 YANGI TAOM BUYURTMASI! (#${orderId})\n\n👤 Mijoz: ${name}\n📧 Google: ${currentUser.email}\n📞 Tel: ${phone} (✅ Tasdiqlangan)\n📍 ${deliveryText}\n💳 To'lov usuli: ${payInfoLine}\n\n🛒 Buyurtmalar:\n${orderLinesText}\n\n-------------------\nTaomlar: ${formatPrice(subtotal)}\n${feeTitle}: ${formatPrice(extraFee)}\n💰 Jami to'lov: ${formatPrice(totalSum)}\n📝 Izoh: ${note || "Yo'q"}`;
      
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: FOOD_CHAT_ID, text: tgText })
        });
      } catch (err) { console.log("Telegram xatolik:", err); }

      window.closeCheckout(); 
      showSuccessModal({ 
        title: selectedPaymentMethod === 'Naqd' ? 'Buyurtmangiz qabul qilindi!' : 'Buyurtma va Karta orqali to\'lov!', 
        subtitle: `Raqam: #${orderId} | To'lov: ${selectedPaymentMethod}`, 
        message: selectedPaymentMethod === 'Naqd' ? `Tez orada operator aloqaga chiqadi.` : `Karta raqami (${RESTAURANT_CARD}) nusxalandi! Iltimos, ${formatPrice(totalSum)} ni ushbu kartaga o'tkazing:`, 
        details: `${deliveryText}\nGoogle: ${currentUser.email}\nTel: ${phone}\nTo'lov turi: ${payInfoLine}\nJami: ${formatPrice(totalSum)}\n\n${orderLinesText}`
      });
      cart = []; saveCart(); isSubmitting = false; if (submitBtn) submitBtn.disabled = false;
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

      const name = document.getElementById('resName').value.trim();
      const phone = (currentUser && currentUser.phone) ? currentUser.phone : document.getElementById('resPhone').value.trim();
      const date = resDateInput.value; const time = resTimeSelect.value; const guests = document.getElementById('resGuests').value;
      const tableType = tableTypeSelect.value; const tableNumber = tableNumberSelect.value; const notesEl = document.getElementById('resNotes'); const notes = notesEl ? notesEl.value.trim() : '';

      if (!name || !phone || !date || !time || !tableNumber) return showToast("Iltimos, barcha maydonlarni to'ldiring!", 'fa-exclamation-triangle');

      isResSubmitting = true; let tableTypeName = '';
      if (tableType === 'asosiy-zal') tableTypeName = 'Asosiy zal'; else if (tableType === 'zal-2') tableTypeName = '2-zal'; else if (tableType === 'vip') tableTypeName = 'VIP kabina'; else if (tableType === 'tashqi') tableTypeName = "Ko'cha / Tashqi ayvon";

      showToast("Tizimga yuborilmoqda...", 'fa-spinner'); const submitBtn = reservationForm.querySelector('button[type="submit"]'); if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email: currentUser ? currentUser.email : '', date, time, tableType: tableTypeName, tableNumber, guests, notes })
        });
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

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { window.closeDishModal(); window.closeCart(); window.closeCheckout(); window.closeSuccessModal(); window.closeMobileNav(); window.closeLightbox(); window.closeOtpModal(); } });

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