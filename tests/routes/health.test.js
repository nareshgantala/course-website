/**
 * =============================================================================
 * Health Endpoint Tests
 * =============================================================================
 * SDLC Phase: Testing & QA - automated testing
 * 
 * These tests verify the health check endpoint works correctly.
 * This is critical for ECS and load balancer integration.
 * 
 * In the bootcamp, you'll learn:
 * - Jest testing framework
 * - Supertest for HTTP testing
 * - How tests fit into CI/CD
 * - Test patterns for Node.js/Express
 * =============================================================================
 */

const request = require('supertest');
const app = require('../../src/app');

describe('Health Endpoint', () => {
    /**
     * Test: Basic health check returns 200 OK
     * This is what ECS uses to determine if the container is healthy
     */
    describe('GET /health', () => {
        it('should return 200 and healthy status', async () => {
            const response = await request(app)
                .get('/health')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('status', 'healthy');
            expect(response.body).toHaveProperty('timestamp');
            expect(response.body).toHaveProperty('service', 'jira-bootcamp-web');
            expect(response.body).toHaveProperty('uptime');
        });

        it('should include memory statistics', async () => {
            const response = await request(app)
                .get('/health')
                .expect(200);

            expect(response.body).toHaveProperty('memory');
            expect(response.body.memory).toHaveProperty('heapUsed');
            expect(response.body.memory).toHaveProperty('heapTotal');
        });
    });

    /**
     * Test: Readiness probe
     * Kubernetes/ECS uses this to know when to add instance to load balancer
     */
    describe('GET /health/ready', () => {
        it('should return 200 and ready status', async () => {
            const response = await request(app)
                .get('/health/ready')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('ready', true);
            expect(response.body).toHaveProperty('timestamp');
        });
    });

    /**
     * Test: Liveness probe
     * If this fails, the container should be restarted
     */
    describe('GET /health/live', () => {
        it('should return 200 and alive status', async () => {
            const response = await request(app)
                .get('/health/live')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body).toHaveProperty('alive', true);
            expect(response.body).toHaveProperty('timestamp');
        });
    });
});
