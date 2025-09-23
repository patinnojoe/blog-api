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

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const { title, desc } = req.body;
    const category = await Category.findById(id);
    const existingCategory = await Category.findOne({ title: title });

    if (!category) {
      res.code = 404;
      throw new Error("no category found");
    }

    console.log(`
      existing title: ${existingCategory.title}
      title: ${title}
      existingCatogryId: ${existingCategory.id}
      categoryId : ${category.id}
      
      `);
    if (
      existingCategory &&
      existingCategory.title === title &&
      String(existingCategory.id) == String(category.id)
    ) {
      res.code = 400;
      throw new Error("category exist already ");
    }

    const newTitle = title ?? category.title;
    category.title = newTitle;
    category.desc = desc;
    category.updatedBy = _id;

    await category.save();

    res.status(200).json({
      message: "category updated",
      code: 200,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.code = 404;
      throw new Error("no category found");
    }

    // await category.findByIdAndDelete(id);
    await category.deleteOne();

    res.status(200).json({
      message: "category deleted",
      status: true,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
};
