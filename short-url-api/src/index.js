const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// TODO: Use database
const shortUrls = {
  'google': 'http://www.google.com/'
}

app.get('/status', (req, res) => {
  res.send('ok');
})

app.get('/api/short-url/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (shortUrls[shortUrl]) {
    return res.send(shortUrls[shortUrl])
  }

  res.status(404).send('Invalid short URL');
});

app.post('/api/short-url', (req, res) => {
  const url = req.body.url;
  const shortUrl = 'test';
  shortUrls[shortUrl] = req.body.url;

  res.send(shortUrl);
});

app.listen(8001, () => {
  console.log('Listening on port 8001');
});
