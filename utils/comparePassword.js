const bycrypt = require("bcryptjs");

const comparePassword = (password, hashedPassword) => {
  return bycrypt.compare(password, hashedPassword);
};

module.exports = comparePassword;
