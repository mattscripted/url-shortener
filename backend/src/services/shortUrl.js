const { nanoid } = require('nanoid');
const ShortUrl = require('../models/ShortUrl');

// TODO: Find a better short hash method
async function create({ url }) {
  // Generate a random, mostly unique hash
  // Note: There could be collisions, so there is probably a better hashing method
  const shortUrlHash = nanoid();
  const shortUrl = new ShortUrl({ shortUrlHash, url });
  return await shortUrl.save();
}

async function get(shortUrlHash) {
  return await ShortUrl.findOne({ shortUrlHash });
}

module.exports = {
  create,
  get,
};
