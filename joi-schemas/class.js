const Joi = require("joi");

const newSchema = Joi.object({
  level: Joi.string()
    .pattern(/^[0-9]{1}$/)
    .required(),
  stream: Joi.string().required(),
  classTeacher: Joi.string().required(),
});

module.exports = {
  newSchema,
};
