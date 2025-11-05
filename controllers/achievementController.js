const Achievement = require('../models/Achievement');
const UserProfile = require('../models/UserProfile');

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's earned achievements
exports.getUserAchievements = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id).populate('achievements');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      achievements: user.achievements,
      points: user.points
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create achievement (admin only)
exports.createAchievement = async (req, res) => {
  const achievement = new Achievement(req.body);
  try {
    const savedAchievement = await achievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Seed initial achievements
exports.seedAchievements = async (req, res) => {
  try {
    const achievements = [
      { name: 'First Steps', description: 'Complete your first goal', criteria: 'complete_first_goal', points: 10, category: 'goals' },
      { name: 'Goal Achiever', description: 'Complete 5 goals', criteria: 'complete_five_goals', points: 25, category: 'goals' },
      { name: 'Goal Master', description: 'Complete 10 goals', criteria: 'complete_ten_goals', points: 50, category: 'goals' },
      { name: 'Week Warrior', description: 'Maintain a 7-day habit streak', criteria: 'habit_streak_7', points: 15, category: 'habits' },
      { name: 'Month Master', description: 'Maintain a 30-day habit streak', criteria: 'habit_streak_30', points: 40, category: 'habits' },
      { name: 'Century Champion', description: 'Maintain a 100-day habit streak', criteria: 'habit_streak_100', points: 100, category: 'habits' },
    ];

    const savedAchievements = await Achievement.insertMany(achievements);
    res.status(201).json(savedAchievements);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
