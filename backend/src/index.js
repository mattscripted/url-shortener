const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const ShortUrl = require('./models/ShortUrl');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
  res.send('ok');
});

app.get('/:shortUrlHash', async (req, res) => {
  const shortUrlHash = req.params.shortUrlHash;
  const shortUrl = await ShortUrl.findOne({ shortUrlHash })

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
});

app.post('/api/short-url', async (req, res) => {
  try {
    const url = req.body.url;
    
    // Generate a random, mostly unique hash
    // Note: There could be collisions, so there is probably a better hashing method
    const shortUrlHash = nanoid();
    const shortUrl = new ShortUrl({ shortUrlHash, url });
    await shortUrl.save();

    // TODO: Do I need to return a nested data object?
    res.json({
      data: {
        type: 'shortUrl',
        id: shortUrlHash,
        attributes: {
          url: shortUrl.url
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      errors: [{
        status: 500,
        detail: 'Unable to create short URL.'
      }]
    });
  }
});

async function main() {
  try {
    const mongodbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database:27017`;
    await mongoose.connect(mongodbUrl);
    console.log('Connected to MongoDB');

    app.listen(8000, () => {
      console.log('Listening on port 8000');
    });
  } catch (error) {
    console.log('Unable to connect to MongoDB', error)
  }
}

main();