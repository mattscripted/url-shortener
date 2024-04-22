const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/:shortUrl', (req, res) => {
  res.send(req.params.shortUrl);
});

app.post('/api/short-url', (req, res) => {
  res.send(req.body.url);
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
})
