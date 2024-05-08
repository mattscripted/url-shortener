const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

;

async function main() {
  // Connect to MongoDB
  try {
    const mongodbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database:27017`;
    await mongoose.connect(mongodbUrl);
    console.log('Connected to MongoDB');    
  } catch (error) {
    console.log('Unable to connect to MongoDB', error);
    return;
  }

  // Connect to Redis
  try {
    const redisUrl = 'redis://cache';
    const redisClient = await redis.createClient({
      url: redisUrl
    });
    await redisClient.connect();

    console.log('Connected to Redis');
  } catch (error) {
    console.log('Unable to connect to Redis', error);
    return;
  }

  // Start listening
  app.listen(8000, () => {
    console.log('Listening on port 8000');
  });
}

main();

module.exports = app;
