/* =========================================================
   AL TAHADI – MAIN SCRIPT
   Shared header/footer, hero slider, page renderers.
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const PAGE = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const RTL = document.documentElement.dir === "rtl";

/* ---------- Icons ---------- */
const ICON = {
  arrow: '<svg viewBox="0 0 40 12" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M0 6h38M33 1l5 5-5 5"/></svg>',
  arrowS: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15M14 6l6 6-6 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/></svg>',
  diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 18 3-18M6 3l3 6M18 3l-3 6"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M2 16l20-8-3-2-7 2-5-4-2 1 3 5-4 2-2-1-1 1z"/><path d="M3 21h18"/></svg>',
  hotel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 21V5h12v16M15 9h6v12M7 9h1M11 9h1M7 13h1M11 13h1M10 21v-4"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 16v-4l2-5h14l2 5v4z"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M3 12h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 8a2 2 0 0 0 0 4v0a2 2 0 0 1 0 4v2h18v-2a2 2 0 0 1 0-4 2 2 0 0 1 0-4V6H3z"/><path d="M14 6v12" stroke-dasharray="2 2"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="9" cy="8" r="3.5"/><path d="M2 20a7 7 0 0 1 14 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 13.5a7 7 0 0 1 4 6.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.8 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m15 18-6-6 6-6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m5 12 5 5 9-10"/></svg>',
};

/* ---------- Header ---------- */
const NAV = [
  ["index.html", "الرئيسية", "home"],
  ["tours.html", "العروض", "tours"],
  ["destinations.html", "الوجهات", "destinations"],
  ["services.html", "الخدمات", "services"],
  ["about.html", "من نحن", "about"],
  ["contact.html", "تواصل معنا", "contact"],
];

function renderHeader() {
  const el = $("#site-header");
  if (!el) return;
  const active = PAGE === "tour" ? "tours" : PAGE;
  el.outerHTML = `
  <header class="header" id="header">
    <a href="index.html" class="logo" aria-label="مجموعة شركات شوق الدولية"><img class="logo__mark logo__mark--badge" src="images/logo-mark.png" alt="شوق الدولية" /><span class="logo__text"><span class="logo__sub logo__sub--top">مجموعة شركات</span><span class="logo__main">شوق الدولية</span></span></a>
    <nav class="header__nav" id="nav">
      ${NAV.map(([h, t, k]) => `<a href="${h}" class="${k === active ? "active" : ""}">${t}</a>`).join("")}
    </nav>
    <div class="header__right">
      <button class="icon-btn" id="searchBtn" aria-label="بحث">${ICON.search}</button>
      <a href="contact.html" class="btn btn--sm header__cta">احجز رحلتك</a>
      <button class="burger" id="burger" aria-label="القائمة"><span></span><span></span></button>
    </div>
  </header>
  <div class="search" id="search">
    <form class="search__form" action="tours.html">
      <input type="text" name="q" placeholder="إلى أين تريد السفر؟" autocomplete="off" />
      <button class="icon-btn" aria-label="Search">${ICON.arrowS}</button>
    </form>
    <button class="search__close" id="searchClose" aria-label="إغلاق">×</button>
  </div>
  <div class="menu" id="menu" aria-hidden="true">
    <div class="menu__bg"></div>
    <img class="menu__mark" src="images/logo-emblem-white.png" alt="" />
    <nav class="menu__links">
      ${NAV.map(([h, t, k], i) => `
        <a href="${h}" class="menu__link ${k === active ? "active" : ""}" style="--i:${i}">
          <span class="menu__num">0${i + 1}</span>
          <span class="menu__mask"><span class="menu__text">${t}</span></span>
        </a>`).join("")}
    </nav>
    <div class="menu__foot">
      <div class="menu__contacts">
        <a href="${CONTACT.phoneHref}" dir="ltr">${CONTACT.phone}</a>
        <a href="tel:${CONTACT.phones[1][1]}" dir="ltr">+966 59 349 1513</a>
      </div>
      <div class="menu__social">${socialLinks()}</div>
    </div>
  </div>`;

  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", scrollY > 40);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const menu = $("#menu"), burger = $("#burger");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$(".menu__link").forEach((a) => a.addEventListener("click", () => setTimeout(() => setMenu(false), 400)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  addEventListener("resize", () => innerWidth > 900 && setMenu(false));
  const search = $("#search");
  $("#searchBtn").addEventListener("click", () => { search.classList.add("open"); setTimeout(() => $("input", search).focus(), 200); });
  $("#searchClose").addEventListener("click", () => search.classList.remove("open"));
  addEventListener("keydown", (e) => e.key === "Escape" && search.classList.remove("open"));
}

