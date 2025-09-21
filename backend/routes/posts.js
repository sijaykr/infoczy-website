// infoczy/backend/routes/posts.js - FINAL CORRECTLY ORDERED VERSION

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware'); // <-- 1. IMPORT MIDDLEWARE


// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ postDate: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// IMPORTANT: The '/search' route must come BEFORE the '/:id' route.
// GET search for posts - USING UNIVERSAL REGEX METHOD
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }
        
        const searchRegex = new RegExp(query, 'i');

        const posts = await Post.find({
            $or: [
                { title: searchRegex },
                { content: searchRegex }
            ]
        }).sort({ postDate: -1 });
        
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET a single post by its ID
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: 'Post not found' });
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// GET all posts in a specific category
router.get('/category/:categoryName', async (req, res) => {
    try {
      const posts = await Post.find({ category: req.params.categoryName }).sort({ postDate: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// POST (create) a new post
router.post('/', auth, async (req, res) => { // <-- 2. ADD 'auth' MIDDLEWARE
    try {
        const newPost = new Post({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT (update) a post by ID
router.put('/:id', auth, async (req, res) => { // <-- 3. ADD 'auth' MIDDLEWARE
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a post by ID
router.delete('/:id', auth, async (req, res) => { // <-- 4. ADD 'auth' MIDDLEWARE
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ msg: 'Post not found' });
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;