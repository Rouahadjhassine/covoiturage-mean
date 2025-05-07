window.addEventListener("load", function () {
  // Mobile menu toggle
  document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".md\\:hidden button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
        mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector("button");
      const menu = dropdown.querySelector(".dropdown-menu");

      button.addEventListener("click", function () {
        if (menu.classList.contains("hidden")) {
          menu.classList.remove("hidden");
        } else {
          menu.classList.add("hidden");
        }
      });

      // Close when clicking outside
      document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
          menu.classList.add("hidden");
        }
      });
    });
  });
});
