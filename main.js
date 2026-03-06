// ==================== ADMIN DATA LOADER ====================
// Load saved data from localStorage (set via /admin panel)
function loadAdminData() {
  // Load portfolio images - dynamically create gallery items
  const savedPhotos = localStorage.getItem("admin_portfolio_photos");
  if (savedPhotos) {
    try {
      const photos = JSON.parse(savedPhotos);
      const track = document.querySelector(".scroll-gallery__track");
      if (track && photos.length > 0) {
        // Clear existing items and rebuild from saved data
        track.innerHTML = "";
        photos.forEach((photo) => {
          const item = document.createElement("div");
          item.className = "scroll-gallery__item";
          item.dataset.category = photo.category.toLowerCase();
          item.innerHTML = `
            <div class="scroll-gallery__item-inner">
              <img src="${photo.url}" alt="${photo.alt || 'Photo'}" />
              <div class="scroll-gallery__item-label">
                <span>${photo.category}</span>
              </div>
            </div>
          `;
          track.appendChild(item);
        });
        // Reinitialize gallery after loading
        setTimeout(initCursorGallery, 100);
      }
    } catch (e) {
      /* ignore parse errors */
    }
  }

  // Load pricing data
  const savedPricing = localStorage.getItem("admin_pricing_data");
  if (savedPricing) {
    try {
      const pricing = JSON.parse(savedPricing);
      Object.keys(pricing).forEach((key) => {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) el.textContent = pricing[key];
        const elHtml = document.querySelector(`[data-i18n-html="${key}"]`);
        if (elHtml) elHtml.innerHTML = pricing[key];
      });
    } catch (e) {
      /* ignore parse errors */
    }
  }
}

document.addEventListener("DOMContentLoaded", loadAdminData);

// ==================== PARALLAX MOUNTAINS & NIGHT SKY ====================
function initParallax() {
  const mountainLayers = document.querySelectorAll(".parallax-layer");
  const skyLayers = document.querySelectorAll(".stars, .moon");
  const header = document.getElementById("home");
  
  if (!header) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  function updateParallax() {
    // Smooth interpolation
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    // Animate mountain layers
    mountainLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.05;
      const x = currentX * speed * 50;
      const y = currentY * speed * 30;
      layer.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Animate sky layers (slower, more subtle)
    skyLayers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 0.01;
      const x = currentX * speed * 80;
      const y = currentY * speed * 40;
      layer.style.transform = `translate(${x}px, ${y}px)`;
    });

    rafId = requestAnimationFrame(updateParallax);
  }

  function handleMouseMove(e) {
    const rect = header.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    targetX = (e.clientX - rect.left - centerX) / centerX;
    targetY = (e.clientY - rect.top - centerY) / centerY;
  }

  function handleMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  // Start animation loop
  updateParallax();

  // Desktop mouse events
  header.addEventListener("mousemove", handleMouseMove);
  header.addEventListener("mouseleave", handleMouseLeave);

  // Mobile: use device orientation if available
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetX = Math.max(-1, Math.min(1, e.gamma / 30));
        targetY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initParallax);

