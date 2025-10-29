// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

// Contrôleur de santé de l'API
function getHealth(req, res) {
  res.json({ 
    status: __("OK"), 
    message: __("API opérationnelle"),
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  getHealth
};
