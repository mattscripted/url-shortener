const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world - edited');
});

app.get('/:shortUrl', (req, res) => {
  res.send(req.params.shortUrl);
});

app.post('/api/short-url', (req, res) => {
  res.send(req.body.url);
});

app.listen(8000, () => {
  console.log('Listening on port 8000 - edited');
});
