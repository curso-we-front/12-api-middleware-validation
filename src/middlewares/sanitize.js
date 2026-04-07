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
    if (req.body && typeof req.body === 'object') {
      // TODO: implementar
      // 1. Recorta espacios en todos los valores string (trim)
      // 2. Elimina campos cuyo valor sea null o undefined
      // 3. Si allowedFields está definido, elimina los campos que no estén en la lista
    }
    next();
  };
}

module.exports = { sanitize };
