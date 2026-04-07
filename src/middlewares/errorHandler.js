/**
 * Middleware de manejo de errores global.
 * Debe registrarse al final de todos los middlewares y rutas.
 *
 * Uso:
 *   app.use(errorHandler)
 */
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = { errorHandler };
