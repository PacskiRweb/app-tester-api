const puppeteer = require('puppeteer');
const SlackNotifier = require('./slackNotifier');
const chalk = require('chalk');

class TestRunner {
  constructor() {
    this.slackNotifier = new SlackNotifier();
    this.browser = null;
    this.results = {
      passed: 0,
      failed: 0,
      total: 0
    };
  }

  async initialize() {
    console.log(chalk.blue(__("🚀 Initialisation du navigateur...")));
    this.browser = await puppeteer.launch({
      headless: process.env.HEADLESS === 'true',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async runTest(siteName, testName, testFunction) {
    const startTime = Date.now();
    let page = null;
    
    try {
      console.log(chalk.yellow(__("🧪 Exécution du test:")), `${siteName} - ${testName}`);
      
      page = await this.browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      
      // Configuration des timeouts
      page.setDefaultTimeout(parseInt(process.env.TIMEOUT) || 30000);
      
      // Exécution du test
      await testFunction(page);
      
      const duration = Date.now() - startTime;
      this.results.passed++;
      this.results.total++;
      
      console.log(chalk.green(__("✅ Test réussi:")), `${siteName} - ${testName} (${duration}ms)`);
      
      // Envoyer notification de succès (optionnel)
      if (process.env.SLACK_NOTIFY_SUCCESS === 'true') {
        await this.slackNotifier.sendSuccessNotification(siteName, testName, duration);
      }
      
    } catch (error) {
      const duration = Date.now() - startTime;
      this.results.failed++;
      this.results.total++;
      
      console.log(chalk.red(__("❌ Test échoué:")), `${siteName} - ${testName} (${duration}ms)`);
      console.error(chalk.red(__("Erreur:")), error.message);
      
      // Envoyer notification d'erreur
      await this.slackNotifier.sendErrorNotification(siteName, testName, error);
      
    } finally {
      if (page) {
        await page.close();
      }
    }
  }

  async runSiteTests(siteName, siteConfig) {
    console.log(chalk.blue(__("🌐 Test du site:")), siteName);
    
    for (const testName of siteConfig.tests) {
      try {
        const testModule = require(`../sites/${siteName}/${testName}.js`);
        await this.runTest(siteName, testName, testModule.run);
      } catch (error) {
        console.error(chalk.red(__("❌ Impossible de charger le test:")), `${siteName}/${testName}`);
        console.error(error.message);
      }
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log(chalk.blue(__("🔒 Navigateur fermé")));
    }
  }

  printSummary() {
    console.log(chalk.blue(__("\n📊 Résumé des tests:")));
    console.log(chalk.green(__("✅ Réussis:")), this.results.passed);
    console.log(chalk.red(__("❌ Échoués:")), this.results.failed);
    console.log(chalk.blue(__("📈 Total:")), this.results.total);
    
    if (this.results.failed > 0) {
      console.log(chalk.red(__("⚠️  Certains tests ont échoué. Vérifiez les notifications Slack.")));
    } else {
      console.log(chalk.green(__("🎉 Tous les tests sont passés avec succès!")));
    }
  }
}

module.exports = TestRunner;
