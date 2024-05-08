const mongoose = require('mongoose');
const shortUrlService = require('../src/services/shortUrl');

// TODO: Get environment variables
const EXAMPLE_COUNT = 1000000;
const MONGODB_USERNAME = 'root';
const MONGODB_PASSWORD = 'password';

async function generateExamples() {
  // Connect to MongoDB
  try {
    const mongodbUrl = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@localhost:27017`;
    await mongoose.connect(mongodbUrl);
  } catch (error) {
    console.log('Unable to connect to MongoDB', error)
    return;
  }

  // Create examples
  for (let i = 0; i < EXAMPLE_COUNT; i++) {
    await shortUrlService.create({
      url: 'http://www.facebook.com/',
    });
  }

  process.exit(1);
}

generateExamples();
