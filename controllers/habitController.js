const Habit = require('../models/Habit');
const Achievement = require('../models/Achievement');
const UserProfile = require('../models/UserProfile');

// Get all habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single habit
exports.getHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create habit
exports.createHabit = async (req, res) => {
  try {
    // Calculate initial streak based on days since start date
    const startDate = new Date(req.body.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const initialStreak = Math.max(0, daysSinceStart);

    const habitData = {
      ...req.body,
      userId: req.user._id,
      streak: initialStreak,
      lastCheckDate: startDate, // Set last check date to start date
    };

    const habit = new Habit(habitData);
    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update habit
exports.updateHabit = async (req, res) => {
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Check for achievements if habit streak increases
    if (req.body.streak && req.body.streak > 0) {
      await checkAndAwardHabitAchievements(req.user._id);
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
    if (!deletedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to check and award habit achievements
const checkAndAwardHabitAchievements = async (userId) => {
  try {
    const user = await UserProfile.findById(userId).populate('achievements');
    const habits = await Habit.find({ userId });
    const maxStreak = Math.max(...habits.map(h => h.streak), 0);

    // Define habit achievements
    const achievementsToCheck = [
      { criteria: 'habit_streak_7', name: 'Week Warrior', description: 'Maintain a 7-day habit streak', condition: maxStreak >= 7 },
      { criteria: 'habit_streak_30', name: 'Month Master', description: 'Maintain a 30-day habit streak', condition: maxStreak >= 30 },
      { criteria: 'habit_streak_100', name: 'Century Champion', description: 'Maintain a 100-day habit streak', condition: maxStreak >= 100 },
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
    console.error('Error checking habit achievements:', error);
  }
};
