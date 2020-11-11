exports.catchErrors = function (fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch((error) => {
      const defaultStatus = error.status || 500
      res.status(defaultStatus).json({
        status: defaultStatus,
        message: error.message,
      })
    })
  }
}
