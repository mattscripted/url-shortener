const shortUrlService = require('../services/shortUrl');

async function redirect(req, res) {
  const shortUrlHash = req.params.shortUrlHash;
  const shortUrl = await shortUrlService.get(shortUrlHash);

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
