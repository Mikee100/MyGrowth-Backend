const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const session = require('express-session');

// Import routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const goalRoutes = require('./routes/goalRoutes');
const habitRoutes = require('./routes/habitRoutes');
const userRoutes = require('./routes/userRoutes');
const debtRoutes = require('./routes/debtRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const sexLifeEventRoutes = require('./routes/sexLifeEventRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware for Passport
app.use(
  session({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/user', userRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/sex-life-events', sexLifeEventRoutes);
app.use('/api/achievements', achievementRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'MyGrowth Backend is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
