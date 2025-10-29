#!/usr/bin/env node

const TestRunner = require('./tests/utils/testRunner');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

async function main() {
  console.log(chalk.blue(__("🚀 Démarrage de l'outil de test de parcours utilisateur")));
  
  // Charger la configuration des sites
  const configPath = path.join(__dirname, 'tests/config/sites.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  const testRunner = new TestRunner();
  
  try {
    // Initialiser le navigateur
    await testRunner.initialize();
    
    // Obtenir les arguments de ligne de commande
    const args = process.argv.slice(2);
    const siteArg = args.find(arg => arg.startsWith('--site='));
    
    if (siteArg) {
      // Tester un site spécifique
      const siteName = siteArg.split('=')[1];
      if (config.sites[siteName]) {
        console.log(chalk.yellow(__("🎯 Test du site spécifique:")), siteName);
        await testRunner.runSiteTests(siteName, config.sites[siteName]);
      } else {
        console.error(chalk.red(__("❌ Site non trouvé:")), siteName);
        console.log(chalk.blue(__("Sites disponibles:")), Object.keys(config.sites).join(', '));
        process.exit(1);
      }
    } else {
      // Tester tous les sites
      console.log(chalk.yellow(__("🌐 Test de tous les sites")));
      for (const [siteName, siteConfig] of Object.entries(config.sites)) {
        await testRunner.runSiteTests(siteName, siteConfig);
      }
    }
    
  } catch (error) {
    console.error(chalk.red(__("❌ Erreur fatale:")), error.message);
    process.exit(1);
  } finally {
    // Nettoyer les ressources
    await testRunner.cleanup();
    
    // Afficher le résumé
    testRunner.printSummary();
  }
}

// Gestion des signaux pour un arrêt propre
process.on('SIGINT', async () => {
  console.log(chalk.yellow(__("\n⚠️  Arrêt demandé par l'utilisateur")));
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(chalk.yellow(__("\n⚠️  Arrêt demandé par le système")));
  process.exit(0);
});

// Exécuter le script principal
main().catch(error => {
  console.error(chalk.red(__("❌ Erreur non gérée:")), error);
  process.exit(1);
});
