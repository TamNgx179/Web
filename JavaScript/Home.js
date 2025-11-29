// ================ PRELOADER ================
(function () {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('is-loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide');
      document.body.classList.remove('is-loading');
      setTimeout(() => preloader?.remove(), 500);
    }, 600);
  });
})();


// ================== Slideshow ==================
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  if (slides.length) {
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
  }
}
setInterval(showSlide, 3000);
showSlide();
// ================== Cart counter ======================
let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];
(function () {
  // ====== TÊN KHÓA LƯU DỮ LIỆU TRONG LOCAL STORAGE ======
  const CART_KEY = "selectedcar";

  // ====== HÀM LẤY DỮ LIỆU GIỎ HÀNG ======
  function getCart() {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) {
        return JSON.parse(saved);
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  // ====== CẬP NHẬT SỐ XE TRÊN ICON GIỎ HÀNG ======
  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = String(getCart().length);
    }
  }

  // ====== KHI TRANG ĐÃ TẢI XONG ======
  document.addEventListener("DOMContentLoaded", function () {
    updateCounter();          // Cập nhật số lượng giỏ hàng
  });
})();

// ================== Browse by Type (gộp 5 hãng + phân trang bằng dots) ==================
const BRANDS = [
  { id: "honda",    name: "Honda",    url: "../data/honda.json" },
  { id: "bmw",      name: "BMW",      url: "../data/bmw.json" },
  { id: "toyota",   name: "Toyota",   url: "../data/toyota.json" },
  { id: "vinfast",  name: "VinFast",  url: "../data/vinfast.json" },
  { id: "mercedes", name: "Mercedes", url: "../data/mercedes.json" },
  { id: "porsche",  name: "Porsche",  url: "../data/porsche.json"}
];

const TYPE_MAP = {
  "EVs": "EV",
  "SUVs": "SUV",
  "Sedans": "Sedan",
  "Coupes": "Coupe",
  "Convertibles": "Convertible"
};

const PAGE_SIZE = 8; // 8 xe / trang (4 cột x 2 hàng)

const gridEl  = document.querySelector(".car-list");
const buttons = document.querySelectorAll(".popular .category");

if (gridEl) {
  gridEl.classList.add("grid-4"); // ép 4 cột qua CSS
}

let ALL_CARS = [];
let CURRENT_TYPE = "EV";
let PAGE = 0;
let FILTERED = [];


// ======== Pager (Prev / Dots / Next) ========
const pager = document.createElement("div");
pager.className = "pager-controls";

const prevBtn = document.createElement("button");
prevBtn.className = "pager-prev";
prevBtn.textContent = "‹";
prevBtn.setAttribute("aria-label", "Previous");

const dotsWrap = document.createElement("div");
dotsWrap.className = "pager-dots";

const nextBtn = document.createElement("button");
nextBtn.className = "pager-next";
nextBtn.textContent = "›";
nextBtn.setAttribute("aria-label", "Next");

pager.appendChild(prevBtn);
pager.appendChild(dotsWrap);
pager.appendChild(nextBtn);

if (gridEl) {
  gridEl.insertAdjacentElement('afterend', pager);
}

// ======= Load dữ liệu =======
async function loadBrand(src) {
  const res = await fetch(src.url);
  const data = await res.json();

  let list;
  if (Array.isArray(data?.cars)) {
    list = data.cars;
  } else if (Array.isArray(data)) {
    list = data;
  } else {
    list = [];
  }

  const out = [];
  for (let i = 0; i < list.length; i++) {
    const car = { ...list[i] };
    car.brandId = src.id;
    car.brandName = src.name;
    out.push(car);
  }
  return out;
}

async function loadAllBrands() {
  const tasks = BRANDS.map(loadBrand);
  const settled = await Promise.allSettled(tasks);
  const cars = [];
  for (let i = 0; i < settled.length; i++) {
    const s = settled[i];
    if (s.status === "fulfilled") {
      const arr = s.value || [];
      for (let j = 0; j < arr.length; j++) cars.push(arr[j]);
    } else {
      console.error("Không tải được:", BRANDS[i].url, s.reason);
    }
  }
  return cars;
}

// ======= Lọc + Render =======
function applyFilter(type) {
  CURRENT_TYPE = type;
  PAGE = 0;

  const norm = function (s) {
    return String(s || "").trim().toLowerCase();
  };

  const out = [];
  for (let i = 0; i < ALL_CARS.length; i++) {
    const c = ALL_CARS[i];
    if (norm(c.type) === norm(type)) out.push(c);
  }
  FILTERED = out;

  renderPage();
}

function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function renderDots(totalPages) {
  clearElement(dotsWrap);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");
    dot.className = "pager-dot";
    if (i === PAGE) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      PAGE = i;
      renderPage();
    });
    dotsWrap.appendChild(dot);
  }
}

