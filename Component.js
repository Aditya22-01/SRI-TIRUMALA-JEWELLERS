/* COMPONENTS — Inner Pages, Admin, Forms */

/* PAGE HERO */
.page-hero { background: var(--black); padding: 4rem 0 3rem; border-bottom: 1px solid rgba(201,150,42,0.15); }
.page-hero-inner { max-width: 1360px; margin: 0 auto; padding: 0 1.5rem; }
.breadcrumb { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #555; font-family: var(--font-sans); margin-bottom: 0.8rem; }
.breadcrumb a { color: var(--gold); transition: var(--transition); }
.breadcrumb a:hover { color: var(--gold-light); }
.breadcrumb i { font-size: 0.6rem; }
.page-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 3rem); color: var(--white); font-weight: 700; letter-spacing: 0.04em; }
.page-sub { color: #666; font-family: var(--font-body); font-style: italic; font-size: 1rem; margin-top: 0.4rem; }

/* SHOP FILTERS */
.shop-layout { display: grid; grid-template-columns: 240px 1fr; gap: 2rem; padding: 3rem 0; }
.filter-sidebar { position: sticky; top: 80px; height: fit-content; }
.filter-card { background: #fff; border: 1px solid rgba(201,150,42,0.12); border-radius: var(--radius); padding: 1.5rem; margin-bottom: 1.2rem; box-shadow: var(--shadow); }
.filter-title { font-family: var(--font-sans); font-size: 0.75rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1rem; }
.filter-option { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; cursor: pointer; }
.filter-option input[type="checkbox"] { accent-color: var(--gold); width: 14px; height: 14px; }
.filter-option label { font-size: 0.83rem; color: var(--text); cursor: pointer; font-family: var(--font-sans); }
.price-range-wrap { margin-top: 0.5rem; }
.price-range-wrap input[type="range"] { width: 100%; accent-color: var(--gold); }
.price-display { display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-sans); margin-top: 0.3rem; }
.filter-sort { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.sort-select { padding: 0.5rem 0.9rem; border: 1px solid rgba(201,150,42,0.25); background: #fff; color: var(--text); border-radius: 6px; font-family: var(--font-sans); font-size: 0.82rem; outline: none; }
.result-count { font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-sans); }

/* GOLD RATE PAGE */
.rate-history-table { width: 100%; border-collapse: collapse; font-family: var(--font-sans); font-size: 0.85rem; }
.rate-history-table th { background: var(--gold); color: #000; padding: 0.8rem 1rem; text-align: left; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.06em; }
.rate-history-table td { padding: 0.7rem 1rem; border-bottom: 1px solid rgba(201,150,42,0.1); color: var(--text); }
.rate-history-table tr:hover td { background: rgba(201,150,42,0.04); }
.rate-chart-wrap { background: #fff; border: 1px solid rgba(201,150,42,0.15); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); margin-bottom: 2rem; }

/* CALCULATOR PAGE */
.calc-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.calc-card { background: #fff; border: 1px solid rgba(201,150,42,0.15); border-radius: 14px; padding: 2rem; box-shadow: var(--shadow); }
.calc-card h3 { font-family: var(--font-display); font-size: 1.15rem; color: var(--gold-dark); margin-bottom: 1.3rem; letter-spacing: 0.04em; }
.calc-tabs-row { display: flex; gap: 0; margin-bottom: 1.5rem; border: 1px solid rgba(201,150,42,0.25); border-radius: 6px; overflow: hidden; }
.ctab { flex: 1; padding: 0.7rem; background: transparent; border: none; color: var(--text-muted); font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600; transition: var(--transition); }
.ctab.active { background: var(--gold); color: #000; }
.calc-result-box { margin-top: 1.2rem; padding: 1.2rem 1.5rem; background: linear-gradient(135deg, rgba(201,150,42,0.08), rgba(201,150,42,0.03)); border: 1px solid rgba(201,150,42,0.25); border-radius: 8px; }
.crb-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; font-family: var(--font-sans); }
.crb-value { font-family: var(--font-display); font-size: 2.2rem; color: var(--gold-dark); font-weight: 700; }
.crb-break { font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem; font-family: var(--font-sans); }
.karat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 1rem; }
.karat-item { text-align: center; padding: 0.7rem 0.4rem; background: var(--cream); border: 1px solid rgba(201,150,42,0.18); border-radius: 6px; }
.ki-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-sans); }
.ki-val { font-family: var(--font-display); font-size: 0.95rem; color: var(--gold-dark); font-weight: 700; }

/* CHECKOUT */
.checkout-layout { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; padding: 3rem 0; }
.checkout-section { background: #fff; border: 1px solid rgba(201,150,42,0.12); border-radius: var(--radius); padding: 1.8rem; margin-bottom: 1.2rem; box-shadow: var(--shadow); }
.checkout-section h3 { font-family: var(--font-display); font-size: 1rem; color: var(--gold-dark); margin-bottom: 1.2rem; padding-bottom: 0.6rem; border-bottom: 1px solid rgba(201,150,42,0.15); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.order-summary-box { background: #fff; border: 1px solid rgba(201,150,42,0.15); border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); position: sticky; top: 80px; }
.order-summary-box h3 { font-family: var(--font-display); font-size: 1rem; color: var(--gold-dark); margin-bottom: 1rem; }
.order-item { display: flex; gap: 0.8rem; margin-bottom: 0.8rem; padding-bottom: 0.8rem; border-bottom: 1px solid rgba(201,150,42,0.1); }
.order-item-emoji { width: 48px; height: 48px; background: linear-gradient(135deg, #f8f0d8, #efe0b5); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0; }
.order-item-info { flex: 1; }
.order-item-name { font-size: 0.83rem; font-weight: 600; color: var(--text); font-family: var(--font-sans); }
.order-item-meta { font-size: 0.7rem; color: var(--text-muted); }
.order-item-price { font-family: var(--font-display); font-size: 0.95rem; color: var(--gold-dark); font-weight: 700; }
.summary-row { display: flex; justify-content: space-between; font-family: var(--font-sans); font-size: 0.83rem; color: var(--text-muted); margin-bottom: 0.5rem; }
.summary-row.total { font-size: 1rem; font-weight: 700; color: var(--text); border-top: 1px solid rgba(201,150,42,0.15); padding-top: 0.8rem; margin-top: 0.5rem; }

/* ACCOUNT PAGE */
.account-layout { display: grid; grid-template-columns: 220px 1fr; gap: 2rem; padding: 3rem 0; }
.account-nav { background: #fff; border: 1px solid rgba(201,150,42,0.12); border-radius: var(--radius); padding: 1rem; box-shadow: var(--shadow); height: fit-content; }
.account-nav-item { display: flex; align-items: center; gap: 0.7rem; padding: 0.75rem 1rem; border-radius: 6px; color: var(--text-muted); font-family: var(--font-sans); font-size: 0.85rem; cursor: pointer; transition: var(--transition); margin-bottom: 0.2rem; }
.account-nav-item:hover, .account-nav-item.active { background: rgba(201,150,42,0.08); color: var(--gold-dark); }
.account-nav-item i { width: 16px; color: var(--gold); }
.account-content-card { background: #fff; border: 1px solid rgba(201,150,42,0.12); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow); margin-bottom: 1.2rem; }
.account-content-card h3 { font-family: var(--font-display); font-size: 1.1rem; color: var(--gold-dark); margin-bottom: 1.3rem; }

/* ORDER STATUS BADGE */
.status-badge { display: inline-block; padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.7rem; font-weight: 700; font-family: var(--font-sans); letter-spacing: 0.05em; }
.status-delivered { background: rgba(76,175,80,0.12); color: #4caf50; }
.status-processing { background: rgba(255,152,0,0.12); color: #ff9800; }
.status-pending { background: rgba(244,67,54,0.12); color: #f44336; }
.status-shipped { background: rgba(33,150,243,0.12); color: #2196f3; }

/* ADMIN */
.admin-layout { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }
.admin-sidebar { background: var(--black); border-right: 1px solid rgba(201,150,42,0.18); padding: 0; position: sticky; top: 0; height: 100vh; overflow-y: auto; }
.admin-sidebar-logo { padding: 1.5rem; border-bottom: 1px solid rgba(201,150,42,0.15); }
.admin-sidebar-logo .logo-name { font-size: 0.9rem; }
.admin-nav-item { display: flex; align-items: center; gap: 0.8rem; padding: 0.85rem 1.5rem; color: #666; font-family: var(--font-sans); font-size: 0.83rem; cursor: pointer; transition: var(--transition); border-left: 3px solid transparent; text-decoration: none; }
.admin-nav-item:hover { color: var(--gold-light); background: rgba(201,150,42,0.05); border-left-color: rgba(201,150,42,0.3); }
.admin-nav-item.active { color: var(--gold-light); background: rgba(201,150,42,0.08); border-left-color: var(--gold); }
.admin-nav-item i { width: 16px; color: var(--gold); font-size: 0.9rem; }
.admin-nav-section { padding: 0.5rem 1.5rem; font-size: 0.63rem; color: #333; text-transform: uppercase; letter-spacing: 0.15em; font-family: var(--font-sans); margin-top: 0.5rem; }
.admin-content { background: #f0f0ec; padding: 2rem; overflow-y: auto; }
.admin-topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.admin-topbar h1 { font-family: var(--font-display); font-size: 1.5rem; color: var(--black); }
.admin-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.2rem; margin-bottom: 2rem; }
.admin-stat-card { background: #fff; border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); border-left: 4px solid var(--gold); }
.asc-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
.asc-num { font-family: var(--font-display); font-size: 2rem; color: var(--text); font-weight: 700; }
.asc-label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; font-family: var(--font-sans); margin-top: 0.2rem; }
.asc-change { font-size: 0.75rem; margin-top: 0.3rem; font-family: var(--font-sans); font-weight: 600; }
.asc-change.positive { color: var(--green); }
.asc-change.negative { color: var(--red); }
.admin-card { background: #fff; border-radius: var(--radius); padding: 1.5rem; box-shadow: var(--shadow); margin-bottom: 1.5rem; }
.admin-card-title { font-family: var(--font-sans); font-size: 0.8rem; font-weight: 700; color: var(--gold-dark); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.2rem; display: flex; justify-content: space-between; align-items: center; }
.admin-table { width: 100%; border-collapse: collapse; font-family: var(--font-sans); font-size: 0.82rem; }
.admin-table th { color: var(--text-muted); padding: 0.6rem 0.8rem; text-align: left; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid rgba(201,150,42,0.15); }
.admin-table td { padding: 0.75rem 0.8rem; border-bottom: 1px solid #f5f5f0; color: var(--text); vertical-align: middle; }
.admin-table tr:hover td { background: rgba(201,150,42,0.03); }
.admin-action-btn { background: none; border: 1px solid rgba(201,150,42,0.3); color: var(--gold-dark); padding: 0.22rem 0.6rem; border-radius: 4px; font-size: 0.72rem; cursor: pointer; font-family: var(--font-sans); transition: var(--transition); margin-right: 0.3rem; }
.admin-action-btn:hover { background: var(--gold); color: #000; border-color: var(--gold); }
.admin-action-btn.danger { border-color: rgba(244,67,54,0.35); color: #f44336; }
.admin-action-btn.danger:hover { background: #f44336; color: #fff; border-color: #f44336; }
.admin-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.admin-form-field { margin-bottom: 0; }
.admin-form-field label { display: block; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-sans); font-weight: 600; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.35rem; }
.admin-form-field input, .admin-form-field select, .admin-form-field textarea { width: 100%; padding: 0.65rem 0.9rem; background: #f9f9f5; border: 1px solid rgba(201,150,42,0.2); border-radius: 6px; color: var(--text); font-family: var(--font-sans); font-size: 0.88rem; outline: none; transition: var(--transition); }
.admin-form-field input:focus, .admin-form-field select:focus, .admin-form-field textarea:focus { border-color: var(--gold); background: #fff; }

/* RESPONSIVE COMPONENTS */
@media (max-width: 900px) {
  .shop-layout { grid-template-columns: 1fr; }
  .filter-sidebar { position: static; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
  .calc-layout { grid-template-columns: 1fr; }
  .checkout-layout { grid-template-columns: 1fr; }
  .account-layout { grid-template-columns: 1fr; }
  .admin-layout { grid-template-columns: 1fr; }
  .admin-sidebar { position: static; height: auto; }
  .form-row { grid-template-columns: 1fr; }
}
