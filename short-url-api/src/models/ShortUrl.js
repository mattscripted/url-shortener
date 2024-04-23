const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  shortUrl: String,
  url: String,
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
