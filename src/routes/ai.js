/**
 * =============================================================================
 * AI Assistant Routes (Coming Soon)
 * =============================================================================
 * SDLC Phase: Development - AI integration placeholder
 * 
 * This module is structured for future LLM API integration.
 * Supported AI platforms we'll cover in the bootcamp:
 * - OpenAI ChatGPT API
 * - Anthropic Claude API
 * - Atlassian Rovo / Atlassian Intelligence
 * 
 * Key Learning Points:
 * - How to structure code for future extensibility
 * - API integration patterns
 * - Async/await for external API calls
 * - Error handling for third-party services
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

/**
 * GET /ai
 * Renders the AI Assistant placeholder page
 */
router.get('/', aiController.getAIPage);

/**
 * POST /ai/chat
 * Handles chat messages to AI assistant
 * TODO: Implement actual LLM API integration
 */
router.post('/chat', aiController.handleChat);

/**
 * GET /ai/status
 * Returns the status of AI service availability
 */
router.get('/status', aiController.getStatus);

module.exports = router;
