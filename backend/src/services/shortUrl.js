const { nanoid } = require('nanoid');
const redisClient = require('../utils/redisClient');
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
  // Try to use the cache for faster lookup
  const cachedUrl = await redisClient.get(`short-url-${shortUrlHash}`);

  if (cachedUrl) {
    return {
      shortUrlHash,
      url: cachedUrl,
    };
  }

  // Otherwise, check the database, and update the cache
  const shortUrl = await ShortUrl.findOne({ shortUrlHash });

  if (shortUrl) {
    await redisClient.set(shortUrlHash, shortUrl.url);

    return {
      shortUrlHash,
      url: shortUrl.url,
    };
  }

  return null;
}

module.exports = {
  create,
  get,
};
