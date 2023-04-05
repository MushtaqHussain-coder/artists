const router = require('express').Router();
const createArtist = require('./artist/create');

router.post('/artist/create', createArtist);

module.exports = router;