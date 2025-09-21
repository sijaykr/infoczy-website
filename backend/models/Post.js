// backend/models/Post.js - UPDATED

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['New Update', 'Admit Card', 'Results', 'Govt Scheme', 'Latest Jobs', 'Scholarship', 'Syllabus', 'Career', 'Admission Update'],
  },
  content: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
});

// ADD THIS LINE to enable efficient text searching on title and content

module.exports = mongoose.model('Post', PostSchema);