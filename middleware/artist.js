const { schema: artistSchema } = require('../lib/validators/artist-create-schema');
const { getGenderId, genderOptions } = require('../lib/helpers/gender');
const response = require('../lib/response');

async function validateCreateArtist(req, res, next) {
  const resp = response();

  const { error } = artistSchema.validate(req.body, { allowUnknown: true });

  if (error) {
    resp.message = error.details[0].message || '';
    resp.success = false;
    console.error(req.body, resp);
    return res.status(400).json(resp);
  }

  next();
}

async function normalizeArtistData(req, res, next) {
  const { name, nickName, gender, country, careerStartYear } = req.body;
  const record = {
    name,
    nickName,
    gender: getGenderId(gender, genderOptions),
    country,
    careerStartYear,
  };

  req.body.normalizedData = record;

  next();
}

module.exports = {
  validateCreateArtist,
  normalizeArtistData,
};
