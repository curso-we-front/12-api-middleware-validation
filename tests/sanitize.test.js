const supertest = require('supertest');
const express = require('express');
const { sanitize } = require('../src/middlewares/sanitize');

function buildApp(allowedFields) {
  const app = express();
  app.use(express.json());
  app.post('/data', sanitize(allowedFields), (req, res) => res.json(req.body));
  return app;
}

describe('sanitize middleware', () => {
  test('recorta espacios en strings', async () => {
    const app = buildApp();
    const res = await supertest(app).post('/data').send({ name: '  Ana  ' });
    expect(res.body.name).toBe('Ana');
  });

  test('elimina campos con valor null', async () => {
    const app = buildApp();
    const res = await supertest(app).post('/data').send({ name: 'Ana', age: null });
    expect(res.body.age).toBeUndefined();
  });

  test('elimina campos con valor undefined', async () => {
    const app = buildApp();
    const res = await supertest(app)
      .post('/data')
      .send({ name: 'Ana', extra: undefined });
    expect(res.body.extra).toBeUndefined();
  });

  test('whitelist: elimina campos no permitidos', async () => {
    const app = buildApp(['title', 'content']);
    const res = await supertest(app)
      .post('/data')
      .send({ title: 'Hola', content: 'Texto', secret: 'xyz' });
    expect(res.body.title).toBe('Hola');
    expect(res.body.content).toBe('Texto');
    expect(res.body.secret).toBeUndefined();
  });

  test('whitelist: mantiene todos los campos permitidos', async () => {
    const app = buildApp(['a', 'b']);
    const res = await supertest(app).post('/data').send({ a: '1', b: '2' });
    expect(res.body.a).toBe('1');
    expect(res.body.b).toBe('2');
  });
});
