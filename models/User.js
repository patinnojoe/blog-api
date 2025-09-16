const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true, trim: true, require: true },
    password: { type: String, require: true, minLength: 6 },
    forgotPasswordCode: { type: String },

    /**
     * 1=>super admin
     * 2=> admin
     * 3=>user
     *  */
    role: { type: Number, require: true, default: 3 },
    verficationCode: { type: String },
    isVerified: { default: false, type: Boolean },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
