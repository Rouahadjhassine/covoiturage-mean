document.addEventListener('DOMContentLoaded', function() {
    // Bouton Paramètres
    document.getElementById('settings-btn').addEventListener('click', function() {
        document.getElementById('settings-modal').style.display = 'block';
    });

    // Fermer le modal Paramètres
    document.getElementById('close-settings').addEventListener('click', function() {
        document.getElementById('settings-modal').style.display = 'none';
    });

    // Sauvegarder les paramètres
    document.getElementById('save-settings').addEventListener('click', function() {
        const newName = document.getElementById('edit-name').value;
        const newLocation = document.getElementById('edit-location').value;
        const newMemberSince = document.getElementById('edit-member-since').value;

        document.getElementById('profile-name').textContent = newName;
        document.getElementById('profile-location').textContent = newLocation;
        document.getElementById('member-since').textContent = newMemberSince;

        document.getElementById('settings-modal').style.display = 'none';
        updateProfileCompletion();
    });

    // Fonction pour mettre à jour le pourcentage de complétion du profil
    function updateProfileCompletion() {
        const newCompletion = Math.min(100, Math.floor(Math.random() * 20) + 80); // Entre 80% et 100%
        document.getElementById('profile-completion').textContent = `${newCompletion}%`;
        document.getElementById('completion-bar').style.width = `${newCompletion}%`;
    }

    // ... autres fonctionnalités comme modifier l'image, gérer les préférences, etc.
});
