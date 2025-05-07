const { NlpManager } = require('node-nlp');

// Liste des villes tunisiennes
const villesTunisiennes = [
  'Tunis', 'Sfax', 'Sousse', 'Ariana', 'Gabès', 'Nabeul', 'Kairouan', 'Bizerte',
  'Kasserine', 'Monastir', 'Tataouine', 'Mahdia', 'Tozeur', 'Beja', 'Jendouba',
  'Gafsa', 'Zaghouan', 'Ben Arous', 'Medenine', 'Siliana', 'Manouba', 'Kebili', 'Nefta', 'Douz'
];

const manager = new NlpManager({ languages: ['fr'] });

// Ajouter des phrases d'exemple pour l'entraînement
manager.addDocument('fr', 'trajet de %villeDepart% à %villeArrivee%', 'search.traject');
manager.addDocument('fr', 'je cherche un trajet de %villeDepart% à %villeArrivee%', 'search.traject');
manager.addDocument('fr', 'je cherche un trajet pour %villeArrivee%', 'search.traject');
manager.addDocument('fr', 'je cherche un trajet de %villeDepart% à %villeArrivee% demain matin', 'search.traject');
manager.addDocument('fr', 'je cherche un trajet de %villeDepart% à %villeArrivee% demain après-midi', 'search.traject');
manager.addDocument('fr', 'je cherche un trajet de %villeDepart% à %villeArrivee% demain soir', 'search.traject');

// Ajouter des entités avec `addNamedEntityText`
villesTunisiennes.forEach(ville => {
  manager.addNamedEntityText('villeDepart', ville, ['fr']);
  manager.addNamedEntityText('villeArrivee', ville, ['fr']);
});

manager.addNamedEntityText('moment', 'matin', ['fr']);
manager.addNamedEntityText('moment', 'après-midi', ['fr']);
manager.addNamedEntityText('moment', 'soir', ['fr']);

// Entraîner le modèle NLP
(async () => {
  await manager.train();
  manager.save();
  console.log("Modèle NLP entraîné et sauvegardé.");
})();

module.exports = manager;
