/**
 * =============================================================================
 * Winston Logger Configuration
 * =============================================================================
 * Structured logging is essential for debugging and monitoring in production.
 * SDLC Phase: Operations & Support - observability and monitoring
 * 
 * Key Learning Points:
 * - Winston is a popular Node.js logging library
 * - Structured logs (JSON format) are easier to parse in CloudWatch
 * - Log levels help filter noise (error > warn > info > debug)
 * - In production, logs go to CloudWatch via container stdout
 * 
 * AWS Integration:
 * - ECS containers send stdout/stderr to CloudWatch Logs
 * - We configure log groups in the task definition
 * - CloudWatch Logs Insights can query JSON-formatted logs
 * =============================================================================
 */

const winston = require('winston');
const config = require('../config');

// Define log format based on environment
// JSON format for production (CloudWatch), colorized for development
const logFormat = config.server.isProduction
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    )
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} [${level}]: ${stack || message}`;
        })
    );

// Create the logger instance
const logger = winston.createLogger({
    level: config.logging.level,
    format: logFormat,
    defaultMeta: {
        service: 'jira-bootcamp-web',
        // Include environment in logs for easier filtering
        environment: config.server.env
    },
    transports: [
        // Console transport - in ECS, this goes to CloudWatch
        new winston.transports.Console()
    ]
});

// =============================================================================
// Example Usage (for teaching):
// 
// const logger = require('./middleware/logger');
// 
// logger.info('Server started', { port: 3000 });
// logger.warn('Deprecated API called', { endpoint: '/old-api' });
// logger.error('Database connection failed', { error: err.message });
// logger.debug('Request details', { body: req.body, params: req.params });
// =============================================================================

module.exports = logger;
