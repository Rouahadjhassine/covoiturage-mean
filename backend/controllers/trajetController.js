const mongoose = require('mongoose');
const Trajet = require('../models/trajet');

exports.publierTrajet = async (req, res) => {
    try {
      const { depart, arrivee, passagers, dateDepart, dateArrivee } = req.body;
      const userId = req.userId;
  
      const trajet = new Trajet({
        conducteur: userId,
        depart,
        arrivee,
        passagers,
        dateDepart,
        dateArrivee
      });
  
      await trajet.save();
  
      res.status(201).json({
        message: '✅ Trajet publié avec succès',
        trajet
      });
    } catch (err) {
      console.error("Erreur lors de la publication du trajet :", err.message);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  