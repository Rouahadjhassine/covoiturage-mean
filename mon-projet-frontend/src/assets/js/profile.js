// Données des trajets
const tripsData = [
    {
        id: 1,
        date: "15 juin",
        from: "Paris",
        to: "Lyon",
        driver: "Marie D.",
        car: "Renault Clio",
        rating: 5,
        comment: "Très agréable trajet !",
        price: "€32.50",
        distance: "465 km",
        duration: "4h20",
        carIcon: "bg-indigo-100 text-indigo-800"
    },
    {
        id: 2,
        date: "8 juin",
        from: "Lyon",
        to: "Marseille",
        driver: "Jean P.",
        car: "Peugeot 308",
        rating: 4,
        comment: "Ponctuel et sympathique",
        price: "€28.00",
        distance: "312 km",
        duration: "3h05",
        carIcon: "bg-purple-100 text-purple-800"
    },
    {
        id: 3,
        date: "28 mai",
        from: "Paris",
        to: "Bordeaux",
        driver: "Claire L.",
        car: "Volkswagen Golf",
        rating: 5,
        comment: "Parfait, je recommande !",
        price: "€45.00",
        distance: "584 km",
        duration: "5h45",
        carIcon: "bg-blue-100 text-blue-800"
    },
    {
        id: 4,
        date: "12 mai",
        from: "Lille",
        to: "Bruxelles",
        driver: "Thomas B.",
        car: "Tesla Model 3",
        rating: 4,
        comment: "Conduite très confortable",
        price: "€22.00",
        distance: "115 km",
        duration: "1h50",
        carIcon: "bg-green-100 text-green-800"
    },
    {
        id: 5,
        date: "5 mai",
        from: "Strasbourg",
        to: "Nancy",
        driver: "Élodie M.",
        car: "Toyota Yaris",
        rating: 3,
        comment: "Trajet correct",
        price: "€15.50",
        distance: "160 km",
        duration: "2h10",
        carIcon: "bg-yellow-100 text-yellow-800"
    }
];

// État de l'application
let currentPage = 1;
const tripsPerPage = 3;
let filteredTrips = [...tripsData];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Activer l'animation de la barre de progression
    setTimeout(() => {
        document.getElementById('completion-bar').style.width = '85%';
    }, 300);
    
    // Charger les trajets
    renderTrips();
    
    // Écouteurs d'événements
    setupEventListeners();
});

// Fonction pour afficher les trajets
function renderTrips() {
    const tripsList = document.getElementById('trips-list');
    tripsList.innerHTML = '';
    
    const startIndex = (currentPage - 1) * tripsPerPage;
    const endIndex = startIndex + tripsPerPage;
    const paginatedTrips = filteredTrips.slice(startIndex, endIndex);
    
    if (paginatedTrips.length === 0) {
        tripsList.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-car text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Aucun trajet trouvé</p>
            </div>
        `;
        return;
    }
    
    paginatedTrips.forEach(trip => {
        const stars = Array(5).fill().map((_, i) => 
            i < trip.rating ? 
            `<i class="fas fa-star text-yellow-400 text-xs"></i>` : 
            `<i class="far fa-star text-yellow-400 text-xs"></i>`
        ).join('');
        
        const tripCard = `
            <div class="trip-card bg-gray-50 hover:bg-gray-100 rounded-lg p-4 cursor-pointer" data-id="${trip.id}">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div class="flex items-start mb-4 md:mb-0">
                        <div class="mr-4 text-center">
                            <div class="${trip.carIcon} w-12 h-12 rounded-full flex items-center justify-center">
                                <i class="fas fa-car text-xl"></i>
                            </div>
                            <span class="text-xs text-gray-500 mt-1">${trip.date}</span>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800">${trip.from} → ${trip.to}</h4>
                            <p class="text-sm text-gray-600">Avec ${trip.driver} dans une ${trip.car}</p>
                            <div class="flex items-center mt-1">
                                <div class="flex mr-2">
                                    ${stars}
                                </div>
                                <span class="text-xs text-gray-500">"${trip.comment}"</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <p class="text-lg font-bold text-gray-800">${trip.price}</p>
                        <p class="text-sm text-gray-500">${trip.distance} • ${trip.duration}</p>
                        <button class="redo-trip mt-2 text-indigo-600 hover:text-indigo-800 text-sm flex items-center" data-id="${trip.id}">
                            <i class="fas fa-redo mr-1"></i> Refaire ce trajet
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        tripsList.innerHTML += tripCard;
    });
    
    // Mettre à jour la pagination
    updatePagination();
}

// Fonction pour mettre à jour la pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
    // Dans une vraie application, nous mettrions à jour les boutons de pagination ici
}

