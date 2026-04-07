const supertest = require('supertest');
const express = require('express');
const { createRateLimit } = require('../src/middlewares/rateLimit');

function buildApp(options) {
  const app = express();
  app.use(createRateLimit(options));
  app.get('/ping', (req, res) => res.json({ ok: true }));
  return app;
}

describe('createRateLimit', () => {
  test('permite peticiones dentro del límite', async () => {
    const app = buildApp({ windowMs: 5000, max: 3 });
    const res = await supertest(app).get('/ping');
    expect(res.status).toBe(200);
  });

  test('responde 429 al superar el límite', async () => {
    const app = buildApp({ windowMs: 5000, max: 2 });
    await supertest(app).get('/ping');
    await supertest(app).get('/ping');
    const res = await supertest(app).get('/ping');
    expect(res.status).toBe(429);
  });

  test('incluye el header Retry-After en la respuesta 429', async () => {
    const app = buildApp({ windowMs: 5000, max: 1 });
    await supertest(app).get('/ping');
    const res = await supertest(app).get('/ping');
    expect(res.status).toBe(429);
    expect(res.headers['retry-after']).toBeDefined();
  });
});
