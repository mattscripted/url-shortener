const express = require('express');
const router = express.Router();
const redirectController = require('../controllers/redirect');

router.get('/:shortUrlHash', redirectController.redirect);

module.exports = router;
