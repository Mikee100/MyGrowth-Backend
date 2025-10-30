const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/user - Get user profile
router.get('/', userController.getUserProfile);

// POST /api/user - Create or update user profile
router.post('/', userController.createOrUpdateUserProfile);

// DELETE /api/user - Delete user profile
router.delete('/', userController.deleteUserProfile);

module.exports = router;
