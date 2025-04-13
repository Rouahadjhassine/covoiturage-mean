const Ride = require('../models/rideModel');

// Créer un trajet
exports.createRide = async (req, res) => {
  const { departure, arrival, date } = req.body;

  try {
    const newRide = new Ride({
      departure,
      arrival,
      date,
      userId: req.userId
    });
    await newRide.save();
    res.status(201).json({ message: 'Trajet créé avec succès', ride: newRide });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Obtenir tous les trajets
exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};
