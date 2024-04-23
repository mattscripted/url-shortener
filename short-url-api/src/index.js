const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ShortUrl = require('./models/ShortUrl');

const app = express();
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.send('ok');
})

app.get('/api/short-url/:shortUrl', async (req, res) => {
  // TODO: shortUrlHash is probably better
  const shortUrl = req.params.shortUrl;
  const foundShortUrl = await ShortUrl.findOne({ shortUrl })

  if (foundShortUrl) {
    return res.send(foundShortUrl.url)
  }

  res.status(404).send('Invalid short URL');
});

app.post('/api/short-url', async (req, res) => {
  const url = req.body.url;

  // TODO: Hash to get short URL
  const shortUrl = new ShortUrl({ shortUrl: 'test', url });
  await shortUrl.save();

  res.send(shortUrl.shortUrl);
});

async function main() {
  try {
    const mongodbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@short-url-db:27017`;
    await mongoose.connect(mongodbUrl);
    console.log('Connected to MongoDB');

    app.listen(8001, () => {
      console.log('Listening on port 8001');
    });
  } catch (error) {
    console.log('Unable to connect to MongoDB', error)
  }
}

main();