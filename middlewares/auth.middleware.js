import ErrorHandler from "../utils/error.handler.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next(new ErrorHandler("Auth Header Missing", 401));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(
      new ErrorHandler("Auth Header should be start with Bearer", 401),
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Token missing", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};



export const isAdmin = async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(new ErrorHandler("Not authorized", 403));
  }

  next();
};


export const isStoreOwner = (req,res,next)=>{
  if(req.user.role !== "storeOwner") {
    return next(new ErrorHandler("Not authorized",403));
  }

  next();
} 