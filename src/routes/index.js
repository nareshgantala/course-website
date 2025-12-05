/**
 * =============================================================================
 * Home Page Routes
 * =============================================================================
 * SDLC Phase: Development - routing and request handling
 * 
 * This route handles the main landing page of the bootcamp website.
 * Express Router is used to organize routes into modular, mountable handlers.
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

/**
 * GET /
 * Renders the home page with course banner and description
 */
router.get('/', homeController.getHomePage);

/**
 * GET /register
 * Redirects to registration form or external link
 * TODO: Replace with actual registration system (could integrate with Jira Service Management)
 */
router.get('/register', homeController.getRegisterPage);

module.exports = router;
