const express = require('express');
const router = express.Router();
const {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');

// GET /api/budgets - Get all budgets
router.get('/', getBudgets);

// GET /api/budgets/:id - Get single budget
router.get('/:id', getBudget);

// POST /api/budgets - Create new budget
router.post('/', createBudget);

// PUT /api/budgets/:id - Update budget
router.put('/:id', updateBudget);

// DELETE /api/budgets/:id - Delete budget
router.delete('/:id', deleteBudget);

module.exports = router;
