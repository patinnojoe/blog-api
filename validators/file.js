const validateExtension = (ext) => {
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg") {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  validateExtension,
};
