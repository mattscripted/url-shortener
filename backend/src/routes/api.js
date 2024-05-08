const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const shortUrlController = require('../controllers/shortUrl');

router.post('/short-url',
  body('url').isURL(),
  shortUrlController.create
);

module.exports = router;
