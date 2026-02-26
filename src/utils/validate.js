/**
 * Tarea 2: Sistema de validación declarativo.
 *
 * Cada validador es una función que recibe el valor
 * y devuelve un mensaje de error (string) o null si es válido.
 */

const required = () => (value) => {
  // TODO: falla si value es null, undefined o string vacío
};

const minLength = (min) => (value) => {
  // TODO
};

const maxLength = (max) => (value) => {
  // TODO
};

const isNumber = () => (value) => {
  // TODO
};

const min = (minimum) => (value) => {
  // TODO
};

const max = (maximum) => (value) => {
  // TODO
};

const isEmail = () => (value) => {
  // TODO: validación básica con regex
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
  // TODO
}

/**
 * Tarea 3: Middleware que usa validate() y responde 422 si hay errores.
 *
 * @param {Object} schema
 * @returns {Function} middleware
 */
function validateBody(schema) {
  return (req, res, next) => {
    // TODO
  };
}

module.exports = { required, minLength, maxLength, isNumber, min, max, isEmail, validate, validateBody };
