module.exports = (req, res, next) => {
  res
    .status(404)
    .json({ status: false, code: 404, message: "endpoint not found" });
};