// ==================== i18n TRANSLATIONS ====================
const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "header.badge": "PHOTOGRAPHER",
    "header.title": "Capturing Moments That Last Forever",
    "header.description": "Professional photography services in Kazakhstan. From weddings to portraits, I bring your precious moments to life with artistic vision and technical excellence.",
    "header.hire": "Book a Session",
    "header.portfolio": "View Portfolio",
    "header.scroll": "Scroll",
    "portfolio.title": "Portfolio",
    "portfolio.subtitle":
      "Selected works from weddings, events, and portrait sessions",
    "portfolio.wedding": "Wedding",
    "portfolio.portrait": "Portrait",
    "portfolio.event": "Event",
    "about.title": "About Me",
    "about.p1":
      "I am Aibolat Amanzholov, a professional photographer based in Kazakhstan, specializing in wedding, event, and portrait photography. My goal is to capture genuine emotions and create timeless images that tell your unique story.",
    "about.p2":
      "With years of experience and a keen eye for detail, I bring artistic vision and technical excellence to every project. Each photograph is carefully processed with my signature artistic style.",
    "about.btn": "VIEW MY WORKS",
    "pricing.title": "Pricing",
    "pricing.subtitle": "Wedding photography packages tailored to your needs",
    "pricing.popular": "Popular",
    "pricing.book": "Book Now",
    "pricing.bookSession": "Book Session",
    "pricing.standart.name": "Standart",
    "pricing.standart.tagline":
      "For intimate celebrations and banquet part",
    "pricing.standart.f1": "1 professional photographer",
    "pricing.standart.f2": "6 hours of shooting",
    "pricing.standart.f3": "300-500 photos in artistic processing",
    "pricing.standart.f4": "Personal online gallery",
    "pricing.standart.f5": "Photos ready within a month",
    "pricing.standart.f6": "Backup storage for 12 months",
    "pricing.elite.name": "Elite",
    "pricing.elite.tagline": "The ideal solution for a full wedding day",
    "pricing.elite.f1": "Full wedding day",
    "pricing.elite.f2": "2 professional photographers",
    "pricing.elite.f3": "Shooting throughout the entire day",
    "pricing.elite.f4": "600-800 photos in artistic processing",
    "pricing.elite.f5": "Online gallery for you and guests",
    "pricing.elite.f6": "QR code for guests during banquet",
    "pricing.elite.f7": "Backup storage for 12 months",
    "pricing.premium.name": "Premium",
    "pricing.premium.tagline": "Maximum comfort and flawless results",
    "pricing.premium.f1": "Full wedding day",
    "pricing.premium.f2": "3 professional photographers",
    "pricing.premium.f3": "800-1200 photos in artistic processing",
    "pricing.premium.f4": "Online gallery for you and guests",
    "pricing.premium.f5": "QR code for guests during banquet",
    "pricing.premium.f6": "Premium photobook 30×30cm, 15 spreads",
    "pricing.premium.f7": "Backup storage for 12 months",
    "pricing.individual.name": "Individual Photosession",
    "pricing.individual.f1": "1 hour of shooting",
    "pricing.individual.f2": "50-100 photos in artistic processing",
    "pricing.individual.f3": "10 photos with detailed retouching",
    "pricing.individual.f4": "Online gallery",
    "pricing.individual.f5": "Photos ready in 2-3 days",
    "pricing.individual.f6": "Studio rental paid separately",
    "pricing.extras.title": "Additional Services",
    "pricing.extras.e1": "Photobook 30×30cm",
    "pricing.extras.e2": "Second photographer",
    "pricing.extras.e3": "Family photosession",
    "pricing.extras.e4": "QR service",
    "pricing.extras.e5": "Express processing (1 week)",
    "pricing.extras.e6": "Individual flash box",
    "pricing.extras.e7": "Hourly shooting (min 3 hours)",
    "pricing.info.title": "Important Information",
    "pricing.info.i1":
      "Your date is reserved with a deposit of <strong>50.000 KZT</strong>.",
    "pricing.info.i2": "The deposit is <strong>non-refundable</strong>.",
    "pricing.info.i3":
      "The remaining balance is paid in cash on the day of the shoot.",
    "pricing.info.i4": "Additional hour: <strong>50.000 KZT</strong>.",
    "pricing.info.i5": "You receive a download link for finished photos.",
    "pricing.info.i6":
      "All photos are in the author's processing, without original files.",
    "pricing.info.i7":
      "Events in other cities of Kazakhstan and abroad require additional transfer and accommodation at the expense of the inviting party.",
    "pricing.rider.title": "Technical Rider (Other Cities)",
    "pricing.rider.r1":
      "Round-trip flight to the destination is paid (Air Astana)",
    "pricing.rider.r2": "Airport transfer is paid",
    "pricing.rider.r3":
      "Hotel + breakfast is paid (if the trip exceeds 12 hours)",
    "contact.title": "Book a Photoshoot",
    "contact.desc":
      "To book a shoot, fill out the contact form and I will get back to you shortly.",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.type": "Shooting type (Wedding / Portrait / Event)",
    "contact.message": "Your Message",
    "contact.send": "SEND",
    "footer.desc":
      "Professional photographer in Kazakhstan. Weddings, events, portraits.",
    "footer.links": "Quick Links",
    "footer.follow": "Follow Me",
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "Обо мне",
    "nav.portfolio": "Портфолио",
    "nav.pricing": "Цены",
    "nav.contact": "Контакты",
    "header.badge": "ФОТОГРАФ",
    "header.title": "Запечатлеваю Моменты На Всю Жизнь",
    "header.description": "Профессиональные услуги фотосъемки в Казахстане. От свадеб до портретов — я воплощаю ваши драгоценные моменты в жизнь с художественным видением и техническим мастерством.",
    "header.hire": "Записаться",
    "header.portfolio": "Портфолио",
    "header.scroll": "Листать",
    "portfolio.title": "Портфолио",
    "portfolio.subtitle": "Избранные работы со свадеб, мероприятий и портретных сессий",
    "portfolio.wedding": "Свадьба",
    "portfolio.portrait": "Портрет",
    "portfolio.event": "Мероприятие",
    "about.title": "Обо мне",
    "about.p1": "Я — Айболат Аманжолов, профессиональный фотограф из Казахстана. Специализируюсь на свадебной, репортажной и портретной фотосъёмке. Моя цель — запечатлеть настоящие эмоции и создать вневременные снимки, которые расскажут вашу уникальную историю.",
    "about.p2": "Благодаря многолетнему опыту и вниманию к деталям, я привношу художественное видение и техническое мастерство в каждый проект. Каждая фотография обработана в моём авторском стиле.",
    "about.btn": "СМОТРЕТЬ РАБОТЫ",
    "pricing.title": "Цены",
    "pricing.subtitle": "Пакеты свадебной фотосъёмки под ваши потребности",
    "pricing.popular": "Популя��ный",
    "pricing.book": "Забронировать",
    "pricing.bookSession": "Записаться",
    "pricing.standart.name": "Стандарт",
    "pricing.standart.tagline": "Для камерных торжеств и банкетной части",
    "pricing.standart.f1": "1 профессиональный фотограф",
    "pricing.standart.f2": "6 часов съёмки",
    "pricing.standart.f3": "300-500 фотографий в авторской обработке",
    "pricing.standart.f4": "Персональная онлайн-галерея",
    "pricing.standart.f5": "Готовые фотографии в течении месяца",
    "pricing.standart.f6": "Резервная копия хранится 12 месяцев",
    "pricing.elite.name": "Elite",
    "pricing.elite.tagline": "Идеальное решение для полного свадебного дня",
    "pricing.elite.f1": "Полный свадебный день",
    "pricing.elite.f2": "2 профессиональных фотографа",
    "pricing.elite.f3": "Съёмка в течение всего свадебного дня",
    "pricing.elite.f4": "600-800 фотографий в авторской обработке",
    "pricing.elite.f5": "Онлайн-галерея для вас и гостей",
    "pricing.elite.f6": "QR-код для гостей во время банкета",
    "pricing.elite.f7": "Резервная копия хранится 12 месяцев",
    "pricing.premium.name": "Premium",
    "pricing.premium.tagline": "Максимальный комфорт и безупречный результат",
    "pricing.premium.f1": "Полный свадебный день",
    "pricing.premium.f2": "3 профессиональных фотографа",
    "pricing.premium.f3": "800-1200 фотографий в авторской обработке",
    "pricing.premium.f4": "Онлайн-галерея для вас и гостей",
    "pricing.premium.f5": "QR-код для гостей во время банкета",
    "pricing.premium.f6": "Премиальная фотокнига 30×30см, 15 разворотов",
    "pricing.premium.f7": "Резервная копия хранится 12 месяцев",
    "pricing.individual.name": "Индивидуальная фотосессия",
    "pricing.individual.f1": "1 час съёмки",
    "pricing.individual.f2": "50–100 фото в авторской обработке",
    "pricing.individual.f3": "10 фото в детальной ретуши",
    "pricing.individual.f4": "Онлайн-галерея",
    "pricing.individual.f5": "Фотографии будут готовы 2–3 дня",
    "pricing.individual.f6": "Аренда студии оплачивается отдельно",
    "pricing.extras.title": "Дополнительные услуги",
    "pricing.extras.e1": "Фотокнига 30×30см",
    "pricing.extras.e2": "Второй фотограф",
    "pricing.extras.e3": "Семейная фотосессия",
    "pricing.extras.e4": "Услуга QR",
    "pricing.extras.e5": "Экспресс обработка (1 неделя)",
    "pricing.extras.e6": "Индивидуальный флешбокс",
    "pricing.extras.e7": "Часовая съёмка (минимум 3 часа)",
    "pricing.info.title": "Важная информация",
    "pricing.info.i1": "Ваша дата бронируется по предоплате в сумме <strong>50.000тг</strong>.",
    "pricing.info.i2": "Предоплата является <strong>не возвратной</strong>.",
    "pricing.info.i3": "Остаток передаете наличными в день съёмки.",
    "pricing.info.i4": "Доп.час <strong>50.000тг</strong>.",
    "pricing.info.i5": "Готовые фотографии вы получаете ссылкой для скачивания.",
    "pricing.info.i6": "Все фотографии в авторской обработке, без исходников.",
    "pricing.info.i7": "Ивенты в других городах Казахстана и зарубежья предусматривают дополнительный трансфер и проживан��е за счет приглашающей стороны.",
    "pricing.rider.title": "Бытовой райдер (другие города)",
    "pricing.rider.r1": "Оплачивается дополнительно перелёт в пункт назначения и назад (Air Astana)",
    "pricing.rider.r2": "Оплачивается трансфер в аэропорт",
    "pricing.rider.r3": "Оплачивается отель + завтрак (если поездка больше 12 часов)",
    "contact.title": "Заказать фотосъемку",
    "contact.desc": "Для того, чтобы забронировать съемку, заполните контактную форму и я свяжусь с вами в ближайшее время.",
    "contact.name": "Ваше имя",
    "contact.email": "Ваш Email",
    "contact.type": "Тип съёмки (Свадьба / Портрет / Ивент)",
    "contact.message": "Ваше сообщение",
    "contact.send": "ОТПРАВИТЬ",
    "footer.desc": "Профессиональный фотограф в Казахстане. Свадьбы, мероприятия, портреты.",
    "footer.links": "Быстрые ссылки",
    "footer.follow": "Подписывайтесь",
  },
  kz: {
    "nav.home": "Басты бет",
    "nav.about": "Мен туралы",
    "nav.portfolio": "Портфолио",
    "nav.pricing": "Бағалар",
    "nav.contact": "Байланыс",
    "header.badge": "ФОТОГРАФ",
    "header.title": "Мәңгілік Сәттерді Түсіремін",
    "header.description": "Қазақстандағы кәсіби фотосурет қызметтері. Тойлардан портреттерге дейін — сіздің қымбат сәттеріңізді көркемдік көзқарас пен техникалық шеберлікпен тірілтемін.",
    "header.hire": "Жазылу",
    "header.portfolio": "Портфолио",
    "header.scroll": "Төмен",
    "portfolio.title": "Портфолио",
    "portfolio.subtitle": "Тойлар, іс-шаралар және портреттік сессиялардан таңдаулы жұмыстар",
    "portfolio.wedding": "Той",
    "portfolio.portrait": "Портрет",
    "portfolio.event": "Іс-шара",
    "about.title": "Мен туралы",
    "about.p1": "Мен — Айболат Аманжолов, Қазақстандағы кәсіби фотограф. Той, репортаж және портрет фотосуретке маманданамын. Менің мақсатым — шынайы эмоцияларды түсіріп, сіздің бірегей тарихыңызды айтатын мәңгілік суреттер жасау.",
    "about.p2": "Көп жылдық тәжірибе мен егжей-тегжейге назар аударудың арқасында мен әр жобаға көркемдік көзқарас пен техникалық шеберлік әкелемін. Әрбір фотосурет менің авторлық стилімде өңделген.",
    "about.btn": "ЖҰМЫСТАРДЫ ҚАРАУ",
    "pricing.title": "Бағалар",
    "pricing.subtitle": "Сіздің қажеттіліктеріңізге арналған той фотосуреті пакеттері",
    "pricing.popular": "Танымал",
    "pricing.book": "Брондау",
    "pricing.bookSession": "Жазылу",
    "pricing.standart.name": "Стандарт",
    "pricing.standart.tagline": "Шағын тойлар мен банкет бөлігі үшін",
    "pricing.standart.f1": "1 кәсіби фотограф",
    "pricing.standart.f2": "6 сағат түсірілім",
    "pricing.standart.f3": "300-500 фото авторлық өңдеуде",
    "pricing.standart.f4": "Жеке онлайн-галерея",
    "pricing.standart.f5": "Дайын фотосуреттер бір ай ішінде",
    "pricing.standart.f6": "Резервтік көшірме 12 ай сақталады",
    "pricing.elite.name": "Elite",
    "pricing.elite.tagline": "Толық той күні үшін тамаша шешім",
    "pricing.elite.f1": "Толық той күні",
    "pricing.elite.f2": "2 кәсіби фотограф",
    "pricing.elite.f3": "Бүкіл той күні бойы түсірілім",
    "pricing.elite.f4": "600-800 фото авторлық өңдеуде",
    "pricing.elite.f5": "Сіз және қонақтар үшін онлайн-галерея",
    "pricing.elite.f6": "Банкет кезінде қонақтар үшін QR-код",
    "pricing.elite.f7": "Резервтік көшірме 12 ай сақталады",
    "pricing.premium.name": "Premium",
    "pricing.premium.tagline": "Максималды жайлылық және мінсіз нәтиже",
    "pricing.premium.f1": "Толық той күні",
    "pricing.premium.f2": "3 кәсіби фотограф",
    "pricing.premium.f3": "800-1200 фото авторлық өңдеуде",
    "pricing.premium.f4": "Сіз және қонақтар үшін онлайн-галерея",
    "pricing.premium.f5": "Банкет кезінде қонақтар үшін QR-код",
    "pricing.premium.f6": "Премиум фотокітап 30×30см, 15 разворот",
    "pricing.premium.f7": "Резервтік көшірме 12 ай сақталады",
    "pricing.individual.name": "Жеке фотосессия",
    "pricing.individual.f1": "1 сағат түсірілім",
    "pricing.individual.f2": "50–100 фото авторлық өңдеуде",
    "pricing.individual.f3": "10 фото толық ретушьте",
    "pricing.individual.f4": "Онлайн-галерея",
    "pricing.individual.f5": "Фотосуреттер 2–3 күнде дайын болады",
    "pricing.individual.f6": "Студия жалдау бөлек төленеді",
    "pricing.extras.title": "Қосымша қызметтер",
    "pricing.extras.e1": "Фотокітап 30×30см",
    "pricing.extras.e2": "Екінші фотограф",
    "pricing.extras.e3": "Отбасылық фотосессия",
    "pricing.extras.e4": "QR қызметі",
    "pricing.extras.e5": "Экспресс өңдеу (1 апта)",
    "pricing.extras.e6": "Жеке флешбокс",
    "pricing.extras.e7": "Сағаттық түсірілім (минимум 3 сағат)",
    "pricing.info.title": "Маңызды ақпарат",
    "pricing.info.i1": "Сіздің күніңіз <strong>50.000тг</strong> алдын ала төлем арқылы брондалады.",
    "pricing.info.i2": "Алдын ала төлем <strong>қайтарылмайды</strong>.",
    "pricing.info.i3": "Қалғанын түсірілім күні қолма-қол төлейсіз.",
    "pricing.info.i4": "Қосымша сағат <strong>50.000тг</strong>.",
    "pricing.info.i5": "Дайын фотосуреттерді жүктеу сілтемесі арқылы аласыз.",
    "pricing.info.i6": "Барлық фотосуреттер авторлық өңдеуде, түпнұсқаларсыз.",
    "pricing.info.i7": "Қазақстанның басқа қалаларындағы және шетелдегі іс-шаралар шақырушы тараптың есебінен қосымша трансфер мен тұруды қарастырады.",
    "pricing.rider.title": "Техникалық райдер (басқа қалалар)",
    "pricing.rider.r1": "Мақсат пунктіне және кері ұшу төленеді (Air Astana)",
    "pricing.rider.r2": "Әуежайға трансфер төленеді",
    "pricing.rider.r3": "Қонақ үй + таңғы ас төленеді (сапар 12 сағаттан асса)",
    "contact.title": "Фотосессияға жазылу",
    "contact.desc": "Түсір��лімді брондау үшін байланыс формасын толтырыңыз, мен сізбен жақын арада хабарласамын.",
    "contact.name": "Сіздің атыңыз",
    "contact.email": "Сіздің Email",
    "contact.type": "Түсірілім түрі (Той / Портрет / Іс-шара)",
    "contact.message": "Сіздің хабарламаңыз",
    "contact.send": "ЖІБЕРУ",
    "footer.desc": "Қазақстандағы кәсіби фотограф. Тойлар, іс-шаралар, портреттер.",
    "footer.links": "Жылдам сілтемелер",
    "footer.follow": "Жазылыңыз",
  },
};

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  // Update all data-i18n-html elements (for content with HTML)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (t[key]) el.innerHTML = t[key];
  });

  // Update placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) el.placeholder = t[key];
  });

  // Update lang label
  const langLabel = document.getElementById("lang-label");
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  // Update active state
  document.querySelectorAll(".lang-option").forEach((opt) => {
    opt.classList.toggle("active", opt.dataset.lang === lang);
  });

  // Save preference
  localStorage.setItem("preferred_language", lang);
}

