/* global React, ReactDOM */
const { useState, useEffect, useRef, useLayoutEffect } = React;

/* ============== Photo URLs (Unsplash placeholders — заменить на студийную съёмку) ============== */
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2400&q=85",
  serviceTreat: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85",
  serviceImplant: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
  serviceAesthetic: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85",
  serviceDiag: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
  bentoLobby: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=1400&q=85",
  bentoOperatory: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=85",
  bentoSterile: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1800&q=85",
  bentoDetail: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=85",
  whyPhoto: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1200&q=85",
  bookBg: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=2000&q=80",
  doctor1: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=900&q=85",
  doctor2: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85",
  doctor3: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85",
};

/* ============== Telegram SVG ============== */
const TgIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.94 4.3c-.2-.18-.5-.25-.84-.16L2.78 11.4c-.5.2-.78.55-.78.93 0 .39.3.72.81.88l4.05 1.32 9.62-6.43c.18-.12.39-.05.45.12.06.17-.02.34-.18.46l-7.8 6.55-.3 4.32c.21 0 .3-.1.4-.2l1.94-1.83 4.02 2.96c.74.42 1.27.2 1.45-.68l2.62-12.36c.13-.61-.04-.95-.39-1.14z"/>
  </svg>
);

/* ============== Data ============== */
const SERVICE_TABS = [
  { id: "treat", label: "Лечение", count: 8, photo: PHOTOS.serviceTreat, kicker: "Терапия / Эндодонтия", title: "Точное лечение под микроскопом" },
  { id: "implant", label: "Имплантация", count: 5, photo: PHOTOS.serviceImplant, kicker: "Имплантация", title: "Восстановление улыбки за один визит" },
  { id: "aesthetic", label: "Эстетика", count: 6, photo: PHOTOS.serviceAesthetic, kicker: "Виниры · Отбеливание", title: "Искусство улыбки, выверенное до 0.1 мм" },
  { id: "diag", label: "Диагностика", count: 4, photo: PHOTOS.serviceDiag, kicker: "Diagnostics", title: "Цифровой подход с первого визита" },
];

const SERVICES = {
  treat: [
    { num: "01", title: "Лечение кариеса под микроскопом", desc: "Точная препарация без удаления здоровых тканей. Композит Estelite или Filtek Z550.", price: "25 000", tag: "Терапия" },
    { num: "02", title: "Эндодонтия каналов", desc: "Лечение пульпита и периодонтита с обтурацией каналов под микроскопом Carl Zeiss.", price: "48 000", tag: "Микроскоп" },
    { num: "03", title: "Профессиональная гигиена", desc: "AirFlow Master Piezon, ультразвук, реминерализация и фторирование за 60 минут.", price: "22 000", tag: "Профилактика" },
    { num: "04", title: "Лечение десен и пародонтита", desc: "Кюретаж, шинирование, Vector-терапия. Программа под наблюдением пародонтолога.", price: "32 000", tag: "Пародонтология" },
  ],
  implant: [
    { num: "01", title: "Имплантация Straumann BLX", desc: "Швейцарская система с пожизненной гарантией. Установка по 3D-шаблону за 40 минут.", price: "320 000", tag: "Switzerland" },
    { num: "02", title: "All-on-4 / All-on-6", desc: "Несъёмный протез на 4 или 6 имплантах за один визит. Полное восстановление челюсти.", price: "1 850 000", tag: "Под ключ" },
    { num: "03", title: "Костная пластика", desc: "Синус-лифтинг и аугментация для подготовки к имплантации в сложных случаях.", price: "120 000", tag: "Хирургия" },
    { num: "04", title: "Имплантация Osstem", desc: "Корейская система с 10-летней гарантией. Оптимальный баланс цены и качества.", price: "210 000", tag: "Korea" },
  ],
  aesthetic: [
    { num: "01", title: "Керамические виниры E.max", desc: "Реставрация улыбки за 2 визита. Подбор оттенка по шкале VITA Linearguide 3D-Master.", price: "180 000", tag: "Premium" },
    { num: "02", title: "Отбеливание ZOOM 4", desc: "Безопасное осветление на 6–8 тонов за один визит. Доступен домашний bleaching с каппами.", price: "85 000", tag: "Philips" },
    { num: "03", title: "Цельнокерамические коронки", desc: "Коронки CAD/CAM из диоксида циркония. Изготовление в собственной лаборатории.", price: "165 000", tag: "CAD/CAM" },
    { num: "04", title: "Digital Smile Design", desc: "3D-моделирование улыбки до начала лечения. Mock-up из временного материала для согласования.", price: "45 000", tag: "Digital" },
  ],
  diag: [
    { num: "01", title: "КТ 3D-диагностика", desc: "Конусно-лучевая томография Vatech PaX-i 3D. Минимальная доза, разрешение 75 микрон.", price: "12 000", tag: "Vatech" },
    { num: "02", title: "Консультация ортодонта", desc: "Диагностика прикуса, телерентгенограмма, план лечения с моделированием в ClinCheck.", price: "0", tag: "Бесплатно" },
    { num: "03", title: "Гнатологический анализ", desc: "Оценка ВНЧС, окклюзии и осанки. Шинотерапия и протокол лечения дисфункций.", price: "35 000", tag: "ВНЧС" },
    { num: "04", title: "Внутриротовое сканирование", desc: "Цифровой слепок 3Shape TRIOS. Без неприятных ощущений, точность ±20 микрон.", price: "8 000", tag: "3Shape" },
  ],
};

