const express = require("express");
const { categoryController } = require("../controllers");
const { validate, categoryValidator } = require("../validators");
const isAuth = require("../midddleware/auth");
const isAdmin = require("../midddleware/admin");

const router = express.Router();

router.post(
  "/",
  isAuth,
  isAdmin,
  categoryValidator.addCategoryValidator,
  validate,
  categoryController.addCategory
);
router.put(
  "/:id",
  isAuth,
  isAdmin,
  categoryValidator.idValidator,
  validate,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  isAuth,
  isAdmin,
  categoryValidator.idValidator,
  validate,
  categoryController.deleteCategory
);
module.exports = router;
