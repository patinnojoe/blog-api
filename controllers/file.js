const path = require("path");
const { fileValidator } = require("../validators");
const uploadFile = require("../utils/aws3");
const { File } = require("../models");

const addFile = async (req, res, next) => {
  // uploading to s3
  const { file } = req;
  if (!file) {
    res.code = 404;
    throw new Error("upload a file");
    // res.status(404).json("No file uploaded");
  }

  const ext = path.extname(file.originalname);
  const isValidExt = fileValidator.validateExtension(ext);
  if (!isValidExt) {
    res.code = 400;
    throw new Error("invalid extension");
  }

  try {
    const key = await uploadFile({ file, ext });
    if (key) {
      const file = new File({
        key,
        size: file.size,
        mimeType: file.mimetype,
        createdBy: req.user._id,
      });

      await file.save();
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getSignedURL = async (req, res, next) => {
  try {
    const { Key } = req.query;
    const url = uploadFile.singedURL(Key);
    res.status(200).json({ code: 200, status: true, data: { url } });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { Key } = req.query;
    await uploadFile.deleteFile(Key);
    await File.findOneAnddelete({ key: Key });
    res.status(200).json({ message: "file delete", code: 200 });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFile,
  getSignedURL,
  deleteFile,
};
