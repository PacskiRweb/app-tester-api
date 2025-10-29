class BaseException {
  message;
  code;

  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}
module.exports = BaseException;
