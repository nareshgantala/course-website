/**
 * =============================================================================
 * Schedule Page Routes
 * =============================================================================
 * SDLC Phase: Development - displaying timeline information
 * 
 * This route shows the bootcamp schedule and timeline.
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

/**
 * GET /schedule
 * Renders the schedule page with timeline
 */
router.get('/', scheduleController.getSchedulePage);

module.exports = router;
