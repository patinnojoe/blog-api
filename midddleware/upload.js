const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = originalname.replace(extension, "");
    const compressedFilename = filename.split(" ").join("_");
    const lowercaseFilename = compressedFilename.toLocaleLowerCase();
    const code = generateCode(12);
    const finalFile = `${lowercaseFilename}_${code}${extension}`;

    callback(null, finalFile);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const mimeType = file.mimetype;
    if (
      mimeType === "image/jpg" ||
      mimeType === "image/jpeg" ||
      mimeType === "image/png" ||
      mimeType === "application/pdf"
    ) {
      callback(null, true);
    } else {
      callback(new Error(" only .jpg, jpeg or pdf allowed"));
    }
  },
});

module.exports = upload;
