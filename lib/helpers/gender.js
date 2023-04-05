const genderOptions = [
  'man',
  'Woman',
  'transgender',
  'binary',
  'none',
];

function getGenderId(gender, genderOptions) {
  return genderOptions.indexOf(gender.toLowerCase()) !== -1 ? genderOptions.indexOf(gender) + 1 : 0;
}

module.exports = {
  genderOptions,
  getGenderId,
};
