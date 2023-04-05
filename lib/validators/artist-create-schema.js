const Joi = require('joi');

const genderOptions = [
  'Man',
  'Woman',
  'Transgender',
  'Binary',
  'None',
];

const schema = Joi.object({
  name: Joi.string().required(),
  nickName: Joi.string().required(),
  gender: Joi.string().required().valid(...genderOptions).insensitive(),
  country: Joi.string().required(),
  careerStartYear: Joi.number().required().min(1900).max(new Date().getFullYear()),
});

module.exports = {
  schema,
};