const express = require('express');
const router = express.Router();
const redirectRouter = require('./redirect');
const apiRouter = require('./api');

router.get('/status', (req, res) => {
  res.send('ok');
});

router.use('/', redirectRouter);
router.use('/api', apiRouter);

module.exports = router;