/* ---------- Footer ---------- */
function socialLinks() {
  return [
    CONTACT.instagram && `<a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.instagram}</a>`,
    CONTACT.facebook && `<a href="${CONTACT.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.facebook}</a>`,
    CONTACT.pinterest && `<a href="${CONTACT.pinterest}" target="_blank" rel="noopener" aria-label="Pinterest">${ICON.pinterest}</a>`,
    CONTACT.whatsapp && `<a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>`,
  ].filter(Boolean).join("");
}

function renderFooter() {
  const el = $("#site-footer");
  if (!el) return;
  el.outerHTML = `
  <footer class="footer">
    <div class="footer__cta" style="background-image:${bgOf("sky")}">
      <div class="footer__shade"></div>
      <div class="footer__window reveal" style="background-image:${bgOf("sky")}"></div>
      <div class="container footer__cta-inner">
        <img class="footer__brand" src="images/logo-white.png" alt="مجموعة شركات شوق الدولية" />
        <h2 class="footer__title reveal">كل خدمات السفر<br/>في مكان واحد</h2>
        <form class="newsletter reveal" id="newsletter">
          <p>اشترك ليصلك جديد العروض والرحلات</p>
          <div class="newsletter__field">
            <input type="email" required placeholder="بريدك الإلكتروني" aria-label="بريدك الإلكتروني" />
            <button aria-label="اشتراك">${ICON.arrowS}</button>
          </div>
          <small class="newsletter__msg"></small>
        </form>
        <div class="footer__social">${socialLinks()}</div>
        <p class="footer__motto">IATA · Approved Agent</p>
      </div>
    </div>
    <div class="footer__contacts container">
      <h4>تواصل معنا</h4>
      <div class="footer__row">
        <a href="${CONTACT.phoneHref}" dir="ltr">${CONTACT.phone}</a>
        <a href="tel:${CONTACT.phones[1][1]}" dir="ltr">+966 59 349 1513</a>
        <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>
        <span>${CONTACT.location}</span>
        <a href="${CONTACT.facebook}" target="_blank" rel="noopener">صفحتنا على فيسبوك</a>
      </div>
    </div>
    <div class="footer__bottom container">
      <span>© ${new Date().getFullYear()} مجموعة شركات شوق الدولية – Shawk Group. جميع الحقوق محفوظة.</span>
      <nav>
        <a href="about.html">من نحن</a><a href="tours.html">العروض</a><a href="destinations.html">الوجهات</a><a href="services.html">الخدمات</a><a href="contact.html">تواصل معنا</a>
      </nav>
    </div>
  </footer>
  ${CONTACT.whatsapp ? `<a class="wa-float" href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.whatsapp}</a>` : ""}`;

  $("#newsletter").addEventListener("submit", (e) => {
    e.preventDefault();
    $(".newsletter__msg").textContent = "شكراً لك! سيصلك جديد عروضنا.";
    e.target.reset();
  });
}

/* ---------- Shared card templates ---------- */
const destCard = (d, i = 0) => `
  <a class="dest-card reveal" style="--i:${i}" href="tours.html?dest=${encodeURIComponent(d.name)}">
    <div class="dest-card__img" style="background-image:${bgOf(d.img)}"></div>
    <div class="dest-card__body">
      <h3>${d.name}</h3>
      <p>${d.line}</p>
      <span class="long-arrow">${ICON.arrow}</span>
    </div>
  </a>`;

