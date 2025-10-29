const lettreArConfig = require("../config/lettre-ar.config");
const Scraper = require("../services/base-scraper/scraper");
const { clickElement } = require("../services/base-scraper/scraper.helper");

class LettreARScraper extends Scraper {
  constructor() {
    super();
    // this.slackNotifier = new SlackNotifier();
  }

  //   test tunnel
  async testTunnel() {
    try {
      const scraper = await this.initialisation();
      await scraper.page.goto(lettreArConfig.tests.tunnel.url);
      await this.removeCookieBanner(scraper);

      return {
        success: true,
        message: "Tunnel testé avec succès",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Fermer le navigateur
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async removeCookieBanner(scraper) {
    try {
      await clickElement(
        scraper,
        'button[data-cookiefirst-action="accept"]'
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = LettreARScraper;
