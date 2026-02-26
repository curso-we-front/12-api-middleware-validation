# 12 — Middlewares Avanzados y Validación

## Objetivo

Construir una suite de middlewares reutilizables y un sistema de validación manual robusto que pueda usarse en cualquier proyecto Express.

## Tareas

### Tarea 1 — Rate limiting (`src/middlewares/rateLimit.js`)
Implementa un middleware de rate limiting **sin librerías externas** usando un Map en memoria:
- Configurable: `createRateLimit({ windowMs, max })`
- Responde `429 Too Many Requests` si se supera el límite
- Incluye el header `Retry-After` en la respuesta

### Tarea 2 — Validación declarativa (`src/utils/validate.js`)
Crea un mini-sistema de validación:
```js
const schema = {
  title: [required(), minLength(3), maxLength(100)],
  age:   [required(), isNumber(), min(0), max(120)],
  email: [required(), isEmail()]
};
const errors = validate(body, schema);
// errors: { title: 'Es requerido', email: 'Email inválido' } o {}
```
Implementa los validadores: `required`, `minLength`, `maxLength`, `isNumber`, `min`, `max`, `isEmail`.

### Tarea 3 — Middleware de validación universal
Crea `validateBody(schema)` que use el sistema anterior y responda 422 automáticamente si hay errores.

### Tarea 4 — Sanitización (`src/middlewares/sanitize.js`)
Middleware que:
- Recorta espacios en strings (`trim`)
- Elimina campos con `null` o `undefined`
- Puede recibir una lista de campos permitidos y elimina el resto (whitelist)

## Estructura esperada

```
12-api-middleware-validation/
├── src/
│   ├── middlewares/
│   │   ├── rateLimit.js    ← Tarea 1
│   │   ├── sanitize.js     ← Tarea 4
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── validate.js     ← Tarea 2 y 3
│   └── app.js
├── tests/
│   ├── rateLimit.test.js
│   ├── validate.test.js
│   └── sanitize.test.js
└── package.json
```

## Criterios de evaluación

- [ ] El rate limiter funciona sin librerías externas
- [ ] `validate` devuelve todos los errores (no solo el primero)
- [ ] `validateBody(schema)` responde 422 con todos los errores del body
- [ ] `sanitize` con whitelist elimina campos no permitidos
- [ ] Los tests pasan
