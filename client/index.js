const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('This route will render the React app to create a short URL');
});

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;

  if (shortUrl === 'google') {
    return res.redirect('http://www.google.com/');
  }

  res.status(400).send('Invalid short URL');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
