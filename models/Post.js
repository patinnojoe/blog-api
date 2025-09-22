const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  category: { type: mongoose.Types.ObjectId, require: true, ref: "category" },
  content: { type: String },
  postedBy: { type: mongoose.Types.ObjectId, require: true, ref: "user" },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
