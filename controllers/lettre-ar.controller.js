const { validationResult } = require("express-validator");
const { formatResponse } = require("../tools/helper");
const LettreARScraper = require("../scrapers/lettre-ar.scraper");

exports.testTunnel = (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    new LettreARScraper()
      .testTunnel()
      .then((data) => {
        res.status(200).json(formatResponse("success", data));
      })
      .catch((error) => {
        res
          .status(error.code)
          .json(formatResponse("error", null, error.message));
      });
  } else {
    res.status(422).json({ status: "error", errors: errors.array() });
  }
};
