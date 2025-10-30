const express = require('express');
const router = express.Router();
const sexLifeEventController = require('../controllers/sexLifeEventController');
const auth = require('../middleware/auth');

// GET /api/sex-life-events - Get all sex life events
router.get('/', auth, sexLifeEventController.getAllSexLifeEvents);

// GET /api/sex-life-events/:id - Get single sex life event
router.get('/:id', auth, sexLifeEventController.getSexLifeEvent);

// POST /api/sex-life-events - Create new sex life event
router.post('/', auth, sexLifeEventController.createSexLifeEvent);

// PUT /api/sex-life-events/:id - Update sex life event
router.put('/:id', auth, sexLifeEventController.updateSexLifeEvent);

// DELETE /api/sex-life-events/:id - Delete sex life event
router.delete('/:id', auth, sexLifeEventController.deleteSexLifeEvent);

module.exports = router;