// ==================== NAV / MENU ====================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const langBtn = document.getElementById("lang-btn");
const langDropdown = document.getElementById("lang-dropdown");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.querySelector("i").classList.toggle("ri-menu-3-line");
  menuBtn.querySelector("i").classList.toggle("ri-close-line");
});

// Close menu on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.querySelector("i").classList.add("ri-menu-3-line");
    menuBtn.querySelector("i").classList.remove("ri-close-line");
  });
});

// Language dropdown
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("open");
});

document.querySelectorAll(".lang-option").forEach((opt) => {
  opt.addEventListener("click", () => {
    setLanguage(opt.dataset.lang);
    langDropdown.classList.remove("open");
  });
});

document.addEventListener("click", () => {
  langDropdown.classList.remove("open");
});

// Nav scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// ==================== PARTICLES ====================
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  
  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 8 + Math.random() * 12 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.opacity = 0.1 + Math.random() * 0.3;
    container.appendChild(particle);
  }
}

createParticles();

// ==================== CURSOR GALLERY ====================
function initCursorGallery() {
  const gallery = document.querySelector(".scroll-gallery");
  const viewport = document.querySelector(".scroll-gallery__viewport");
  const track = document.querySelector(".scroll-gallery__track");
  const cursor = document.getElementById("gallery-cursor");
  const speedFill = document.querySelector(".scroll-gallery__speed-fill");

  if (!gallery || !viewport || !track || !cursor) return;

  let currentX = 0;
  let targetX = 0;
  let maxScroll = 0;
  let isHovering = false;
  let scrollSpeed = 0;
  let animationId = null;

  function calculateMaxScroll() {
    maxScroll = track.scrollWidth - viewport.offsetWidth;
  }

  calculateMaxScroll();
  window.addEventListener("resize", calculateMaxScroll);

  function updateGallery() {
    // Smooth interpolation
    currentX += (targetX - currentX) * 0.08;
    track.style.transform = `translateX(${-currentX}px)`;

    // Update speed bar
    if (speedFill && maxScroll > 0) {
      const progress = currentX / maxScroll;
      const fillWidth = 20 + progress * 60;
      const marginLeft = progress * (100 - fillWidth);
      speedFill.style.width = fillWidth + "%";
      speedFill.style.marginLeft = marginLeft + "%";
    }

    animationId = requestAnimationFrame(updateGallery);
  }

  function handleMouseMove(e) {
    const rect = viewport.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = mouseX / rect.width;

    // Update cursor position
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Determine direction and speed
    if (relativeX < 0.3) {
      // Left side - scroll left
      scrollSpeed = (0.3 - relativeX) / 0.3;
      targetX = Math.max(0, targetX - scrollSpeed * 15);
      cursor.classList.add("left");
    } else if (relativeX > 0.7) {
      // Right side - scroll right
      scrollSpeed = (relativeX - 0.7) / 0.3;
      targetX = Math.min(maxScroll, targetX + scrollSpeed * 15);
      cursor.classList.remove("left");
    } else {
      scrollSpeed = 0;
    }
  }

  function handleMouseEnter() {
    isHovering = true;
    cursor.classList.add("visible");
    if (!animationId) updateGallery();
  }

  function handleMouseLeave() {
    isHovering = false;
    cursor.classList.remove("visible");
    scrollSpeed = 0;
  }

  viewport.addEventListener("mousemove", handleMouseMove);
  viewport.addEventListener("mouseenter", handleMouseEnter);
  viewport.addEventListener("mouseleave", handleMouseLeave);

  // Touch support for mobile
  let touchStartX = 0;
  let touchStartScroll = 0;

  viewport.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartScroll = currentX;
  });

  viewport.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;
    targetX = Math.max(0, Math.min(maxScroll, touchStartScroll + diff));
  });

  // Start animation
  updateGallery();
}

