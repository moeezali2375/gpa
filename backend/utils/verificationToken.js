const crypto = require("crypto");

const generateVerificationToken = () => {
  return crypto.randomInt(100000, 999999);
};

const generatePwdToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const expiry = (time) => {
  return new Date(Date.now() + time * 1000);
};

module.exports = {
  generatePwdToken,
  generateVerificationToken,
  expiry,
};
