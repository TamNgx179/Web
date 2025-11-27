// ================ PRELOADER ================
// IIFE (Immediately Invoked Function Expression) để xử lý preloader
(function () {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('is-loading'); // Thêm class vào body khi đang tải

  // Chờ toàn bộ trang tải xong
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide'); // Ẩn preloader trên giao diện
      document.body.classList.remove('is-loading'); // Xóa class loading
      setTimeout(() => preloader?.remove(), 500); // Xóa preloader khỏi DOM sau animation
    }, 600); // Thời gian giữ preloader hiển thị 0.6s
  });
})();


// ================== Bộ đếm giỏ hàng ======================
// Load danh sách xe đã chọn từ localStorage
let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];

(function () {
  const CART_KEY = "selectedcar"; // Key lưu trữ trong localStorage

  // Hàm lấy dữ liệu giỏ hàng từ localStorage
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

  // Hàm cập nhật số lượng trong giỏ trên thanh điều hướng
  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = String(getCart().length); // Hiển thị số lượng sản phẩm
    }
  }

  // Chạy khi DOM đã load xong
  document.addEventListener("DOMContentLoaded", function () {
    updateCounter(); // Cập nhật bộ đếm
  });
})();


// ================== Kiểm tra form liên hệ ==================
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Ngăn sự kiện submit mặc định

    // Lấy các ô input
    const name = document.getElementById("username");
    const email = document.getElementById("mail");
    const phone = document.getElementById("phone_number");
    const message = document.getElementById("Message");

    let isValid = true; // Cờ kiểm tra tính hợp lệ của form

    // Xóa lỗi cũ
    clearError(name);
    clearError(email);
    clearError(phone);
    clearError(message);

    // --- Kiểm tra Tên ---
    // Không được để trống, không có dấu cách liên tiếp, không chứa số
    if (name.value.trim() === "" || name.value.trim().includes("  ") || /\d/.test(name.value.trim())) {
        showError(name, "Vui lòng nhập tên hợp lệ");
        isValid = false;
    }

    // --- Kiểm tra Email ---
    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Vui lòng nhập email hợp lệ");
        isValid = false;
    }

    // --- Kiểm tra Số điện thoại ---
    // Phải từ 9–11 số
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, "Số điện thoại phải từ 9–11 chữ số");
        isValid = false;
    }

    // --- Kiểm tra Nội dung ---
    // Tối thiểu 10 ký tự
    if (message.value.trim().length < 10) {
        showError(message, "Nội dung phải tối thiểu 10 ký tự");
        isValid = false;
    }

    // Nếu tất cả hợp lệ → gửi thành công
    if (isValid) {
        showToast("Tin nhắn đã được gửi thành công!");
    }

    // ================== Hàm hiển thị thông báo Toast ==================
    function showToast(msg) {
        const toast = document.getElementById("toast");
        toast.innerText = msg;
        toast.classList.add("show");

        // Tự ẩn sau 3 giây
        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
});

// ================== Hàm hỗ trợ ==================

// Hàm hiển thị lỗi dưới input
function showError(input, msg) {
    input.classList.add("error-border"); // Thêm viền đỏ

    const error = document.createElement("div");
    error.className = "error"; // Class CSS cho lỗi
    error.innerText = msg;

    input.parentNode.appendChild(error); // Chèn lỗi ngay dưới input
}

// Hàm xóa lỗi cũ
function clearError(input) {
    input.classList.remove("error-border"); // Xóa viền đỏ
    const next = input.parentNode.querySelector(".error");
    if (next) next.remove(); // Xóa phần tử lỗi
}
