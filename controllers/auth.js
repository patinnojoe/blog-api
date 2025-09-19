const { User } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const {
  reconstructFieldPath,
} = require("express-validator/lib/field-selection");

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

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    // no user with email
    if (!user) {
      res.code = 404;
      throw new Error("No user with this email exist");
    }

    // user code
    if (code !== user.verficationCode) {
      res.code = 400;
      throw new Error("Invalid code");
    }

    // if code exist and match
    user.isVerified = true;
    user.verficationCode = null;
    await user.save();

    res.status({
      status: 200,
      message: "user verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// forgot password
const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("No user found");
    }

    const code = generateCode(6);
    user.forgotPasswordCode = code;
    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "Forgot Password",
      code,
      content: "Use this code to change your password",
    });

    res.status(201).json({
      message: "a new code sent",
      data: code,
      code: 200,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, password, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error("user not found");
    }

    if (code !== user.forgotPasswordCode) {
      res.code = 400;
      throw new Error("password doesnt match");
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgotPasswordCode = null;
    await user.save();

    res.status(201).json({
      message: "Password updated",
      code: 201,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.code = 404;
      throw new Error("user not found!");
    }
    const isPasswordMatched = await comparePassword(oldPassword, user.password);

    if (!isPasswordMatched) {
      res.code = 400;
      throw new Error("Enter the correct old password");
    }
    if (newPassword?.trim() !== confirmPassword?.trim()) {
      res.code = 400;
      throw new Error("New Password and confirm password field must match");
    }

    if (newPassword?.trim() == oldPassword?.trim()) {
      res.code = 400;
      throw new Error("You are providinng the old password, pick a new one");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password updated successfully",
      code: 200,
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
  verifyUser,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
};
