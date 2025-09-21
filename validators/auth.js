const { check } = require("express-validator");
const validateEmailFunc = require("./validateEmail");
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

const validateSignIn = [
  check("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email"),

  check("password")
    .notEmpty()
    .withMessage("Password is can not empty")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be 6 character or 20 character max!"),
];

const validateEmail = [
  check("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("must be a valid email"),
];

const validateCode = [
  check("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("must be a valid email"),
  check("code").notEmpty().withMessage("verification code cannot be empty"),
];

const validateNewpassword = [
  check("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("must be a valid email"),

  check("code").notEmpty().withMessage("verification code cannot be empty"),

  check("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be a min of 6 character and a max of 20"),
];

const validateChangePassword = [
  check("oldPassword")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be a min of 6 character and a max of 20"),
  check("newPassword")
    .notEmpty()
    .withMessage("the new password field must be filled"),
];

const validateEditProfile = [
  check("email").custom(async (email) => {
    if (email) {
      const isValidEmail = validateEmailFunc(email);
      if (!isValidEmail) {
        throw new Error("invalid Email");
      }
    }
  }),
];

module.exports = {
  validateSignup,
  validateSignIn,
  validateEmail,
  validateCode,
  validateNewpassword,
  validateChangePassword,
  validateEditProfile,
};
