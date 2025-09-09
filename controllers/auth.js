const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");

const Signup = async (req, res, next) => {
  try {
    const { name, role, password, email } = req.body;
    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already taken");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      role,
      password: hashedPassword,
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
