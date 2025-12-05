/**
 * =============================================================================
 * Contact Page Routes
 * =============================================================================
 * SDLC Phase: Development - user input handling
 * 
 * This route handles the contact form for interested students.
 * Currently logs submissions; designed to easily add database storage later.
 * 
 * Future Integration Ideas:
 * - Store in PostgreSQL/MongoDB database
 * - Create a Jira Service Management request automatically
 * - Send confirmation email via AWS SES
 * - Trigger n8n workflow for lead nurturing
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * GET /contact
 * Renders the contact form page
 */
router.get('/', contactController.getContactPage);

/**
 * POST /contact
 * Handles contact form submission
 */
router.post('/', contactController.submitContact);

/**
 * GET /contact/success
 * Shows success message after form submission
 */
router.get('/success', contactController.getSuccessPage);

module.exports = router;
