const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour l'inscription
router.post('/register', userController.createUser); // Utilisation de la méthode createUser

// Route pour la connexion
router.post('/login', userController.loginUser); // Utilisation de la méthode loginUser

module.exports = router;
