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

  // Modal handling
  const genericModal = document.getElementById("genericModal");
  const closeModal = document.getElementById("closeModal");
  const cancelModal = document.getElementById("cancelModal");
  const modalFormContent = document.getElementById("modalFormContent");
  const modalTitle = document.getElementById("modalTitle");

  // Add buttons for each section
  document
    .getElementById("addAdminBtn")
    ?.addEventListener("click", () => showAddModal("admin"));
  document
    .getElementById("addDriverBtn")
    ?.addEventListener("click", () => showAddModal("driver"));
  document
    .getElementById("addPassengerBtn")
    ?.addEventListener("click", () => showAddModal("passenger"));
  document
    .getElementById("addRideBtn")
    ?.addEventListener("click", () => showAddModal("ride"));
  document
    .getElementById("addVehicleBtn")
    ?.addEventListener("click", () => showAddModal("vehicle"));

  function showAddModal(type) {
    let title = "";
    let formContent = "";

    switch (type) {
      case "admin":
        title = "Ajouter un administrateur";
        formContent = `
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
                            <select id="role" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option value="admin">Administrateur</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                        </div>
                    `;
        break;

      case "driver":
        title = "Ajouter un conducteur";
        formContent = `
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        </div>
                        <div class="mb-4">
                            <label for="license" class="block text-sm font-medium text-gray-700 mb-1">Permis de conduire</label>
                            <input type="text" id="license" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        </div>
                    `;
        break;

      case "passenger":
        title = "Ajouter un passager";
        formContent = `
                        <div class="mb-4">
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                        </div>
                    `;
        break;

      case "ride":
        title = "Ajouter un trajet";
        formContent = `
                        <div class="mb-4">
                            <label for="departure" class="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                            <input type="text" id="departure" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                            <input type="text" id="destination" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input type="datetime-local" id="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="driver" class="block text-sm font-medium text-gray-700 mb-1">Conducteur</label>
                            <select id="driver" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Jean Dupont</option>
                                <option>Marie Martin</option>
                            </select>
                        </div>
                    `;
        break;

      case "vehicle":
        title = "Ajouter un véhicule";
        formContent = `
                        <div class="mb-4">
                            <label for="model" class="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
                            <input type="text" id="model" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="owner" class="block text-sm font-medium text-gray-700 mb-1">Propriétaire</label>
                            <select id="owner" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Jean Dupont</option>
                                <option>Marie Martin</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label for="plate" class="block text-sm font-medium text-gray-700 mb-1">Plaque d'immatriculation</label>
                            <input type="text" id="plate" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" required>
                        </div>
                        <div class="mb-4">
                            <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select id="type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                                <option>Berline</option>
                                <option>SUV</option>
                                <option>Monospace</option>
                            </select>
                        </div>
                    `;
        break;
    }

    modalTitle.textContent = title;
    modalFormContent.innerHTML = formContent;
    genericModal.classList.remove("hidden");
  }

  closeModal.addEventListener("click", () =>
    genericModal.classList.add("hidden")
  );
  cancelModal.addEventListener("click", () =>
    genericModal.classList.add("hidden")
  );

  // Confirmation modal handling
  const confirmModal = document.getElementById("confirmModal");
  const cancelDelete = document.getElementById("cancelDelete");

  cancelDelete.addEventListener("click", () =>
    confirmModal.classList.add("hidden")
  );

  // Initialize the dashboard with dashboard section active
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dashboard-section").classList.add("active");
  });
});
