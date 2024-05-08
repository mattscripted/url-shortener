const { validationResult } = require('express-validator');
const shortUrlService = require('../services/shortUrl');

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
    const shortUrl = await shortUrlService.create({ url });

    res.json({
      data: {
        type: 'shortUrl',
        id: shortUrl.shortUrlHash,
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
