const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Create a text index on title and content for search bonus
articleSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Article', articleSchema);