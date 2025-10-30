const Debt = require('../models/Debt');

// Get all debts
const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single debt
const getDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) {
      return res.status(404).json({ message: 'Debt not found' });
    }
    res.status(200).json(debt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create debt
const createDebt = async (req, res) => {
  try {
    const debt = new Debt({
      ...req.body,
      userId: req.user._id,
    });
    const savedDebt = await debt.save();
    res.status(201).json(savedDebt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update debt
const updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!debt) {
      return res.status(404).json({ message: 'Debt not found' });
    }
    res.status(200).json(debt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete debt
const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    if (!debt) {
      return res.status(404).json({ message: 'Debt not found' });
    }
    res.status(200).json({ message: 'Debt deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDebts,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
};
