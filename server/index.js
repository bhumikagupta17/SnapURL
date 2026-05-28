import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/url.js';
import Url from './models/Url.js';

dotenv.config();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// Redirect route at root level
app.get('/:shortCode', async (req, res) => {
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

app.use('/api', urlRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(8000, () => console.log('Server running on port 8000'));
  })
  .catch(err => console.error(err));