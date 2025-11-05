const Goal = require('../models/Goal');
const Achievement = require('../models/Achievement');
const UserProfile = require('../models/UserProfile');

// Get all goals
exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single goal
exports.getGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create goal
exports.createGoal = async (req, res) => {
  const goal = new Goal({
    ...req.body,
    userId: req.user._id,
  });
  try {
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update goal
exports.updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Check for achievements if goal is completed
    if (req.body.status === 'completed') {
      await checkAndAwardAchievements(req.user._id);
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete goal
exports.deleteGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to check and award achievements
const checkAndAwardAchievements = async (userId) => {
  try {
    const user = await UserProfile.findById(userId).populate('achievements');
    const goals = await Goal.find({ userId });
    const completedGoals = goals.filter(goal => goal.status === 'completed');

    // Define achievements
    const achievementsToCheck = [
      { criteria: 'complete_first_goal', name: 'First Steps', description: 'Complete your first goal', condition: completedGoals.length >= 1 },
      { criteria: 'complete_five_goals', name: 'Goal Achiever', description: 'Complete 5 goals', condition: completedGoals.length >= 5 },
      { criteria: 'complete_ten_goals', name: 'Goal Master', description: 'Complete 10 goals', condition: completedGoals.length >= 10 },
    ];

    for (const ach of achievementsToCheck) {
      const existing = user.achievements.find(a => a.criteria === ach.criteria);
      if (!existing && ach.condition) {
        const achievement = await Achievement.findOne({ criteria: ach.criteria });
        if (achievement) {
          user.achievements.push(achievement._id);
          user.points += achievement.points;
        }
      }
    }

    await user.save();
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
};
