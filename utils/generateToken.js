const { jwt_secret } = require("../config/keys");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    },
    jwt_secret,
    { expiresIn: "7d" }
  );

  return token;
};

module.exports = generateToken;