document.addEventListener("DOMContentLoaded", initCursorGallery);

// ==================== LIGHTBOX ====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let currentImageIndex = 0;
let galleryImages = [];

function openLightbox(index) {
  galleryImages = Array.from(
    document.querySelectorAll(".scroll-gallery__item img")
  );
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxImage() {
  if (galleryImages[currentImageIndex]) {
    lightboxImg.src = galleryImages[currentImageIndex].src;
  }
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function prevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

// Event delegation for gallery clicks
document.addEventListener("click", (e) => {
  const item = e.target.closest(".scroll-gallery__item");
  if (item) {
    const items = Array.from(document.querySelectorAll(".scroll-gallery__item"));
    const index = items.indexOf(item);
    if (index !== -1) openLightbox(index);
  }
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", prevImage);
lightboxNext.addEventListener("click", nextImage);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "ArrowRight") nextImage();
});

// ==================== SCROLL REVEAL ====================
const scrollRevealOption = {
  distance: "30px",
  origin: "bottom",
  duration: 800,
  easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

if (typeof ScrollReveal !== "undefined") {
  ScrollReveal().reveal(".about__image", {
    ...scrollRevealOption,
    origin: "left",
  });
  ScrollReveal().reveal(".about__content", {
    ...scrollRevealOption,
    delay: 200,
  });
  ScrollReveal().reveal(".pricing__card", {
    ...scrollRevealOption,
    interval: 150,
  });
  ScrollReveal().reveal(".pricing__individual-card", scrollRevealOption);
  ScrollReveal().reveal(".pricing__extras", { ...scrollRevealOption, delay: 100 });
  ScrollReveal().reveal(".pricing__info", { ...scrollRevealOption, delay: 200 });
  ScrollReveal().reveal(".pricing__rider", { ...scrollRevealOption, delay: 300 });
  ScrollReveal().reveal(".contact__content", {
    ...scrollRevealOption,
    origin: "left",
  });
  ScrollReveal().reveal(".contact__image", {
    ...scrollRevealOption,
    origin: "right",
    delay: 200,
  });
}

// ==================== INIT LANGUAGE ====================
const savedLang = localStorage.getItem("preferred_language");
if (savedLang && translations[savedLang]) {
  setLanguage(savedLang);
}

// ==================== 3D PARALLAX HERO EFFECT ====================
function initHero3D() {
  const hero = document.querySelector('.hero-3d');
  const scene = document.getElementById('hero-scene');
  if (!hero || !scene) return;

  const cards = document.querySelectorAll('.hero-card');
  const floaters = document.querySelectorAll('.hero-floater');
  const contentLayer = document.querySelector('.hero-content-layer');
  
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  // Mouse move handler for 3D parallax
  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      if (e.clientY > rect.bottom) return;
      
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }
  
  // Animation loop for smooth parallax
  function animateParallax() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    // Apply 3D transforms to cards
    cards.forEach((card, index) => {
      const depth = parseFloat(card.dataset.depth) || 0.5;
      const baseRotateY = index === 0 ? -25 : index === 1 ? -15 : -20;
      const baseRotateX = index === 0 ? 5 : index === 1 ? -5 : 10;
      const baseZ = index === 0 ? 50 : index === 1 ? 100 : 30;
      
      const rotateY = baseRotateY + currentX * 15 * depth;
      const rotateX = baseRotateX - currentY * 10 * depth;
      const translateX = currentX * 30 * depth;
      const translateY = currentY * 20 * depth;
      
      card.style.transform = `
        rotateY(${rotateY}deg) 
        rotateX(${rotateX}deg) 
        translateZ(${baseZ}px)
        translate(${translateX}px, ${translateY}px)
      `;
    });
    
    // Apply subtle movement to floaters
    floaters.forEach((floater) => {
      const depth = parseFloat(floater.dataset.depth) || 0.5;
      const translateX = currentX * 50 * depth;
      const translateY = currentY * 30 * depth;
      
      floater.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
    
    // Apply subtle movement to content
    if (contentLayer) {
      const contentX = currentX * 10;
      const contentY = currentY * 5;
      contentLayer.style.transform = `translate(${contentX}px, ${contentY}px)`;
    }
    
    requestAnimationFrame(animateParallax);
  }
  
  if (!isMobile) {
    animateParallax();
  }
  
  // Scroll fade effect
  let lastScrollY = 0;
  let ticking = false;
  
  function handleScroll() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const triggerPoint = heroHeight * 0.1;
    
    if (scrollY > triggerPoint) {
      hero.classList.add('is-scrolled');
    } else {
      hero.classList.remove('is-scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
  
  // Initial check
  handleScroll();
}

document.addEventListener('DOMContentLoaded', initHero3D);

// ==================== SCROLL REVEAL ANIMATIONS ====================
function initScrollAnimations() {
  const scrollElements = document.querySelectorAll('[data-scroll], [data-scroll-stagger]');
  
  if (!scrollElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally unobserve after animation to improve performance
        // scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  scrollElements.forEach(el => {
    scrollObserver.observe(el);
  });
  
  // Parallax scroll effect for elements with data-scroll-speed
  const parallaxElements = document.querySelectorAll('[data-scroll-speed]');
  
  if (parallaxElements.length) {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.scrollSpeed) || 0.5;
            const rect = el.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = centerY - viewportCenter;
            
            el.style.transform = `translateY(${distance * speed * -0.1}px)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