const typeLabel = { umrah: "حج وعمرة", visa: "تأشيرات ومعاملات", services: "سفر ونقل" };

const priceText = (t) => (t.price ? `ابتداءً من ${t.price}` : "السعر عند التواصل");
const tourCard = (t, i = 0) => `
  <a class="tour-card reveal" style="--i:${i % 6}" href="tour.html?id=${t.id}">
    <div class="tour-card__img" style="background-image:${bgOf(t.img)}">
      <span class="tour-card__type">${typeLabel[t.type]}</span>
    </div>
    <div class="tour-card__body">
      <h3>${t.title}</h3>
      <ul class="tags"><li>${t.dest}</li>${t.tags.slice(0, 2).map((g) => `<li>${g}</li>`).join("")}</ul>
      <div class="tour-card__meta"><span>${ICON.clock}${t.duration}</span><span class="tour-card__price">${priceText(t)}</span><span class="long-arrow">${ICON.arrow}</span></div>
    </div>
  </a>`;

const featureRow = (icon, title, text) => `
  <div class="feature reveal">
    <span class="feature__icon">${ICON[icon]}</span>
    <div><h4>${title}</h4><p>${text}</p></div>
  </div>`;

/* =========================================================
   HERO SLIDER (home)
   ========================================================= */
function initHero() {
  const hero = $("#hero");
  if (!hero) return;
  const bg = $("#heroBg"), cardsWrap = $("#heroCards"), titleEl = $("#heroTitle");
  const placeEl = $("#heroPlace"), descEl = $("#heroDesc"), linkEl = $("#heroLink");
  const numEl = $("#heroNum"), fillEl = $("#progressFill"), timerEl = $(".hero__timer span");
  const AUTOPLAY = 7000, ANIM = 950, n = SLIDES.length;
  const track = document.createElement("div");
  track.className = "hero__track";
  cardsWrap.appendChild(track);
  let current = 0, busy = false;
  const wrap = (i) => (i + n) % n;

  SLIDES.forEach((s) => { const im = new Image(); im.src = IMG[s.img][0]; });

  function setText() {
    const s = SLIDES[current];
    placeEl.textContent = s.place;
    titleEl.innerHTML = s.title.map((t, i) => `<span class="line"><span style="--d:${0.1 + i * 0.08}s">${t}</span></span>`).join("");
    descEl.textContent = s.desc;
    linkEl.href = `tour.html?id=${s.tour}`;
    numEl.textContent = String(current + 1).padStart(2, "0");
    fillEl.style.width = `${((current + 1) / n) * 100}%`;
  }
  function setBg() {
    bg.style.backgroundImage = bgOf(SLIDES[current].img);
    bg.style.animation = "none"; void bg.offsetWidth; bg.style.animation = "";
  }
  function card(idx) {
    const s = SLIDES[idx];
    const el = document.createElement("div");
    el.className = "hcard";
    el.style.backgroundImage = bgOf(s.img);
    el.innerHTML = `<div class="hcard__text"><i></i><small>${s.place}</small><strong>${s.title.join("<br>")}</strong></div>`;
    el.addEventListener("click", () => goTo(idx, el));
    return el;
  }
  function renderCards(mode) {
    track.classList.remove("shift");
    track.style.transform = "";
    track.innerHTML = "";
    for (let k = 1; k < n; k++) {
      const c = card(wrap(current + k));
      if (mode === "all") { c.classList.add("enter"); c.style.animationDelay = `${k * 0.07}s`; }
      if (mode === "last" && k === n - 1) c.classList.add("enter");
      track.appendChild(c);
    }
  }
  function textIn() {
    setText();
    requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.remove("is-out")));
  }
  function startTimer() {
    timerEl.classList.remove("run"); void timerEl.offsetWidth;
    timerEl.style.setProperty("--dur", `${AUTOPLAY}ms`);
    timerEl.classList.add("run");
  }
  timerEl.addEventListener("animationend", () => next());

  function finish(mode) {
    setBg(); renderCards(mode); textIn(); busy = false; startTimer();
  }

  function goTo(target, cardEl) {
    if (busy || target === current) return;
    busy = true;
    timerEl.classList.remove("run");
    hero.classList.add("is-out");
    const isFirst = cardEl === track.firstElementChild;
    const h = hero.getBoundingClientRect(), r = cardEl.getBoundingClientRect();
    const clone = cardEl.cloneNode(true);
    clone.className = "hcard hero__expand";
    Object.assign(clone.style, {
      top: `${r.top - h.top}px`, left: `${r.left - h.left}px`,
      width: `${r.width}px`, height: `${r.height}px`, borderRadius: "10px",
    });
    hero.appendChild(clone);
    cardEl.style.visibility = "hidden";
    void clone.offsetWidth;
    Object.assign(clone.style, { top: "0px", left: "0px", width: `${h.width}px`, height: `${h.height}px`, borderRadius: "0px" });

    if (isFirst) {
      const step = (r.width + parseFloat(getComputedStyle(track).columnGap || 0)) * (RTL ? 1 : -1);
      track.classList.add("shift");
      track.style.transform = `translateX(${step}px)`;
    } else {
      [...track.children].forEach((c) => c !== cardEl && c.classList.add("fade-away"));
    }
    setTimeout(() => { current = target; clone.remove(); finish(isFirst ? "last" : "all"); }, ANIM);
  }

  function next() { const f = track.firstElementChild; if (f) goTo(wrap(current + 1), f); }
  function prev() {
    if (busy) return;
    busy = true;
    timerEl.classList.remove("run");
    hero.classList.add("is-out");
    const target = wrap(current - 1);
    const fade = document.createElement("div");
    fade.className = "hero__fade";
    fade.style.backgroundImage = bgOf(SLIDES[target].img);
    hero.appendChild(fade);
    void fade.offsetWidth;
    fade.classList.add("on");
    [...track.children].forEach((c) => c.classList.add("fade-away"));
    setTimeout(() => { current = target; fade.remove(); finish("all"); }, ANIM);
  }

  $("#nextBtn").addEventListener("click", next);
  $("#prevBtn").addEventListener("click", prev);
  addEventListener("keydown", (e) => {
    if (scrollY > innerHeight * 0.6) return;
    if (e.key === (RTL ? "ArrowLeft" : "ArrowRight")) next();
    if (e.key === (RTL ? "ArrowRight" : "ArrowLeft")) prev();
  });
  let tx = null;
  hero.addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  hero.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) ((RTL ? dx > 0 : dx < 0) ? next : prev)();
    tx = null;
  });
  document.addEventListener("visibilitychange", () => {
    timerEl.style.animationPlayState = document.hidden ? "paused" : "running";
  });

  hero.classList.add("is-out");
  setBg();
  // wait for the page-transition veil before the intro animation
  const intro = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700;
  setTimeout(() => { renderCards("all"); textIn(); startTimer(); }, intro);
}

