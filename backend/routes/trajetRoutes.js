const express = require('express');
const router = express.Router();
const trajetController = require('../controllers/trajetController'); // Vérifie le chemin d'importation
const auth = require('../midlleware/authMiddleware'); // Vérifie également le chemin de ce fichier

// Route protégée : conducteur connecté
router.post('/publier', auth, trajetController.publierTrajet);
router.post('/rechercher', trajetController.rechercherTrajet);

module.exports = router;
