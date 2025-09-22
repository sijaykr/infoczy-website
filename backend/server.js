// backend/server.js - FINAL VERSION

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection FAILED:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// Use Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth')); // <-- ADD THIS LINE
app.use('/api/chat', require('./routes/chat')); // <-- YAH LINE JODEIN


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));