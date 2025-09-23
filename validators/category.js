const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addCategoryValidator = [
  check("title").notEmpty().withMessage("title is required"),
];

const idValidator = [
  param("id").custom((id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("invalid id");
    }
    return true;
  }),
];

module.exports = {
  addCategoryValidator,
  idValidator,
};
