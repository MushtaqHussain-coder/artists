const router = require('express').Router();
const createArtist = require('./artist/create');
const { validateCreateArtist, normalizeArtistData } = require('../../middleware/artist');

router.post('/artist/create', validateCreateArtist, normalizeArtistData, createArtist);

module.exports = router;
