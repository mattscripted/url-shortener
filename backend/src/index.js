const express = require('express');

const app = express();

app.get('/status', (req, res) => {
  res.send('ok');
});

app.get('/:shortUrlHash', (req, res) => {
  res.redirect('http://www.google.com/');
});

app.post('/api/short-url', (req, res) => {
  res.send('create a short-url');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