const DOCTORS = [
  { num: "01", photo: PHOTOS.doctor1, name: "Айгерим Суленова", spec: "Главный врач · Имплантолог", exp: "18", patients: "2 400", badge: "ITI Member" },
  { num: "02", photo: PHOTOS.doctor2, name: "Динара Касенова", spec: "Терапевт · Эндодонтист", exp: "9", patients: "1 200", badge: "ESE Certified" },
  { num: "03", photo: PHOTOS.doctor3, name: "Марат Бекмуратов", spec: "Ортопед · Эстетика", exp: "12", patients: "1 850", badge: "ESCD Active" },
];

const WHY_POINTS = [
  { n: "I", title: "Европейская сертификация врачей", desc: "ITI, EAO, ESCD — наши специалисты ежегодно проходят обучение в Цюрихе, Вене и Барселоне." },
  { n: "II", title: "Стерилизация по протоколу ISO 13485", desc: "Класс B автоклавы Melag, одноразовые расходники для каждого пациента, биоиндикаторы." },
  { n: "III", title: "Полностью цифровой workflow", desc: "Внутриротовой сканер 3Shape TRIOS, моделирование улыбки до начала любых процедур." },
  { n: "IV", title: "Прозрачная фиксированная цена", desc: "План лечения и смета подписываются до старта работ. Никаких доплат «по ходу»." },
  { n: "V", title: "Гарантия до 5 лет", desc: "На реставрации, протезирование и имплантацию. Без юридических уловок и звёздочек." },
];

const TESTIMONIALS = [
  { name: "Алия М.", sub: "Виниры E.max · 2025", quote: "Никогда не думала, что буду улыбаться на полные зубы. Айгерим сделала именно то, что я просила — естественно, без «голливудщины».", initials: "А", date: "2GIS · Март 2025" },
  { name: "Даурен К.", sub: "All-on-4 · 2025", quote: "За один день получил полный протез на верхней челюсти. Через две недели уже забыл, что у меня имплантация.", initials: "Д", date: "2GIS · Январь 2025" },
  { name: "Гульнара Т.", sub: "Эндодонтия · 2024", quote: "Сохранили зуб, который в другой клинике предложили удалить. Работа под микроскопом — это совсем другой уровень.", initials: "Г", date: "Instagram · Декабрь 2024" },
];

const SERVICES_OPTIONS = [
  "Консультация",
  "Лечение кариеса",
  "Имплантация",
  "Виниры",
  "Отбеливание",
  "Профгигиена",
  "Детская стоматология",
  "Ортодонтия",
];

const MARQUEE_PHRASES = [
  "Straumann Switzerland",
  "Carl Zeiss OPMI",
  "Sirona CEREC",
  "3Shape TRIOS",
  "Vatech PaX-i 3D",
  "ISO 13485",
  "ITI · EAO · ESCD",
  "E.max Press",
  "Melag Class B",
];

/* ============== Reveal hook ============== */
function useReveal() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll(".reveal, .reveal-mask, .reveal-fade, .reveal-scale");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !e.target.classList.contains("is-visible")) {
              const delay = parseInt(e.target.dataset.delay || "0", 10);
              setTimeout(() => e.target.classList.add("is-visible"), delay);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => {
        if (!el.classList.contains("is-visible")) io.observe(el);
      });
      // Force visible for above-the-fold elements
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        els.forEach((el) => {
          if (el.classList.contains("is-visible")) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.95 && r.bottom > 0) {
            const delay = parseInt(el.dataset.delay || "0", 10);
            setTimeout(() => el.classList.add("is-visible"), delay);
          }
        });
      });
      return io;
    };
    const io = observe();
    return () => io.disconnect();
  }, []);
}

