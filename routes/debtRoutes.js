const express = require('express');
const router = express.Router();
const {
  getDebts,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
} = require('../controllers/debtController');

// GET /api/debts - Get all debts
router.get('/', getDebts);

// GET /api/debts/:id - Get single debt
router.get('/:id', getDebt);

// POST /api/debts - Create new debt
router.post('/', createDebt);

// PUT /api/debts/:id - Update debt
router.put('/:id', updateDebt);

// DELETE /api/debts/:id - Delete debt
router.delete('/:id', deleteDebt);

module.exports = router;
