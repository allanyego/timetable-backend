const Joi = require("joi");

const newSchema = Joi.object({
  level: Joi.number().required(),
  stream: Joi.string().required(),
  classTeacher: Joi.string().required(),
});

module.exports = {
  newSchema,
};
