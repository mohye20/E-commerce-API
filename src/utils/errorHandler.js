class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const catchError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err);
    });
  };
};

export const globalErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      ...(process.env.MODE === "developement" && { stack: error.stack }),
    },
  });
};

export default AppError;
