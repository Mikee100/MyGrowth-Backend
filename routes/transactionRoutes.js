const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const auth = require('../middleware/auth');

// GET /api/transactions - Get all transactions
router.get('/', auth, transactionController.getAllTransactions);

// GET /api/transactions/:id - Get single transaction
router.get('/:id', auth, transactionController.getTransaction);

// POST /api/transactions - Create new transaction
router.post('/', auth, transactionController.createTransaction);

// PUT /api/transactions/:id - Update transaction
router.put('/:id', auth, transactionController.updateTransaction);

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', auth, transactionController.deleteTransaction);

module.exports = router;
