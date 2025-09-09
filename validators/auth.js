const { check } = require("express-validator");

const validateSignup = [
  check("name").notEmpty().withMessage("Name cannot be empty"),

  check("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .notEmpty()
    .withMessage("email cannot be empty"),

  check("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be a min of 6 character and a max of 20"),
];

module.exports = {
  validateSignup,
};
