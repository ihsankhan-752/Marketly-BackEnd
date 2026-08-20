class ErrorHandler extends Error {
  constructor(message = "Something went worng", statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ErrorHandler;
