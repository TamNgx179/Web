// ====== URL params ======
const params = new URLSearchParams(location.search);
const brandId = params.get("brand");
const carId   = params.get("id");

// ====== Map hãng -> file JSON ======
const BRAND_SOURCES = {
  honda: "../data/honda.json",
  bmw: "../data/bmw.json",
  toyota: "../data/toyota.json",
  vinfast: "../data/vinfast.json",
  mercedes: "../data/mercedes.json"
};

// ====== DOM refs ======
const els = {
  title: document.getElementById("title"),
  price: document.getElementById("price"),
  hero: document.getElementById("hero"),
  gallery: document.getElementById("gallery"),
  specsTable: document.getElementById("specsTable"),
  safety: document.getElementById("safety"),
  convenience: document.getElementById("convenience"),
  purchaseBtn: document.getElementById("purchaseBtn"),

  // lightbox
  lb: document.getElementById("lightbox"),
  lbImg: document.getElementById("lbImg"),
  lbPrev: document.getElementById("lbPrev"),
  lbNext: document.getElementById("lbNext"),
  lbClose: document.getElementById("lbClose"),
  lbCounter: document.getElementById("lbCounter"),
};

// ====== Helpers ======
function clear(el){ while (el.firstChild) el.removeChild(el.firstChild); }
function fmtUSD(v){
  try { return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(v); }
  catch(_e){ return "$" + v; }
}

// ====== Lightbox state ======
let gallerySources = [];
let currentIndex = 0;

function openLightbox(i){
  if (!gallerySources.length) return;
  currentIndex = (i + gallerySources.length) % gallerySources.length;
  els.lbImg.src = gallerySources[currentIndex];
  els.lbCounter.textContent = `${currentIndex + 1} of ${gallerySources.length}`;
  els.lb.classList.remove("hidden");
  els.lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  els.lb.classList.add("hidden");
  els.lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextImage(step){
  openLightbox(currentIndex + step);
}

// ====== Main ======
(async function init(){
  if (!brandId || !carId || !BRAND_SOURCES[brandId]) {
    if (els.title) els.title.textContent = "Không tìm thấy xe";
    return;
  }

  let data;
  try {
    const res = await fetch(BRAND_SOURCES[brandId]);
    data = await res.json();
  } catch(e){
    if (els.title) els.title.textContent = "Lỗi tải dữ liệu";
    return;
  }

  // mảng xe
  let cars = [];
  if (Array.isArray(data?.cars)) cars = data.cars;
  else if (Array.isArray(data)) cars = data;

  // tìm xe theo id
  let car = cars.find(c => String(c.id) === String(carId));
  if (!car) {
    if (els.title) els.title.textContent = "Không tìm thấy xe";
    return;
  }

  // ===== Render =====
  const name = car.name || carId;
  document.title = name;
  if (els.title) els.title.textContent = name;

  // price
  els.price.textContent = (typeof car.priceUSD !== "undefined") ? fmtUSD(car.priceUSD) : "";

  // hero image
  if (car.hero) { els.hero.src = car.hero; els.hero.alt = name; }
  else if (car.display) { els.hero.src = car.display; els.hero.alt = name; }
  else if (els.hero?.parentElement) { els.hero.parentElement.style.display = "none"; }

  // gallery
  clear(els.gallery);
  gallerySources = Array.isArray(car.gallery) ? car.gallery.slice() : [];
  gallerySources.forEach((src, i) => {
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = src;
    img.alt = `${name} photo ${i+1}`;
    img.addEventListener("click", () => openLightbox(i));
    els.gallery.appendChild(img);
  });

  // specs table
  clear(els.specsTable);
  const specs = car.specs || {};
  Object.keys(specs).forEach(k => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = k;
    td.textContent = String(specs[k]);
    tr.appendChild(th); tr.appendChild(td);
    els.specsTable.appendChild(tr);
  });

  // safety & convenience
  clear(els.safety);
  (car.safety || []).forEach(item => {
    const li = document.createElement("li"); li.textContent = item;
    els.safety.appendChild(li);
  });
  clear(els.convenience);
  (car.convenience || []).forEach(item => {
    const li = document.createElement("li"); li.textContent = item;
    els.convenience.appendChild(li);
  });

  // purchase btn
  els.purchaseBtn?.addEventListener("click", () => {
    alert("Bạn đã chọn mua: " + name);
  });

  // ===== Lightbox events =====
  els.lbPrev?.addEventListener("click", () => nextImage(-1));
  els.lbNext?.addEventListener("click", () => nextImage(1));
  els.lbClose?.addEventListener("click", closeLightbox);
  els.lb?.addEventListener("click", (e) => {
    // click nền tối để đóng (không đóng khi click vào ảnh hoặc nút)
    if (e.target === els.lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (els.lb.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") nextImage(-1);
    if (e.key === "ArrowRight") nextImage(1);
  });
})();
