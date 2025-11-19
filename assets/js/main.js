
(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  $('#year').textContent = new Date().getFullYear();

  
  const root = document.documentElement;
  const themeToggle = $('#themeToggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply stored theme (if any)
  if (storedTheme === 'dark') root.setAttribute('data-theme', 'dark');
  if (storedTheme === 'light') root.removeAttribute('data-theme');

  const sunSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.76 4.84L5.34 3.43 3.93 4.84l1.41 1.41 1.42-1.41zm10.48 0l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41zM12 2.5c.41 0 .75.34.75.75v2a.75.75 0 01-1.5 0v-2c0-.41.34-.75.75-.75zM2.5 12c0-.41.34-.75.75-.75h2a.75.75 0 010 1.5h-2A.75.75 0 012.5 12zm15.5 0c0-.41.34-.75.75-.75h2a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75zM6.76 19.16l-1.42 1.41-1.41-1.41 1.41-1.41 1.42 1.41zm10.48 0l1.41 1.41 1.41-1.41-1.41-1.41-1.41 1.41zM12 18a6 6 0 110-12 6 6 0 010 12zm0 3.5c.41 0 .75-.34.75-.75v-2a.75.75 0 10-1.5 0v2c0 .41.34.75.75.75z"/></svg>';
  const moonSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.354 15.354A8.5 8.5 0 0110.146 3.646 8.001 8.001 0 1020.354 15.354z"/></svg>';

  function isDarkTheme() {
    const attr = root.getAttribute('data-theme');
    if (attr) return attr === 'dark';
    return prefersDark; // fall back to system preference
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const dark = isDarkTheme();
    themeToggle.innerHTML = dark ? moonSVG : sunSVG; // show icon of current theme
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('title', dark ? 'Mod întunecat' : 'Mod luminos');
  }

  updateThemeIcon();

  themeToggle?.addEventListener('click', () => {
    const dark = isDarkTheme();
    if (dark) {
      // switch to light
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      // switch to dark
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
    // small icon animation
    themeToggle.classList.add('icon-animate');
    setTimeout(() => themeToggle.classList.remove('icon-animate'), 220);
  });

  const navToggle = $('.nav-toggle');
  const header = $('.navbar');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    header.classList.toggle('nav-open');
  });
  // Close mobile menu when clicking a link
  $$('.nav-link').forEach(a => a.addEventListener('click', () => {
    header.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const hrefEndsWith = (a, end) => a.getAttribute('href')?.endsWith(end);
  const path = location.pathname.replace(/\\/g, '/');
  let file = path.split('/').pop() || 'index.html';
  if (!/\.html?$/.test(file)) file = 'index.html';
  const setActiveNav = () => {
    $$('.nav a').forEach(a => {
      const isActive = hrefEndsWith(a, file);
      a.classList.toggle('active', isActive);
      if (isActive) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  };
  setActiveNav();

  const searchInput = $('#searchInput');
  const chips = $$('.chip');
  const cards = $$('#destGrid .card');
  const tableRows = $$('#attractionsTable tr');
  const searchStatus = $('#searchStatus');
  const noResults = $('.no-results');

  let chipFilter = 'all';
  function matchesFilter(text, tags) {
    const q = (searchInput.value || '').trim().toLowerCase();
    const tagHit = chipFilter === 'all' || tags.includes(chipFilter);
    const textHit = !q || text.includes(q);
    return tagHit && textHit;
  }

  function applyFilter() {
    let visibleCount = 0;
    // Cards
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const text = ((card.dataset.name || '') + ' ' + tags).toLowerCase();
      const show = matchesFilter(text, tags);
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Table rows
    let visibleRows = 0;
    tableRows.forEach(tr => {
      const tags = (tr.dataset.tags || '').toLowerCase();
      const text = ((tr.dataset.name || '') + ' ' + tags + ' ' + tr.textContent).toLowerCase();
      const show = matchesFilter(text, tags);
      tr.style.display = show ? '' : 'none';
      if (show) visibleRows++;
    });

    const q = (searchInput?.value || '').trim();
    if (searchStatus) {
      const parts = [`${visibleCount} destinații`];
      if (tableRows.length) parts.push(`${visibleRows} în tabel`);
      searchStatus.textContent = q || chipFilter !== 'all' ? `Rezultate: ${parts.join(', ')}` : '';
    }
    if (noResults) {
      noResults.hidden = (visibleCount + visibleRows) > 0;
    }
  }

  searchInput?.addEventListener('input', applyFilter);
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    chipFilter = ch.dataset.filter || 'all';
    applyFilter();
  }));
  // If page has search or chips, initialize filter once to set statuses
  if (searchInput || chips.length) applyFilter();

  // Optional: read q param if present (supports manual linking like destinatii.html?q=Brasov)
  try {
    const params = new URLSearchParams(location.search);
    const qParam = params.get('q');
    if (qParam && searchInput) {
      searchInput.value = qParam;
      applyFilter();
    }
  } catch { }

  const slidesWrap = $('#carouselSlides');
  const slides = $$('#carouselSlides .slide');
  const prevBtn = $('.carousel-btn.prev');
  const nextBtn = $('.carousel-btn.next');
  const dotsWrap = $('.carousel .dots');
  let idx = 0; let timer;

  function renderDots() {
    dotsWrap.innerHTML = slides.map((_, i) => `<button aria-label="Slide ${i + 1}"></button>`).join('');
    updateDots();
    $$('.dots button', dotsWrap).forEach((b, i) => b.addEventListener('click', () => goTo(i)));
  }
  function updateDots() {
    $$('.dots button', dotsWrap).forEach((b, i) => b.classList.toggle('active', i === idx));
  }
  function goTo(i) {
    slides[idx].classList.remove('is-active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('is-active');
    updateDots();
  }
  function next() { goTo(idx + 1); }
  function prev() { goTo(idx - 1); }
  function startAuto() { stopAuto(); timer = setInterval(next, 5000); }
  function stopAuto() { if (timer) clearInterval(timer); }

  if (slides.length) {
    renderDots();
    startAuto();
    nextBtn?.addEventListener('click', () => { next(); startAuto(); });
    prevBtn?.addEventListener('click', () => { prev(); startAuto(); });
    slidesWrap?.addEventListener('mouseenter', stopAuto);
    slidesWrap?.addEventListener('mouseleave', startAuto);
  }

  const form = $('#contactForm');
  const status = $('#formStatus');

  function setError(input, message) {
    const field = input.closest('.form-field');
    const small = field?.querySelector('.error');
    if (small) small.textContent = message || '';
  }
  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
  }
  function validatePhone(val) {
    // Romanian mobile: 07xxxxxxxx or +407xxxxxxxx
    return /^(?:\+?40|0)7\d{8}$/.test(val.replace(/\s|-/g, ''));
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = $('#name');
    const email = $('#email');
    const phone = $('#phone');
    const topic = $('#topic');
    const message = $('#message');

    setError(name, ''); setError(email, ''); setError(phone, ''); setError(topic, ''); setError(message, '');

    if (!name.value.trim()) { setError(name, 'Introduceți numele.'); valid = false; }
    if (!validateEmail(email.value)) { setError(email, 'Email invalid.'); valid = false; }
    if (!validatePhone(phone.value)) { setError(phone, 'Telefon invalid (ex: 07xxxxxxxx sau +407xxxxxxxx).'); valid = false; }
    if (!topic.value) { setError(topic, 'Alegeți un subiect.'); valid = false; }
    if (message.value.trim().length < 10) { setError(message, 'Mesajul trebuie să aibă minim 10 caractere.'); valid = false; }

    if (!valid) { status.textContent = 'Verificați câmpurile marcate.'; return; }

    status.textContent = 'Mulțumim! Mesajul a fost trimis.';
    form.reset();
  });

  const helpBtn = $('#helpBtn');
  const helpModal = $('#helpModal');
  helpBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    helpModal?.showModal();
  });

  $('#scrollUp')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  $('#scrollDown')?.addEventListener('click', () => {
    const bottom = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    window.scrollTo({ top: bottom, behavior: 'smooth' });
  });

  const mapFrame = $('#mapFrame');
  const mapChips = $$('.map-chip');
  function mapSrcFor(q) {
    if (!q) q = 'Romania';
    const query = encodeURIComponent(q + ', Romania');
    // Zoom: 10 for cities/areas, 6 for country (we'll let Google adjust)
    return `https://www.google.com/maps?&q=${query}&output=embed`;
  }
  mapChips.forEach(ch => ch.addEventListener('click', () => {
    mapChips.forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    const q = ch.dataset.q;
    if (mapFrame) mapFrame.src = mapSrcFor(q);
  }));

  // (Weather widget removed; original code restored.)

})();