/* =========================================================
   PAGE RENDERERS
   ========================================================= */
const ARROW_BTN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15M14 6l6 6-6 6"/></svg>`;
const waLink = (text) => CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : "contact.html";

function renderHome() {
  const popular = ["السعودية", "فلسطين", "الإمارات", "تركيا", "مصر"];
  $("#popularDest").innerHTML = popular.map((n, i) => destCard(DESTINATIONS.find((d) => d.name === n), i)).join("");

  const sig = ["umrah-nour", "flights", "visas"];
  $("#signatureTours").innerHTML = sig.map((id, i) => tourCard(TOURS.find((t) => t.id === id), i)).join("");

  $("#homeFeatures").innerHTML =
    featureRow("plane", "4 تراخيص IATA", "وكيل طيران معتمد — حجز فوري ومؤكد لكل الوجهات.") +
    featureRow("car", "أسطول نقل خاص", "حافلات وسيارات حديثة ومجهّزة لرحلات آمنة.") +
    featureRow("clock", "إشراف ميداني 24/7", "نرتّب لكم ولعائلاتكم كل شيء من الألف إلى الياء.");
  const rv = $("#reviews");
  if (rv) rv.innerHTML = REVIEWS.map((r) => `
    <figure class="review reveal">
      <span class="review__stars">★★★★★</span>
      <blockquote>«${r.text}»</blockquote>
      <figcaption>${r.name} · ${r.source}</figcaption>
    </figure>`).join("");

  $("#homeServices").innerHTML = SERVICES.slice(0, 4).map((s, i) => `
    <div class="service reveal" style="--i:${i}">
      <span class="service__icon">${ICON[s.icon]}</span>
      <h4>${s.title}</h4><p>${s.text}</p>
    </div>`).join("");
}

