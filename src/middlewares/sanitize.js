function sanitize(allowedFields) {
  return function sanitizeMiddleware(req, res, next) {
    if (req.body && typeof req.body === "object") {
      for (const field in req.body) {
        if (typeof req.body[field] === "string") {
          req.body[field] = req.body[field].trim()
        }
        if (req.body[field] === null || req.body[field] === undefined) {
          delete req.body[field]
        }
        if (allowedFields && !allowedFields.includes(field)) {
          delete req.body[field]
        }
      }
    }
    next()
  }
}

module.exports = { sanitize }
