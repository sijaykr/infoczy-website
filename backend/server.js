const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ACTION: CORS ko behtar tarike se configure kiya gaya hai
app.use(cors({
  exposedHeaders: ['x-auth-token'],
}));

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection FAILED:', err.message);
    process.exit(1);
  }
};

connectDB();

// Use Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/chat', require('./routes/chat'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));