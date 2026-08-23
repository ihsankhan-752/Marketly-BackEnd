class ErrorHandler extends Error {
  constructor(message = "Something went worng",statusCode, errors) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.message = message


    Error.captureStackTrace(this,constructor)

  }
}

export default ErrorHandler;
