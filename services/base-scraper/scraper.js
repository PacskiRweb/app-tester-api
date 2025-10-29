const { getRandomInt } = require("../../tools/helper");

class Scraper {
  async screenshot(filename) {
    this.page.screenshot({ path: `${filename}.png`, fullPage: true });
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
