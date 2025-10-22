// ====== Brand.js (fix filter buttons + multi-type filter, keep dedup & pagination) ======

const ALLOWED_BRANDS = [
  { id: "vinfast", name: "VinFast" },
  { id: "mercedes", name: "Mercedes" },
  { id: "porsche", name: "Porsche" },
  { id: "toyota", name: "Toyota" },
  { id: "honda", name: "Honda" },
  { id: "bmw", name: "BMW" },
];

const BRAND_HERO = {
  bmw: "../images/bmw/bmw-x5/X5-img1.avif",
  honda: "../images/honda/CR-V/CRV-img4.avif",
  mercedes: "../images/mercedes/AMGS63/AMGS63-img4.avif",
  toyota: "../images/toyota/corollacross/corollacross-img1.jpg",
  vinfast: "../images/vinfast/VF8/VF8-img3.avif",
  porsche: "../images/porsche/911/911-img1.jpg",
};

const BRAND_INTRO = {
  bmw: "BMW, short for Bayerische Motoren Werke, is a globally renowned German automaker known for its dynamic blend of luxury, innovation, and precision engineering. Founded in 1916, BMW has built a strong legacy of crafting vehicles that deliver exceptional performance and driving pleasure. Its philosophy, “The Ultimate Driving Machine,” captures the brand’s dedication to superior handling and advanced technology. From sporty sedans and SUVs to electric models under the BMW i lineup, every vehicle reflects refined craftsmanship and forward-thinking design. BMW also leads in sustainability through innovation in electric mobility and digitalization. Today, the brand stands as a symbol of performance, prestige, and progress in the automotive world.",
  honda: "Honda is a Japanese automobile and motorcycle manufacturer celebrated worldwide for its reliability, fuel efficiency, and customer-focused engineering. Since its founding in 1948, Honda has consistently delivered vehicles that combine practicality, innovation, and environmental responsibility. Known for producing durable cars like the Civic and Accord, the company also leads in hybrid and electric technologies. Honda’s philosophy, “The Power of Dreams,” reflects its commitment to creativity and human-centered design. Beyond automobiles, Honda’s achievements extend to robotics, aviation, and renewable energy. With a strong focus on safety and sustainability, Honda continues to make mobility accessible and enjoyable for everyone.",
  mercedes: "Mercedes-Benz is one of the world’s most prestigious automotive brands, symbolizing elegance, innovation, and superior craftsmanship. Founded in 1926 in Germany, the company has long been associated with the phrase “The Best or Nothing,” embodying its pursuit of perfection. From luxurious sedans and SUVs to high-performance AMG models, Mercedes combines timeless design with cutting-edge technology. The brand has been a pioneer in automotive safety, comfort, and electrification. Through its EQ lineup, Mercedes leads the transition toward sustainable luxury mobility. Every Mercedes vehicle represents a perfect harmony of performance, sophistication, and advanced engineering.",
  toyota: "Toyota, founded in 1937, is a Japanese automotive giant known for building reliable, durable, and efficient vehicles. The brand has earned global trust through its consistent quality and forward-looking innovation. Toyota revolutionized the industry with the introduction of the Prius, the world’s first mass-produced hybrid car. Guided by its philosophy of continuous improvement (Kaizen), Toyota invests heavily in sustainability and mobility technologies. Its lineup spans from affordable compact cars to luxury SUVs and advanced electric vehicles. Today, Toyota continues to lead the way toward a greener, smarter, and more connected automotive future.",
  vinfast: "VinFast is a rising Vietnamese automotive brand founded in 2017 under the Vingroup conglomerate. Despite its young age, the company has rapidly gained international recognition for its bold designs, advanced technologies, and commitment to electric mobility. VinFast aims to bring Vietnam onto the global automotive map by producing intelligent, eco-friendly vehicles. The brand’s focus on innovation and sustainability reflects its vision of “driving the movement of the future.” With operations expanding to North America and Europe, VinFast is not only building cars but also redefining the image of modern Vietnamese industry. It represents ambition, transformation, and national pride in every vehicle.",
  porsche: "Porsche is a legendary German automaker synonymous with performance, precision, and timeless design. Established in 1931 by Ferdinand Porsche, the brand is best known for its iconic 911 sports car, a global symbol of engineering excellence. Every Porsche combines thrilling performance with refined luxury, embodying the spirit of racing and innovation. The company’s expansion into electric vehicles, like the Taycan, marks its evolution toward a sustainable future without compromising driving emotion. Porsche vehicles stand out for their craftsmanship, attention to detail, and driver-centered design. For decades, Porsche has represented the perfect balance between heritage, technology, and passion for speed."
};

