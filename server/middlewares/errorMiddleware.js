const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong! please try again later";
    res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
}

export default errorMiddleware;