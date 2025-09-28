const express = require("express");
const { fileController } = require("../controllers");
const isAuth = require("../midddleware/auth");
const { uploadMiddleware } = require("../midddleware");

const router = express.Router();
router.post(
  "/upload",
  isAuth,
  uploadMiddleware.array("image", 3),
  fileController.addFile
);

module.exports = router;
