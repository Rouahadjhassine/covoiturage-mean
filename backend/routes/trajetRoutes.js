const express = require('express');
const router = express.Router();
const trajetController = require('../controllers/trajetController');
const auth = require('../midlleware/authMiddleware');
// JWT ou autre

// Route protégée : conducteur connecté
router.post('/publier',auth, trajetController.publierTrajet);

module.exports = router;
