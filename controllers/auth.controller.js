import { User } from "../models/user.model.js";
import asyncHandler from "../utils/async.handler.js";
import ErrorHandler from "../utils/error.handler.js";
import { signUpSchema } from "../validations/auth.validation.js";

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
