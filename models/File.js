const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    key: { type: String, require: true },
    size: { type: Number },
    mimeType: { type: String, require: true },
    createdBy: { type: mongoose.Types.ObjectId, ref: "user", require: true },
  },
  { timestamps: true }
);

const File = mongoose.model("file", fileSchema);

module.exports = File;
