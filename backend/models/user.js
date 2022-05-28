//user
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  pic: {
    type: String,
    required: true,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "advisor"],
  },
  gender: {
    type: String,
    enum: ["Male,Female,Others"],
  },
  details: {
    type: Boolean,
    default: false,
  },
});

// hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// validate the password with passed password
userSchema.methods.validatePassword = async function (user_password) {
  return await bcrypt.compare(user_password, this.password);
};

// generate the JWT token

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      verified: this.verified,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
