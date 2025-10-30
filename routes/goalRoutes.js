const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middleware/auth');

// GET /api/goals - Get all goals
router.get('/', auth, goalController.getAllGoals);

// GET /api/goals/:id - Get single goal
router.get('/:id', auth, goalController.getGoal);

// POST /api/goals - Create new goal
router.post('/', auth, goalController.createGoal);

// PUT /api/goals/:id - Update goal
router.put('/:id', auth, goalController.updateGoal);

// DELETE /api/goals/:id - Delete goal
router.delete('/:id', auth, goalController.deleteGoal);

module.exports = router;
