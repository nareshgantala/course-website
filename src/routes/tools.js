/**
 * =============================================================================
 * Tools Covered Page Routes
 * =============================================================================
 * SDLC Phase: Development - showcasing technology stack
 * 
 * This route displays all tools covered in the bootcamp,
 * organized by their role in the SDLC.
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/toolsController');

/**
 * GET /tools
 * Renders the tools page with cards for each tool
 */
router.get('/', toolsController.getToolsPage);

/**
 * GET /tools/:toolId
 * Renders detailed information about a specific tool
 * TODO: Implement individual tool detail pages
 */
router.get('/:toolId', toolsController.getToolDetailPage);

module.exports = router;
