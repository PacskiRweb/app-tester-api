const BaseException = require("./baseExceptions");

class TimeoutException extends BaseException {
  constructor(message = "TIMEOUT_SCRAPPER_EXCEPTION", code = 408) {
    super(message, code);
  }
}

module.exports = TimeoutException;
