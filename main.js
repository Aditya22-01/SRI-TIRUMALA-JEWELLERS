/**
 * MAIN JS — Sri Tirumala Jewellers
 * UI interactions, cart, modals, calculators, animations
 */

const STJ = (() => {

  // ─── STATE ───────────────────────────────────────────────
  let currentCat = 'all';

  // ─── INIT ────────────────────────────────────────────────
  function init() {
    setupScrollAnimations();
    setupCounters();
    setupParticles();
    setupScrollHeader();
    setupCatTabs();
    updateCartBadge();
    updateWishBadge();
    checkLoginState();

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(el => {
      el.addEventListener('click', e => { if (e.target === el) closeModal(el.id); });
    });

    // Keyboard ESC closes modals
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
        closeCart();
      }
    });

    // Category tabs on home page
    document.querySelectorAll('#homeCatTabs .cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#homeCatTabs .cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderFeatured(btn.dataset.cat);
      });
    });

    console.log('[STJ] Initialized — Sri Tirumala Jewellers');
  }

  // ─── SCROLL ANIMATIONS ───────────────────────────────────
  function setupScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }

  // ─── COUNTERS ────────────────────────────────────────────
  function setupCounters() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.to || el.dataset.target || 0);
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.round(ease * target).toLocaleString('en-IN');
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(el => observer.observe(el));
  }

  // ─── PARTICLES ───────────────────────────────────────────
  function setupParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 8}s;
        animation-duration: ${6 + Math.random() * 6}s;
        width: ${1 + Math.random() * 2.5}px;
        height: ${1 + Math.random() * 2.5}px;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
  }

  // ─── SCROLL HEADER ───────────────────────────────────────
  function setupScrollHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.5)' : '';
    }, { passive: true });
  }

  // ─── MOBILE MENU ─────────────────────────────────────────
  function toggleMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('open');
  }

  // ─── LANGUAGE ────────────────────────────────────────────
  function toggleLang() {
    const current = STJStore.getLang();
    const next = current === 'en' ? 'te' : 'en';
    STJStore.setLang(next);
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.dataset[next] || el.dataset.en;
    });
    showToast(next === 'te' ? 'తెలుగుకు మారారు 🙏' : 'Switched to English');
  }

  // ─── CART ────────────────────────────────────────────────
  function openCart() {
    document.getElementById('cartDrawer')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('open');
    renderCart();
  }
  function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('open');
    document.getElementById('cartOverlay')?.classList.remove('open');
  }

  function addToCart(productId) {
    STJStore.addToCart(productId);
    const p = STJStore.getProduct(productId);
    updateCartBadge();
    showToast(`${p?.name || 'Item'} added to cart! 🛍`);
    renderCart();
    openCart();
  }

  function removeFromCart(productId) {
    STJStore.removeFromCart(productId);
    updateCartBadge();
    renderCart();
  }

  function updateCartBadge() {
    const items = STJStore.getCartProducts();
    const count = items.reduce((a, c) => a + c.qty, 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
  }

  function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;
    const items = STJStore.getCartProducts();
    if (!items.length) {
      container.innerHTML = `<div class="empty-cart"><div style="font-size:3rem">🛍</div><p>Your cart is empty</p><a href="pages/shop.html" class="btn-primary" style="margin-top:1rem;display:inline-flex">Browse Collections</a></div>`;
      document.getElementById('cartSubtotal') && (document.getElementById('cartSubtotal').textContent = '₹0');
      document.getElementById('cartGst') && (document.getElementById('cartGst').textContent = '₹0');
      document.getElementById('cartTotal') && (document.getElementById('cartTotal').textContent = '₹0');
      return;
    }

    let subtotal = 0;
    container.innerHTML = items.map(item => {
      const priceData = GoldAPI.getTotalPrice(item.karat, item.weight, item.making);
      const itemTotal = priceData.total * item.qty;
      subtotal += priceData.goldValue * item.qty + priceData.making * item.qty;
      return `<div class="cart-item">
        <div class="ci-img">${item.emoji}</div>
        <div class="ci-info">
          <div class="ci-name">${item.name}</div>
          <div class="ci-meta">${item.weight}g · ${item.karat}K · Qty: ${item.qty}</div>
          <div class="ci-price">${GoldAPI.fmt(itemTotal)}</div>
        </div>
        <button class="ci-remove" onclick="STJ.removeFromCart(${item.id})"><i class="fas fa-times"></i></button>
      </div>`;
    }).join('');

    const gst = subtotal * GoldAPI.GST_RATE;
    const total = subtotal + gst;
    if (document.getElementById('cartSubtotal')) document.getElementById('cartSubtotal').textContent = GoldAPI.fmt(subtotal);
    if (document.getElementById('cartGst')) document.getElementById('cartGst').textContent = GoldAPI.fmt(gst);
    if (document.getElementById('cartTotal')) document.getElementById('cartTotal').textContent = GoldAPI.fmt(total);
  }

  function whatsappCart() {
    const items = STJStore.getCartProducts();
    if (!items.length) { showToast('Your cart is empty!'); return; }
    const lines = items.map(p => {
      const priceData = GoldAPI.getTotalPrice(p.karat, p.weight, p.making);
      return `• ${p.name} (${p.weight}g, ${p.karat}K) x${p.qty} = ${GoldAPI.fmt(priceData.total * p.qty)}`;
    });
    const subtotal = items.reduce((a, p) => {
      const pr = GoldAPI.getTotalPrice(p.karat, p.weight, p.making);
      return a + pr.total * p.qty;
    }, 0);
    const msg = `🛕 *SRI TIRUMALA JEWELLERS — ORDER*\nHiramandalam, Srikakulam\n\n${lines.join('\n')}\n\n💰 *Total: ${GoldAPI.fmt(subtotal)}*\n\nPlease confirm my order. Thank you! 🙏`;
    window.open('https://wa.me/919014457855?text=' + encodeURIComponent(msg), '_blank');
  }

  // ─── WISHLIST ────────────────────────────────────────────
  function toggleWishlist(productId, btn) {
    const wish = STJStore.toggleWishlist(productId);
    const inWish = wish.includes(productId);
    if (btn) {
      btn.classList.toggle('active', inWish);
      btn.innerHTML = `<i class="${inWish ? 'fas' : 'far'} fa-heart"></i>`;
    }
    updateWishBadge();
    showToast(inWish ? 'Added to wishlist ❤️' : 'Removed from wishlist');
  }
  function updateWishBadge() {
    const count = STJStore.getWishlist().length;
    document.querySelectorAll('#wishCount').forEach(el => el.textContent = count);
  }

  // ─── PRODUCT CARD ────────────────────────────────────────
  function productCard(p) {
    if (!p) return '';
    const priceData = GoldAPI.getTotalPrice(p.karat, p.weight, p.making);
    const inWish = STJStore.isWishlisted(p.id);
    return `<div class="product-card scroll-reveal">
      <div class="pc-img">
        ${p.emoji}
        <span class="pc-karat-badge">${p.karat}K GOLD</span>
        <button class="pc-wish ${inWish ? 'active' : ''}" onclick="STJ.toggleWishlist(${p.id}, this)" title="Wishlist">
          <i class="${inWish ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="pc-body">
        <div class="pc-name">${p.name}</div>
        <div class="pc-meta">${p.weight}g · ${p.karat}K · ${p.karat === 24 ? '99.9%' : p.karat === 22 ? '91.6%' : p.karat === 18 ? '75%' : '58.3%'} Pure</div>
        <div class="pc-price-row">
          <div class="pc-price">${GoldAPI.fmt(priceData.total)}</div>
          <div class="pc-making">Gold: ${GoldAPI.fmt(priceData.goldValue)}<br>Making: ${GoldAPI.fmt(priceData.making)}</div>
        </div>
        <div class="pc-actions">
          <button class="pc-cart-btn" onclick="STJ.addToCart(${p.id})"><i class="fas fa-shopping-bag"></i> Add to Cart</button>
          <button class="pc-wa-btn" onclick="STJ.whatsappProduct(${p.id})" title="WhatsApp Order"><i class="fab fa-whatsapp"></i></button>
        </div>
      </div>
    </div>`;
  }

  function renderFeatured(cat) {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;
    if (cat !== undefined) currentCat = cat;
    const products = currentCat === 'all'
      ? STJStore.getFeatured(8)
      : STJStore.getProducts(currentCat).slice(0, 8);
    grid.innerHTML = products.map(productCard).join('');
    setupScrollAnimations();
  }

  function whatsappProduct(productId) {
    const p = STJStore.getProduct(productId);
    if (!p) return;
    const priceData = GoldAPI.getTotalPrice(p.karat, p.weight, p.making);
    const msg = `🛕 *SRI TIRUMALA JEWELLERS*\nHiramandalam, Srikakulam\n\nHello! I'm interested in:\n\n${p.emoji} *${p.name}*\n⚖️ Weight: ${p.weight}g\n✨ Karat: ${p.karat}K (${p.sku})\n💰 Price: ${GoldAPI.fmt(priceData.total)} (incl. GST)\n\nPlease confirm availability and delivery. Thank you! 🙏`;
    window.open('https://wa.me/919014457855?text=' + encodeURIComponent(msg), '_blank');
  }

  // ─── SEARCH ──────────────────────────────────────────────
  function searchProducts(query) {
    const results = STJStore.searchProducts(query);
    const drop = document.getElementById('searchDrop');
    if (!drop) return;
    if (!query || !results.length) {
      drop.innerHTML = query ? '<div style="padding:1rem;color:#666;font-size:0.8rem;font-family:var(--font-sans)">No results found</div>' : '';
      return;
    }
    drop.innerHTML = results.map(p => {
      const priceData = GoldAPI.getTotalPrice(p.karat, p.weight, p.making);
      return `<div class="search-result-item" onclick="window.location='pages/product.html?id=${p.id}'">
        <div class="sri-emoji">${p.emoji}</div>
        <div class="sri-info">
          <div class="sri-name">${p.name}</div>
          <div class="sri-price">${GoldAPI.fmt(priceData.total)} · ${p.karat}K · ${p.weight}g</div>
        </div>
      </div>`;
    }).join('');
  }

  // ─── CALCULATOR ──────────────────────────────────────────
  function quickCalc() {
    const karat   = parseInt(document.getElementById('qcKarat')?.value || 22);
    const weight  = parseFloat(document.getElementById('qcWeight')?.value || 10);
    const making  = parseFloat(document.getElementById('qcMaking')?.value || 350);
    if (isNaN(weight) || weight <= 0) return;

    const priceData = GoldAPI.getTotalPrice(karat, weight, making);
    if (document.getElementById('qcResult'))
      document.getElementById('qcResult').textContent = GoldAPI.fmt(priceData.total);
    if (document.getElementById('qcBreak'))
      document.getElementById('qcBreak').textContent =
        `Gold: ${GoldAPI.fmt(priceData.goldValue)} + Making: ${GoldAPI.fmt(priceData.making)} + GST: ${GoldAPI.fmt(priceData.gst)}`;
  }

  // ─── LOGIN / ACCOUNT ─────────────────────────────────────
  function openAccount() {
    if (STJStore.isLoggedIn()) {
      window.location.href = 'pages/account.html';
    } else {
      openModal('loginModal');
    }
  }

  function checkLoginState() {
    const user = STJStore.getUser();
    const btn = document.getElementById('accountBtn');
    if (user && btn) btn.style.color = '#C9962A';
  }

  function switchTab(tab) {
    document.querySelectorAll('.mtab').forEach((b, i) => b.classList.toggle('active', ['login','signup'][i] === tab));
    document.getElementById('tabLogin')?.classList.toggle('active', tab === 'login');
    document.getElementById('tabSignup')?.classList.toggle('active', tab === 'signup');
  }

  function doLogin() {
    const phone = document.getElementById('loginPhone')?.value?.trim();
    const pass  = document.getElementById('loginPass')?.value;
    if (!phone) { showToast('Please enter phone number'); return; }
    if (!pass)  { showToast('Please enter password'); return; }
    const user = { name: 'Customer', phone, loggedAt: Date.now() };
    STJStore.setUser(user);
    closeModal('loginModal');
    checkLoginState();
    showToast('Welcome back! Logged in successfully ✓');
  }

  function doSignup() {
    const name  = document.getElementById('signupName')?.value?.trim();
    const phone = document.getElementById('signupPhone')?.value?.trim();
    const pass  = document.getElementById('signupPass')?.value;
    if (!name || !phone || !pass) { showToast('Please fill all fields'); return; }
    const user = { name, phone, loggedAt: Date.now() };
    STJStore.setUser(user);
    closeModal('loginModal');
    checkLoginState();
    showToast(`Welcome, ${name}! Account created 🛕`);
  }

  // ─── MODALS ──────────────────────────────────────────────
  function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
  function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

  // ─── CAT TABS ────────────────────────────────────────────
  function setupCatTabs() {
    document.querySelectorAll('.cat-tabs').forEach(tabsEl => {
      tabsEl.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          tabsEl.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    });
  }

  // ─── TOAST ───────────────────────────────────────────────
  let toastTimer = null;
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
  }

  // ─── GLOBAL RETURN ───────────────────────────────────────
  return {
    init,
    toggleMenu, toggleLang,
    openCart, closeCart,
    addToCart, removeFromCart, updateCartBadge, renderCart, whatsappCart,
    toggleWishlist, updateWishBadge,
    productCard, renderFeatured, whatsappProduct,
    searchProducts,
    quickCalc,
    openAccount, switchTab, doLogin, doSignup,
    openModal, closeModal,
    showToast,
    setupScrollAnimations,
  };
})();

window.STJ = STJ;
