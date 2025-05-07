document.addEventListener('DOMContentLoaded', () => {
    const reviewsData = [
        {
            id: 1,
            initials: "JD",
            name: "Jean Dupont",
            route: "Paris → Lyon",
            date: "2023-06-15",
            time: "8:30 - 12:15",
            rating: 5,
            content: "Excellent conducteur, très ponctuel et voiture très confortable. La conversation était agréable et le trajet s'est déroulé sans aucun problème. Je recommande vivement !",
            tags: ["Ponctualité", "Confort", "Sécurité"],
            reply: null
        },
        {
            id: 2,
            initials: "SM",
            name: "Sophie Martin",
            route: "Marseille → Nice",
            date: "2023-06-16",
            time: "14:00 - 16:45",
            rating: 4,
            content: "Bon trajet globalement, mais la climatisation ne fonctionnait pas très bien et il faisait assez chaud dans la voiture. Sinon, conduite sûre et agréable.",
            tags: ["Conduite", "Climatisation"],
            reply: "Désolé pour la climatisation, elle est maintenant réparée."
        },
        {
            id: 3,
            initials: "PL",
            name: "Pierre Lambert",
            route: "Bordeaux → Toulouse",
            date: "2023-06-17",
            time: "9:15 - 11:30",
            rating: 4.5,
            content: "Très bon conducteur, voiture propre et confortable. Petit bémol sur le trajet qui a été un peu plus long que prévu à cause des embouteillages, mais ce n'est pas de sa faute.",
            tags: ["Propreté", "Confort", "Ponctualité"],
            reply: null
        },
        {
            id: 4,
            initials: "TB",
            name: "Thomas Bernard",
            route: "Lille → Bruxelles",
            date: "2023-06-18",
            time: "7:45 - 9:30",
            rating: 3,
            content: "Trajet correct mais le conducteur parlait beaucoup au téléphone pendant la conduite, ce qui n'est pas très rassurant. Sinon, tout s'est bien passé.",
            tags: ["Sécurité", "Ponctualité"],
            reply: null
        }
    ];

    // Éléments du DOM
    const reviewsList = document.getElementById('reviewsList');
    const ratingFilterButton = document.getElementById('ratingFilterButton');
    const ratingFilterDropdown = document.getElementById('ratingFilterDropdown');
    const dateFilterButton = document.getElementById('dateFilterButton');
    const dateFilterDropdown = document.getElementById('dateFilterDropdown');
    const currentRatingFilter = document.getElementById('currentRatingFilter');
    const currentDateFilter = document.getElementById('currentDateFilter');
    const replyModal = document.getElementById('replyModal');
    const reviewContent = document.getElementById('reviewContent');
    const replyTextarea = document.getElementById('replyTextarea');
    const closeModal = document.getElementById('closeModal');
    const cancelReply = document.getElementById('cancelReply');
    const submitReply = document.getElementById('submitReply');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    // Variables d'état
    let currentRatingFilterValue = 'all';
    let currentDateFilterValue = 'all';
    let currentPage = 1;
    let currentReviewId = null;

    // Initialisation
    setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.width = bar.style.width;
        });
    }, 300);

    setupFilters();
    setupReplyModal();
    setupPagination();

    // Configuration des filtres
    function setupFilters() {
        ratingFilterButton.addEventListener('click', (e) => {
            e.stopPropagation();
            ratingFilterDropdown.classList.toggle('hidden');
            dateFilterDropdown.classList.add('hidden');
        });

        dateFilterButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dateFilterDropdown.classList.toggle('hidden');
            ratingFilterDropdown.classList.add('hidden');
        });

        document.addEventListener('click', () => {
            ratingFilterDropdown.classList.add('hidden');
            dateFilterDropdown.classList.add('hidden');
        });

        document.querySelectorAll('.filter-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();

                if (option.dataset.rating) {
                    currentRatingFilterValue = option.dataset.rating;
                    currentRatingFilter.textContent = option.querySelector('span').textContent;
                    document.querySelectorAll('#ratingFilterDropdown .filter-option i').forEach(icon => icon.classList.add('hidden'));
                    option.querySelector('i').classList.remove('hidden');
                } else if (option.dataset.date) {
                    currentDateFilterValue = option.dataset.date;
                    currentDateFilter.textContent = option.querySelector('span').textContent;
                    document.querySelectorAll('#dateFilterDropdown .filter-option i').forEach(icon => icon.classList.add('hidden'));
                    option.querySelector('i').classList.remove('hidden');
                }

                applyFilters();
                ratingFilterDropdown.classList.add('hidden');
                dateFilterDropdown.classList.add('hidden');
            });
        });
    }

    // Appliquer les filtres
    function applyFilters() {
        const reviewCards = document.querySelectorAll('.review-card');

        reviewCards.forEach(card => {
            const cardRating = parseFloat(card.dataset.rating);
            const cardDate = new Date(card.dataset.date);
            const now = new Date();

            let ratingMatch = true;
            let dateMatch = true;

            if (currentRatingFilterValue !== 'all') {
                const filterRating = parseInt(currentRatingFilterValue);
                ratingMatch = Math.floor(cardRating) === filterRating;
            }

            if (currentDateFilterValue !== 'all') {
                const startDate = new Date(now);
                if (currentDateFilterValue === 'week') {
                    startDate.setDate(now.getDate() - 7);
                } else if (currentDateFilterValue === 'month') {
                    startDate.setMonth(now.getMonth() - 1);
                } else if (currentDateFilterValue === 'year') {
                    startDate.setFullYear(now.getFullYear() - 1);
                }
                dateMatch = cardDate >= startDate && cardDate <= now;
            }

            if (ratingMatch && dateMatch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Configuration de la modal de réponse
    function setupReplyModal() {
        document.querySelectorAll('.reply-btn, .edit-reply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const reviewId = parseInt(btn.dataset.reviewId);
                const review = reviewsData.find(r => r.id === reviewId);

                if (review) {
                    currentReviewId = reviewId;
                    reviewContent.textContent = review.content;
                    replyTextarea.value = review.reply || '';
                    submitReply.textContent = btn.classList.contains('edit-reply-btn') ? 'Modifier' : 'Envoyer';
                    replyModal.classList.remove('hidden');
                }
            });
        });

        closeModal.addEventListener('click', () => replyModal.classList.add('hidden'));
        cancelReply.addEventListener('click', () => replyModal.classList.add('hidden'));

        submitReply.addEventListener('click', () => {
            if (currentReviewId) {
                const review = reviewsData.find(r => r.id === currentReviewId);
                if (review) {
                    review.reply = replyTextarea.value.trim();
                    updateReviewDisplay(currentReviewId);
                    replyModal.classList.add('hidden');
                }
            }
        });
    }

    // Mettre à jour l'affichage d'un avis
    function updateReviewDisplay(reviewId) {
        const review = reviewsData.find(r => r.id === reviewId);
        if (!review) return;
        renderReviews(); // Simulation
    }

    // Configuration de la pagination
    function setupPagination() {
        paginationButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.dataset.page;
                if (page === 'prev' && currentPage > 1) currentPage--;
                else if (page === 'next' && currentPage < 8) currentPage++;
                else if (!isNaN(page)) currentPage = parseInt(page);

                updatePaginationUI();
                console.log('Chargement de la page', currentPage);
            });
        });
    }

    function updatePaginationUI() {
        paginationButtons.forEach(btn => {
            const page = btn.dataset.page;
            if (page === currentPage.toString()) {
                btn.classList.add('bg-secondary', 'text-white');
                btn.classList.remove('bg-white', 'text-gray-500');
            } else {
                btn.classList.remove('bg-secondary', 'text-white');
                if (!['prev', 'next'].includes(page)) {
                    btn.classList.add('bg-white', 'text-gray-500');
                }
            }
        });
    }

    function renderReviews() {
        // À compléter selon ton besoin (affichage dynamique)
    }

    // (Optionnel) Config Tailwind (utilisé si injecté dynamiquement)
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    primary: '#043B47',
                    secondary: '#00B2FF',
                    accent: '#7196A8',
                    rating: '#FFC107',
                },
                animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'slide-up': 'slideUp 0.3s ease-out',
                    'pulse-slow': 'pulse 3s infinite',
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
