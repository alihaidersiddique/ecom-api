function errorHandler(err, req, res, next) {
  if (typeof err == "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (typeof err.name == "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (typeof err.name == "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Token is not valid" });
  }

  return res.status(500).json({ message: err.message });
}

module.exports = { errorHandler };