function renderBranches() {
  $("#branchGrid").innerHTML = BRANCHES.map((b, i) => `
    <article class="branch reveal" style="--i:${i}">
      <div class="branch__img" style="background-image:${bgOf(b.img)}"></div>
      <div class="branch__body">
        ${b.note ? `<span class="branch__tag">${b.note}</span>` : ""}
        <h3>${b.city}</h3>
        <p>${ICON.pin}${b.street}</p>
        <div class="branch__actions">
          <a class="btn btn--sm" href="tel:${b.phone[1]}" dir="ltr">${b.phone[0]}</a>
          <a class="btn btn--sm" href="https://www.google.com/maps/search/${encodeURIComponent(b.map)}" target="_blank" rel="noopener">الموقع على الخريطة</a>
        </div>
      </div>
    </article>`).join("");
}

function renderDestinations() {
  $("#destGrid").innerHTML = DESTINATIONS.map((d, i) => {
    const count = TOURS.filter((t) => t.dest === d.name).length;
    return `
    <a class="dest-tile reveal" style="--i:${i % 4}" href="${count ? `tours.html?dest=${encodeURIComponent(d.name)}` : `contact.html?service=${encodeURIComponent("السفر إلى " + d.name)}`}">
      <div class="dest-tile__img" style="background-image:${bgOf(d.img)}"></div>
      <div class="dest-tile__body">
        <small>${d.country}</small>
        <h3>${d.name}</h3>
        <p>${d.line}</p>
        <span class="dest-tile__count">${count ? `${count} ${count > 2 ? "عروض" : count === 2 ? "عرضان" : "عرض"}` : "اطلب الخدمة"} ${ICON.arrowS}</span>
      </div>
    </a>`;
  }).join("");
}

function renderTours() {
  const grid = $("#toursGrid"), count = $("#toursCount");
  const destSel = $("#fDest"), qInput = $("#fSearch");
  const dests = [...new Set(TOURS.map((t) => t.dest))];
  destSel.innerHTML = `<option value="">كل الوجهات</option>` + dests.map((d) => `<option>${d}</option>`).join("");

  let type = params.get("type") || "all";
  destSel.value = params.get("dest") || "";
  qInput.value = params.get("q") || "";

  function apply() {
    const q = qInput.value.trim().toLowerCase();
    const list = TOURS.filter((t) =>
      (type === "all" || t.type === type) &&
      (!destSel.value || t.dest === destSel.value) &&
      (!q || `${t.title} ${t.dest} ${t.tags.join(" ")}`.toLowerCase().includes(q)));
    grid.innerHTML = list.length ? list.map(tourCard).join("") : `<p class="empty">لا توجد رحلات مطابقة. <a href="contact.html">اطلب رحلة خاصة ←</a></p>`;
    count.textContent = `${list.length} ${list.length === 1 ? "نتيجة" : "نتائج"}`;
    $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.type === type));
    observeReveal();
  }
  $$(".chip").forEach((c) => c.addEventListener("click", () => { type = c.dataset.type; apply(); }));
  destSel.addEventListener("change", apply);
  qInput.addEventListener("input", apply);
  apply();
}

