const Joi = require("joi");

const newSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});

module.exports = {
  newSchema,
};
