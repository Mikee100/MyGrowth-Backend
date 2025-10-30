const express = require('express');
const router = express.Router();
const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const auth = require('../middleware/auth');

// GET /api/budgets - Get all budgets
router.get('/', auth, getBudgets);

// GET /api/budgets/:id - Get single budget
router.get('/:id', auth, getBudget);

// POST /api/budgets - Create new budget
router.post('/', auth, createBudget);

// PUT /api/budgets/:id - Update budget
router.put('/:id', auth, updateBudget);

// DELETE /api/budgets/:id - Delete budget
router.delete('/:id', auth, deleteBudget);

module.exports = router;