function renderTour() {
  const t = TOURS.find((x) => x.id === params.get("id")) || TOURS[0];
  document.title = `${t.title} – مجموعة شركات شوق الدولية`;
  $("#tourHero").style.backgroundImage = bgOf(t.img);
  $("#tourType").textContent = `${typeLabel[t.type]} · ${t.dest}`;
  $("#tourTitle").textContent = t.title;
  $("#tourMeta").innerHTML = `
    <span>${ICON.clock}${t.duration}</span>
    <span>${ICON.pin}${t.dest}</span>
    <span>${ICON.ticket}${priceText(t)}</span>
    ${t.pickup ? `<span>${ICON.car}الاستقبال: ${t.pickup}</span>` : ""}`;

  let html = `<h2 class="h-sm">نظرة عامة</h2><p class="lead">${t.overview}</p>
    <ul class="tags tags--lg">${t.tags.map((g) => `<li>${g}</li>`).join("")}</ul>`;
  if (t.dates) {
    html += `<h2 class="h-sm">مواعيد الرحلات</h2><div class="dates">${t.dates.map((d) => `<span>${d}</span>`).join("")}</div>`;
  }
  if (t.prices) {
    html += `<h2 class="h-sm">الأسعار</h2><p class="price-note">بالدولار الأمريكي للشخص الواحد في الغرفة${t.pricesNote ? ` · ${t.pricesNote}` : ""}</p>
      <div class="price-table"><table>
        <thead><tr><th>الفندق</th><th>رباعي</th><th>ثلاثي</th><th>ثنائي</th></tr></thead>
        <tbody>${t.prices.map(([h, q, tr, d]) => `<tr><td>${h}</td><td>${q}$</td><td>${tr}$</td><td>${d}$</td></tr>`).join("")}</tbody>
      </table></div>`;
  }
  if (t.itinerary) {
    html += `<h2 class="h-sm">برنامج الرحلة</h2><div class="itinerary">` + t.itinerary.map((d, i) => `
      <details class="day" ${i === 0 ? "open" : ""}>
        <summary><span class="day__n">${d.day}</span><span class="day__t">${d.title}</span><span class="day__plus"></span></summary>
        <p>${d.text}</p>
      </details>`).join("") + `</div>`;
  }
  if (t.includes) {
    html += `<h2 class="h-sm">ماذا نقدّم لك</h2><ul class="checklist">${t.includes.map((x) => `<li>${ICON.check}${x}</li>`).join("")}</ul>`;
  } else {
    html += `<h2 class="h-sm">التفاصيل والأسعار</h2><p>تواصل معنا عبر واتساب أو الهاتف، ومنرسلك كل التفاصيل والمواعيد والأسعار المتاحة.</p>`;
  }
  html += `<h2 class="h-sm">كيف نتعامل معك</h2>
    <ul class="policy">
      <li><span>تأكيد الطلب</span><b>بعد التواصل وتحديد التفاصيل</b></li>
      <li><span>الأسعار</span><b>منافسة وتوضَّح قبل التأكيد</b></li>
      <li><span>المتابعة</span><b>لحد ما تخلص معاملتك</b></li>
    </ul>`;
  $("#tourBody").innerHTML = html;
  $("#bookTour").value = t.title;
  const wa = $("#tourWa");
  if (wa) { wa.href = waLink(`مرحباً شوق الدولية، بدي استفسر عن: ${t.title}`); if (!CONTACT.whatsapp) wa.style.display = "none"; }

  const related = TOURS.filter((x) => x.id !== t.id && (x.dest === t.dest || x.type === t.type)).slice(0, 3);
  $("#relatedTours").innerHTML = related.map(tourCard).join("");
}

