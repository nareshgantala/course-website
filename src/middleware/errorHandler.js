/**
 * =============================================================================
 * Error Handling Middleware
 * =============================================================================
 * Centralized error handling ensures consistent error responses.
 * SDLC Phase: Development & Operations - robust error handling
 * 
 * Key Learning Points:
 * - Express error middleware has 4 parameters: (err, req, res, next)
 * - Centralized handling prevents code duplication
 * - Different responses for development vs production
 * - Errors are logged for monitoring and debugging
 * 
 * Integration with Jira:
 * - In a real setup, critical errors could create Jira issues automatically
 * - TODO: Add Jira REST API integration to create incidents
 * 
 * Integration with JSM:
 * - Errors could trigger JSM incidents for on-call support
 * - CloudWatch alarms can be configured to detect error patterns
 * =============================================================================
 */

const logger = require('./logger');
const config = require('../config');

/**
 * 404 Not Found Handler
 * This middleware runs when no route matches the request
 */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

/**
 * Global Error Handler
 * This is the last middleware in the chain and catches all errors
 */
const errorHandler = (err, req, res, next) => {
    // Determine status code (default to 500 for server errors)
    const statusCode = err.status || err.statusCode || 500;

    // Log the error with context
    logger.error('Request error occurred', {
        error: err.message,
        stack: err.stack,
        statusCode,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    // ==========================================================================
    // TODO: Jira Integration
    // For critical errors (5xx), we could automatically create a Jira issue:
    // 
    // if (statusCode >= 500) {
    //   const jiraClient = require('../integrations/jira');
    //   await jiraClient.createIssue({
    //     project: 'SUPPORT',
    //     issueType: 'Bug',
    //     summary: `Server Error: ${err.message}`,
    //     description: `Stack trace:\n${err.stack}`
    //   });
    // }
    // ==========================================================================

    // Send appropriate response
    if (config.server.isProduction) {
        // In production, don't expose stack traces
        res.status(statusCode).render('error', {
            title: 'Error',
            message: statusCode === 404
                ? 'Page not found'
                : 'Something went wrong. Please try again later.',
            statusCode
        });
    } else {
        // In development, show detailed error info
        res.status(statusCode).render('error', {
            title: 'Error',
            message: err.message,
            stack: err.stack,
            statusCode
        });
    }
};

module.exports = {
    notFoundHandler,
    errorHandler
};
