import { User } from "../models/user.model.js";
import asyncHandler from "../utils/async.handler.js";
import ErrorHandler from "../utils/error.handler.js";
import { loginSchema, signUpSchema } from "../validations/auth.validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userSignUp = asyncHandler(async (req, res, next) => {
  const validationResult = signUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    const message = validationResult.error.errors[0].message;
    return next(new ErrorHandler(message, 400));
  }

  const { email, firstName, lastName, password } = validationResult.data;

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
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    const message = validationResult.error.errors[0].message;
    return next(new ErrorHandler(message, 400));
  }

  const { email, password } = validationResult.data;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password,
  );
  
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const payload = {
    _id: existingUser._id,
    email: existingUser.email,
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    role: existingUser.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  return res.status(200).json({
    success: true,
    message: "User Logged In",
    token,
  });
});
