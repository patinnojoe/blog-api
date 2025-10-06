const express = require("express");
const isAuth = require("../midddleware/auth");
const { postController } = require("../controllers");
const { postValidator, validate } = require("../validators");

const router = express.Router();

router.post(
  "/",
  isAuth,
  postValidator.addPostValidator,
  validate,
  postController.addPost
);

router.put(
  "/:id",
  isAuth,
  postValidator.updatePostValidator,
  postValidator.idValidator,
  validate,
  postController.updatePost
);

router.delete(
  "/:id",
  isAuth,
  postValidator.idValidator,
  validate,
  postController.deletePost
);

router.get("/", isAuth, postController.getPost);
router.get(
  "/:id",
  isAuth,
  postValidator.idValidator,
  validate,
  postController.postDetail
);

module.exports = router;
