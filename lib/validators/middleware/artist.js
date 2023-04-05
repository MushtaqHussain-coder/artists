const { schema: artistSchema } = require('../lib/validators/artist-create-schema');

async function validateCreateArtist(req, res, next) {
  const resp = {};

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
  const normalizedData = [];
  const { name, nickName, gender, country, careerStartYear } = req.body;
  const record = {
    name,
    nick_name: nickName,
    gender,
    country,
    career_start_year: careerStartYear,
  };

  normalizedData.push(record);

  req.body = record;

  next();
}

module.exports = {
  validateCreateArtist,
  normalizeArtistData,
}