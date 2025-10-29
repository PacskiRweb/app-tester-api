const { formatResponse } = require("../tools/helper");

// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

// Contrôleur de santé de l'API
function getHealth(req, res) {
  res.json(
    formatResponse(
      "success",
      { timestamp: new Date().toISOString() },
      "API opérationnelle"
    )
  );
}

module.exports = {
  getHealth,
};
