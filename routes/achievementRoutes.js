const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');
const auth = require('../middleware/auth');

// Get all achievements
router.get('/', auth, achievementController.getAllAchievements);

// Get user's earned achievements
router.get('/user', auth, achievementController.getUserAchievements);

// Create achievement (admin only - you might want to add admin middleware)
router.post('/', auth, achievementController.createAchievement);

// Seed achievements
router.post('/seed', auth, achievementController.seedAchievements);

module.exports = router;
