const puppeteer = require('puppeteer');
const SlackNotifier = require('../utils/slackNotifier');

// Fonction pour les traductions (simulation)
function __(text) {
  return text;
}

class LettreARTest {
  constructor() {
    this.slackNotifier = new SlackNotifier();
  }

  // Fonction pour exécuter un test
  async runTest(testName, testFunction, url) {
    const startTime = Date.now();
    let page = null;
    
    try {
      const browser = await this.getBrowser();
      page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });
      page.setDefaultTimeout(30000);
      
      if (url) {
        await page.goto(url, { waitUntil: 'networkidle2' });
      }
      
      await testFunction(page);
      
      const duration = Date.now() - startTime;
      return { success: true, duration, message: __("Test réussi") };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Envoyer notification Slack en cas d'erreur
      await this.slackNotifier.sendErrorNotification('Google', testName, error);
      
      return { success: false, duration, message: error.message, error: error.stack };
    } finally {
      if (page) await page.close();
    }
  }

  // Initialiser le navigateur
  async getBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: process.env.HEADLESS === 'true',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
    }
    return this.browser;
  }

  // Test de recherche Google
  async testTunnel(query = 'Puppeteer automation') {
    return await this.runTest('google-search', async (page) => {
      await page.waitForSelector('input[name="q"]');
      await page.type('input[name="q"]', query);
      await page.keyboard.press('Enter');
      await page.waitForSelector('#search');
      
      const results = await page.$$('h3');
      if (results.length === 0) throw new Error(__("Aucun résultat trouvé"));
    }, 'https://www.google.com');
  }

  // Test de la page d'accueil Google
  async testHomepage() {
    return await this.runTest('google-homepage', async (page) => {
      // Vérifier les éléments essentiels de la page d'accueil
      const essentialElements = [
        'input[name="q"]',
        'input[type="submit"]',
        'a[href*="mail.google.com"]'
      ];
      
      for (const selector of essentialElements) {
        if (!(await page.$(selector))) {
          throw new Error(__("Élément essentiel manquant:") + ` ${selector}`);
        }
      }
      
      // Vérifier que la page est interactive
      await page.type('input[name="q"]', 'test');
      const inputValue = await page.$eval('input[name="q"]', el => el.value);
      if (inputValue !== 'test') {
        throw new Error(__("La barre de recherche n'est pas interactive"));
      }
    }, 'https://www.google.com');
  }

  // Fermer le navigateur
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

module.exports = LettreARTest;
