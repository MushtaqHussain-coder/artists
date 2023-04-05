const router = require('express').Router();
const createArtist = require('./artist/create');

const { validateCreateArtist, normalizeArtistData } = require('../../middleware/artist');

router.post('/create', validateCreateArtist, normalizeArtistData, createArtist);

module.exports = router;
