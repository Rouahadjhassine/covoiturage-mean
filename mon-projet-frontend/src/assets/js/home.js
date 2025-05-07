window.addEventListener("load", function () {
  // Set today's date as default
  document.addEventListener("DOMContentLoaded", function () {
    // Set today's date as default
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("date").value = today;

    // Passenger counter functionality
    const incrementBtn = document.getElementById("increment");
    const decrementBtn = document.getElementById("decrement");
    const passengerInput = document.getElementById("passengers");

    // Set default passenger count to 1
    passengerInput.value = 1;

    incrementBtn.addEventListener("click", function () {
      let value = parseInt(passengerInput.value);
      if (value < 8) {
        passengerInput.value = value + 1;
      }
    });

    decrementBtn.addEventListener("click", function () {
      let value = parseInt(passengerInput.value);
      if (value > 1) {
        passengerInput.value = value - 1;
      }
    });

    // Contact form submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Here you would typically send the data to a server
        console.log("Form submitted:", { name, email, subject, message });

        // Show success message with animation
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML =
          '<i class="fas fa-check mr-3"></i> Message envoyé';
        submitBtn.classList.remove("btn-primary");
        submitBtn.classList.add("bg-green-500", "hover:bg-green-600");

        // Reset form after 2 seconds
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML =
            '<i class="fas fa-paper-plane mr-3"></i> Envoyer le message';
          submitBtn.classList.add("btn-primary");
          submitBtn.classList.remove("bg-green-500", "hover:bg-green-600");
        }, 2000);
      });
    }

    // Add animation classes on scroll
    const animateElements = document.querySelectorAll(".animate-fade-in-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((element) => {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      element.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";
      observer.observe(element);
    });
  });
});
