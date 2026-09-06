function createRateLimit({ windowMs = 60000, max = 100 } = {}) {
  const store = new Map()

  return function rateLimitMiddleware(req, res, next) {
    const ip = req.ip
    const now = Date.now()
    let record = store.get(ip)
    if (!record || now > record.resetAt) {
      record = { count: 1, resetAt: now + windowMs }
      store.set(ip, record)
    } else {
      record.count++
    }
    if (record.count > max) {
      res.set("Retry-After", Math.ceil((record.resetAt - Date.now()) / 1000))
      return res.status(429).json({ error: "Too many requests" })
    }
    next()
  }
}

module.exports = { createRateLimit }
