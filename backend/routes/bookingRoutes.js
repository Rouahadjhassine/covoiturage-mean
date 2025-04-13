const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

// Route pour créer une réservation
router.post('/create', authMiddleware, bookingController.createBooking);

// Route pour obtenir les réservations de l'utilisateur
router.get('/my-bookings', authMiddleware, bookingController.getUserBookings);

module.exports = router;
