const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']); // Cloudflare & Google DNS

// ... rest of your seed.js code (require mongoose, etc.)

require('dotenv').config();
const mongoose = require('mongoose');
const Article = require('./models/Article');

const articles = [
  {
    title: 'Getting Started with MongoDB',
    content: 'MongoDB is a NoSQL document database...',
    author: 'Jane Doe',
    tags: ['database', 'nosql', 'mongodb'],
  },
  {
    title: 'Mastering Express.js Middleware',
    content: 'Middleware functions are functions that have access to the request object...',
    author: 'John Smith',
    tags: ['express', 'nodejs', 'middleware'],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Article.deleteMany(); // clear existing
    const inserted = await Article.insertMany(articles);
    console.log(`✅ Seeded ${inserted.length} articles`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();