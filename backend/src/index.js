const express = require('express');
const bodyParser = require('body-parser');

const { nanoid } = require('nanoid');

const app = express();
app.use(bodyParser.json());

const SHORT_URLS = {};

app.get('/status', (req, res) => {
  res.send('ok');
});

app.get('/:shortUrlHash', (req, res) => {
  const shortUrlHash = req.params.shortUrlHash;
  const url = SHORT_URLS[shortUrlHash];

  if (url) {
    res.redirect('http://www.google.com/');
  } else {
    res.status(404).json({
      errors: [{
        status: 404,
        detail: 'No URL found for provided short URL hash.'
      }]
    });
  }
});

app.post('/api/short-url', (req, res) => {
  try {
    const url = req.body.url;
    
    // Generate a random, mostly unique hash
    // Note: There could be collisions, so there is probably a better hashing method
    const shortUrlHash = nanoid();

    SHORT_URLS[shortUrlHash] = url;

    // const shortUrl = new ShortUrl({ shortUrlHash, url });
    // await shortUrl.save();

    res.json({
      data: {
        type: 'shortUrl',
        id: shortUrlHash,
        attributes: {
          url,
          // url: shortUrl.url
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

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
