const { getRandomInt } = require("../../tools/helper");
const path = require("path");
const fs = require("fs");

class Scraper {
  async screenshot(scraper, filename) {
    const screenshotDir = path.join(__dirname, "../../assets/screenshots");
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    const screenshotPath = path.join(screenshotDir, `${filename}.png`);
    await scraper.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  async delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async randomDelay() {
    await this.delay(1000 * getRandomInt(3, 8));
  }

  async initialisation() {
    try {
      const puppeteer = require("puppeteer-extra");

      const browser = await puppeteer.launch({
        headless: process.env.HEADLESS === "true",
      });
      const page = await browser.newPage();

      return {
        browser: await browser,
        page: await page,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = Scraper;
