const express = require('express');
const router = express.Router();

const {
    createShortUrl,
    redirectUrl
} = require('../controllers/UrlController');

// Create short URL
router.post('/shorten', createShortUrl);

// Redirect
router.get('/:code', redirectUrl);

module.exports = router;