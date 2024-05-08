const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://cache',
});

module.exports = redisClient;
