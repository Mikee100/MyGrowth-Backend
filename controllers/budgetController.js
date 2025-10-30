const Budget = require('../models/Budget');

// Get all budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single budget
const getBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create budget
const createBudget = async (req, res) => {
  try {
    const budget = new Budget({
      ...req.body,
      userId: req.user._id,
    });
    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update budget
const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
};
