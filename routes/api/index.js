const express = require('express');
const router = express.Router();

const artistRouter = require('./artist');
const albumRouter = require('./album');
const songRouter = require('./song');

router.use('/artists', artistRouter);
router.use('/albums', albumRouter);
router.use('/songs', songRouter);

module.exports = router;
