const Habit = require('../models/Habit');

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
