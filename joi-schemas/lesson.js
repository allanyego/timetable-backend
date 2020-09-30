const Joi = require("joi");

const newSchema = Joi.object({
  teacher: Joi.number().required(),
  class: Joi.string().required(),
  subject: Joi.string().required(),
  day: Joi.number().required(),
  slot: Joi.number().required(),
});

module.exports = {
  newSchema,
};
