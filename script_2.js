/**
 * IQBOL OILAVIY RESTORAN — JAVASCRIPT (YETKAZISH 15K VA OBSLUJIVANIYE BILAN)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. MENU DATABASE
     ========================================================================== */
  const MENU_DATA = [
    { id: 'bt-1', name: 'Борщи', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'An\'anaviy mol go\'shti, sabzi, lavlagi va ko\'katlar bilan to\'yimli sho\'rva.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Issiq taom', 'Mol go\'shti'], popular: false },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'O\'zbekcha suyuq guruchli taom, barra go\'sht, qatiq va xushbo\'y ziravorlar uyg\'unligi.', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', tags: ['Milliy', 'Mashhur'], popular: true },
    { id: 'bt-3', name: 'Суп с лапшой', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'Qo\'lda cho\'zilgan yupqa ugra, tiniq go\'shtli bulyon va sarxil sabzavotlar.', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'l ugrasi', 'Tiniq bulyon'], popular: false },
    { id: 'bt-4', name: 'Ковурма лагман', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'Uyg\'urcha qo\'lda cho\'zilgan lazzatli lag\'mon, qovurilgan go\'sht va sarxil qalampirlar.', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop', tags: ['Uyg\'ur oshxonasi', 'Tavsiya'], popular: true },
    { id: 'it-1', name: 'Тандыр (Tandir go\'sht)', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 245000, portion: '1 kg', desc: 'Qarshining afsonaviy archa va tandirda pishirilgan xushbo\'y, erib ketadigan qo\'y go\'shti.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop', tags: ['Qarshi Brandi', 'Tandir', '1 kg'], popular: true },
    { id: 'it-2', name: 'Казанча', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 250000, portion: '1 kg', desc: 'Maxsus cho\'yan qozonda qizarguncha qovurilgan sarxil barra go\'sht va kartoshka.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qozon-kabob', '1 kg'], popular: true },
    { id: 'it-4', name: 'Манты', category: 'ikkinchi', categoryName: 'Ikkinchi taomlar', price: 190000, portion: '1 kg', desc: 'Yupqa xamir ichida mayda to\'g\'ralgan shirador go\'sht va piyoz, bug\'da pishirilgan.', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop', tags: ['Bug\'da', '1 kg'], popular: true },
    { id: 'sh-1', name: 'Кусковой баранина', category: 'shashlik', categoryName: 'Shashlik va gril', price: 85000, portion: '1 six', desc: 'Cho\'g\'da pishirilgan barra qo\'y go\'shti va dumba yog\'i, piyoz va murch bilan.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Qo\'y go\'shti', 'Sixli'], popular: true },
    { id: 'sh-2', name: 'Кусковой говядина', category: 'shashlik', categoryName: 'Shashlik va gril', price: 85000, portion: '1 six', desc: 'Saralangan mol lahm go\'shti, ko\'mirda pishirilgan shirador kabob.', image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=800&auto=format&fit=crop', tags: ['Mol go\'shti'], popular: true },
    { id: 'sha-1', name: 'Шашлык ассорти (4 kishilik)', category: 'shashlik', categoryName: 'Shashlik va assorti', price: 350000, portion: '4 kishi uchun', desc: 'Lahm, qiyma, tovuq, qanotcha va sabzavotli shashliklarning katta to\'plami.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop', tags: ['Assorti', 'Oila uchun'], popular: true },
    { id: 'qt-1', name: 'Хрустящий баклажан', category: 'qoshimcha', categoryName: 'Qo\'shimcha taomlar', price: 62000, portion: '1 porsiya', desc: 'Qarsildoq qovurilgan baqlajon bo\'laklari, shirin-nordon sous va kashnich.', image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=800&auto=format&fit=crop', tags: ['Hit taom', 'Qarsildoq'], popular: true },
    { id: 'sal-2', name: 'Цезарь (Tovuq bilan)', category: 'salatlar', categoryName: 'Salatlar', price: 72000, portion: '1 porsiya', desc: 'Aysberg salat bargi, grilda pishgan tovuq go\'shti, parmezan va maxsuz sezar sousi.', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop', tags: ['Klassik', 'Mashhur'], popular: true },
    { id: 'ich-1', name: 'Мохито киви', category: 'ichimliklar', categoryName: 'Ichimliklar', price: 50000, portion: '1 grafin', desc: 'Muzdek tetiklantiruvchi kivi bo\'laklari, yalpiz va laym sharbati.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop', tags: ['Moxito', 'Muzdek'], popular: true },
    { id: 'gz-1', name: 'Кока-Кола (1L)', category: 'gazli', categoryName: 'Gazli va yaxna ichimliklar', price: 12000, portion: '1 litr', desc: 'Klassik Coca-Cola yaxna baklashka.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRdBQlp_m3fDR-FH0_cPYLIqVQzUUXKWDMo1cQGRN3aO-EHAiuavas7of&s=10', tags: ['1L', 'Muzdek'], popular: false }
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

    // Qo'shimcha haqni hisoblash (Yetkazish 15,000 yoki Obslujivaniye VIP 10% / Qolgani 7%)
    let extraFee = 0;
    let feeDescription = '';

    if (orderType === 'delivery') {
      extraFee = 15000; // Yetkazib berish (shahar ichi)
      feeDescription = 'Yetkazib berish: 15 000 so\'m';
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
  window.openCheckout = function() { if (cart.length === 0) { showToast('Savat bo\'sh!', 'fa-exclamation-circle'); return; } window.closeCart(); if (checkoutModal) { checkoutModal.classList.add('open'); document.body.style.overflow = 'hidden'; } };
  window.closeCheckout = function() { if (checkoutModal) { checkoutModal.classList.remove('open'); document.body.style.overflow = ''; } };

  const orderTypeBtns = document.querySelectorAll('.order-type-btn');
  orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => { 
      orderTypeBtns.forEach(b => b.classList.remove('active')); 
      btn.classList.add('active'); 
      orderType = btn.dataset.type; 
      document.getElementById('checkoutAddressGroup').style.display = orderType === 'delivery' ? 'flex' : 'none'; 
      document.getElementById('checkoutTableGroup').style.display = orderType === 'delivery' ? 'none' : 'flex'; 
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
        extraFee = 15000;
        feeTitle = 'Yetkazib berish (shahar ichi)';
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
      const deliveryText = orderType === 'delivery' ? `Yetkazish: ${address}` : `Restoranda: ${table || 'Tanlanmagan'}`;
      
      showToast("Yuborilmoqda...", 'fa-spinner');
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const BOT_TOKEN = '8634601019:AAEKyiMwJhM5py5e5Q7iiLQH0lezK3g66Ns'; 
      const FOOD_CHAT_ID = '8072569639'; // Ovqat buyurtmalari keladigan admin ID
      
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