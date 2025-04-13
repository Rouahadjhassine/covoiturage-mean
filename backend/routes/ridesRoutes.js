const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ridesController = require('../controllers/ridesController');

// Route protégée pour créer un trajet
router.post('/create', authMiddleware, ridesController.createRide);

// Route pour obtenir tous les trajets
router.get('/', authMiddleware, ridesController.getRides);

module.exports = router;
