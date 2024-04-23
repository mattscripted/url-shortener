const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../../app/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app/build', 'index.html'))
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;

  try {
    const response = await axios.get(`http://short-url-api:8001/api/short-url/${shortUrl}`);
    return res.redirect(response.data);
  } catch(error) {
    res.status(404).send('Invalid short URL');
  }
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
