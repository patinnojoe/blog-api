const { Category, User } = require("../models");

const addCategory = async (req, res, next) => {
  try {
    const { title, desc } = req.body;
    const { _id } = req.user;

    const titleExist = await Category.findOne({ title });
    const user = await User.findById(_id);

    if (titleExist) {
      res.code = 400;
      throw new Error("Category already exist");
    }
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const categoryData = await Category.create({
      title: title,
      desc: desc,
      updatedBy: _id,
    });
    res.status(200).json({
      message: "category created",
      code: 200,
      status: true,
      categoryData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
};
