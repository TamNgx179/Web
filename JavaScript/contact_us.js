// ================ PRELOADER ================
// Immediately Invoked Function Expression (IIFE) to handle the preloader
(function () {
  const preloader = document.getElementById('preloader');
  document.body.classList.add('is-loading'); // Add a class to body while loading

  // Wait for the window to fully load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader?.classList.add('hide'); // Hide the preloader visually
      document.body.classList.remove('is-loading'); // Remove loading class
      setTimeout(() => preloader?.remove(), 500); // Remove preloader from DOM after animation
    }, 1400); // Delay to keep preloader visible for 1.4s
  });
})();


// ================== Cart counter ======================
// Load the selected cars from localStorage
let selectedcar = JSON.parse(localStorage.getItem('selectedcar')) || [];

(function () {
  const CART_KEY = "selectedcar"; // Key for localStorage

  // Function to get cart items from localStorage
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

  // Function to update the cart counter in the navigation bar
  function updateCounter() {
    const counter = document.getElementById("counter");
    if (counter) {
      counter.textContent = String(getCart().length); // Display the number of items
    }
  }

  // Run when DOM content is fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    updateCounter(); // Update cart count
  });
})();


// ================== Contact Form Validation ==================
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get input elements
    const name = document.getElementById("username");
    const email = document.getElementById("mail");
    const phone = document.getElementById("phone_number");
    const message = document.getElementById("Message");

    let isValid = true; // Flag to track form validity

    // Clear previous errors
    clearError(name);
    clearError(email);
    clearError(phone);
    clearError(message);

    // --- Validate Name ---
    // Name should not be empty, not contain consecutive spaces, and not contain numbers
    if (name.value.trim() === "" || name.value.trim().includes("  ") || /\d/.test(name.value.trim())) {
        showError(name, "Enter a valid name");
        isValid = false;
    }

    // --- Validate Email ---
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    if (!emailRegex.test(email.value.trim())) {
        showError(email, "Enter a valid email");
        isValid = false;
    }

    // --- Validate Phone ---
    // Phone number must be 9 to 11 digits
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        showError(phone, "Phone number must be 9–11 digits");
        isValid = false;
    }

    // --- Validate Message ---
    // Message must contain at least 10 characters
    if (message.value.trim().length < 10) {
        showError(message, "Message must contain at least 10 characters");
        isValid = false;
    }

    // If all inputs are valid, submit the form
    if (isValid) {
    showToast("Your message has been sent successfully!");
}

// ================== Toast Function ==================
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.innerText = msg;
    toast.classList.add("show");

    // 3 giây sau ẩn toast
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
});

// ================== Helper Functions ==================

// Function to display error message
function showError(input, msg) {
    input.classList.add("error-border"); // Add red border

    const error = document.createElement("div");
    error.className = "error"; // Class for styling
    error.innerText = msg;

    input.parentNode.appendChild(error); // Insert error message after input
}

// Function to clear previous error message
function clearError(input) {
    input.classList.remove("error-border"); // Remove red border
    const next = input.parentNode.querySelector(".error");
    if (next) next.remove(); // Remove error message element
}
