const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Charge les variables d'environnement

const authRoutes = require('./routes/authRoutes'); // Importation des routes d'authentification

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour analyser les corps de requêtes JSON

// ✅ Sécurisation : Vérifie que l'URI existe
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI est manquant dans le fichier .env");
  process.exit(1); // Arrête l'exécution de l'application
}

// Connexion à MongoDB (sans options dépréciées)
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch((err) => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', authRoutes); // Exemple : POST /api/auth/login
app.use(cors({ origin: 'http://localhost:4200' }));

// Lancer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Serveur lancé sur le port ${port}`);
});