function renderServices() {
  $("#servicesGrid").innerHTML = SERVICES.map((s, i) => `
    <div class="service reveal" style="--i:${i % 3}">
      <span class="service__icon">${ICON[s.icon]}</span>
      <h4>${s.title}</h4><p>${s.text}</p>
      <a class="service__link" href="contact.html?service=${encodeURIComponent(s.title)}">اطلب الخدمة ${ICON.arrowS}</a>
    </div>`).join("");
  $("#faqList").innerHTML = FAQ.map(([q, a], i) => `
    <details class="day reveal" ${i === 0 ? "open" : ""}>
      <summary><span class="day__n">0${i + 1}</span><span class="day__t">${q}</span><span class="day__plus"></span></summary>
      <p>${a}</p>
    </details>`).join("");
}

function renderAbout() {
  $("#aboutServices").innerHTML = SERVICES.map((s, i) => `
    <div class="service reveal" style="--i:${i % 3}">
      <span class="service__icon">${ICON[s.icon]}</span>
      <h4>${s.title}</h4><p>${s.text}</p>
    </div>`).join("");
  $("#aboutWhy").innerHTML =
    featureRow("plane", "4 تراخيص IATA", "وكيل طيران معتمد، حجز فوري ومؤكد.") +
    featureRow("globe", "14 دولة", "خدماتنا تغطي الخليج والشام ومصر والجزائر والصين وألمانيا وتركيا.") +
    featureRow("users", "لكل الجنسيات", "نخدم الجميع، مع تسهيلات خاصة للأخوة السوريين حول العالم.") +
    featureRow("clock", "إشراف ميداني 24/7", "معكم من الحجز وحتى العودة.");
}

function renderContact() {
  const tels = (list) => list.map(([d, n]) => `<a href="tel:${n}" dir="ltr">${d}</a>`).join("<br>");
  $("#contactCards").innerHTML = [
    ["phone", "اتصل بنا", tels(CONTACT.phones)],
    ["mail", "البريد الإلكتروني", `<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>`],
    ["whatsapp", "واتساب", `<a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener" dir="ltr">${CONTACT.phone}</a>`],
    ["pin", "مكتبنا", `${CONTACT.location}${CONTACT.address ? "<br>" + CONTACT.address : ""}`],
  ].map(([ic, t, v], i) => `
    <div class="contact-card reveal" style="--i:${i}">
      <span class="feature__icon">${ICON[ic]}</span>
      <h4>${t}</h4><p>${v}</p>
    </div>`).join("");
  $("#contactSocial").innerHTML = socialLinks();
  const svc = params.get("service");
  if (svc) { $("#cMessage").value = `أرغب بطلب خدمة: ${svc}\n\n`; }
}

/* ---------- Forms → WhatsApp / e-mail ---------- */
function initForms() {
  $$("form[data-mail]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const lines = [...data.entries()].filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
      const subject = form.dataset.mail + (data.get("الرحلة") ? ` – ${data.get("الرحلة")}` : "");
      const body = lines.join("\n");
      if (CONTACT.whatsapp) {
        open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(subject + "\n\n" + body)}`, "_blank");
      } else {
        location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      const msg = $(".form__msg", form);
      if (msg) msg.textContent = "شكراً لك! تم تجهيز رسالتك، وسيتواصل معك فريقنا قريباً.";
    });
  });
}

/* ---------- Reveal on scroll ---------- */
let revealObs;
function observeReveal() {
  if (!revealObs) {
    revealObs = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  }
  $$(".reveal:not(.in)").forEach((el) => revealObs.observe(el));
}

function initPageHero() {
  $$("[data-bg]").forEach((el) => (el.style.backgroundImage = bgOf(el.dataset.bg)));
}

/* ---------- Init ---------- */
renderHeader();
renderFooter();
initPageHero();
({
  home: () => { initHero(); renderHome(); },
  branches: renderBranches,
  tours: renderTours,
  destinations: renderDestinations,
  tour: renderTour,
  services: renderServices,
  about: renderAbout,
  contact: renderContact,
}[PAGE] || (() => {}))();
initForms();
observeReveal();