const BRAND_LOGOS = {
  bmw: "../images/logos/bmw-logo.png",
  honda: "../images/logos/honda-logo.png",
  mercedes: "../images/logos/mercedes-logo.png",
  porsche: "../images/logos/porsche-logo.png",
  toyota: "../images/logos/toyota-logo.png",
  vinfast: "../images/logos/vinfast-logo.png",
};

const COMPETITOR_MAP = {
  vinfast: ["toyota", "honda", "bmw", "mercedes", "porsche"],
  mercedes: ["bmw", "porsche", "vinfast", "toyota", "honda"],
  porsche: ["bmw", "mercedes", "vinfast", "toyota", "honda"],
  toyota: ["honda", "bmw", "mercedes", "vinfast", "porsche"],
  honda: ["toyota", "bmw", "mercedes", "vinfast", "porsche"],
  bmw: ["mercedes", "porsche", "toyota", "honda", "vinfast"],
};

let CURRENT_BRAND_ID = null;
let LOADED_CARS = [];

const PAGE_SIZE = 8;
let CURRENT_PAGE = 0;
let CURRENT_FILTER = "all";
let CURRENT_LIST = [];

/* --------- Helpers --------- */
function getBrandFromURL() {
  const url = new URL(window.location.href);
  const q = (url.searchParams.get("brand") || "").toLowerCase();
  const allowed = ALLOWED_BRANDS.map((b) => b.id);
  return allowed.includes(q) ? q : "vinfast";
}

function hydrateHero(id) {
  const meta = ALLOWED_BRANDS.find((b) => b.id === id);
  const brandName = meta?.name || id;
  const brandEl = document.getElementById("brand");
  const changeBtn = document.getElementById("change-brand");
  const hero = document.getElementById("hero");
  const p = document.getElementById("main-paragraph");

  if (brandEl) brandEl.textContent = brandName;
  if (changeBtn) changeBtn.textContent = brandName;
  if (hero) hero.src = BRAND_HERO[id] || "";
  if (p) p.textContent = BRAND_INTRO[id] || "";
}

/* --------- Popup chọn brand --------- */
function renderBrandPopup(currentId) {
  const overlay = document.createElement("div");
  overlay.className = "brand-overlay";
  overlay.innerHTML = `
    <div class="brand-modal">
      <div class="brand-modal-header">
        <h4>Choose a brand</h4>
        <button class="brand-modal-close">✕</button>
      </div>
      <div class="brand-modal-body"></div>
    </div>
  `;
  const body = overlay.querySelector(".brand-modal-body");
  ALLOWED_BRANDS.forEach((b) => {
    const row = document.createElement("button");
    row.className = "brand-row";
    row.dataset.brand = b.id;
    row.innerHTML = `
      <span>${b.name}</span>
      <span class="radio ${b.id === currentId ? "checked" : ""}"></span>
    `;
    body.appendChild(row);
  });

  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");

  overlay.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("brand-overlay") ||
      e.target.classList.contains("brand-modal-close")
    ) {
      overlay.remove();
      document.body.classList.remove("no-scroll");
    }
  });

  body.addEventListener("click", (e) => {
    const btn = e.target.closest(".brand-row");
    if (!btn) return;
    const id = btn.dataset.brand;
    window.location.href = `./Brand.html?brand=${encodeURIComponent(id)}`;
  });
}

