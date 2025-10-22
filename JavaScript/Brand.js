// ====== Brand.js (hoàn chỉnh với multi-brand data) ======

const ALLOWED_BRANDS = [
  { id: "vinfast",  name: "VinFast" },
  { id: "mercedes", name: "Mercedes" },
  { id: "porsche",  name: "Porsche" },
  { id: "toyota",   name: "Toyota" },
  { id: "honda",    name: "Honda" },
  { id: "bmw",      name: "BMW" },
];

const BRAND_HERO = {
  bmw:     "../images/bmw/bmw-x5/X5-img1.avif",
  honda:   "../images/honda/CR-V/CRV-img4.avif",
  mercedes:"../images/mercedes/AMGS63/AMGS63-img4.avif",
  toyota:  "../images/toyota/corollacross/corollacross-img1.jpg",
  vinfast: "../images/vinfast/VF8/VF8-img3.avif",
  porsche: "../images/porsche/911/911-img1.jpg"
};

const BRAND_INTRO = {
  bmw: "BMW, short for Bayerische Motoren Werke, is a globally renowned German automaker known for its dynamic blend of luxury, innovation, and precision engineering. Founded in 1916, BMW has built a strong legacy of crafting vehicles that deliver exceptional performance and driving pleasure. Its philosophy, “The Ultimate Driving Machine,” captures the brand’s dedication to superior handling and advanced technology. From sporty sedans and SUVs to electric models under the BMW i lineup, every vehicle reflects refined craftsmanship and forward-thinking design. BMW also leads in sustainability through innovation in electric mobility and digitalization. Today, the brand stands as a symbol of performance, prestige, and progress in the automotive world.",
  honda: "Honda is a Japanese automobile and motorcycle manufacturer celebrated worldwide for its reliability, fuel efficiency, and customer-focused engineering. Since its founding in 1948, Honda has consistently delivered vehicles that combine practicality, innovation, and environmental responsibility. Known for producing durable cars like the Civic and Accord, the company also leads in hybrid and electric technologies. Honda’s philosophy, “The Power of Dreams,” reflects its commitment to creativity and human-centered design. Beyond automobiles, Honda’s achievements extend to robotics, aviation, and renewable energy. With a strong focus on safety and sustainability, Honda continues to make mobility accessible and enjoyable for everyone.",
  mercedes: "Mercedes-Benz is one of the world’s most prestigious automotive brands, symbolizing elegance, innovation, and superior craftsmanship. Founded in 1926 in Germany, the company has long been associated with the phrase “The Best or Nothing,” embodying its pursuit of perfection. From luxurious sedans and SUVs to high-performance AMG models, Mercedes combines timeless design with cutting-edge technology. The brand has been a pioneer in automotive safety, comfort, and electrification. Through its EQ lineup, Mercedes leads the transition toward sustainable luxury mobility. Every Mercedes vehicle represents a perfect harmony of performance, sophistication, and advanced engineering.",
  toyota: "Toyota, founded in 1937, is a Japanese automotive giant known for building reliable, durable, and efficient vehicles. The brand has earned global trust through its consistent quality and forward-looking innovation. Toyota revolutionized the industry with the introduction of the Prius, the world’s first mass-produced hybrid car. Guided by its philosophy of continuous improvement (Kaizen), Toyota invests heavily in sustainability and mobility technologies. Its lineup spans from affordable compact cars to luxury SUVs and advanced electric vehicles. Today, Toyota continues to lead the way toward a greener, smarter, and more connected automotive future.",
  vinfast: "VinFast is a rising Vietnamese automotive brand founded in 2017 under the Vingroup conglomerate. Despite its young age, the company has rapidly gained international recognition for its bold designs, advanced technologies, and commitment to electric mobility. VinFast aims to bring Vietnam onto the global automotive map by producing intelligent, eco-friendly vehicles. The brand’s focus on innovation and sustainability reflects its vision of “driving the movement of the future.” With operations expanding to North America and Europe, VinFast is not only building cars but also redefining the image of modern Vietnamese industry. It represents ambition, transformation, and national pride in every vehicle.",
  porsche: "Porsche is a legendary German automaker synonymous with performance, precision, and timeless design. Established in 1931 by Ferdinand Porsche, the brand is best known for its iconic 911 sports car, a global symbol of engineering excellence. Every Porsche combines thrilling performance with refined luxury, embodying the spirit of racing and innovation. The company’s expansion into electric vehicles, like the Taycan, marks its evolution toward a sustainable future without compromising driving emotion. Porsche vehicles stand out for their craftsmanship, attention to detail, and driver-centered design. For decades, Porsche has represented the perfect balance between heritage, technology, and passion for speed."
};

