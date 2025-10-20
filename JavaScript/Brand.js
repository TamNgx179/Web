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
  honda:   "../images/honda/civic/civic-img3.jpg",
  mercedes:"../images/mercedes/EQE350/EQE350-img4.jpg",
  toyota:  "../images/toyota/camry/camry-img3.avif",
  vinfast: "../images/vinfast/VF9/VF9-img3.avif",
  porsche: "../images/porsche/911/911-img1.jpg"
};

const BRAND_INTRO = {
  bmw: "BMW nổi tiếng với cảm giác lái phấn khích, công nghệ tiên tiến và thiết kế đậm chất thể thao trong từng dòng xe từ sedan đến SAV.",
  honda: "Honda cân bằng giữa hiệu quả, độ bền và giá trị sử dụng — phù hợp cho nhu cầu hằng ngày nhưng vẫn đủ thú vị khi cầm lái.",
  mercedes: "Mercedes-Benz đại diện cho sự sang trọng và tinh tế của Đức, tập trung vào tiện nghi, an toàn và hệ sinh thái xe điện EQ.",
  toyota: "Toyota chú trọng độ bền, tiết kiệm và chi phí sở hữu hợp lý; danh mục trải dài từ sedan, SUV đến các mẫu hybrid nổi bật.",
  vinfast: "VinFast là thương hiệu Việt Nam định hướng xe điện toàn cầu, tập trung thiết kế hiện đại, công nghệ thông minh và dịch vụ linh hoạt.",
  porsche: "Porsche kết hợp di sản hiệu năng với kỹ thuật tỉ mỉ của Đức, mang trải nghiệm lái thể thao từ 911 đến dòng Taycan thuần điện."
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
function renderCards(filter = "all") {
  const container = document.getElementById("lineup-list");
  container.innerHTML = "";

  if (!LOADED_CARS.length) {
    container.innerHTML = `<p class="lineup-empty">Hiện tại chưa có thông tin</p>`;
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
    container.innerHTML = `<p class="lineup-empty">Hiện tại chưa có thông tin</p>`;
    return;
  }

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
        <a class="view-btn" href="../HTML/car.html?car=${encodeURIComponent(car.id)}">View</a>
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