/* --------- Chuẩn hóa & tách nhiều loại --------- */
function normalizeType(t) {
  const val = (t || "").toString().toLowerCase().trim();
  if (!val) return "";
  if (/(bev|ev|electric|phev|plug[-\s]?in)/.test(val)) return "ev";
  if (/suv/.test(val)) return "suv";
  if (/sedan/.test(val)) return "sedan";
  if (/coupe/.test(val)) return "coupe";
  if (/convertible|cabrio/.test(val)) return "convertible";
  return val;
}

function expandTypes(raw) {
  // raw có thể là chuỗi: "SUV, EV" hoặc mảng: ["SUV","EV"]
  if (Array.isArray(raw)) return raw.map(normalizeType).filter(Boolean);
  return raw
    ? String(raw)
        .split(/[,/|;]+/)
        .map(normalizeType)
        .filter(Boolean)
    : [];
}

/* --------- Dedup + Filter --------- */
function buildFilteredList(filter = "all") {
  if (!Array.isArray(LOADED_CARS)) return [];

  const pre = LOADED_CARS.filter((car) => {
    if (filter === "all") return true;
    const types = expandTypes(car.type || car.category || "");
    return types.includes(filter);
  });

  // khử trùng theo tên (không phân biệt hoa/thường, trim)
  const seen = new Set();
  const out = [];
  for (const car of pre) {
    const key = (car.name || "").toString().trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(car);
  }
  return out;
}

/* --------- Pagination Rendering --------- */
function renderPage() {
  const container = document.getElementById("lineup-list");
  const pager = ensurePagerContainer();
  if (!container) return;

  container.innerHTML = "";

  if (!CURRENT_LIST.length) {
    container.innerHTML = `<p class="lineup-empty">No cars found</p>`;
    if (pager) pager.innerHTML = "";
    return;
  }

  const totalPages = Math.ceil(CURRENT_LIST.length / PAGE_SIZE);
  CURRENT_PAGE = Math.min(Math.max(0, CURRENT_PAGE), totalPages - 1);

  const start = CURRENT_PAGE * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const slice = CURRENT_LIST.slice(start, end);

  slice.forEach((car) => {
    const card = document.createElement("div");
    card.className = "lineup-card";
    card.innerHTML = `
      <div class="lineup-thumb">
        <img src="${car.display}" alt="${car.name}">
      </div>
      <div class="lineup-info">
        <h4>${car.name}</h4>
        <p class="type">${car.type || ""}</p>
        ${car.priceUSD ? `<p class="price">$${Number(car.priceUSD).toLocaleString()}</p>` : ""}
        <a class="view-btn cta" href="car.html?brand=${encodeURIComponent(CURRENT_BRAND_ID)}&id=${encodeURIComponent(car.id)}">
          Shop now
        </a>
      </div>
    `;
    container.appendChild(card);
  });

  renderPaginationControls(pager, totalPages);
}

function ensurePagerContainer() {
  let pager = document.getElementById("lineup-pager");
  if (!pager) {
    pager = document.createElement("div");
    pager.id = "lineup-pager";
    pager.className = "pager-container";
    const host = document.querySelector(".brand-lineup");
    if (host) host.appendChild(pager);
  }
  return pager;
}

