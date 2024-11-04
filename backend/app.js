const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const labRoutes = require('./routes/labRoutes');
const githubRoutes = require('./routes/githubRoutes');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Create Github API instance
const githubApi = require('axios').create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${process.env.GITHUB_TOKEN}`
  }
});

// Database connection
const dbURI = 'mongodb+srv://learnlink:learnlink@cluster0.ptp95.mongodb.net/learnlink';
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// Routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(labRoutes)
app.use('/api', githubRoutes);

module.exports = app;