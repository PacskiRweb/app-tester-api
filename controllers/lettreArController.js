const LettreARTest = require("../tests/sites/LettreArTest");

// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

// Instance du test Lettre AR
const lettreARTest = new LettreARTest();

// Test de recherche Lettre AR
async function testTunnel(req, res) {
  const { query = "Puppeteer automation" } = req.body;
  const result = await lettreARTest.testTunnel(query);

  res.json({
    site: __("Lettre AR"),
    test: __("Tunnel"),
    query,
    result,
  });
}
module.exports = {
  testTunnel,
};
