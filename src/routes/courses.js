/**
 * =============================================================================
 * Courses Page Routes
 * =============================================================================
 * SDLC Phase: Development - routing for educational content
 * 
 * This route displays the course curriculum organized by modules.
 * The content maps to various SDLC phases and tools.
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/coursesController');

/**
 * GET /courses
 * Renders the full course curriculum page
 */
router.get('/', coursesController.getCoursesPage);

/**
 * GET /courses/:module
 * Renders a specific module's detailed content
 * TODO: Implement individual module pages
 */
router.get('/:module', coursesController.getModulePage);

module.exports = router;
