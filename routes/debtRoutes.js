const express = require('express');
const router = express.Router();
const {
  getDebts,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
} = require('../controllers/debtController');
const auth = require('../middleware/auth');

// GET /api/debts - Get all debts
router.get('/', auth, getDebts);

// GET /api/debts/:id - Get single debt
router.get('/:id', auth, getDebt);

// POST /api/debts - Create new debt
router.post('/', auth, createDebt);

// PUT /api/debts/:id - Update debt
router.put('/:id', auth, updateDebt);

// DELETE /api/debts/:id - Delete debt
router.delete('/:id', auth, deleteDebt);

module.exports = router;
