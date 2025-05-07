window.addEventListener('DOMContentLoaded', () => {
    const trajets = [
        {
            id: 1,
            depart: "Paris",
            arrivee: "Lyon",
            dateDepart: new Date(2023, 6, 15, 8, 30),
            dateArrivee: new Date(2023, 6, 15, 12, 15),
            passengers: 2,
            price: 35,
            duration: "3h45",
            rating: 4.8,
            driver: "Jean D.",
            car: "Peugeot 308",
            amenities: ["climatisation", "bagages", "animaux"]
        },
        {
            id: 2,
            depart: "Marseille",
            arrivee: "Nice",
            dateDepart: new Date(2023, 6, 16, 14, 0),
            dateArrivee: new Date(2023, 6, 16, 16, 45),
            passengers: 3,
            price: 25,
            duration: "2h45",
            rating: 4.5,
            driver: "Sophie M.",
            car: "Renault Clio",
            amenities: ["fumeur", "bagages"]
        },
        {
            id: 3,
            depart: "Bordeaux",
            arrivee: "Toulouse",
            dateDepart: new Date(2023, 6, 17, 9, 15),
            dateArrivee: new Date(2023, 6, 17, 11, 30),
            passengers: 1,
            price: 20,
            duration: "2h15",
            rating: 4.9,
            driver: "Pierre L.",
            car: "Tesla Model 3",
            amenities: ["climatisation", "wifi", "prises USB"]
        },
        {
            id: 4,
            depart: "Lille",
            arrivee: "Bruxelles",
            dateDepart: new Date(2023, 6, 18, 7, 45),
            dateArrivee: new Date(2023, 6, 18, 9, 30),
            passengers: 4,
            price: 30,
            duration: "1h45",
            rating: 4.7,
            driver: "Thomas B.",
            car: "Volkswagen Golf",
            amenities: ["climatisation", "bagages", "animaux"]
        }
    ];

    // Variables d'état
    let passengerCount = 1;
    let currentSort = 'relevance';
    let filteredTrajets = [];

    // Éléments DOM
    const passengerDropdown = document.getElementById('passengerDropdown');
    const passengerDropdownContent = document.getElementById('passengerDropdownContent');
    const passengerCountElement = document.getElementById('passengerCount');
    const passengerDisplay = document.getElementById('passengerDisplay');
    const incrementPassenger = document.getElementById('incrementPassenger');
    const decrementPassenger = document.getElementById('decrementPassenger');
    const searchButton = document.getElementById('searchButton');
    const searchQuery = document.getElementById('searchQuery');
    const sortBar = document.getElementById('sortBar');
    const searchResults = document.getElementById('searchResults');
    const noResults = document.getElementById('noResults');
    const resultsList = document.getElementById('resultsList');
    const resultCount = document.getElementById('resultCount');
    const sortButton = document.getElementById('sortButton');
    const sortDropdownContent = document.getElementById('sortDropdownContent');
    const currentSortElement = document.getElementById('currentSort');

    // Gestion des passagers
    passengerDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        passengerDropdownContent.classList.toggle('hidden');
    });

    incrementPassenger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (passengerCount < 8) {
            passengerCount++;
            updatePassengerDisplay();
        }
    });

    decrementPassenger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (passengerCount > 1) {
            passengerCount--;
            updatePassengerDisplay();
        }
    });

    function updatePassengerDisplay() {
        passengerCountElement.textContent = `${passengerCount} passager${passengerCount > 1 ? 's' : ''}`;
        passengerDisplay.textContent = passengerCount;
    }

    // Fermer les dropdowns quand on clique ailleurs
    document.addEventListener('click', () => {
        passengerDropdownContent.classList.add('hidden');
        sortDropdownContent.classList.add('hidden');
    });

    // Gestion du tri
    sortButton.addEventListener('click', (e) => {
        e.stopPropagation();
        sortDropdownContent.classList.toggle('hidden');
    });

    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', (e) => {
            currentSort = option.dataset.sort;
            currentSortElement.textContent = option.querySelector('span').textContent;
            
            // Mettre à jour les icônes de sélection
            document.querySelectorAll('.sort-option i').forEach(icon => {
                icon.classList.add('hidden');
            });
            option.querySelector('i').classList.remove('hidden');
            
            sortDropdownContent.classList.add('hidden');
            sortTrajets();
            displayResults();
        });
    });

    // Fonction de recherche
    searchButton.addEventListener('click', () => {
        const query = searchQuery.value.toLowerCase();
        
        if (query.trim() === '') {
            filteredTrajets = [];
        } else {
            filteredTrajets = trajets.filter(trajet => 
                trajet.depart.toLowerCase().includes(query) || 
                trajet.arrivee.toLowerCase().includes(query)
            );
        }
        
        sortTrajets();
        updateUI();
    });

    // Fonction de tri
    function sortTrajets() {
        switch(currentSort) {
            case 'price':
                filteredTrajets.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredTrajets.sort((a, b) => b.price - a.price);
                break;
            case 'departure':
                filteredTrajets.sort((a, b) => a.dateDepart - b.dateDepart);
                break;
            case 'duration':
                // Simplification pour la démo
                filteredTrajets.sort((a, b) => {
                    const aDuration = parseInt(a.duration.replace('h', ''));
                    const bDuration = parseInt(b.duration.replace('h', ''));
                    return aDuration - bDuration;
                });
                break;
            case 'rating':
                filteredTrajets.sort((a, b) => b.rating - a.rating);
                break;
            default: // 'relevance'
                // Pas de tri particulier pour la pertinence dans cette démo
                break;
        }
    }

    // Affichage des résultats
    function displayResults() {
        resultsList.innerHTML = '';
        
        filteredTrajets.forEach(trajet => {
            const li = document.createElement('li');
            li.className = 'p-6 border border-gray-200 rounded-xl shadow-md bg-gradient-to-r from-blue-50 to-white hover:shadow-lg transition duration-300 search-card';
            li.innerHTML = `
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <!-- Information du trajet -->
                    <div>
                        <p class="text-2xl font-bold text-primary">${trajet.depart} → ${trajet.arrivee}</p>
                        <p class="text-sm text-gray-500 mt-1">${formatDate(trajet.dateDepart)}</p>
                    </div>
                    
                    <!-- Prix et note -->
                    <div class="flex flex-col items-end">
                        <p class="text-2xl font-bold text-secondary">${trajet.price}€</p>
                        <div class="flex items-center gap-1 mt-1">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="text-sm text-gray-700">${trajet.rating}</span>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <!-- Horaires -->
                    <div>
                        <p class="text-sm text-gray-700"><strong>Départ :</strong> ${formatTime(trajet.dateDepart)}</p>
                        <p class="text-xs text-gray-500 mt-1">${trajet.driver} • ${trajet.car}</p>
                    </div>
                    
                    <div class="flex flex-col items-center justify-center text-primary">
                        <div class="flex items-center gap-1">
                            <i class="fas fa-clock text-sm"></i>
                            <span class="text-sm font-medium">${trajet.duration}</span>
                        </div>
                        <div class="w-full h-1 bg-gradient-to-r from-blue-100 to-secondary rounded-full my-2"></div>
                        <i class="fas fa-long-arrow-alt-right text-xl"></i>
                    </div>
                    
                    <div>
                        <p class="text-sm text-gray-700"><strong>Arrivée :</strong> ${formatTime(trajet.dateArrivee)}</p>
                        <div class="flex gap-2 mt-2">
                            ${trajet.amenities.map(amenity => 
                                `<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">${amenity}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div class="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <i class="fas fa-user"></i>
                        <span class="font-medium">${trajet.passengers} place${trajet.passengers > 1 ? 's' : ''} disponible${trajet.passengers > 1 ? 's' : ''}</span>
                    </div>
                    
                    <button class="bg-secondary text-white px-6 py-2 rounded-full font-medium hover:bg-[#0099dd] transition flex items-center gap-2">
                        Réserver
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
            resultsList.appendChild(li);
        });
    }

    // Mise à jour de l'UI
    function updateUI() {
        if (filteredTrajets.length > 0) {
            resultCount.textContent = filteredTrajets.length;
            sortBar.classList.remove('hidden');
            searchResults.classList.remove('hidden');
            noResults.classList.add('hidden');
            displayResults();
        } else {
            sortBar.classList.add('hidden');
            searchResults.classList.add('hidden');
            noResults.classList.remove('hidden');
        }
    }

    // Fonctions utilitaires
    function formatDate(date) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    }

    function formatTime(date) {
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }

    // Simulation de recherche au chargement pour la démo
       // Simulation de recherche au chargement pour la démo
       filteredTrajets = [...trajets];
       updateUI();
   
       // Configuration Tailwind (optionnel, normalement pas ici)
       tailwind.config = {
           theme: {
               extend: {
                   colors: {
                       primary: '#043B47',
                       secondary: '#00B2FF',
                       accent: '#7196A8',
                   },
                   animation: {
                       'fade-in': 'fadeIn 0.5s ease-in-out',
                       'slide-up': 'slideUp 0.3s ease-out',
                   },
                   keyframes: {
                       fadeIn: {
                           '0%': { opacity: '0' },
                           '100%': { opacity: '1' },
                       },
                       slideUp: {
                           '0%': { transform: 'translateY(20px)', opacity: '0' },
                           '100%': { transform: 'translateY(0)', opacity: '1' },
                       },
                   }
               }
           }
       };
   });
   