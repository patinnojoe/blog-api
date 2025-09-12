const express = require("express");
const { authController } = require("../controllers");
const { authValidator, validate } = require("../validators");
const router = express.Router();

router.post(
  "/sign-up",
  authValidator.validateSignup,
  validate,
  authController.Signup
);

router.post(
  "/sign-in",
  authValidator.validateSignIn,
  validate,
  authController.SignIn
);

router.post(
  "/validate-user",
  authValidator.validateEmail,
  validate,
  authController.validateUser
);

module.exports = router;
