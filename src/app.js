/**
 * =============================================================================
 * Main Application Entry Point
 * =============================================================================
 * This is the heart of our Express.js application.
 * SDLC Phase: Development - application architecture
 * 
 * Key Learning Points:
 * - Express.js is a minimal, flexible Node.js web framework
 * - Middleware functions process requests in order (pipeline pattern)
 * - EJS templates enable server-side rendering with dynamic data
 * - Route separation keeps code organized and maintainable
 * 
 * DevOps Concepts Demonstrated:
 * - Health check endpoint for load balancers and ECS
 * - Structured logging for CloudWatch integration
 * - Helmet for security headers
 * - Environment-based configuration
 * 
 * SDLC Tool Mapping:
 * - This app itself is an example of Development phase
 * - Bitbucket stores this code (version control)
 * - Bitbucket Pipelines builds and deploys it (CI/CD)
 * - ECS runs the container (Deployment)
 * - CloudWatch monitors it (Operations)
 * =============================================================================
 */

// =============================================================================
// Dependencies
// =============================================================================
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const expressLayouts = require('express-ejs-layouts');

// Configuration and middleware
const config = require('./config');
const logger = require('./middleware/logger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Route imports
const homeRoutes = require('./routes/index');
const coursesRoutes = require('./routes/courses');
const scheduleRoutes = require('./routes/schedule');
const toolsRoutes = require('./routes/tools');
const contactRoutes = require('./routes/contact');
const aiRoutes = require('./routes/ai');
const healthRoutes = require('./routes/health');

// =============================================================================
// Express Application Setup
// =============================================================================
const app = express();

// =============================================================================
// Security Middleware
// Helmet helps secure Express apps by setting various HTTP headers
// =============================================================================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "'unsafe-inline'"]
        }
    }
}));

// =============================================================================
// View Engine Setup (EJS with Layouts)
// EJS = Embedded JavaScript templating
// =============================================================================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

// =============================================================================
// Request Parsing Middleware
// =============================================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============================================================================
// Logging Middleware
// Morgan logs HTTP requests; we stream to Winston for structured logging
// =============================================================================
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// =============================================================================
// Static Files Middleware
// Serves files from /public (CSS, JS, images)
// =============================================================================
app.use(express.static(path.join(__dirname, 'public')));

// =============================================================================
// Make config available to all views
// This allows templates to access course information
// =============================================================================
app.use((req, res, next) => {
    res.locals.config = config;
    res.locals.currentPath = req.path;
    next();
});

// =============================================================================
// Route Mounting
// Each route file handles a specific section of the website
// =============================================================================
app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/schedule', scheduleRoutes);
app.use('/tools', toolsRoutes);
app.use('/contact', contactRoutes);
app.use('/ai', aiRoutes);
app.use('/health', healthRoutes);

// =============================================================================
// Error Handling (must be last)
// =============================================================================
app.use(notFoundHandler);
app.use(errorHandler);

// =============================================================================
// Server Startup
// =============================================================================
const PORT = config.server.port;

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║   🚀 AI Assisted Jira Cloud Bootcamp Website                               ║
║                                                                            ║
║   Server running on: http://localhost:${PORT}                                 ║
║   Environment: ${config.server.env.padEnd(52)}║
║   Health check: http://localhost:${PORT}/health                               ║
║                                                                            ║
║   SDLC Phase: Development → Ready for Deployment                           ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
    `);
    });
}

// Export for testing
module.exports = app;
