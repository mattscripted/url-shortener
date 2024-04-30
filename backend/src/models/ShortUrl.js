const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  shortUrlHash: {
    type: String,
    index: true,
  },
  url: String,
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;
