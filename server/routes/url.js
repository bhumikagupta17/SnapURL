import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';

const router = express.Router();
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  try {
    const shortCode = 'snap-' + nanoid(5);
    const url = new Url({ originalUrl, shortCode });
    await url.save();
    res.json({ shortCode, shortUrl: `http://localhost:8000/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    url.clicks++;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/analytics/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.json({ originalUrl: url.originalUrl, shortCode: url.shortCode, clicks: url.clicks });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;