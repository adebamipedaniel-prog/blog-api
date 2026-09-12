const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const { requireAuth } = require('../middleware/authMiddleware');

// Task 4: Protect ALL CRUD routes with requireAuth middleware
router.use(requireAuth); 

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/:id')
  .put(updatePost)
  .delete(deletePost);

module.exports = router;