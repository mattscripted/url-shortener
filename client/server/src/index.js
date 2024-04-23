const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../../app/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app/build', 'index.html'))
});

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (shortUrl === 'google') {
    return res.redirect('http://www.google.com/');
  }

  res.status(404).send('Invalid short URL');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
