// Navigation between sections
window.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".sidebar-item, .dropdown-menu a")
    .forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute("data-section");

        // Update active state in sidebar
        document.querySelectorAll(".sidebar-item").forEach((navItem) => {
          navItem.classList.remove("active");
        });

        if (sectionId !== "profile") {
          this.classList.add("active");
        }

        // Hide all sections
        document.querySelectorAll(".content-section").forEach((section) => {
          section.classList.remove("active");
        });

        // Show selected section
        document.getElementById(`${sectionId}-section`).classList.add("active");
      });
    });

  // Edit Vehicle Modal
  const editVehicleModal = document.getElementById("editVehicleModal");
  const editVehicleBtn = document.getElementById("editVehicleBtn");
  const closeEditVehicleModal = document.getElementById(
    "closeEditVehicleModal"
  );
  const cancelEditVehicle = document.getElementById("cancelEditVehicle");

  editVehicleBtn.addEventListener("click", () =>
    editVehicleModal.classList.remove("hidden")
  );
  closeEditVehicleModal.addEventListener("click", () =>
    editVehicleModal.classList.add("hidden")
  );
  cancelEditVehicle.addEventListener("click", () =>
    editVehicleModal.classList.add("hidden")
  );

  // Initialize the dashboard with dashboard section active
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dashboard-section").classList.add("active");

    // Add event listeners for accept/reject buttons
    document.querySelectorAll(".ride-card button").forEach((button) => {
      button.addEventListener("click", function () {
        const card = this.closest(".ride-card");
        if (this.textContent.includes("Accepter")) {
          card.style.borderLeft = "4px solid #10b981";
          // In a real app, you would send an API request here
          setTimeout(() => {
            card.remove();
            // Update the requests count
            const badge = document.querySelector(
              '[data-section="requests"] span'
            );
            if (badge) {
              const count = parseInt(badge.textContent) - 1;
              badge.textContent = count;
              if (count === 0) {
                badge.classList.add("hidden");
              }
            }
          }, 300);
        } else if (this.textContent.includes("Refuser")) {
          card.style.borderLeft = "4px solid #ef4444";
          // In a real app, you would send an API request here
          setTimeout(() => {
            card.remove();
            // Update the requests count
            const badge = document.querySelector(
              '[data-section="requests"] span'
            );
            if (badge) {
              const count = parseInt(badge.textContent) - 1;
              badge.textContent = count;
              if (count === 0) {
                badge.classList.add("hidden");
              }
            }
          }, 300);
        }
      });
    });
  });
});
