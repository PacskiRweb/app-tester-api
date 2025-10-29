exports.focusElement = async (scraper, selector) => {
  await scraper.page.waitForSelector(selector);
  await scraper.page.focus(selector);
};

exports.selectElement = async (scraper, selector) => {
  await scraper.page.waitForSelector(selector);
  return await scraper.page.$(selector);
};

exports.selectElements = async (scraper, selector) => {
  await scraper.page.waitForSelector(selector);
  return await scraper.page.$$(selector);
};

exports.clickElement = async (scraper, selector) => {
  await scraper.page.waitForSelector(selector);
  await scraper.page.click(selector);
};

exports.getAttributValueFromElement = async (scraper, element, attribute) => {
  return await scraper.page.evaluate(
    (element, attribute) => element.getAttribute(attribute),
    element,
    attribute
  );
};

exports.getTextContentFromElement = async (scraper, element) => {
  return await scraper.page.evaluate((element) => element.textContent, element);
};

exports.getInnerTextFromElement = async (scraper, element) => {
  const exists = await scraper.page.$(element);
  if (exists) {
    return await scraper.page.$eval(element, (el) => el.innerText);
  } else {
    return null;
  }
};

exports.getSrcFromElement = async (scraper, element) => {
  return await scraper.page.evaluate((element) => element.src, element);
};

exports.typeInInput = async (scraper, selector, value) => {
  await scraper.page.waitForSelector(selector);
  await scraper.page.type(selector, value);
};

exports.delay = async (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

exports.elementExists = async (scraper, selector, timeout = 2000) => {
  try {
    await scraper.page.waitForSelector(selector, { timeout });
    return true;
  } catch (error) {
    if (error.name === "TimeoutError") {
      return false;
    }
    throw error;
  }
};
