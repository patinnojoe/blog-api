const { User } = require("../models");

const Signup = async (req, res, next) => {
  try {
    const { name, role, password, email } = req.body;

    // validation
    if (!name) {
      res.code = 400;
      throw new Error("Name is required");
    }
    if (!email) {
      res.code = 400;
      throw new Error("email is required");
    }
    if (!password) {
      res.code = 400;
      throw new Error("password is required");
    }
    if (password.length < 0) {
      res.code = 400;
      throw new Error("password is should be at least 6 characters");
    }

    const newUser = new User({
      name,
      role,
      password,
      email,
    });

    await newUser.save();

    res.status(201).json({
      message: "user created successfully",
      data: newUser,
      code: 201,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Signup,
};
