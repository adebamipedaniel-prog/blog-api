const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const { createArticleSchema, updateArticleSchema } = require('../validations/articleValidation');

// --- GET all articles ---
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- GET a single article by ID ---
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- POST (create) a new article with Joi validation ---
router.post('/', async (req, res) => {
  // Validate request body
  const { error, value } = createArticleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newArticle = new Article(value);
    const saved = await newArticle.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- PUT (update) an article with Joi validation ---
router.put('/:id', async (req, res) => {
  // Validate update fields
  const { error, value } = updateArticleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, value, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- DELETE an article ---
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- BONUS: Search articles by keyword (uses $text index) ---
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === '') {
    return res.status(400).json({ error: 'Search query parameter "q" is required' });
  }

  try {
    // Use $text search with score sorting
    const articles = await Article.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;