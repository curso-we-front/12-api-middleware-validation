/**
 * Tarea 1: Rate limiter sin librerías externas.
 *
 * Uso:
 *   app.use(createRateLimit({ windowMs: 60000, max: 100 }))
 *
 * @param {{ windowMs: number, max: number }} options
 * @returns {Function} middleware de Express
 */
function createRateLimit({ windowMs = 60000, max = 100 } = {}) {
  // Almacena contadores: Map<ip, { count, resetAt }>
  const store = new Map();

  return function rateLimitMiddleware(req, res, next) {
    // TODO: implementar
    // 1. Obtén la IP del cliente (req.ip)
    // 2. Comprueba si existe en el store y si la ventana ha expirado
    // 3. Incrementa el contador
    // 4. Si supera el max, responde 429 con header Retry-After
    // 5. Si no, añade headers informativos y llama a next()
    next();
  };
}

module.exports = { createRateLimit };
