/**
 * STORE DATA — Sri Tirumala Jewellers
 * Product catalogue, categories, orders, users
 */

const STJStore = (() => {

  // ─── PRODUCTS ────────────────────────────────────────────
  const PRODUCTS = [
    // RINGS
    { id: 101, name: 'Lakshmi Temple Ring', cat: 'rings', karat: 22, weight: 3.5, making: 450, emoji: '💍', desc: 'Traditional Lakshmi design with intricate filigree work. Perfect for daily wear and pujas.', sku: 'RNG-LT-101', stock: 8, featured: true },
    { id: 102, name: 'Plain Gold Band Ring', cat: 'rings', karat: 22, weight: 2.8, making: 300, emoji: '💍', desc: 'Simple, elegant gold band ring. Classic design for everyday elegance.', sku: 'RNG-PL-102', stock: 15, featured: true },
    { id: 103, name: 'Diamond-Cut Rope Ring', cat: 'rings', karat: 18, weight: 4.2, making: 600, emoji: '💍', desc: 'Unique diamond-cut rope pattern. Modern design meets traditional craftsmanship.', sku: 'RNG-DC-103', stock: 5, featured: false },
    { id: 104, name: 'Peacock Ring 22K', cat: 'rings', karat: 22, weight: 5.0, making: 550, emoji: '💍', desc: 'Beautiful peacock motif ring. Symbol of grace and beauty.', sku: 'RNG-PC-104', stock: 3, featured: true },
    { id: 105, name: 'Classic Antique Ring', cat: 'rings', karat: 22, weight: 6.5, making: 500, emoji: '💍', desc: 'Antique gold finish with traditional South Indian design elements.', sku: 'RNG-AT-105', stock: 6, featured: false },

    // CHAINS
    { id: 201, name: 'Mangalsutra Chain', cat: 'chains', karat: 22, weight: 8.0, making: 300, emoji: '📿', desc: 'Auspicious Mangalsutra chain. Symbol of marriage and prosperity. Available in multiple lengths.', sku: 'CHN-MS-201', stock: 12, featured: true },
    { id: 202, name: 'Box Chain 24K Gold', cat: 'chains', karat: 24, weight: 5.0, making: 250, emoji: '📿', desc: 'Pure 24K gold box chain. Investment-grade pure gold jewellery.', sku: 'CHN-BX-202', stock: 7, featured: true },
    { id: 203, name: 'Rope Chain 22K', cat: 'chains', karat: 22, weight: 10.0, making: 320, emoji: '📿', desc: 'Classic rope design chain in 22K gold. Timeless elegance for all occasions.', sku: 'CHN-RP-203', stock: 9, featured: false },
    { id: 204, name: 'Figaro Chain', cat: 'chains', karat: 22, weight: 7.5, making: 350, emoji: '📿', desc: 'Italian Figaro link pattern in gold. Versatile design for men and women.', sku: 'CHN-FG-204', stock: 4, featured: false },
    { id: 205, name: 'Lakshmi Coin Chain', cat: 'chains', karat: 22, weight: 15.0, making: 400, emoji: '📿', desc: 'Traditional Lakshmi coin pendant chain. Auspicious and beautiful. Perfect gift.', sku: 'CHN-LC-205', stock: 6, featured: true },

    // BANGLES
    { id: 301, name: 'Bridal Bangle Set (4pc)', cat: 'bangles', karat: 22, weight: 25.0, making: 350, emoji: '🔮', desc: 'Stunning bridal bangle set of 4 pieces. Traditional South Indian bridal designs.', sku: 'BNG-BR-301', stock: 3, featured: true },
    { id: 302, name: 'Plain Gold Kada', cat: 'bangles', karat: 22, weight: 15.0, making: 280, emoji: '🔮', desc: 'Solid gold kada bangle. Simple and elegant. Perfect for daily wear.', sku: 'BNG-KD-302', stock: 8, featured: true },
    { id: 303, name: 'Antique Bangle (2pc)', cat: 'bangles', karat: 22, weight: 20.0, making: 420, emoji: '🔮', desc: 'Beautiful antique finish gold bangles. Traditional patterns with oxidised effect.', sku: 'BNG-AT-303', stock: 5, featured: false },
    { id: 304, name: 'Peacock Bangle Set', cat: 'bangles', karat: 22, weight: 30.0, making: 450, emoji: '🔮', desc: 'Intricate peacock motif bangle set. Ideal for weddings and festivals.', sku: 'BNG-PC-304', stock: 2, featured: true },
    { id: 305, name: 'Diamond-Cut Bangle', cat: 'bangles', karat: 18, weight: 12.0, making: 500, emoji: '🔮', desc: '18K gold with diamond-cut finish. Modern luxury design.', sku: 'BNG-DC-305', stock: 6, featured: false },

    // EARRINGS
    { id: 401, name: 'Lakshmi Studs', cat: 'earrings', karat: 22, weight: 2.5, making: 500, emoji: '✨', desc: 'Goddess Lakshmi face stud earrings. Auspicious design for daily wear.', sku: 'EAR-LS-401', stock: 14, featured: true },
    { id: 402, name: 'Traditional Jhumka', cat: 'earrings', karat: 22, weight: 5.0, making: 600, emoji: '✨', desc: 'Classic bell-shaped jhumka earrings. Iconic South Indian jewellery design.', sku: 'EAR-JH-402', stock: 10, featured: true },
    { id: 403, name: 'Gold Hoop Earrings', cat: 'earrings', karat: 22, weight: 3.2, making: 400, emoji: '✨', desc: 'Elegant gold hoop earrings. Versatile design for work and parties.', sku: 'EAR-HP-403', stock: 12, featured: false },
    { id: 404, name: 'Peacock Drop Earrings', cat: 'earrings', karat: 22, weight: 6.0, making: 650, emoji: '✨', desc: 'Long peacock design drop earrings. Perfect for weddings and ceremonies.', sku: 'EAR-PC-404', stock: 5, featured: true },
    { id: 405, name: 'Temple Earrings Set', cat: 'earrings', karat: 22, weight: 8.0, making: 700, emoji: '✨', desc: 'Complete temple jewellery earring set with intricate temple motifs.', sku: 'EAR-TM-405', stock: 4, featured: false },

    // PENDANTS
    { id: 501, name: 'Om Pendant 22K', cat: 'pendants', karat: 22, weight: 3.0, making: 450, emoji: '🌟', desc: 'Sacred Om symbol pendant. Spiritual and beautiful. Includes matching chain.', sku: 'PND-OM-501', stock: 10, featured: true },
    { id: 502, name: 'Peacock Pendant', cat: 'pendants', karat: 22, weight: 4.5, making: 500, emoji: '🌟', desc: 'Elegant peacock design pendant. Symbol of beauty and grace.', sku: 'PND-PC-502', stock: 7, featured: true },
    { id: 503, name: 'Goddess Lakshmi Pendant', cat: 'pendants', karat: 22, weight: 5.0, making: 550, emoji: '🌟', desc: 'Beautifully crafted Goddess Lakshmi pendant. Blessings in every detail.', sku: 'PND-LK-503', stock: 6, featured: true },
    { id: 504, name: 'Heart Locket 18K', cat: 'pendants', karat: 18, weight: 3.5, making: 480, emoji: '🌟', desc: '18K gold heart locket pendant. Perfect romantic gift or keepsake.', sku: 'PND-HT-504', stock: 8, featured: false },
    { id: 505, name: 'Star & Moon Pendant', cat: 'pendants', karat: 22, weight: 2.8, making: 420, emoji: '🌟', desc: 'Celestial star and moon motif pendant. Modern and spiritual design.', sku: 'PND-SM-505', stock: 5, featured: false },

    // BRIDAL
    { id: 601, name: 'Complete Bridal Set', cat: 'bridal', karat: 22, weight: 80.0, making: 380, emoji: '👑', desc: 'Complete bridal jewellery set: necklace, earrings, bangles, mangalsutra, maang tikka, ring. Your dream wedding look.', sku: 'BRD-CMP-601', stock: 2, featured: true },
    { id: 602, name: 'Bridal Necklace Set', cat: 'bridal', karat: 22, weight: 35.0, making: 420, emoji: '👑', desc: 'Stunning bridal necklace with matching earrings. Traditional Andhra Pradesh bridal design.', sku: 'BRD-NK-602', stock: 3, featured: true },
    { id: 603, name: 'Temple Bridal Set', cat: 'bridal', karat: 22, weight: 50.0, making: 400, emoji: '👑', desc: 'Traditional temple jewellery bridal set. Intricate craftsmanship inspired by ancient temple art.', sku: 'BRD-TM-603', stock: 2, featured: true },
  ];

  // ─── CATEGORIES ──────────────────────────────────────────
  const CATEGORIES = [
    { id: 'all',      label: 'All Jewellery',    emoji: '💛', count: PRODUCTS.length },
    { id: 'rings',    label: 'Rings',            emoji: '💍', count: PRODUCTS.filter(p => p.cat === 'rings').length },
    { id: 'chains',   label: 'Chains',           emoji: '📿', count: PRODUCTS.filter(p => p.cat === 'chains').length },
    { id: 'bangles',  label: 'Bangles',          emoji: '🔮', count: PRODUCTS.filter(p => p.cat === 'bangles').length },
    { id: 'earrings', label: 'Earrings',         emoji: '✨', count: PRODUCTS.filter(p => p.cat === 'earrings').length },
    { id: 'pendants', label: 'Pendants',         emoji: '🌟', count: PRODUCTS.filter(p => p.cat === 'pendants').length },
    { id: 'bridal',   label: 'Bridal Sets',      emoji: '👑', count: PRODUCTS.filter(p => p.cat === 'bridal').length },
  ];

  // ─── ORDERS (demo) ───────────────────────────────────────
  let ORDERS = [
    { id: 'STJ-001', customer: 'Lakshmi Devi', phone: '9876543210', items: [{ pid: 101, qty: 1 }], status: 'Delivered', date: '2025-03-15', total: 32480 },
    { id: 'STJ-002', customer: 'Ramesh Babu',  phone: '9876543211', items: [{ pid: 202, qty: 1 }], status: 'Processing', date: '2025-04-10', total: 37100 },
    { id: 'STJ-003', customer: 'Annapurna',    phone: '9876543212', items: [{ pid: 401, qty: 2 }], status: 'Pending',    date: '2025-04-12', total: 34940 },
    { id: 'STJ-004', customer: 'Venkata Rao',  phone: '9876543213', items: [{ pid: 301, qty: 1 }], status: 'Shipped',   date: '2025-04-14', total: 178150 },
    { id: 'STJ-005', customer: 'Padmavathi',   phone: '9876543214', items: [{ pid: 601, qty: 1 }], status: 'Processing', date: '2025-04-15', total: 612400 },
  ];

  // ─── USERS (demo) ────────────────────────────────────────
  let USERS = [
    { id: 1, name: 'Tirumala Rao Gudla', phone: '9014457855', role: 'owner', email: 'tirumala@gmail.com' },
  ];

  // ─── CART (localStorage backed) ──────────────────────────
  function getCart() {
    try { return JSON.parse(localStorage.getItem('stj_cart') || '[]'); } catch { return []; }
  }
  function saveCart(cart) {
    try { localStorage.setItem('stj_cart', JSON.stringify(cart)); } catch {}
  }
  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const idx = cart.findIndex(c => c.pid === productId);
    if (idx >= 0) cart[idx].qty += qty;
    else cart.push({ pid: productId, qty });
    saveCart(cart);
    return cart;
  }
  function removeFromCart(productId) {
    const cart = getCart().filter(c => c.pid !== productId);
    saveCart(cart);
    return cart;
  }
  function clearCart() {
    saveCart([]);
    return [];
  }
  function getCartProducts() {
    const cart = getCart();
    return cart.map(c => {
      const p = getProduct(c.pid);
      return p ? { ...p, qty: c.qty } : null;
    }).filter(Boolean);
  }

  // ─── WISHLIST (localStorage backed) ──────────────────────
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem('stj_wish') || '[]'); } catch { return []; }
  }
  function toggleWishlist(productId) {
    let wish = getWishlist();
    if (wish.includes(productId)) wish = wish.filter(x => x !== productId);
    else wish.push(productId);
    try { localStorage.setItem('stj_wish', JSON.stringify(wish)); } catch {}
    return wish;
  }
  function isWishlisted(productId) {
    return getWishlist().includes(productId);
  }

  // ─── PRODUCT HELPERS ─────────────────────────────────────
  function getProduct(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  }
  function getProducts(cat = 'all', sortBy = 'featured') {
    let list = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.cat === cat);
    if (sortBy === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    if (sortBy === 'price-asc')  list.sort((a, b) => a.weight * a.karat - b.weight * b.karat);
    if (sortBy === 'price-desc') list.sort((a, b) => b.weight * b.karat - a.weight * a.karat);
    if (sortBy === 'weight-asc') list.sort((a, b) => a.weight - b.weight);
    if (sortBy === 'name')       list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
  function getFeatured(limit = 8) {
    return PRODUCTS.filter(p => p.featured).slice(0, limit);
  }
  function searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.karat.toString().includes(q)
    ).slice(0, 6);
  }

  // ─── ORDER HELPERS ───────────────────────────────────────
  function getOrders() { return [...ORDERS]; }
  function addOrder(order) {
    const id = 'STJ-' + String(ORDERS.length + 1).padStart(3, '0');
    const newOrder = { ...order, id, date: new Date().toISOString().split('T')[0] };
    ORDERS.push(newOrder);
    return newOrder;
  }
  function updateOrderStatus(orderId, status) {
    const o = ORDERS.find(x => x.id === orderId);
    if (o) o.status = status;
    return o;
  }

  // ─── ADMIN HELPERS ───────────────────────────────────────
  function adminAddProduct(p) {
    const id = Math.max(...PRODUCTS.map(x => x.id)) + 1;
    const newP = { ...p, id, stock: p.stock || 10, featured: false };
    PRODUCTS.push(newP);
    return newP;
  }
  function adminDeleteProduct(id) {
    const idx = PRODUCTS.findIndex(p => p.id === id);
    if (idx >= 0) PRODUCTS.splice(idx, 1);
  }
  function adminUpdateProduct(id, updates) {
    const p = PRODUCTS.find(x => x.id === id);
    if (p) Object.assign(p, updates);
    return p;
  }

  // ─── LANGUAGE ────────────────────────────────────────────
  const TRANSLATIONS = {
    en: {
      'hero_title_1': 'Hiramandalam\'s Most',
      'hero_title_2': 'Trusted Gold Shop',
      'hero_sub': 'Pure Gold. Transparent Pricing. BIS Hallmarked.',
      'shop_now': 'Shop Now',
      'view_all': 'View All Collections',
      'add_to_cart': 'Add to Cart',
      'calculate': 'Calculate Price',
    },
    te: {
      'hero_title_1': 'హిరమండలంలో అత్యంత',
      'hero_title_2': 'విశ్వసనీయ బంగారు అంగడి',
      'hero_sub': 'స్వచ్ఛమైన బంగారం. పారదర్శక ధరలు. BIS హాల్‌మార్క్.',
      'shop_now': 'ఇప్పుడే కొనండి',
      'view_all': 'అన్ని సేకరణలు చూడండి',
      'add_to_cart': 'కార్ట్‌కు జోడించండి',
      'calculate': 'ధర లెక్కించండి',
    }
  };

  let currentLang = localStorage.getItem('stj_lang') || 'en';
  function getLang() { return currentLang; }
  function setLang(l) { currentLang = l; localStorage.setItem('stj_lang', l); }
  function t(key) { return (TRANSLATIONS[currentLang] || TRANSLATIONS.en)[key] || key; }

  // ─── SESSION ─────────────────────────────────────────────
  function getUser() {
    try { return JSON.parse(localStorage.getItem('stj_user') || 'null'); } catch { return null; }
  }
  function setUser(u) {
    try { localStorage.setItem('stj_user', JSON.stringify(u)); } catch {}
  }
  function logout() {
    localStorage.removeItem('stj_user');
  }
  function isLoggedIn() { return getUser() !== null; }

  return {
    PRODUCTS, CATEGORIES, ORDERS,
    getProduct, getProducts, getFeatured, searchProducts,
    getCart, addToCart, removeFromCart, clearCart, getCartProducts,
    getWishlist, toggleWishlist, isWishlisted,
    getOrders, addOrder, updateOrderStatus,
    adminAddProduct, adminDeleteProduct, adminUpdateProduct,
    getLang, setLang, t,
    getUser, setUser, logout, isLoggedIn,
  };
})();

window.STJStore = STJStore;
