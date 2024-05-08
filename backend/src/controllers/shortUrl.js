const { body, validationResult } = require('express-validator');
const { nanoid } = require('nanoid');
const ShortUrl = require('../models/ShortUrl');

async function create(req, res) {
  const result = validationResult(req);

  if (!result.isEmpty()) { 
    return res.status(400).json({
      errors: [{
        status: 400,
        detail: 'Invalid URL provided.',
      }],
    });
  }

  try {
    const url = req.body.url;
    
    // Generate a random, mostly unique hash
    // Note: There could be collisions, so there is probably a better hashing method
    const shortUrlHash = nanoid();
    const shortUrl = new ShortUrl({ shortUrlHash, url });
    await shortUrl.save();

    res.json({
      data: {
        type: 'shortUrl',
        id: shortUrlHash,
        attributes: {
          url: shortUrl.url
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      errors: [{
        status: 500,
        detail: 'Unable to create short URL.',
      }],
    });
  }
}

module.exports = {
  create,
};
