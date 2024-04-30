const express = require('express');

const app = express();

app.get('/status', (req, res) => {
  res.send('ok');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
