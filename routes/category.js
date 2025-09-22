const express = require("express");
const { categoryController } = require("../controllers");
const { validate, categoryValidator } = require("../validators");
const isAuth = require("../midddleware/auth");
const router = express.Router();

router.post(
  "/",
  isAuth,
  categoryValidator.addCategoryValidator,
  validate,
  categoryController.addCategory
);

module.exports = router;
