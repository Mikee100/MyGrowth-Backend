require('dotenv').config(); // Load environment variables

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserProfile = require('../models/UserProfile');

// Check for required env variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment variables.');
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user
        let user = await UserProfile.findOne({ googleId: profile.id });
        if (!user) {
          user = await UserProfile.findOne({ email: profile.emails[0].value });
          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
          } else {
            // Create new user
            user = new UserProfile({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              isVerified: true,
            });
            await user.save();
          }
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserProfile.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
