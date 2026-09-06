const required = () => (value) => {
  if (value === null || value === undefined || value === "") {
    return "Requirement error"
  }
  return null
}

const minLength = (min) => (value) => {
  if (value.length < min) {
    return `Minimum length ${min}`
  }
  return null
}

const maxLength = (max) => (value) => {
  if (value.length > max) {
    return `Maximum length is ${max}`
  }
  return null
}

const isNumber = () => (value) => {
  if (typeof value !== "number") {
    return "Value must be a number"
  }
  return null
}

const min = (minimum) => (value) => {
  if (value < minimum) {
    return `Minimum is ${minimum}`
  }
  return null
}

const max = (maximum) => (value) => {
  if (value > maximum) {
    return `Maximum is ${maximum}`
  }
  return null
}

const isEmail = () => (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(value)) {
    return `Invalid email`
  }
  return null
}

function validate(data, schema) {
  const errors = {}
  for (const field in schema) {
    for (const validator of schema[field]) {
      const error = validator(data[field])
      if (error) {
        errors[field] = error
        break
      }
    }
  }
  return errors
}

function validateBody(schema) {
  return (req, res, next) => {
    const errors = validate(req.body, schema)
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors })
    }
    next()
    // TODO
  }
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
}
