const { PrismaClient } = require('@prisma/client');
const response = require('../../../lib/response');

const prisma = new PrismaClient();

const createArtist = async function createArtist(req, res, next) {
  const resp = response();

  try {
    await prisma.artist.create({
      data: req.body.normalizedData,
    });
  } catch (err) {
    console.error(err);
    resp.success = false;
    resp.message = 'Internal error occurred!';
    return res.status(500).json(resp);
  }
  return res.json(resp);
};

module.exports = createArtist;
