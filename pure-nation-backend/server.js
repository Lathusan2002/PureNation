const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup 
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:8080', 'http://localhost:8080'],
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session management using MongoDB
app.use(session({
  secret: 'your_very_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: false,      
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// API Route Handlers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/events', require('./routes/events'));
app.use('/api/proof', require('./routes/proofs'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/involvement', require('./routes/involvement'));
app.use('/api/sponsors', require('./routes/sponsors'));
app.use('/uploads', express.static('uploads'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin', require('./routes/admin'));



// MongoDB Connection
const DB_URI = process.env.MONGO_URI;
console.log("Connecting to MongoDB...");
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
  });
