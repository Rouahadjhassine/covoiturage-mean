const mongoose = require('mongoose');
const Trajet = require('../models/trajet');

const moment = require('moment');
const nlpManager = require('../nlpManager'); 

exports.publierTrajet = async (req, res) => {
  try {
    const { depart, arrivee, passagers, dateDepart, dateArrivee } = req.body;
    const userId = req.userId;

    function addOneHour(dateStr) {
      return moment(dateStr, 'YYYY-MM-DD HH:mm').add(1, 'hours').toDate();
    }
    
    const trajet = new Trajet({
      conducteur: userId,
      depart,
      arrivee,
      passagers,
      dateDepart: addOneHour(dateDepart),
      dateArrivee: addOneHour(dateArrivee)
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
exports.rechercherTrajet = async (req, res) => {
  try {
    const { requete } = req.body;

    // Analyser la requête du passager
    const response = await nlpManager.process('fr', requete);

    // Afficher les entités extraites pour débogage
    console.log('Entités extraites:', response.entities);

    // Extraire les entités de la requête
    const villeDepart = response.entities.find((e) => e.entity === 'villeDepart')?.option;
    const villeArrivee = response.entities.find((e) => e.entity === 'villeArrivee')?.option;
    const momentJournee = response.entities.find((e) => e.entity === 'moment')?.option;

    // Vérifier si les villes de départ et d'arrivée sont présentes dans la requête
    if (!villeDepart || !villeArrivee) {
      return res.status(400).json({ message: 'Veuillez préciser à la fois la ville de départ et la ville d\'arrivée.' });
    }

    // Affichage des valeurs extraites pour vérification
    console.log('Ville de départ:', villeDepart);
    console.log('Ville d\'arrivée:', villeArrivee);
    console.log('Moment de la journée:', momentJournee);

    let dateFormatStart, dateFormatEnd;

    // Calculer l'heure de départ en fonction de "matin", "après-midi", "soir"
    if (momentJournee === 'matin') {
      dateFormatStart = moment().add(1, 'days').startOf('day').set('hours', 6).toDate(); // 6:00 AM
      dateFormatEnd = moment().add(1, 'days').startOf('day').set('hours', 12).toDate(); // 12:00 PM
    } else if (momentJournee === 'après-midi') {
      dateFormatStart = moment().add(1, 'days').startOf('day').set('hours', 12).toDate(); // 12:00 PM
      dateFormatEnd = moment().add(1, 'days').startOf('day').set('hours', 18).toDate(); // 6:00 PM
    } else if (momentJournee === 'soir') {
      dateFormatStart = moment().add(1, 'days').startOf('day').set('hours', 18).toDate(); // 6:00 PM
      dateFormatEnd = moment().add(1, 'days').startOf('day').set('hours', 23).toDate(); // 11:59 PM
    } else {
      // Si aucune période n'est spécifiée, rechercher tout au long de la journée
      dateFormatStart = moment().add(1, 'days').startOf('day').toDate();
      dateFormatEnd = moment().add(1, 'days').endOf('day').toDate();
    }

    // Affichage de la date de début et de fin pour vérification
    console.log('Date de début:', dateFormatStart);
    console.log('Date de fin:', dateFormatEnd);

    // Vérification de la validité des dates
    if (isNaN(dateFormatStart) || isNaN(dateFormatEnd)) {
      return res.status(400).json({ message: 'Date invalide fournie.' });
    }

    // Recherche des trajets dans la base de données avec les villes de départ et d'arrivée
    const trajets = await Trajet.find({
      depart: { $regex: new RegExp(villeDepart, 'i') }, // Recherche insensible à la casse
      arrivee: { $regex: new RegExp(villeArrivee, 'i') }, // Recherche insensible à la casse
      dateDepart: { $gte: dateFormatStart, $lte: dateFormatEnd }
    });

    // Vérification si des trajets ont été trouvés
    if (trajets.length === 0) {
      console.log('Aucun trajet trouvé de', villeDepart, 'à', villeArrivee, 'entre', dateFormatStart, 'et', dateFormatEnd);
    }
    

    res.status(200).json({ trajets });
  } catch (err) {
    console.error('Erreur lors de la recherche de trajet:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
