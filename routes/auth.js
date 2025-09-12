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

module.exports = router;
