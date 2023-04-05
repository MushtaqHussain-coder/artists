const Joi = require('joi');
const { genderOptions } = require('../helpers/gender');

const schema = Joi.object({
  name: Joi.string().required(),
  nickName: Joi.string().required(),
  gender: Joi.string().required().valid(...genderOptions).insensitive(),
  country: Joi.number().required(),
  careerStartYear: Joi.number().required().min(1900).max(new Date().getFullYear()),
});

module.exports = {
  schema,
};
