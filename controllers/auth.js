const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

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

const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }

    // check password
    const match = await comparePassword(password, user.password);

    if (!match) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }

    const token = await generateToken(user);

    res.status(201).json({
      message: "user logged in successfully",
      data: user,
      code: 201,
      status: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const validateUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // check if user exist
    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }
    // check if user is already verified
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }

    // save verification code
    const code = generateCode(6);
    user.verficationCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "Verification Code",
      content: "Verify your account",
      code,
    });

    res.status(201).json({
      message: "user verification code sent",
      data: code,
      code: 201,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Signup,
  SignIn,
  validateUser,
};
