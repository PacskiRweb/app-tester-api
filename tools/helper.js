const { TimeoutError } = require("puppeteer");
const TimeoutException = require("../exceptions/timeoutException");

exports.formatResponse = (status, data, message) => {
  const res = {
    status,
  };
  if (status === "error") {
    res.message = message;
  }
  if (data) {
    res.data = data;
  }
  return res;
};

exports.getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.stringClean = (string) => {
  if (string) {
    return string.replace(/(\r\n|\n|\r|')/gm, "").trim();
  } else return string;
};

exports.errorThrower = (error) => {
  if (error instanceof TimeoutError) {
    throw new TimeoutException();
  }

  return new Error(error.message);
};
