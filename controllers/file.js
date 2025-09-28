const addFile = (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addFile,
};
