const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const propiedad = [property];
    const { error } = schema.validate(propiedad, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.details[0].message));
    }
    next();
  };
}

module.exports = validatorHandler;