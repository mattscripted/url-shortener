const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redisClient = require('./utils/redisClient');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

async function main() {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL);
    console.log('Connected to MongoDB');    
  } catch (error) {
    console.log('Unable to connect to MongoDB', error);
    return;
  }

  // Connect to Redis
  try {
    await redisClient.connect();

    console.log('Connected to Redis');
  } catch (error) {
    console.log('Unable to connect to Redis', error);
    return;
  }

  // Start listening
  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
}

main();

module.exports = app;
