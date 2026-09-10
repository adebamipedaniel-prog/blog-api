const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Cloudflare & Google DNS

// ... rest of your seed.js code (require mongoose, etc.)

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const articleRoutes = require('./routes/articles');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/articles', articleRoutes);

// Health check (optional)
app.get('/', (req, res) => res.send('Blog API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));