let CURRENT_BRAND_ID = null;
let LOADED_CARS = [];

/** ========== Helper functions ========== */
function getBrandFromURL() {
  const url = new URL(window.location.href);
  const q = (url.searchParams.get("brand") || "").toLowerCase();
  const allowedIds = ALLOWED_BRANDS.map(b => b.id);
  return allowedIds.includes(q) ? q : "vinfast";
}

function hydrateHero(brandId) {
  const meta = ALLOWED_BRANDS.find(b => b.id === brandId);
  const brandName = meta ? meta.name : brandId;

  document.getElementById("brand").textContent = brandName;
  document.getElementById("change-brand").textContent = brandName;
  document.getElementById("hero").src = BRAND_HERO[brandId] || BRAND_HERO["vinfast"];
  document.getElementById("main-paragraph").textContent = BRAND_INTRO[brandId] || "";
}

/** ========== Popup chọn brand ========== */
function renderBrandPopup(currentId) {
  const overlay = document.createElement("div");
  overlay.className = "brand-overlay";
  overlay.innerHTML = `
    <div class="brand-modal">
      <div class="brand-modal-header">
        <h4>Choose a brand</h4>
        <button class="brand-modal-close" aria-label="Close">✕</button>
      </div>
      <div class="brand-modal-body"></div>
    </div>
  `;

  const body = overlay.querySelector(".brand-modal-body");
  ALLOWED_BRANDS.forEach(b => {
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
  document.getElementById("change-brand").classList.add("open");

  overlay.addEventListener("click", e => {
    if (e.target.classList.contains("brand-overlay") || e.target.classList.contains("brand-modal-close")) {
      closePopup();
    }
  });
  body.addEventListener("click", e => {
    const btn = e.target.closest(".brand-row");
    if (!btn) return;
    const id = btn.dataset.brand;
    window.location.href = `./Brand.html?brand=${encodeURIComponent(id)}`;
  });

  function closePopup() {
    overlay.remove();
    document.body.classList.remove("no-scroll");
    document.getElementById("change-brand").classList.remove("open");
  }
}

/** ========== Chuẩn hóa type để lọc ========== */
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

/** ========== Render card lineup ========== */
/** ========== Render card lineup ========== */
function renderCards(filter = "all") {
  const container = document.getElementById("lineup-list");
  container.innerHTML = "";

  if (!LOADED_CARS.length) {
    container.innerHTML = `<p class="lineup-empty">No information yet</p>`;
    return;
  }

  const list = LOADED_CARS.filter(car => {
    if (filter === "all") return true;
    const raw = car.type || car.category || "";
    const types = Array.isArray(raw)
      ? raw.map(normalizeType)
      : raw.split(/[,/|]/).map(normalizeType);
    return types.includes(filter);
  });

  if (!list.length) {
    container.innerHTML = `<p class="lineup-empty">No information yet</p>`;
    return;
  }

  // === Giữ nguyên cấu trúc thẻ card ===
  const frag = document.createDocumentFragment();
  list.forEach(car => {
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
    frag.appendChild(card);
  });
  container.appendChild(frag);
}

/** ========== Gắn sự kiện cho các nút category ========== */
function setupFilters() {
  const btns = Array.from(document.querySelectorAll(".lineup-buttons .category"));
  if (!btns.length) return;

  btns.forEach(btn => {
    if (!btn.dataset.filter) {
      const text = btn.textContent.trim().toLowerCase();
      const map = {
        "all models": "all", all: "all", suv: "suv", sedans: "sedan",
        sedan: "sedan", evs: "ev", ev: "ev", coupes: "coupe",
        coupe: "coupe", convertibles: "convertible", convertible: "convertible"
      };
      btn.dataset.filter = map[text] || text;
    }
  });

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCards(btn.dataset.filter || "all");
    });
  });
}

/** ========== Load JSON lineup theo brand ========== */
async function loadLineup(brandId) {
  LOADED_CARS = [];
  const jsonPath = `../data/${brandId}.json`;

  try {
    const res = await fetch(jsonPath, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      LOADED_CARS = Array.isArray(data.cars) ? data.cars : [];
    }
  } catch (err) {
    console.warn(`Không thể tải ${jsonPath}`, err);
  }

  renderCards("all");
}

/** ========== Main init ========== */
(function init() {
  CURRENT_BRAND_ID = getBrandFromURL();
  hydrateHero(CURRENT_BRAND_ID);
  setupFilters();
  loadLineup(CURRENT_BRAND_ID);
  document.getElementById("change-brand").addEventListener("click", () => renderBrandPopup(CURRENT_BRAND_ID));
})();