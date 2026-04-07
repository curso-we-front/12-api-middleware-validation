const express = require('express');
const { createRateLimit } = require('./middlewares/rateLimit');
const { sanitize } = require('./middlewares/sanitize');
const { errorHandler } = require('./middlewares/errorHandler');
const { validateBody, required, minLength, maxLength, isEmail } = require('./utils/validate');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(express.json());
app.use(createRateLimit({ windowMs: 60000, max: 100 }));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

const articleSchema = {
  title:  [required(), minLength(3), maxLength(100)],
  content: [required(), minLength(10)],
  author: [required()],
};

app.post(
  '/articles',
  sanitize(['title', 'content', 'author']),
  validateBody(articleSchema),
  (req, res) => {
    res.status(201).json({ ok: true, data: req.body });
  }
);

// Manejo de errores global
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
