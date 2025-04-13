const Booking = require('../models/bookingModel');

// Créer une réservation
exports.createBooking = async (req, res) => {
  const { rideId } = req.body;

  try {
    const newBooking = new Booking({
      rideId,
      userId: req.userId,
      status: 'pending'
    });
    await newBooking.save();
    res.status(201).json({ message: 'Réservation créée avec succès', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir les réservations de l'utilisateur
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).populate('rideId');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
