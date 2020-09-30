const Joi = require("joi");

const newSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  newSchema,
};
