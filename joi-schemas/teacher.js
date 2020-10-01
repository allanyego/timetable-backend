const Joi = require("joi");

const newSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  title: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports = {
  newSchema,
};
