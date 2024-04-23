const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

app.use(express.static(path.join(__dirname, '../../app/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../app/build', 'index.html'))
});

app.get('/:shortUrlHash', async (req, res) => {
  const shortUrlHash = req.params.shortUrlHash;

  try {
    const response = await axios.get(`http://short-url-api:8001/api/short-url/${shortUrlHash}`);
    const { url } = response.data.data.attributes;

    res.redirect(url);
  } catch(error) {
    res.status(error.response.status).send(error.response.data);
  }
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
