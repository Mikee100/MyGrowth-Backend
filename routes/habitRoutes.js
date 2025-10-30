const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

// GET /api/habits - Get all habits
router.get('/', habitController.getAllHabits);

// GET /api/habits/:id - Get single habit
router.get('/:id', habitController.getHabit);

// POST /api/habits - Create new habit
router.post('/', habitController.createHabit);

// PUT /api/habits/:id - Update habit
router.put('/:id', habitController.updateHabit);

// DELETE /api/habits/:id - Delete habit
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
