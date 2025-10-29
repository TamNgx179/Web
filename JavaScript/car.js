// ================ AUTH POPUP CONTROL ================
(function () {
  const trigger = document.getElementById("popup-login"); 
  const modal   = document.getElementById("auth-modal");
  const close   = document.getElementById("auth-close");
  const vSignin = document.getElementById("view-signin");
  const vSignup = document.getElementById("view-signup");
  const toSignup= document.getElementById("to-signup");
  const toSignin= document.getElementById("to-signin");

  if (!trigger || !modal) return;

  const open = (view="signin") => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    if (view === "signin") {
      vSignin.classList.add("active");
      vSignup.classList.remove("active");
      setTimeout(() => document.getElementById("si-email")?.focus(), 0);
    } else {
      vSignup.classList.add("active");
      vSignin.classList.remove("active");
      setTimeout(() => document.getElementById("su-name")?.focus(), 0);
    }
  };
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  trigger.addEventListener("click", () => open("signin"));
  close.addEventListener("click", closeModal);

  toSignup.addEventListener("click", (e) => { e.preventDefault(); open("signup"); });
  toSignin.addEventListener("click", (e) => { e.preventDefault(); open("signin"); });

  // click nền đen để đóng
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  // phím ESC để đóng
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("active")) closeModal(); });
})();

const params = new URLSearchParams(location.search);
const brandId = params.get("brand"); 
const carId = params.get("id");      

const BRAND_SOURCES = {
  honda: "../data/honda.json",
  bmw: "../data/bmw.json",
  toyota: "../data/toyota.json",
  vinfast: "../data/vinfast.json",
  mercedes: "../data/mercedes.json",
  porsche: "../data/porsche.json"
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
/* ========= APPEND-ONLY: CART PUSH + COUNTER + EMPTY POPUP ========= */
(function () {
  // ====== KHÓA DỮ LIỆU TRONG LOCAL STORAGE ======
  const CART_KEY = "selectedcar";

  // ====== LẤY DANH SÁCH XE TRONG GIỎ ======
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

  // ====== LƯU GIỎ XE LÊN LOCAL STORAGE ======
  function setCart(cartArray) {
    localStorage.setItem(CART_KEY, JSON.stringify(cartArray));
    updateCounter();
  }

  // ====== CẬP NHẬT SỐ XE HIỂN THỊ TRÊN ICON GIỎ HÀNG ======
  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = String(getCart().length);
    }
  }


  // ====== LẤY DỮ LIỆU XE THEO brandId VÀ carId ======
  async function fetchCarByParams() {
    try {
      if (!brandId || !carId || !BRAND_SOURCES[brandId]) {
        return null;
      }

      const response = await fetch(BRAND_SOURCES[brandId]);
      const data = await response.json();

      // Lấy danh sách xe trong JSON
      let cars = [];
      if (Array.isArray(data.cars)) {
        cars = data.cars;
      } else if (Array.isArray(data)) {
        cars = data;
      }

      // Tìm xe có id khớp
      const found = cars.find(function (car) {
        return String(car.id) === String(carId);
      });

      return found || null;
    } catch (error) {
      return null;
    }
  }

  // ====== CHUYỂN SỐ TIỀN THÀNH DẠNG $x,xxx ======
  function formatUSD(value) {
    const number = Number(String(value).replace(/[^\d.]/g, ""));
    if (isNaN(number)) return "$0";
    return "$" + number.toLocaleString("en-US");
  }

  // ====== TẠO ĐỐI TƯỢNG XE DÙNG ĐỂ LƯU VÀO GIỎ ======
  function buildCartItem(car) {
    const name = car.name || "Unknown car";
    const img = car.display || car.hero || car.image || "";
    const specs = car.specs || {};

    const weight = specs["Weight"] || specs["weight"] || "N/A";
    const power = specs["Power"] || specs["Horsepower"] || "N/A";
    const speed =
      specs["Top Speed"] || specs["Top speed"] || specs["Max speed"] || "N/A";

    const price = formatUSD(car.priceUSD || car.price || 0);

    return {
      id: (brandId + ":" + (car.id || name)).toLowerCase(),
      name: name,
      img: img,
      weight: weight,
      power: power,
      speed: speed,
      price: price
    };
  }

  // ====== HÀM THÊM XE VÀO GIỎ KHI NGƯỜI DÙNG BẤM "PURCHASE" ======
  async function addCarToCart() {
    const car = await fetchCarByParams();
    if (!car) return;

    const item = buildCartItem(car);
    const cart = getCart();

    // Kiểm tra xem xe đã có trong giỏ chưa
    const alreadyInCart = cart.some(function (x) {
      return x.id === item.id;
    });

    if (!alreadyInCart) {
      cart.push(item);
    }

    setCart(cart);
    updateCounter();
  }

  // ====== KHI TRANG TẢI XONG ======
  document.addEventListener("DOMContentLoaded", function () {
    updateCounter();      // Cập nhật số xe

    const btn = document.getElementById("purchaseBtn");
    if (btn) {
      btn.addEventListener("click", addCarToCart);
    }
  });
})();


init();
