const authController = require("./auth");
const categoryController = require("./category");
const notFound = require("./notfound");
const fileController = require("./file");
const postController = require("./post");

module.exports = {
  authController,
  categoryController,
  notFound,
  fileController,
  postController,
};
