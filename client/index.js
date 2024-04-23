const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('This route will render the React app to create a short URL');
});

app.get('/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  res.send(`Redirect to the URL referenced by ${shortUrl}, or return a 404 error`);
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
