const shortid = require('shortid');
const Url = require('../models/urlModels');

// Create short URL
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ message: "URL is required" });
        }

        const shortCode = shortid.generate();

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.json({
            shortUrl: `http://localhost:5000/${shortCode}`,
            originalUrl
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Redirect
const redirectUrl = async (req, res) => {
    try {
        const { code } = req.params;

        const urlData = await Url.findOne({ shortCode: code });

        if (!urlData) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.redirect(urlData.originalUrl);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createShortUrl, redirectUrl };