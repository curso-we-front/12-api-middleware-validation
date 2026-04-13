/**
 * Tarea 4: Middleware de sanitización del body.
 *
 * Uso básico (sin whitelist):
 *   app.use(sanitize())
 *
 * Uso con whitelist:
 *   app.post('/articles', sanitize(['title', 'content']), handler)
 *
 * @param {string[]} [allowedFields] - Lista de campos permitidos (opcional)
 * @returns {Function} middleware de Express
 */
function sanitize(allowedFields) {
  return function sanitizeMiddleware(req, res, next) {
    if (req.body && typeof req.body === "object") {
      for (const key in req.body) {
        let value = req.body[key];

        if (typeof value === "string") {
          value = value.trim();
        }

        if (value === null || value === undefined) {
          delete req.body[key];
          continue;
        }

        if (allowedFields && !allowedFields.includes(key)) {
          delete req.body[key];
          continue;
        }

        req.body[key] = value;
      }
    }

    next();
  };
}

module.exports = { sanitize };
