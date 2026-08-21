import { User } from "../../models/user.model.js";
import asyncHandler from "../../utils/async.handler.js";
import ErrorHandler from "../../utils/error.handler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const userSignUp = asyncHandler(async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User Already exist", 409));
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "User Account Created",
    user: {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
});


export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const token = generateToken(existingUser);


  return res.status(200).json({
    success: true,
    message: "User Logged In",
    token,
  });
});

export const adminSignUp = asyncHandler(async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return next(new ErrorHandler("Admin Already exist", 409));
  }

  const admin = await User.create({
    email,
    firstName,
    lastName,
    password,
    role: "admin",
  });

  return res.status(201).json({
    success: true,
    message: "Admin account created",
    admin: {
      _id: admin._id,
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role,
    },
  });
});