/* ============== Header ============== */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["services", "doctors", "clinic", "why", "book", "contact"];
      let current = "hero";
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 240) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = [
    { id: "services", label: "Услуги" },
    { id: "doctors", label: "Врачи" },
    { id: "clinic", label: "Клиника" },
    { id: "why", label: "Почему мы" },
    { id: "contact", label: "Контакты" },
  ];

  return (
    <>
      <header className={"header" + (scrolled ? " is-scrolled" : "")}>
        <a href="#hero" className="header-pill header-pill-brand" aria-label="Suleimenov Dental Clinic">
          <img src="assets/logo.png" alt="" className="header-brand-mark" />
          <span className="header-brand-text">
            <span className="header-brand-name">SULEIMENOV</span>
            <span className="header-brand-sub">Dental Clinic</span>
          </span>
        </a>
        <nav className="header-pill header-pill-nav">
          {navItems.map((it) => (
            <a key={it.id} href={"#" + it.id} className={"nav-link" + (active === it.id ? " is-active" : "")}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="header-pill header-pill-actions">
          <a className="header-phone" href="tel:+77182000000">+7 718 200 00 00</a>
          <a className="header-tg" href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" aria-label="Telegram бот">
            <TgIcon />
          </a>
          <a className="header-cta" href="#book">
            <span className="header-cta-dot" />
            Записаться
          </a>
        </div>
        <button
          className={"header-burger" + (menuOpen ? " is-open" : "")}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <span />
        </button>
      </header>

      <div className={"mobile-menu" + (menuOpen ? " is-open" : "")}>
        <nav className="mobile-menu-nav">
          {navItems.map((it) => (
            <a key={it.id} href={"#" + it.id} onClick={() => setMenuOpen(false)}>
              {it.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a href="#book" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
            Записаться <span className="btn-arrow" />
          </a>
          <a href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" className="btn btn-ghost" onClick={() => setMenuOpen(false)}>
            Telegram-бот <span className="btn-arrow" />
          </a>
        </div>
        <div className="mobile-menu-contact">
          <a href="tel:+77182000000" className="mobile-menu-contact-row">
            <strong>Телефон</strong>
            +7 718 200 00 00
          </a>
          <div className="mobile-menu-contact-row">
            <strong>Адрес</strong>
            г. Экибастуз, ул. Ауэзова, 54
          </div>
          <div className="mobile-menu-contact-row">
            <strong>Часы</strong>
            Пн–Пт 09:00–19:00 · Сб 09:00–13:00
          </div>
        </div>
      </div>
    </>
  );
}

/* ============== Hero ============== */
function Hero({ heroVariant }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelector(".hero-photo").style.setProperty("--hero-img", `url(${PHOTOS.hero})`);
    requestAnimationFrame(() => el.classList.add("is-loaded"));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const photo = el.querySelector(".hero-photo");
      if (!photo) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        photo.style.transform = `scale(1.04) translateY(${y * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headings = {
    classic: <>Ваша улыбка <br /><em>наше призвание</em></>,
    minimal: <>Стоматология <br /><em>европейского</em> уровня</>,
    poetic: <>Точность хирурга. <br /><em>Чувство художника.</em></>,
  };

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero-photo" />
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-top-row">
          <div className="hero-chip reveal" data-delay="200">
            <span className="hero-chip-dot" />
            Принимаем сегодня · 9:00 — 19:00
          </div>
        </div>

        <div className="hero-main">
          <div className="hero-eyebrow reveal" data-delay="100">Премиальная стоматология · Экибастуз</div>
          <h1 className="hero-title reveal" data-delay="220">
            {headings[heroVariant] || headings.classic}
          </h1>

          <div className="hero-bottom-row">
            <p className="hero-sub reveal" data-delay="380">
              Частная клиника с европейским протоколом лечения, цифровой диагностикой и врачами, которым доверяют первые лица города.
            </p>
            <div className="hero-ctas reveal" data-delay="460">
              <a href="tel:+77182000000" className="hero-phone-link">
                <span>Регистратура</span>
                +7 718 200 00 00
              </a>
              <a className="btn btn-primary" href="#book">
                Записаться <span className="btn-arrow" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-trust">
          {[
            { num: "10+", label: "лет в Экибастузе" },
            { num: "3 000+", label: "довольных пациентов" },
            { num: "15", label: "врачей в штате" },
            { num: "98%", label: "возвращаются повторно" },
          ].map((it, i) => (
            <div key={i} className="hero-trust-item reveal" data-delay={600 + i * 80}>
              <div className="hero-trust-num">{it.num}</div>
              <div className="hero-trust-label">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Marquee ============== */
function Marquee() {
  const items = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((p, i) => (
          <span key={i} className="marquee-item">{p}</span>
        ))}
      </div>
    </div>
  );
}

/* ============== Services ============== */
function Services() {
  const [tab, setTab] = useState("treat");
  const activeTab = SERVICE_TABS.find(t => t.id === tab);
  const items = SERVICES[tab] || [];

  return (
    <section className="section section-cream" id="services">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="section-title">Лечение, в которое <em>хочется</em> возвращаться</h2>
          </div>
          <p className="section-lead">
            Полный спектр стоматологических процедур. Цены фиксируются в плане лечения до начала работ и не меняются по ходу.
          </p>
        </div>

        <div className="services-shell">
          <div className="services-photo-wrap reveal-scale">
            <div className="services-photo" style={{ backgroundImage: `url(${activeTab.photo})` }} key={tab} />
            <div className="services-photo-overlay" />
            <div className="services-photo-label-count">{String(activeTab.count).padStart(2, "0")} процедур</div>
            <div className="services-photo-label">
              <div className="services-photo-label-kicker">{activeTab.kicker}</div>
              <div className="services-photo-label-title">{activeTab.title}</div>
            </div>
          </div>

          <div className="services-list-shell">
            <div className="services-tabs reveal">
              {SERVICE_TABS.map((t) => (
                <button key={t.id} className={"services-tab" + (tab === t.id ? " is-active" : "")} onClick={() => setTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            <div className="services-list" key={tab}>
              {items.map((s) => (
                <a href="#book" key={s.num} className="service-row">
                  <div className="service-row-num">— {s.num}</div>
                  <div className="service-row-main">
                    <div className="service-row-title">{s.title}</div>
                    <div className="service-row-desc">{s.desc}</div>
                  </div>
                  <div className="service-row-right">
                    <div className="service-row-price">
                      {s.price === "0" ? "Бесплатно" : (
                        <React.Fragment>
                          <span className="service-row-price-from">от</span>
                          {s.price} ₸
                        </React.Fragment>
                      )}
                    </div>
                    <div className="service-row-tag">{s.tag}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="services-foot">
              <div className="services-foot-note">
                Все цены указаны без скрытых платежей. Финальная стоимость фиксируется после консультации и диагностики.
              </div>
              <a href="#book" className="btn btn-ink">Полный прайс-лист <span className="btn-arrow" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Doctors ============== */
function Doctors() {
  return (
    <section className="section section-white" id="doctors">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="section-title">Врачи, которые ведут <em>всю семью</em></h2>
          </div>
          <p className="section-lead">
            У каждого специалиста — узкая профильная сертификация и опыт работы не менее 7 лет. Без универсалов «и швец, и жнец».
          </p>
        </div>
        <div className="doctors-grid">
          {DOCTORS.map((d, i) => (
            <a key={d.name} href="#book" className={`doctor-card doctor-card-${i+1} reveal`} data-delay={i * 120}>
              <div className="doctor-photo" style={{ backgroundImage: `url(${d.photo})` }} />
              <div className="doctor-overlay" />
              <div className="doctor-badge">
                <span className="doctor-badge-dot" /> {d.badge}
              </div>
              <div className="doctor-number">№ {d.num}</div>
              <div className="doctor-info">
                <div className="doctor-name">{d.name}</div>
                <div className="doctor-spec">{d.spec}</div>
                <div className="doctor-foot">
                  <div className="doctor-stat">
                    <span className="doctor-stat-num">{d.exp}<em>+</em></span>
                    <span className="doctor-stat-label">лет стажа</span>
                  </div>
                  <div className="doctor-stat" style={{ alignItems: "flex-end" }}>
                    <span className="doctor-stat-num">{d.patients}<em>+</em></span>
                    <span className="doctor-stat-label">пациентов</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Clinic ============== */
const CLINIC_TILES = [
  {
    id: "ct-3d",
    layout: "t-fact-tall",
    kicker: "Технология",
    title: "КТ Vatech PaX-i 3D",
    short: "Конусно-лучевая томография с минимальной лучевой нагрузкой.",
    photo: PHOTOS.bentoLobby,
    num: "3D",
    modal: {
      tag: "Диагностика",
      kicker: "Технология · 01",
      title: "3D-томография Vatech PaX-i",
      desc: "Конусно-лучевой компьютерный томограф нового поколения. Высокое разрешение (75 микрон) при минимальной лучевой нагрузке — в 10 раз ниже спирального КТ. Снимок занимает 8 секунд, а трёхмерное изображение челюстей и придаточных пазух выводится на монитор сразу после сканирования. Используется для имплантологии, эндодонтии, ортодонтии и оценки состояния ВНЧС.",
      specs: [
        ["Производитель", "Vatech, Южная Корея"],
        ["Разрешение", "75 микрон"],
        ["Время снимка", "8 секунд"],
        ["Лучевая нагрузка", "до 10× ниже спирального КТ"],
      ],
    },
  },
  {
    id: "ct-lobby",
    layout: "t-photo",
    kicker: "Интерьер",
    title: "Reception",
    short: "Атмосфера бутик-клиники в центре города.",
    photo: PHOTOS.bentoLobby,
    modal: {
      tag: "Интерьер",
      kicker: "Reception · Lobby",
      title: "Reception · Зона ожидания",
      desc: "Просторная зона ожидания с натуральными материалами, естественным светом и приглушённой музыкой. Без больничной стерильности — атмосфера ближе к бутик-отелю, чем к классической клинике. Кофе, чай и Wi-Fi, индивидуальная гардеробная, отдельная детская зона с книгами и тихими играми.",
      specs: [
        ["Площадь", "120 м²"],
        ["Дизайн", "MAD Architects, 2023"],
        ["Особенности", "Детская зона, кофе-бар, Wi-Fi"],
        ["Время ожидания", "В среднем 3–7 минут"],
      ],
    },
  },
  {
    id: "ct-op",
    layout: "t-photo",
    kicker: "Кабинет",
    title: "Хирургический блок",
    short: "Стерильная операционная для имплантации и сложной хирургии.",
    photo: PHOTOS.bentoOperatory,
    modal: {
      tag: "Хирургия",
      kicker: "Операционная · 04",
      title: "Хирургический блок",
      desc: "Отдельно расположенный хирургический блок с двойной фильтрацией воздуха, ламинарным потоком и автономным стерилизационным узлом. Установка имплантов проводится по 3D-шаблону, что исключает ошибки позиционирования. Подаётся кислород и закись азота для седации, доступна полная анестезиологическая поддержка.",
      specs: [
        ["Площадь", "32 м²"],
        ["Фильтрация воздуха", "HEPA H13 + ламинар"],
        ["Седация", "Кислород, закись азота, в/в"],
        ["Оборудование", "W&H Implantmed, Straumann"],
      ],
    },
  },
  {
    id: "ct-iso",
    layout: "t-fact",
    kicker: "Стерилизация",
    title: "ISO 13485",
    short: "Полный цикл DIN EN 13060, биоиндикаторы каждую смену.",
    photo: PHOTOS.bentoSterile,
    modal: {
      tag: "Безопасность",
      kicker: "Стерилизация · Class B",
      title: "Стерилизация по протоколу ISO 13485",
      desc: "Полный цикл стерилизации проходит в отдельном помещении с зонированием «грязная–чистая–стерильная». Используются автоклавы класса B Melag Vacuklav, прошедшие сертификацию DIN EN 13060. Каждая смена начинается с биологического теста (Bowie & Dick), результаты подшиваются в журнал. Все инструменты упакованы индивидуально, дата вскрытия фиксируется.",
      specs: [
        ["Класс автоклава", "B (DIN EN 13060)"],
        ["Производитель", "Melag, Германия"],
        ["Контроль", "Биоиндикаторы каждую смену"],
        ["Расходники", "Одноразовые, индивидуальная упаковка"],
      ],
    },
  },
  {
    id: "ct-brands",
    layout: "t-fact-wide",
    kicker: "Партнёры",
    title: "Sirona · Straumann · 3Shape · Carl Zeiss",
    short: "Немецкая и швейцарская техника. CAD/CAM-лаборатория на месте.",
    photo: PHOTOS.bentoDetail,
    modal: {
      tag: "Технологии",
      kicker: "Партнёры · Оборудование",
      title: "Только проверенные мировые бренды",
      desc: "Мы не экономим на оборудовании и расходниках. Имплантационные системы — швейцарские Straumann (пожизненная гарантия) и Osstem. Микроскопы — Carl Zeiss OPMI. Сканеры — 3Shape TRIOS 5. CAD/CAM-станок Sirona inLab для изготовления коронок и виниров в собственной лаборатории за один визит. Композиты Estelite, Filtek и SDR — материалы первого выбора в США и ЕС.",
      specs: [
        ["Имплантация", "Straumann BLX (Швейцария), Osstem (Корея)"],
        ["Микроскоп", "Carl Zeiss OPMI Pico, увеличение ×40"],
        ["Сканер", "3Shape TRIOS 5 (Дания)"],
        ["CAD/CAM", "Sirona inLab MC X5 (Германия)"],
      ],
    },
  },
  {
    id: "ct-sterile",
    layout: "t-photo-wide",
    kicker: "Стерилизация · Class B",
    title: "Автоклавы Melag · контроль биоиндикаторами",
    short: "Отдельный стерилизационный узел с зонированием.",
    photo: PHOTOS.bentoSterile,
    modal: {
      tag: "Безопасность",
      kicker: "Стерилизационный узел",
      title: "Стерилизационная — отдельный блок",
      desc: "Стерилизационная вынесена в отдельное помещение с входом из служебной зоны. Полное физическое зонирование «грязная–чистая–стерильная» исключает перекрёстное загрязнение. Все этапы — приём, мойка, упаковка, стерилизация, хранение — задокументированы и доступны пациенту по запросу.",
      specs: [
        ["Зонирование", "3 зоны с физическим разделением"],
        ["Автоклавы", "Melag Vacuklav 41-B, 31-B"],
        ["УЗ-мойка", "Melag MELAtronic 23"],
        ["Журнал стерилизации", "Доступен пациенту по запросу"],
      ],
    },
  },
  {
    id: "ct-detail",
    layout: "t-photo-square",
    kicker: "Детали",
    title: "Малые формы",
    short: "Авторский интерьер, текстуры, освещение.",
    photo: PHOTOS.bentoDetail,
    modal: {
      tag: "Дизайн",
      kicker: "Атмосфера",
      title: "Внимание к деталям",
      desc: "Каждый элемент — от ручек на дверях до подсветки кабинета — подбирался индивидуально. Тёплый свет (3000K) вместо холодного флуоресцентного. Натуральный дуб, итальянский мрамор, тактильные текстуры. Цель — чтобы пациент с первой минуты чувствовал себя гостем, а не клиентом.",
      specs: [
        ["Архитектура", "MAD Architects, Алматы"],
        ["Освещение", "Тёплый свет 3000K, регулируемый"],
        ["Материалы", "Дуб, итальянский мрамор, латунь"],
      ],
    },
  },
  {
    id: "ct-microscope",
    layout: "t-fact",
    kicker: "Микроскоп",
    title: "Carl Zeiss · ×40",
    short: "Точная работа под микроскопом в эндодонтии и реставрации.",
    photo: PHOTOS.bentoOperatory,
    num: "×40",
    modal: {
      tag: "Технология",
      kicker: "Оптика · Carl Zeiss",
      title: "Стоматологический микроскоп Carl Zeiss",
      desc: "Микроскоп с увеличением до 40 крат используется в эндодонтии (лечение каналов), реставрационной стоматологии и микрохирургии. Позволяет работать с точностью до микрона — найти и пройти даже сильно искривлённый канал, удалить старую пломбу без задевания здоровой ткани, диагностировать микротрещины невидимые невооружённым глазом.",
      specs: [
        ["Производитель", "Carl Zeiss, Германия"],
        ["Увеличение", "до ×40 (5 ступеней)"],
        ["Освещение", "LED 100 000 люкс"],
        ["Применение", "Эндодонтия, реставрация, микрохирургия"],
      ],
    },
  },
];

function Clinic({ onTileClick }) {
  return (
    <section className="section section-dark" id="clinic">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="section-title">Клиника, оборудованная <em>как лаборатория</em></h2>
          </div>
          <p className="section-lead">
            800 м² пространства, 6 операционных кабинетов, собственная зуботехническая лаборатория и стерилизационный блок класса B. Нажмите на любую плитку, чтобы узнать подробности.
          </p>
        </div>
        <div className="bento">
          {CLINIC_TILES.map((tile, i) => {
            const isPhoto = tile.layout.startsWith("t-photo");
            return (
              <button
                key={tile.id}
                className={`bento-tile ${tile.layout} reveal`}
                data-delay={i * 60}
                onClick={() => onTileClick({ ...tile.modal, photo: tile.photo })}
                aria-label={`Открыть ${tile.title}`}
              >
                {isPhoto && (
                  <React.Fragment>
                    <div className="bento-photo" style={{ backgroundImage: `url(${tile.photo})` }} />
                    <div className="bento-photo-gradient" />
                    <div className="bento-photo-label">
                      <div className="bento-kicker">{tile.kicker}</div>
                      <div className="bento-title" style={{ marginTop: 10 }}>{tile.title}</div>
                    </div>
                  </React.Fragment>
                )}
                {!isPhoto && (
                  <React.Fragment>
                    <div className="bento-kicker">{tile.kicker}</div>
                    <div>
                      {tile.num && <div className="bento-num">{tile.num}</div>}
                      <div className="bento-title">{tile.title}</div>
                      {tile.short && <p className="bento-desc">{tile.short}</p>}
                    </div>
                  </React.Fragment>
                )}
                <span className="bento-tile-zoom" aria-hidden="true">+</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== Modal ============== */
function Modal({ data, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    if (data) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [data, onClose]);

  return (
    <div className={"modal-backdrop" + (data ? " is-open" : "")} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрыть">✕</button>
        {data && (
          <React.Fragment>
            <div className="modal-photo" style={{ backgroundImage: `url(${data.photo})` }}>
              <div className="modal-photo-overlay" />
              <div className="modal-photo-tag">{data.tag}</div>
            </div>
            <div className="modal-body">
              <div className="modal-kicker">{data.kicker}</div>
              <h3 className="modal-title">{data.title}</h3>
              <p className="modal-desc">{data.desc}</p>
              {data.specs && (
                <div className="modal-specs">
                  {data.specs.map(([label, value]) => (
                    <div className="modal-spec" key={label}>
                      <div className="modal-spec-label">{label}</div>
                      <div className="modal-spec-value">{value}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="modal-foot">
                <div className="modal-foot-text">Хотите увидеть лично? Выберите удобный канал записи — ответим в течение 15 минут.</div>
                <div className="modal-actions">
                  <a href="tel:+77182000000" className="modal-action" onClick={onClose}>
                    <span className="modal-action-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                    </span>
                    <span className="modal-action-text">
                      <span className="modal-action-label">Позвонить</span>
                      <span className="modal-action-value">+7 718 200 00 00</span>
                    </span>
                    <span className="modal-action-arrow">→</span>
                  </a>
                  <a href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" className="modal-action">
                    <span className="modal-action-icon"><TgIcon /></span>
                    <span className="modal-action-text">
                      <span className="modal-action-label">Telegram-бот</span>
                      <span className="modal-action-value">Запись за 1 минуту</span>
                    </span>
                    <span className="modal-action-arrow">→</span>
                  </a>
                  <a href="#book" className="modal-action modal-action-primary" onClick={onClose}>
                    Записаться через форму <span className="btn-arrow" />
                  </a>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

/* ============== Why us ============== */
function WhyUs() {
  return (
    <section className="section section-white why-section" id="why">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="section-title">Почему пациенты <em>выбирают нас</em></h2>
          </div>
          <p className="section-lead">
            Пять причин, по которым люди едут в SDC даже из Павлодара, Караганды и Астаны.
          </p>
        </div>
        <div className="why-grid">
          <div className="why-photo-shell reveal-scale">
            <div className="why-photo" style={{ backgroundImage: `url(${PHOTOS.whyPhoto})` }} />
            <div className="why-photo-tag">
              <div className="why-photo-tag-eyebrow">Доктор медицины · ITI</div>
              <div className="why-photo-tag-text">«Стандарт, которым мы&nbsp;руководствуемся, — это работа, которую мы&nbsp;готовы повторить на себе».</div>
            </div>
          </div>
          <div className="why-points">
            {WHY_POINTS.map((p, i) => (
              <div key={p.n} className="why-point reveal" data-delay={i * 100}>
                <div className="why-icon">{p.n}</div>
                <div>
                  <div className="why-point-title">{p.title}</div>
                  <div className="why-point-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Testimonials ============== */
function Testimonials() {
  return (
    <section className="section section-cream">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <h2 className="section-title">О нас <em>говорят</em></h2>
          </div>
          <p className="section-lead">
            Реальные отзывы пациентов из 2GIS, Google Maps и Instagram. Без накруток и редакции.
          </p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className="testimonial reveal" data-delay={i * 100}>
              <div className="testimonial-head">
                <div className="testimonial-stars">
                  {[0,1,2,3,4].map(s => <span key={s}>★</span>)}
                </div>
                <div className="testimonial-date">{t.date}</div>
              </div>
              <p className="testimonial-quote">«{t.quote}»</p>
              <div className="testimonial-meta">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-sub">{t.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Booking ============== */
function BookingForm() {
  const [data, setData] = useState({ name: "", phone: "", service: SERVICES_OPTIONS[0], time: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    setSubmitted(true);
  };
  const reset = () => { setSubmitted(false); setData({ name: "", phone: "", service: SERVICES_OPTIONS[0], time: "" }); };

  return (
    <section className="section book-section" id="book">
      <div className="book-bg" style={{ backgroundImage: `url(${PHOTOS.bookBg})` }} />
      <div className="container">
        <div className="book-grid">
          <div className="book-aside reveal">
            <h2 className="section-title">Запишитесь <em>в один клик</em></h2>
            <p className="section-lead" style={{ marginTop: 28, color: "rgba(255,255,255,0.7)" }}>
              Оставьте номер — администратор перезвонит в течение 15 минут, подберёт удобное время и врача.
            </p>

            <div className="book-aside-divider" />

            <div className="book-detail">
              <div className="book-detail-label">Адрес</div>
              <div className="book-detail-value">г. Экибастуз<br />ул. Ауэзова, 54</div>
            </div>
            <div className="book-detail">
              <div className="book-detail-label">Часы работы</div>
              <div className="book-detail-value">Пн–Пт · 09:00 — 19:00<br />Сб · 09:00 — 13:00</div>
            </div>
            <div className="book-detail">
              <div className="book-detail-label">WhatsApp</div>
              <div className="book-detail-value"><a href="tel:+77182000000">+7 (718) 200-00-00</a></div>
            </div>

            <a href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" className="book-tg-cta">
              <div className="book-tg-icon"><TgIcon /></div>
              <div className="book-tg-text">
                <div className="book-tg-title">Запись через Telegram-бота</div>
                <div className="book-tg-sub">Выберите врача и время в чате · ответ за 1 минуту</div>
              </div>
              <span className="book-tg-arrow">→</span>
            </a>
          </div>

          <form className="book-form reveal" data-delay="120" onSubmit={onSubmit}>
            {submitted ? (
              <div className="book-success">
                <div className="book-success-tick">✓</div>
                <h3 className="book-success-title">Заявка принята</h3>
                <p className="book-success-text">Администратор свяжется с вами в течение 15 минут по номеру {data.phone || "—"}.</p>
                <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>Новая заявка</button>
              </div>
            ) : (
              <React.Fragment>
                <div className="book-form-head">
                  <div className="book-form-title">Форма записи</div>
                  <div className="book-form-sub">Поля защищены и не передаются третьим лицам. Без спама и навязчивых звонков.</div>
                </div>
                <div className="field-row">
                  <div className="field" style={{ marginBottom: 0 }}>
                    <label>Ваше имя</label>
                    <input type="text" placeholder="Как к вам обращаться?" value={data.name} onChange={onChange("name")} required />
                  </div>
                  <div className="field" style={{ marginBottom: 0 }}>
                    <label>Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" value={data.phone} onChange={onChange("phone")} required />
                  </div>
                </div>
                <div className="field">
                  <label>Услуга</label>
                  <select value={data.service} onChange={onChange("service")}>
                    {SERVICES_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Желаемое время (необязательно)</label>
                  <input type="text" placeholder="например, завтра после 17:00" value={data.time} onChange={onChange("time")} />
                </div>
                <div className="book-foot">
                  <p className="book-note">Ответим в течение 15 минут в рабочее время. Нажимая кнопку, вы соглашаетесь с обработкой данных.</p>
                  <button type="submit" className="btn btn-primary">
                    Отправить заявку <span className="btn-arrow" />
                  </button>
                </div>
              </React.Fragment>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============== CTA banner ============== */
function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-banner-bg">improve.</div>
      <div className="container cta-banner-inner">
        <h2 className="reveal">Готовы к <em>первому визиту?</em></h2>
        <div className="cta-banner-right reveal" data-delay="120">
          <p className="cta-banner-text">
            Первичная консультация с диагностикой и планом лечения — бесплатно для новых пациентов до конца месяца.
          </p>
          <div className="cta-banner-btns">
            <a href="#book" className="btn btn-primary">Записаться <span className="btn-arrow" /></a>
            <a href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" className="btn btn-ghost">
              Telegram-бот <span className="btn-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Footer ============== */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-bg" />
      <div className="container">
        <div className="footer-top">
          <div className="reveal">
            <a href="#hero" className="footer-brand">
              <img src="assets/logo.png" alt="" className="footer-brand-mark" />
              <span className="footer-brand-text">
                <span className="footer-brand-name">SULEIMENOV</span>
                <span className="footer-brand-sub">Dental Clinic</span>
              </span>
            </a>
            <div className="footer-tagline">
              Частная стоматология <em>европейского уровня</em>.<br />Экибастуз, с 2015 года.
            </div>
          </div>
          <div className="footer-top-right reveal" data-delay="120">
            <a href="tel:+77182000000" className="footer-phone-block">
              <span className="footer-phone-label">Регистратура</span>
              <span className="footer-phone">+7 718 200 00 00</span>
            </a>
            <div className="footer-hours">
              Пн–Пт · 09:00 — 19:00<br />
              Сб · 09:00 — 13:00 · Вс выходной
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col reveal">
            <h4>Услуги</h4>
            <ul>
              <li><a href="#services">Лечение и терапия</a></li>
              <li><a href="#services">Имплантация Straumann</a></li>
              <li><a href="#services">Эстетика и виниры</a></li>
              <li><a href="#services">Цифровая диагностика</a></li>
              <li><a href="#services">Детская стоматология</a></li>
            </ul>
          </div>
          <div className="footer-col reveal" data-delay="80">
            <h4>Клиника</h4>
            <ul>
              <li><a href="#doctors">Врачи</a></li>
              <li><a href="#clinic">Оборудование</a></li>
              <li><a href="#why">Гарантии</a></li>
              <li><a href="#book">Запись онлайн</a></li>
              <li><a href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener">Telegram-бот</a></li>
            </ul>
          </div>
          <div className="footer-col reveal" data-delay="160">
            <h4>Связь</h4>
            <ul>
              <li><a href="tel:+77182000000">+7 718 200 00 00</a></li>
              <li><a href="mailto:hello@sdc.kz">hello@sdc.kz</a></li>
              <li><a href="#">Instagram · @sdc.kz</a></li>
              <li><a href="#">2GIS · Suleimenov</a></li>
              <li><a href="#">Подарочные сертификаты</a></li>
            </ul>
            <div className="footer-socials">
              <a className="footer-social" href="#" aria-label="Instagram">IG</a>
              <a className="footer-social" href="https://t.me/sdcclinic_bot" target="_blank" rel="noopener" aria-label="Telegram">
                <TgIcon style={{width: 14, height: 14}} />
              </a>
              <a className="footer-social" href="#" aria-label="WhatsApp">WA</a>
              <a className="footer-social" href="#" aria-label="2GIS">2G</a>
            </div>
          </div>
          <div className="footer-col reveal" data-delay="240">
            <h4>Найти нас</h4>
            <div className="footer-map">
              <div className="footer-map-grid" />
              <div className="footer-map-road" />
              <div className="footer-map-pin">
                <div className="footer-map-pin-dot" />
                <div className="footer-map-pin-label">SDC</div>
              </div>
              <div className="footer-map-address">
                <div className="footer-map-address-text">
                  <span className="footer-map-address-label">Адрес</span>
                  <span className="footer-map-address-value">ул. Ауэзова, 54</span>
                </div>
                <a className="footer-map-address-link" href="#">2GIS →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 Suleimenov Dental Clinic. Все права защищены.</div>
          <div className="footer-bottom-links">
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Договор оферты</a>
            <a href="#">Лицензии</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============== Tweaks defaults ============== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#C9A96E",
  "heroVariant": "classic",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [modalData, setModalData] = useState(null);

  useReveal();

  useEffect(() => {
    document.documentElement.style.setProperty("--gold", t.accent);
  }, [t.accent]);

  useEffect(() => {
    if (t.density === "compact") {
      document.documentElement.style.setProperty("--container", "1180px");
    } else if (t.density === "wide") {
      document.documentElement.style.setProperty("--container", "1440px");
    } else {
      document.documentElement.style.setProperty("--container", "1320px");
    }
  }, [t.density]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;
  const TweakColor = window.TweakColor;

  return (
    <React.Fragment>
      <Header />
      <Hero heroVariant={t.heroVariant} />
      <Services />
      <Doctors />
      <Clinic onTileClick={setModalData} />
      <WhyUs />
      <Testimonials />
      <BookingForm />
      <Footer />
      <Modal data={modalData} onClose={() => setModalData(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Брендинг" />
        <TweakColor
          label="Акцент"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#C9A96E", "#B08A3E", "#A87C4F", "#7E6B4F", "#4F6D7A"]}
        />
        <TweakSection label="Hero-заголовок" />
        <TweakRadio
          label="Вариант"
          value={t.heroVariant}
          onChange={(v) => setTweak("heroVariant", v)}
          options={[
            { value: "classic", label: "Призвание" },
            { value: "minimal", label: "Европа" },
            { value: "poetic", label: "Точность" },
          ]}
        />
        <TweakSection label="Плотность" />
        <TweakRadio
          label="Сетка"
          value={t.density}
          onChange={(v) => setTweak("density", v)}
          options={[
            { value: "compact", label: "Узко" },
            { value: "regular", label: "Базово" },
            { value: "wide", label: "Широко" },
          ]}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
