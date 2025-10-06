const { File, Category, Post } = require("../models");

const addPost = async (req, res, next) => {
  try {
    const { file, title, desc, category } = req.body;
    const { _id } = req.user;

    if (file) {
      const isFileExist = await File.findById(file);
      if (!isFileExist) {
        res.code = 404;
        throw new Error("file not found");
      }
    }

    const isCategoryExist = await Category.findById(category);

    if (!isCategoryExist) {
      res.code = 404;
      throw new Error("category not found");
    }

    const newPost = new Post({
      title,
      desc,
      category,
      file,
      updatedBy: _id,
    });

    await newPost.save();

    res.status(200).json({ message: "post added", data: newPost });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { file, title, desc, category } = req.body;

    const { _id } = req.user;
    const { id } = req.params;

    if (file) {
      const isFileExist = await File.findById(file);
      if (!isFileExist) {
        res.code = 404;
        throw new Error("file not found");
      }
    }

    const isCategoryExist = await Category.findById(category);

    if (!isCategoryExist) {
      res.code = 404;
      throw new Error("category not found");
    }

    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("post not found");
    }
    post.title = title ? title : post?.title;
    post.desc = desc;
    post.file = file;
    post.category = category ? category : post?.category;
    post.updatedBy = _id;

    await post.save();

    res.status(200).json({ message: "post updated", data: post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("post not found");
    }

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted", code: 200 });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { page, size, q, category } = req.query;
    const pageNumber = parseInt(page) || 1;
    const sizeNumber = parseInt(size) || 1;
    let query = {};

    if (q) {
      const search = RegExp(q, "i");
      query = { $or: [{ title: search }] };
    }
    if (category) {
      query = { ...query, category };
    }

    const total = await Post.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);
    const posts = await Post.find(query)
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedBy: -1 });

    res.status(200).json({
      message: "post fetched",
      status: true,
      data: { posts, total, pages },
    });
  } catch (error) {
    next(error);
  }
};
const postDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("category")
      .populate("updatedBy", "-password");
    if (!post) {
      res.code = 404;
      throw new Error("post not found");
    }
    res.status(200).json({ message: "post fetched", data: post });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPost,
  updatePost,
  deletePost,
  getPost,
  postDetail,
};
