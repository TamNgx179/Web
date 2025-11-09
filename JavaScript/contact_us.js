// ================ PRELOADER ================
(function () {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('is-loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide');
      document.body.classList.remove('is-loading');
      setTimeout(() => preloader?.remove(), 500);
    }, 1400);
  });
})();

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