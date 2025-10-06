const { check, param } = require("express-validator");
const mongoose = require("mongoose");

const addPostValidator = [
  check("title").notEmpty().withMessage("title is required"),
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error("invalid file");
    }
  }),
  check("category").notEmpty().withMessage("required"),
  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("invalid category");
    }
  }),
];

const updatePostValidator = [
  check("file").custom(async (file) => {
    if (file && !mongoose.Types.ObjectId.isValid(file)) {
      throw new Error("invalid file");
    }
  }),
  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw new Error("invalid category");
    }
  }),
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
  addPostValidator,
  updatePostValidator,
  idValidator,
};
