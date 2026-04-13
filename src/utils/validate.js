/**
 * Tarea 2: Sistema de validación declarativo.
 *
 * Cada validador es una función que recibe el valor
 * y devuelve un mensaje de error (string) o null si es válido.
 */

const required = () => (value) => {
  
  if (value === null || value === undefined || value === "") {
    return "El valor es requerido";
  }
  return null;
};

const minLength = (min) => (value) => {
  if (value === null || value.length < min) {
    return `Debe tener al menos ${min} caracteres`;
  }
  return null;
};

const maxLength = (max) => (value) => {
  if (value === null || value.length > max) {
    return `Debe tener como máximo ${max} caracteres`;
  }
  return null;
};

const isNumber = () => (value) => {
  if (typeof value !== "number") {
    return "El tipo de dato debe ser numérico";
  }
  return null;
};

const min = (minimum) => (value) => {
  if (value == null || value < minimum) {
    return `El mínimo es ${minimum}`;
  }
  return null;
};

const max = (maximum) => (value) => {
  if (value == null || value > maximum) {
    return `El máximo es ${maximum}`;
  }
  return null;
};

const isEmail = () => (value) => {
  if (value == null) {
    return null;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    return "Debe ser un email válido";
  }

  return null;
};

/**
 * Ejecuta el schema de validación sobre el objeto data.
 * Devuelve un objeto con los errores: { campo: 'mensaje' }
 * Si no hay errores, devuelve {}
 *
 * @param {Object} data
 * @param {Object} schema - { campo: [validador1, validador2, ...] }
 * @returns {Object} errors
 */
function validate(data, schema) {
  const errors = {};

  for (const field in schema) {
    for (const validator of schema[field]) {
      const error = validator(data[field]);

      if (error) {
        errors[field] = error;
        break;
      }
    }
  }

  return errors;
}

/**
 * Tarea 3: Middleware que usa validate() y responde 422 si hay errores.
 *
 * @param {Object} schema
 * @returns {Function} middleware
 */
function validateBody(schema) {
  return (req, res, next) => {
    const errors = validate(req.body, schema);

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors });
    }

    next();
  };
}

module.exports = {
  required,
  minLength,
  maxLength,
  isNumber,
  min,
  max,
  isEmail,
  validate,
  validateBody,
};
