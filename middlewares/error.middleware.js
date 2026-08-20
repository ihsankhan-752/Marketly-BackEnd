import ErrorHandler from "../utils/error.handler.js";

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Something went wrong";
  err.statusCode = err.statusCode || 500;

  return res.status(statusCode).json(new ErrorHandler(statusCode,{message:message}));
};
