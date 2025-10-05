const express = require("express");
const { fileController } = require("../controllers");
const isAuth = require("../midddleware/auth");
const { uploadMiddleware } = require("../midddleware");

const router = express.Router();
router.post(
  "/upload",
  isAuth,
  uploadMiddleware.single("image"),
  fileController.addFile
);

router.get("/signed-url", isAuth, fileController.getSignedURL);
router.get("/delete-file", isAuth, fileController.deleteFile);

module.exports = router;