// Fonction pour configurer les écouteurs d'événements
function setupEventListeners() {
    // Bouton Paramètres
    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'block';
    });
    
    // Fermer le modal Paramètres
    document.getElementById('close-settings').addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'none';
    });
    
    // Sauvegarder les paramètres
    document.getElementById('save-settings').addEventListener('click', () => {
        const newName = document.getElementById('edit-name').value;
        const newLocation = document.getElementById('edit-location').value;
        const newMemberSince = document.getElementById('edit-member-since').value;
        
        document.getElementById('profile-name').textContent = newName;
        document.getElementById('profile-location').textContent = newLocation;
        document.getElementById('member-since').textContent = newMemberSince;
        
        document.getElementById('settings-modal').style.display = 'none';
        
        // Mettre à jour le pourcentage de complétion du profil
        updateProfileCompletion();
    });
    
    // Bouton Modifier l'image
    document.getElementById('edit-image-btn').addEventListener('click', () => {
        document.getElementById('image-modal').style.display = 'block';
    });
    
    // Fermer le modal Image
    document.getElementById('close-image').addEventListener('click', () => {
        document.getElementById('image-modal').style.display = 'none';
    });
    
    // Image aléatoire
    document.getElementById('random-image').addEventListener('click', () => {
        const randomGender = Math.random() > 0.5 ? 'women' : 'men';
        const randomId = Math.floor(Math.random() * 100);
        const randomImageUrl = `https://randomuser.me/api/portraits/${randomGender}/${randomId}.jpg`;
        
        document.getElementById('image-preview').src = randomImageUrl;
        document.getElementById('image-url').value = randomImageUrl;
    });
    
    // Téléverser une image (simulé)
    document.getElementById('upload-image').addEventListener('click', () => {
        alert('Dans une vraie application, cela ouvrirait un sélecteur de fichiers');
    });
    
    // Sauvegarder l'image
    document.getElementById('save-image').addEventListener('click', () => {
        const newImageUrl = document.getElementById('image-url').value || 
                            document.getElementById('image-preview').src;
        
        document.getElementById('profile-image').src = newImageUrl;
        document.getElementById('image-modal').style.display = 'none';
        
        // Mettre à jour le pourcentage de complétion du profil
        updateProfileCompletion();
    });
    
    // Bouton Modifier les préférences
    document.getElementById('edit-preferences-btn').addEventListener('click', () => {
        document.getElementById('preferences-modal').style.display = 'block';
    });
    
    // Fermer le modal Préférences
    document.getElementById('close-preferences').addEventListener('click', () => {
        document.getElementById('preferences-modal').style.display = 'none';
    });
    
    // Sauvegarder les préférences
    document.getElementById('save-preferences').addEventListener('click', () => {
        const conversationPref = document.getElementById('conversation-select').value;
        const petsPref = document.getElementById('pets-select').value;
        const musicPref = document.getElementById('music-select').value;
        
        document.getElementById('conversation-pref').textContent = conversationPref;
        document.getElementById('pets-pref').textContent = petsPref;
        document.getElementById('music-pref').textContent = musicPref;
        
        document.getElementById('preferences-modal').style.display = 'none';
        
        // Mettre à jour le pourcentage de complétion du profil
        updateProfileCompletion();
    });
    
    // Filtrer les trajets
    document.getElementById('trip-filter').addEventListener('change', (e) => {
        const filterValue = e.target.value;
        
        if (filterValue === 'all') {
            filteredTrips = [...tripsData];
        } else if (filterValue === 'month') {
            filteredTrips = tripsData.filter(trip => trip.date.includes('juin'));
        } else if (filterValue === '3months') {
            filteredTrips = tripsData.filter(trip => 
                trip.date.includes('mai') || 
                trip.date.includes('juin') ||
                trip.date.includes('avril')
            );
        } else if (filterValue === 'year') {
            filteredTrips = [...tripsData];
        }
        
        currentPage = 1;
        renderTrips();
    });
    
    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTrips();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage * tripsPerPage < filteredTrips.length) {
            currentPage++;
            renderTrips();
        }
    });
    
    // Clic sur un trajet
    document.addEventListener('click', (e) => {
        if (e.target.closest('.trip-card')) {
            const tripId = e.target.closest('.trip-card').dataset.id;
            const trip = tripsData.find(t => t.id == tripId);
            alert(`Détails du trajet:\nDe ${trip.from} à ${trip.to}\nPrix: ${trip.price}\nNote: ${trip.rating}/5\nCommentaire: "${trip.comment}"`);
        }
        
        if (e.target.closest('.redo-trip')) {
            const tripId = e.target.closest('.redo-trip').dataset.id;
            const trip = tripsData.find(t => t.id == tripId);
            alert(`Recherche de trajet similaire:\n${trip.from} → ${trip.to}\nCette fonctionnalité rechercherait des trajets similaires dans une vraie application.`);
        }
    });
}

// Fonction pour mettre à jour le pourcentage de complétion du profil
function updateProfileCompletion() {
    // Dans une vraie application, cela calculerait le pourcentage en fonction des champs remplis
    const newCompletion = Math.min(100, Math.floor(Math.random() * 20) + 80); // Entre 80% et 100%
    
    document.getElementById('profile-completion').textContent = `${newCompletion}%`;
    document.getElementById('completion-bar').style.width = `${newCompletion}%`;
}
