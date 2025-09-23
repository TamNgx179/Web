let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  // Ẩn tất cả ảnh
  slides.forEach(slide => slide.classList.remove("active"));
  // Hiện ảnh hiện tại
  slides[index].classList.add("active");
  // Tăng chỉ số
  index = (index + 1) % slides.length;
}

// Chạy mỗi 3 giây
setInterval(showSlide, 3000);

// Hiện ngay ảnh đầu tiên
showSlide();
