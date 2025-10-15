const params = new URLSearchParams(location.search);
const brandId = params.get("brand"); 
const carId = params.get("id");      

const BRAND_SOURCES = {
  honda: "../data/honda.json",
  bmw: "../data/bmw.json",
  toyota: "../data/toyota.json",
  vinfast: "../data/vinfast.json",
  mercedes: "../data/mercedes.json"
};

const els = {
  title: document.getElementById("title"),
  price: document.getElementById("price"),
  hero: document.getElementById("hero"),
  gallery: document.getElementById("gallery"),
  specsTable: document.getElementById("specsTable"),
  safety: document.getElementById("safety"),
  convenience: document.getElementById("convenience"),
  purchaseBtn: document.getElementById("purchaseBtn"),


  lb: document.getElementById("lightbox"),
  lbImg: document.getElementById("lbImg"),
  lbPrev: document.getElementById("lbPrev"),
  lbNext: document.getElementById("lbNext"),
  lbClose: document.getElementById("lbClose"),
  lbCounter: document.getElementById("lbCounter"),
};

// ====== HÀM HỖ TRỢ ======
// Xóa hết nội dung bên trong một phần tử
function clear(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// Định dạng số thành tiền USD
function formatUSD(value) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  } catch (error) {
    return "$" + value;
  }
}

// ====== LIGHTBOX ======
let gallerySources = []; 
let currentIndex = 0;    

// Mở lightbox tại ảnh thứ i
function openLightbox(i) {
  if (gallerySources.length === 0) return;

  // Nếu i vượt quá thì quay vòng lại
  currentIndex = (i + gallerySources.length) % gallerySources.length;

  els.lbImg.src = gallerySources[currentIndex];
  els.lbCounter.textContent = `${currentIndex + 1} / ${gallerySources.length}`;

  els.lb.classList.remove("hidden");
  els.lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Ẩn cuộn trang
}

function closeLightbox() {
  els.lb.classList.add("hidden");
  els.lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Chuyển ảnh kế hoặc lùi
function changeImage(step) {
  openLightbox(currentIndex + step);
}

// ====== HÀM CHÍNH ======
async function init() {
  if (!brandId || !carId || !BRAND_SOURCES[brandId]) {
    els.title.textContent = "Không tìm thấy xe";
    return;
  }

  let data;
  try {
    const response = await fetch(BRAND_SOURCES[brandId]);
    data = await response.json();
  } catch (error) {
    els.title.textContent = "Lỗi tải dữ liệu";
    return;
  }

  // ===== LẤY DANH SÁCH XE =====
  let cars = [];

  if (Array.isArray(data.cars)) {
    cars = data.cars;
  } else if (Array.isArray(data)) {
    cars = data;
  }

  // ===== TÌM XE THEO ID =====
  const car = cars.find(item => String(item.id) === String(carId));

  if (!car) {
    els.title.textContent = "Không tìm thấy xe";
    return;
  }

  // ===== HIỂN THỊ THÔNG TIN XE =====
  const name = car.name || "Xe không rõ tên";
  document.title = name;
  els.title.textContent = name;

  // Giá xe
  if (car.priceUSD !== undefined) {
    els.price.textContent = formatUSD(car.priceUSD);
  }

  // Ảnh chính 
  if (car.hero) {
    els.hero.src = car.hero;
  } else if (car.display) {
    els.hero.src = car.display;
  } else {
    // Nếu không có ảnh thì ẩn khung
    if (els.hero.parentElement) {
      els.hero.parentElement.style.display = "none";
    }
  }

  // ===== GALLERY =====
  clear(els.gallery);
  gallerySources = Array.isArray(car.gallery) ? car.gallery.slice() : [];

  gallerySources.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${name} - ảnh ${index + 1}`;
    img.loading = "lazy"; // Tải ảnh khi cần
    img.addEventListener("click", () => openLightbox(index));
    els.gallery.appendChild(img);
  });

  // ===== BẢNG THÔNG SỐ =====
  clear(els.specsTable);
  const specs = car.specs || {};

  for (const key in specs) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    const td = document.createElement("td");
    th.textContent = key;
    td.textContent = specs[key];
    tr.appendChild(th);
    tr.appendChild(td);
    els.specsTable.appendChild(tr);
  }

  // ===== Safety =====
  clear(els.safety);
  (car.safety || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    els.safety.appendChild(li);
  });

  // ===== Convenience =====
  clear(els.convenience);
  (car.convenience || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    els.convenience.appendChild(li);
  });

  // ===== NÚT MUA =====
  if (els.purchaseBtn) {
    els.purchaseBtn.addEventListener("click", () => {
      alert("Bạn đã chọn mua: " + name);
    });
  }

  // ===== SỰ KIỆN CHO LIGHTBOX =====
  if (els.lbPrev) els.lbPrev.addEventListener("click", () => changeImage(-1));
  if (els.lbNext) els.lbNext.addEventListener("click", () => changeImage(1));
  if (els.lbClose) els.lbClose.addEventListener("click", closeLightbox);

  // Nhấn nền tối để đóng
  if (els.lb) {
    els.lb.addEventListener("click", (e) => {
      if (e.target === els.lb) closeLightbox();
    });
  }

  // Bấm phím ESC hoặc mũi tên để điều khiển
  document.addEventListener("keydown", (e) => {
    if (els.lb.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
  });
}

init();
