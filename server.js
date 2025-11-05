const app = require('./app');
const connectDB = require('./config/database');
const passport = require('./config/passport'); // Ensure passport is required and configured
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Google OAuth login route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/'); // Change this to your desired route
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
