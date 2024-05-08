const ShortUrl = require('../models/ShortUrl');

async function redirect(req, res) {
  const shortUrlHash = req.params.shortUrlHash;
  const shortUrl = await ShortUrl.findOne({ shortUrlHash });

  if (shortUrl) {
    res.redirect(shortUrl.url);
  } else {
    res.status(404).json({
      errors: [{
        status: 404,
        detail: 'No URL found for provided short URL hash.'
      }]
    });
  }
};

module.exports = {
  redirect,
};
