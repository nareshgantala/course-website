/**
 * =============================================================================
 * Health Check Routes
 * =============================================================================
 * SDLC Phase: Operations & Deployment - container health monitoring
 * 
 * Health check endpoints are CRITICAL for containerized applications:
 * - ECS uses them to determine if a container is healthy
 * - Load balancers use them to route traffic only to healthy instances
 * - Kubernetes readiness/liveness probes work similarly
 * 
 * AWS Integration:
 * - ECS task definition specifies this endpoint for health checks
 * - Application Load Balancer (ALB) uses it for target group health
 * - CloudWatch can alert on health check failures
 * 
 * Best Practices:
 * - Return 200 for healthy, 503 for unhealthy
 * - Keep it lightweight (no heavy DB queries)
 * - Include version info for debugging
 * - Consider separate /ready and /live endpoints
 * =============================================================================
 */

const express = require('express');
const router = express.Router();
const config = require('../config');

/**
 * GET /health
 * Basic health check endpoint for ECS and load balancers
 * 
 * Returns:
 * - 200 OK: Service is healthy and ready to receive traffic
 * - 503 Service Unavailable: Service is unhealthy (not implemented yet)
 */
router.get('/', (req, res) => {
    // ==========================================================================
    // In a production app, you might check:
    // - Database connectivity
    // - Redis connection
    // - External API availability
    // - Memory/CPU thresholds
    // 
    // Example:
    // const dbHealthy = await checkDatabaseConnection();
    // const redisHealthy = await checkRedisConnection();
    // 
    // if (!dbHealthy || !redisHealthy) {
    //   return res.status(503).json({ status: 'unhealthy', ... });
    // }
    // ==========================================================================

    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'jira-bootcamp-web',
        version: process.env.npm_package_version || '1.0.0',
        environment: config.server.env,
        uptime: process.uptime(),
        memory: {
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
        }
    });
});

/**
 * GET /health/ready
 * Readiness probe - indicates if the app is ready to receive traffic
 * Used by Kubernetes/ECS to know when to add instance to load balancer
 */
router.get('/ready', (req, res) => {
    // TODO: Add actual readiness checks (DB connection, etc.)
    res.status(200).json({
        ready: true,
        timestamp: new Date().toISOString()
    });
});

/**
 * GET /health/live
 * Liveness probe - indicates if the app is running (not deadlocked)
 * If this fails, the container should be restarted
 */
router.get('/live', (req, res) => {
    res.status(200).json({
        alive: true,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
