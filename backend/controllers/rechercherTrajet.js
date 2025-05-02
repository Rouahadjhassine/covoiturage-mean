const moment = require('moment');
const Trajet = require('../models/trajet');
const nlpManager = require('../nlpManager'); // Importer le modèle NLP

exports.rechercherTrajet = async (req, res) => {
  try {
    const { requete } = req.body;
    
    // Analyser la requête du passager
    const response = await nlpManager.process('fr', requete);

    // Extraire les entités de la requête
    const villeArrivee = response.entities.find(e => e.entity === 'villeArrivee')?.resolution;
    const dateDemande = response.entities.find(e => e.entity === 'date')?.resolution;

    if (!villeArrivee || !dateDemande) {
      return res.status(400).json({ message: 'Veuillez préciser la destination et la date.' });
    }

    // Convertir la date en format compatible
    const dateFormat = moment(dateDemande, 'YYYY-MM-DD').toDate();

    // Recherche des trajets dans la base de données
    const trajets = await Trajet.find({
      depart: { $regex: new RegExp(villeArrivee, 'i') },
      dateDepart: { $gte: dateFormat }
    });

    res.status(200).json({ trajets });

  } catch (err) {
    console.error("Erreur lors de la recherche de trajet :", err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
