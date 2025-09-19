const express = require("express");
const { authController } = require("../controllers");
const { authValidator, validate } = require("../validators");
const {
  validateEmail,
  validateNewpassword,
  validateChangePassword,
} = require("../validators/auth");
const isAuth = require("../midddleware/auth");

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

router.post(
  "/verify-user",
  authValidator.validateCode,
  validate,
  authController.verifyUser
);

router.post(
  "/forgot-password-code",
  validateEmail,
  validate,
  authController.forgotPasswordCode
);

router.post(
  "/recover-password",
  validateNewpassword,
  validate,
  authController.recoverPassword
);
router.put("/change-password", isAuth, authController.changePassword);

module.exports = router;
