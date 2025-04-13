const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: "Accès interdit. Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // Passer à la route suivante
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
