const express = require('express');
const lettreARController = require('./controllers/lettreArController');
const healthController = require('./controllers/healthController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

// Routes

// Route de santé
app.get('/health', healthController.getHealth);


// Routes Lettre AR
app.post('/api/lettre-ar/tunnel', lettreARController.testTunnel);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(__("🚀 Serveur démarré sur le port"), PORT);
  console.log(__("📡 Endpoints disponibles:"));
  console.log(__("  GET  /health"));
  console.log(__("  POST /api/google/search"));
  console.log(__("  POST /api/google/navigation"));
  console.log(__("  POST /api/google/performance"));
  console.log(__("  POST /api/google/homepage"));
  console.log(__("  POST /api/github/login"));
  console.log(__("  POST /api/github/search"));
  console.log(__("  POST /api/github/navigation"));
  console.log(__("  POST /api/github/performance"));
  console.log(__("  POST /api/github/homepage"));
  console.log(__("  POST /api/test/custom"));
  console.log(__("  POST /api/test/performance"));
  console.log(__("  POST /api/test/availability"));
  console.log(__("  POST /api/test/responsive"));
  console.log(__("  POST /api/browser/close"));
});

// Arrêt propre
process.on('SIGINT', async () => {
  process.exit(0);
});