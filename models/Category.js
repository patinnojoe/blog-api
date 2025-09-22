const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: { type: String, require: true },
  desc: { type: String },
  updatedBy: { type: mongoose.Types.ObjectId, ref: "user", require: true },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
