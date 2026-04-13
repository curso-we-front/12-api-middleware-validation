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
  const store = new Map();

  return function rateLimitMiddleware(req, res, next) {
    const ip = req.ip;
    const now = Date.now();

    let entry = store.get(ip);

    if (!entry || now > entry.resetAt) {
      entry = { count: 1, resetAt: now + windowMs };
      store.set(ip, entry);
    } else {
      entry.count++;
    }

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.set("Retry-After", retryAfter);

      return res.status(429).json({
        error: "Too many requests",
      });
    }

    next();
  };
}

module.exports = { createRateLimit };