function renderCard(car) {
  const idxDelay = (gridEl.childElementCount % 8) * 0.05; // stagger within page
  const id = car.id;
  const name = car.name;

  const card = document.createElement("div");
  card.className = "car-card reveal-up";
  card.style.setProperty("--reveal-delay", idxDelay.toFixed(2) + "s");

  let imgSrc = "";
  if (car.display) {
    imgSrc = car.display;
  } 

  if (imgSrc) {
    const img = document.createElement("img");
    img.className = "thumb-img";
    img.src = imgSrc;
    img.alt = name;
    card.appendChild(img);
  } 

  const body = document.createElement("div");
  body.className = "body";

  const h3 = document.createElement("h3");
  h3.textContent = name;

  const a = document.createElement("a");
  a.className = "cta";
  a.href = "car.html?brand=" + encodeURIComponent(car.brandId) + "&id=" + encodeURIComponent(id);
  a.textContent = "Shop now";

  body.appendChild(h3);
  body.appendChild(a);
  card.appendChild(body);

  gridEl.appendChild(card);
  if (window.__reveal) { window.__reveal.observe(card); }
}

function renderPage() {
  clearElement(gridEl);

  const pagesCount = Math.ceil(FILTERED.length / PAGE_SIZE);
  let totalPages = pagesCount;
  if (!totalPages || totalPages < 1) {
    totalPages = 1;
  }
  if (PAGE >= totalPages) {
    PAGE = totalPages - 1;
  }

  const start = PAGE * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  
  const view = FILTERED.slice(start, end);

  for (let i = 0; i < view.length; i++) {
    renderCard(view[i]);
  }

  // cập nhật dots + prev/next + ẩn/hiện pager
  renderDots(pagesCount);

  if (PAGE <= 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  const maxPageIndex = pagesCount - 1;
  if (PAGE >= maxPageIndex) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  if (pagesCount > 1) {
    pager.classList.remove("is-hidden");
  } else {
    pager.classList.add("is-hidden");
  }
  if (window.__reveal) { window.__reveal.observeAll(); }
}

// ======== Sự kiện tab loại xe ========
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    let label = "";
    if (btn.textContent) {
      label = btn.textContent.trim();
    }
    let type = TYPE_MAP[label];
    if (!type) {
      type = "EV";
    }
    applyFilter(type);
  });
});

// ======= Sự kiện phân trang =========
prevBtn.addEventListener("click", () => {
  if (PAGE > 0) {
    PAGE = PAGE - 1;
    renderPage();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(FILTERED.length / PAGE_SIZE);
  if (PAGE < totalPages - 1) {
    PAGE = PAGE + 1;
    renderPage();
  }
});

// ======= Khởi động ========
(async function initBrowse() {
  ALL_CARS = await loadAllBrands();

  let defaultBtn = document.querySelector(".popular .category.active");
  if (!defaultBtn && buttons[0]) {
    defaultBtn = buttons[0];
  }

  let label = "";
  if (defaultBtn && defaultBtn.textContent) {
    label = defaultBtn.textContent.trim();
  }
  let type = TYPE_MAP[label];
  if (!type) {
    type = "EV";
  }
  if (defaultBtn) {
    defaultBtn.classList.add("active");
  }

  applyFilter(type);
})();

// ==== Brand Popup ====
(function(){
  const seeAllBtn = document.querySelector('.see-all');
  const popup     = document.getElementById('brand-popup');
  const box       = popup?.querySelector('.popup-box');
  const closeBtn  = document.getElementById('close-popup');
  const listEl    = document.getElementById('brand-items');

  if (!seeAllBtn || !popup || !listEl) return;

  const brands = [
    { id: 'bmw',      name: 'BMW',      logo: "../images/logos/bmw-logo.png" },
    { id: 'honda',    name: 'Honda',    logo: "../images/logos/honda-logo.png" },
    { id: 'mercedes', name: 'Mercedes', logo: "../images/logos/mercedes-logo.png" },
    { id: 'porsche',  name: 'Porsche',  logo: "../images/logos/porsche-logo.png" },
    { id: 'toyota',   name: 'Toyota',   logo: "../images/logos/toyota-logo.png" },
    { id: 'vinfast',  name: 'VinFast',  logo: "../images/logos/vinfast-logo.png" },
  ];

  let built = false;

  function buildList(){
    if (built) return;
    listEl.innerHTML = '';
    brands.forEach(b => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href   = `../HTML/Brand.html?brand=${encodeURIComponent(b.id)}`;

      const img = document.createElement('img');
      img.src = b.logo;
      img.alt = b.name;

      const span = document.createElement('span');
      span.textContent = b.name;

      a.appendChild(img);
      a.appendChild(span);
      li.appendChild(a);
      listEl.appendChild(li);
    });
    built = true;
  }

  function openPopup(){
    buildList();
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closePopup(){
    popup.classList.remove('show');
    document.body.style.overflow = '';
  }

  seeAllBtn.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', e => {
    if (e.target === popup) closePopup(); // click nền để đóng
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('show')) closePopup();
  });
})();

// ================== Scroll Reveal (IntersectionObserver) ==================
window.addEventListener("scroll", function() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100; // Cách đáy màn hình 100px thì bắt đầu hiện

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      // Nếu muốn chỉ hiện 1 lần thì bỏ dòng này đi
      reveals[i].classList.remove("active");
    }
  }
});

// ====== Lazy loading tối ưu cho ảnh trang Home ======
document.addEventListener("DOMContentLoaded", () => {
  const heroSlides = document.querySelectorAll(".slideshow .slide");

  // Ảnh slideshow: ảnh đầu load sớm, còn lại lazy
  heroSlides.forEach((img, index) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", index === 0 ? "eager" : "lazy");
    }
  });

  // Các ảnh khác ngoài slideshow: mặc định lazy
  const otherImages = document.querySelectorAll("img:not(.slideshow .slide)");
  otherImages.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
});
