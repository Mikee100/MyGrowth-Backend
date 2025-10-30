const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const auth = require('../middleware/auth');

// GET /api/habits - Get all habits
router.get('/', auth, habitController.getAllHabits);

// GET /api/habits/:id - Get single habit
router.get('/:id', auth, habitController.getHabit);

// POST /api/habits - Create new habit
router.post('/', auth, habitController.createHabit);

// PUT /api/habits/:id - Update habit
router.put('/:id', auth, habitController.updateHabit);

// DELETE /api/habits/:id - Delete habit
router.delete('/:id', auth, habitController.deleteHabit);

module.exports = router;
