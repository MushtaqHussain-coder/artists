const createArtist = async function createArtist(req, res, next) {
    return res.json({
      status: true,
      message: '',
      data: { body: req.body },
    });
  };
  
  module.exports = createArtist;