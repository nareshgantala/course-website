/**
 * =============================================================================
 * Jest Configuration
 * =============================================================================
 * Jest is a JavaScript testing framework used for unit and integration tests.
 * SDLC Phase: Testing & QA - automated testing configuration
 * 
 * In the bootcamp, we'll learn how:
 * - Testing fits into CI/CD pipelines (Bitbucket Pipelines runs these tests)
 * - Jest integrates with Node.js/Express applications
 * - Code coverage helps identify untested code paths
 * =============================================================================
 */

module.exports = {
    // Test environment simulates Node.js runtime
    testEnvironment: 'node',

    // Where to look for test files
    testMatch: [
        '**/tests/**/*.test.js',
        '**/__tests__/**/*.js'
    ],

    // Coverage collection settings
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/public/**',  // Exclude static files
        '!src/views/**'    // Exclude EJS templates
    ],

    // Coverage thresholds (optional - enforce minimum coverage)
    // coverageThreshold: {
    //   global: {
    //     branches: 50,
    //     functions: 50,
    //     lines: 50,
    //     statements: 50
    //   }
    // },

    // Verbose output shows individual test results
    verbose: true,

    // Setup file to run before tests (e.g., for mocking)
    // setupFilesAfterEnv: ['./tests/setup.js'],

    // Timeout for each test (in milliseconds)
    testTimeout: 10000
};