function renderPaginationControls(pager, totalPages) {
  if (!pager) return;
  pager.innerHTML = `
    <button class="pager-btn prev" ${CURRENT_PAGE === 0 ? "disabled" : ""}>‹</button>
    <div class="pager-dots"></div>
    <button class="pager-btn next" ${CURRENT_PAGE >= totalPages - 1 ? "disabled" : ""}>›</button>
  `;
  const dotsWrap = pager.querySelector(".pager-dots");

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");
    dot.className = `pager-dot ${i === CURRENT_PAGE ? "active" : ""}`;
    dot.dataset.page = i;
    dotsWrap.appendChild(dot);
  }

  pager.querySelector(".prev").onclick = () => {
    if (CURRENT_PAGE > 0) {
      CURRENT_PAGE--;
      renderPage();
    }
  };
  pager.querySelector(".next").onclick = () => {
    if (CURRENT_PAGE < totalPages - 1) {
      CURRENT_PAGE++;
      renderPage();
    }
  };
  dotsWrap.addEventListener("click", (e) => {
    const dot = e.target.closest(".pager-dot");
    if (!dot) return;
    CURRENT_PAGE = Number(dot.dataset.page);
    renderPage();
  });
}

/* --------- Filter Buttons (auto map text -> data-filter nếu thiếu) --------- */
function setupFilters() {
  const btns = Array.from(document.querySelectorAll(".lineup-buttons .category"));
  if (!btns.length) return;

  // ánh xạ text -> filter slug
  const textToFilter = (txt) => {
    const t = (txt || "").toLowerCase().trim();
    if (t === "all models" || t === "all") return "all";
    if (t === "suv" || t === "suvs") return "suv";
    if (t === "sedan" || t === "sedans") return "sedan";
    if (t === "ev" || t === "evs" || t.includes("electric")) return "ev";
    if (t === "coupe" || t === "coupes") return "coupe";
    if (t === "convertible" || t === "convertibles" || t.includes("cabrio")) return "convertible";
    // fall back: dùng luôn text
    return t || "all";
  };

  // gán data-filter nếu chưa có
  btns.forEach((btn) => {
    if (!btn.dataset.filter) {
      btn.dataset.filter = textToFilter(btn.textContent);
    }
  });

  // set active ban đầu cho nút All (hoặc theo CURRENT_FILTER)
  btns.forEach((b) => b.classList.remove("active"));
  const first = btns.find((b) => (b.dataset.filter || "") === CURRENT_FILTER) || btns[0];
  if (first) first.classList.add("active");

  // gắn click
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      CURRENT_FILTER = btn.dataset.filter || "all";
      CURRENT_PAGE = 0;
      CURRENT_LIST = buildFilteredList(CURRENT_FILTER);
      renderPage();
    });
  });
}

/* --------- Load JSON --------- */
async function loadLineup(brandId) {
  LOADED_CARS = [];
  const path = `../data/${brandId}.json`;
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      LOADED_CARS = Array.isArray(data.cars) ? data.cars : [];
    }
  } catch (e) {
    console.warn("Load lineup error:", e);
  }
  CURRENT_LIST = buildFilteredList("all");
  renderPage();
}

/* --------- Competitors --------- */
function renderCompetitors(id) {
  const wrap = document.getElementById("competitor-list");
  if (!wrap) return;
  wrap.innerHTML = "";
  const list = (COMPETITOR_MAP[id] || []).slice(0, 6);
  list.forEach((cid) => {
    const a = document.createElement("a");
    a.className = "competitor-card";
    a.href = `./Brand.html?brand=${cid}`;
    a.innerHTML = `
      <img src="${BRAND_LOGOS[cid]}" alt="${cid} logo" class="competitor-logo">
      <p class="competitor-name">${cid.toUpperCase()}</p>
    `;
    wrap.appendChild(a);
  });
}

/* --------- Main Init --------- */
(function init() {
  CURRENT_BRAND_ID = getBrandFromURL();
  hydrateHero(CURRENT_BRAND_ID);
  setupFilters();
  loadLineup(CURRENT_BRAND_ID);
  renderCompetitors(CURRENT_BRAND_ID);

  const btn = document.getElementById("change-brand");
  if (btn) btn.addEventListener("click", () => renderBrandPopup(CURRENT_BRAND_ID));
})();
