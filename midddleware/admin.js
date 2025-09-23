const isAdmin = async (req, res, next) => {
  try {
    const isAdmin = (req.user && req.user.role === 1) || req.user.role === 2;
    if (isAdmin) {
      next();
    } else {
      res.code = 401;
      throw new Error("permission denied");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAdmin;
