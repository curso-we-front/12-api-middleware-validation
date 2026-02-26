const { required, minLength, maxLength, isEmail, validate, validateBody } = require('../src/utils/validate');
const supertest = require('supertest');
const express = require('express');

describe('Validadores individuales', () => {
  test('required falla con valor vacío', () => {
    expect(required()('')).toBeTruthy();
    expect(required()(null)).toBeTruthy();
    expect(required()(undefined)).toBeTruthy();
  });

  test('required pasa con valor', () => {
    expect(required()('hola')).toBeNull();
  });

  test('minLength falla si es muy corto', () => {
    expect(minLength(5)('ab')).toBeTruthy();
  });

  test('minLength pasa si es suficientemente largo', () => {
    expect(minLength(3)('hola')).toBeNull();
  });

  test('isEmail falla con email inválido', () => {
    expect(isEmail()('no-es-email')).toBeTruthy();
  });

  test('isEmail pasa con email válido', () => {
    expect(isEmail()('user@example.com')).toBeNull();
  });
});

describe('validate()', () => {
  test('devuelve todos los errores', () => {
    const errors = validate({}, {
      title: [required()],
      email: [required(), isEmail()]
    });
    expect(Object.keys(errors)).toContain('title');
    expect(Object.keys(errors)).toContain('email');
  });

  test('devuelve {} si no hay errores', () => {
    const errors = validate({ title: 'Hola', email: 'a@b.com' }, {
      title: [required()],
      email: [required(), isEmail()]
    });
    expect(errors).toEqual({});
  });
});

describe('validateBody middleware', () => {
  const app = express();
  app.use(express.json());
  app.post('/test', validateBody({ name: [required(), minLength(2)] }), (req, res) => {
    res.json({ ok: true });
  });

  test('422 con datos inválidos', async () => {
    const res = await supertest(app).post('/test').send({ name: '' });
    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
  });

  test('pasa con datos válidos', async () => {
    const res = await supertest(app).post('/test').send({ name: 'Ana' });
    expect(res.status).toBe(200);
  });
});
