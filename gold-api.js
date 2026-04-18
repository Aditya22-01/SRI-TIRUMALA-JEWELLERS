/**
 * GOLD API MODULE — Sri Tirumala Jewellers
 * Fetches live gold rates from SVBC broadcast server
 * Converts USD/troy oz → INR/gram
 * Updates all price displays across the website
 */

const GoldAPI = (() => {
  // ─── CONFIG ──────────────────────────────────────────────
  const SVBC_URL = 'https://bcast.svbcgold.in:7768/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/svbc';
  const CORS_PROXIES = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/'
  ];
  const FETCH_MS      = 500;      // Fetch every 500ms as requested
  const USD_INR       = 83.5;     // USD to INR (update periodically)
  const TROY_TO_GRAM  = 31.1035;  // 1 troy oz = 31.1035 grams
  const GST_RATE      = 0.03;     // 3% GST on jewellery
  const MAKING_DEFAULT = 350;     // Default making charges ₹/gram
  // ─────────────────────────────────────────────────────────

  let gold24k         = 7420;     // Current 24K price INR/gram
  let openingRate     = null;     // Session opening rate
  let allRates        = [];       // All fetched rates for daily avg
  let proxyIndex      = 0;        // Which CORS proxy to use
  let intervalId      = null;
  let consecutiveFail = 0;
  let isLive          = false;
  let lastFetchTime   = null;
  let callbacks       = [];       // Registered update callbacks

  // ─── PARSE XML ───────────────────────────────────────────
  function parseXML(xmlText) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlText, 'text/xml');

      // Common tag names used by SVBC / broadcast gold APIs
      const tags = ['Rate','rate','Price','price','Value','value','Bid','bid','Ask','ask','GoldRate','LTP','ltp','Close','close'];
      for (const tag of tags) {
        const el = doc.querySelector(tag);
        if (el && !isNaN(parseFloat(el.textContent.trim()))) {
          const val = parseFloat(el.textContent.trim());
          if (val > 100) return val; // must be a real price
        }
      }

      // Fallback: scan all text nodes for a price-like number
      const text = doc.documentElement ? doc.documentElement.textContent : xmlText;
      const matches = text.match(/\d{3,5}(?:\.\d{1,4})?/g);
      if (matches) {
        for (const m of matches) {
          const v = parseFloat(m);
          if (v >= 1500 && v <= 5000) return v;   // USD/oz range
          if (v >= 6000 && v <= 10000) return v;  // INR/gram range (if API gives this)
        }
      }
    } catch (e) {
      console.warn('[GoldAPI] XML parse error:', e.message);
    }
    return null;
  }

  // ─── CONVERT TO INR/GRAM ─────────────────────────────────
  function toInrPerGram(raw) {
    if (raw >= 1500 && raw <= 5000) {
      // Looks like USD per troy oz
      return (raw * USD_INR) / TROY_TO_GRAM;
    }
    if (raw >= 6000 && raw <= 10000) {
      // Already INR per gram
      return raw;
    }
    return null;
  }

  // ─── GET KARAT PRICE ─────────────────────────────────────
  function karatPrice(karat) {
    return (karat / 24) * gold24k;
  }

  // ─── FORMAT ₹ ────────────────────────────────────────────
  function fmt(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  // ─── DAILY AVG CHANGE ────────────────────────────────────
  function dailyChange() {
    if (!openingRate || allRates.length < 2) return 0;
    const avg = allRates.reduce((a, b) => a + b, 0) / allRates.length;
    return avg - openingRate;
  }

  // ─── FETCH ───────────────────────────────────────────────
  async function fetchRate() {
    const proxy = CORS_PROXIES[proxyIndex % CORS_PROXIES.length];
    const url = proxy + encodeURIComponent(SVBC_URL + '?_=' + Date.now());

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'text/xml, application/xml, */*' },
        signal: AbortSignal.timeout(4000)
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);
      const text = await res.text();
      const raw = parseXML(text);
      if (!raw) throw new Error('Parse returned null');

      const inr = toInrPerGram(raw);
      if (!inr) throw new Error('Conversion failed for value: ' + raw);

      // Record
      if (openingRate === null) openingRate = inr;
      allRates.push(inr);
      if (allRates.length > 10000) allRates.shift();

      gold24k = inr;
      consecutiveFail = 0;
      isLive = true;
      lastFetchTime = new Date();

      updateDOM();
      notifyCallbacks();

    } catch (err) {
      consecutiveFail++;
      console.warn('[GoldAPI] Fetch error #' + consecutiveFail + ':', err.message);

      // Rotate proxy after 5 fails
      if (consecutiveFail % 5 === 0) {
        proxyIndex = (proxyIndex + 1) % CORS_PROXIES.length;
        console.log('[GoldAPI] Switching to proxy:', CORS_PROXIES[proxyIndex]);
      }

      if (consecutiveFail >= 15) {
        isLive = false;
        updateDOM(); // show "offline" state but keep last price
      }
    }
  }

  // ─── UPDATE DOM ──────────────────────────────────────────
  function updateDOM() {
    const now = lastFetchTime || new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST';
    const change = dailyChange();
    const changeAbs = Math.abs(Math.round(change));
    const dir = change >= 0 ? 'up' : 'down';
    const arrow = change >= 0 ? '▲' : '▼';
    const prefix = change >= 0 ? '+' : '-';

    // Helper for change display
    const chgText = (k) => `${arrow} ${prefix}₹${Math.round(Math.abs(change * k / 24))} today`;

    // ── TICKER ──
    safeSet('t24', fmt(gold24k) + '/g');
    safeSet('t22', fmt(karatPrice(22)) + '/g');
    safeSet('t18', fmt(karatPrice(18)) + '/g');
    safeSet('t14', fmt(karatPrice(14)) + '/g');
    safeAttr('tc24', 'textContent', `${arrow} ${prefix}₹${changeAbs}`);
    safeClass('tc24', dir);

    // ── HERO ──
    safeSet('hero22k', fmt(karatPrice(22)) + '/g');
    safeSet('hero24k', fmt(gold24k) + '/g');
    safeSet('heroUpdated', isLive ? 'Updated: ' + timeStr : 'Last known: ' + timeStr);

    // ── MAIN RATES ──
    safeSet('main24k', fmt(gold24k));
    safeSet('main22k', fmt(karatPrice(22)));
    safeSet('main20k', fmt(karatPrice(20)));
    safeSet('main18k', fmt(karatPrice(18)));
    safeSet('main14k', fmt(karatPrice(14)));

    const updEl = document.getElementById('mainLastUpdated');
    if (updEl) {
      updEl.textContent = isLive ? '⚡ Updated: ' + timeStr : '⚠️ Last known: ' + timeStr;
      updEl.style.color = isLive ? '#4caf50' : '#ff9800';
    }

    // ── RATE CHANGES ──
    ['24', '22'].forEach(k => {
      const el = document.getElementById('ch' + k + 'k');
      if (el) {
        el.textContent = chgText(parseInt(k));
        el.className = 'rc-change ' + dir;
      }
    });

    // ── LIVE DOTS ──
    document.querySelectorAll('.live-dot').forEach(d => {
      d.style.background = isLive ? '#4caf50' : '#ff9800';
    });

    // ── HERO JEWELRY CARDS ──
    safeSet('jring',   fmt(karatPrice(22) * 3.5 + MAKING_DEFAULT * 3.5));
    safeSet('jchain',  fmt(karatPrice(22) * 8.0 + MAKING_DEFAULT * 8.0));
    safeSet('jbangle', fmt(karatPrice(22) * 25 + MAKING_DEFAULT * 25));
    safeSet('jear',    fmt(karatPrice(22) * 2.5 + MAKING_DEFAULT * 2.5));

    // ── CALCULATOR ──
    if (typeof STJ !== 'undefined') {
      if (STJ.quickCalc) STJ.quickCalc();
      if (STJ.updateCalcRates) STJ.updateCalcRates();
      if (STJ.renderFeatured) STJ.renderFeatured();
    }

    // ── PAGE: rates.html ──
    if (typeof RatesPage !== 'undefined' && RatesPage.update) {
      RatesPage.update(gold24k, change);
    }

    // ── PAGE: calculator.html ──
    if (typeof CalcPage !== 'undefined' && CalcPage.update) {
      CalcPage.update(gold24k);
    }
  }

  // ─── HELPERS ─────────────────────────────────────────────
  function safeSet(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }
  function safeAttr(id, attr, val) {
    const el = document.getElementById(id);
    if (el) el[attr] = val;
  }
  function safeClass(id, cls) {
    const el = document.getElementById(id);
    if (el) { el.className = ''; el.classList.add(cls); }
  }

  // ─── CALLBACKS ───────────────────────────────────────────
  function onUpdate(fn) {
    callbacks.push(fn);
  }
  function notifyCallbacks() {
    callbacks.forEach(fn => {
      try { fn({ gold24k, karatPrice, fmt, dailyChange, isLive }); } catch (e) {}
    });
  }

  // ─── PUBLIC API ──────────────────────────────────────────
  function start() {
    console.log('[GoldAPI] Starting live gold feed — SVBC endpoint');
    fetchRate(); // Immediate fetch
    intervalId = setInterval(fetchRate, FETCH_MS);
  }

  function stop() {
    if (intervalId) { clearInterval(intervalId); intervalId = null; }
  }

  function getPrice(karat = 24) {
    return karatPrice(karat);
  }

  function getFormatted(karat = 24) {
    return fmt(karatPrice(karat));
  }

  function getTotalPrice(karat, weightGrams, makingPerGram = MAKING_DEFAULT) {
    const goldValue = karatPrice(karat) * weightGrams;
    const making = makingPerGram * weightGrams;
    const gst = (goldValue + making) * GST_RATE;
    return { goldValue, making, gst, total: goldValue + making + gst };
  }

  function getFormatted24k() { return fmt(gold24k); }
  function getCurrentGold24k() { return gold24k; }
  function getDailyChangeValue() { return dailyChange(); }
  function getIsLive() { return isLive; }

  return {
    start, stop, onUpdate,
    getPrice, getFormatted, getTotalPrice,
    getFormatted24k, getCurrentGold24k,
    getDailyChangeValue, getIsLive,
    fmt, karatPrice,
    GST_RATE, MAKING_DEFAULT
  };
})();

// Make globally available
window.GoldAPI = GoldAPI;
