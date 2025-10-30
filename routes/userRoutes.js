const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// GET /api/user - Get user profile
router.get('/', auth, userController.getUserProfile);

// POST /api/user - Create or update user profile
router.post('/', auth, userController.createOrUpdateUserProfile);

// DELETE /api/user - Delete user profile
router.delete('/', auth, userController.deleteUserProfile);

// POST /api/user/sex-life-pin - Set sex life PIN
router.post('/sex-life-pin', auth, userController.setSexLifePin);

// POST /api/user/verify-sex-life-pin - Verify sex life PIN
router.post('/verify-sex-life-pin', auth, userController.verifySexLifePin);

module.exports = router;
