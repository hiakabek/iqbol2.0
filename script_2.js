document.addEventListener('DOMContentLoaded', () => {
  const MENU_DATA = [
    { id: 'bt-1', name: 'Борщи', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 30000, portion: '1 porsiya', desc: 'An\'anaviy mol go\'shti...', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', tags: ['Issiq taom', 'Mol go\'shti'], popular: false },
    { id: 'bt-2', name: 'Мастава', category: 'birinchi', categoryName: 'Birinchi taomlar', price: 35000, portion: '1 porsiya', desc: 'O\'zbekcha suyuq guruchli taom...', image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', tags: ['Milliy', 'Mashhur'], popular: true }
    // Sayt ishlashi uchun qisqartirib o'tirmadim, o'zingizdagi to'liq menyuni qo'shishingiz ham mumkin, bu kod faqat Stol band qilish uchun javob beradi.
  ];

  function showToast(message, icon = 'fa-check-circle') {
    const toastContainer = document.getElementById('toastContainer');
    if(!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span class="toast-text">${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add('removing'); setTimeout(() => toast.remove(), 300); }, 3200);
  }

  // 1. USTIDAN CHIZIQ TORTISH FUNKSIYASI
  function makeStrikethrough(text) {
    return text.split('').map(char => char + '\u0336').join('');
  }

  const API_URL = 'http://localhost:3000/api';
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

    // 2. SERVERDAN BAND STOLLARNI OLIB QULF VA CHIZIQ QO'YISH
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
      } catch (err) {
        tableNumberSelect.innerHTML = '<option value="">Serverga ulanib bo\'lmadi</option>';
      }
    }

    tableTypeSelect.addEventListener('change', checkAndFilterBookedTables);
    resDateInput.addEventListener('change', checkAndFilterBookedTables);
    resTimeSelect.addEventListener('change', checkAndFilterBookedTables);
    
    checkAndFilterBookedTables();

    // 3. SERVERGA YUBORISH
    reservationForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = resDateInput.value;
      const time = resTimeSelect.value;
      const tableType = tableTypeSelect.value;
      const tableNumber = tableNumberSelect.value;
      const notes = document.getElementById('resNotes').value.trim();

      let tableTypeName = '';
      if (tableType === 'asosiy-zal') tableTypeName = 'Asosiy zal';
      else if (tableType === 'zal-2') tableTypeName = '2-zal';
      else if (tableType === 'vip') tableTypeName = 'VIP kabina';
      else if (tableType === 'tashqi') tableTypeName = "Ko'cha / Tashqi ayvon";

      showToast("Yuborilmoqda...", 'fa-spinner');
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, date, time, tableType: tableTypeName, tableNumber, notes })
        });

        const result = await response.json();

        if (!result.success) {
          showToast(result.message, 'fa-exclamation-triangle');
          checkAndFilterBookedTables(); 
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        alert("Stol muvaffaqiyatli band qilindi!");
        reservationForm.reset();
        checkAndFilterBookedTables(); // Qulflashni zudlik bilan ishga tushirish
      } catch (err) {
        showToast("Xato! Node.js server yoniq emas.", 'fa-wifi');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});