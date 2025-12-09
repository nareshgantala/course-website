/**
 * =============================================================================
 * Application Configuration
 * =============================================================================
 * Centralized configuration management using environment variables.
 * SDLC Phase: Development - configuration management best practices
 * 
 * Key Learning Points:
 * - Environment variables keep secrets out of code (12-factor app principle)
 * - dotenv loads .env file in development; in production, use real env vars
 * - This pattern makes the app configurable for different environments
 *   (dev, staging, production) without code changes
 * 
 * AWS Integration Note:
 * - When deploying to ECS, these variables are set in the task definition
 * - CloudWatch can log configuration issues for debugging
 * =============================================================================
 */

// Load environment variables from .env file (only in development)
// In production (ECS), environment variables are injected by the container
require('dotenv').config();

const config = {
    // ==========================================================================
    // Server Configuration
    // ==========================================================================
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
        isProduction: process.env.NODE_ENV === 'production'
    },

    // ==========================================================================
    // AWS Configuration
    // Used for S3 banner image storage (optional)
    // ==========================================================================
    aws: {
        region: process.env.AWS_REGION || 'ap-south-1',
        // Note: In ECS, we use IAM Task Roles instead of access keys
        // Access keys are only needed for local development
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        s3: {
            bucketName: process.env.S3_BUCKET_NAME || 'jira-bootcamp-assets',
            bannerKey: process.env.S3_BANNER_KEY || 'images/course-banner.png'
        }
    },

    // ==========================================================================
    // Banner Configuration
    // ==========================================================================
    banner: {
        // 'local' = serve from /public/images, 's3' = fetch from S3
        source: process.env.BANNER_SOURCE || 'local',
        localPath: '/images/1.png'
    },

    // ==========================================================================
    // Logging Configuration
    // ==========================================================================
    logging: {
        level: process.env.LOG_LEVEL || 'info'
    },

    // ==========================================================================
    // AI Integration Configuration (Coming Soon)
    // TODO: These will be used when we integrate LLM APIs
    // ==========================================================================
    ai: {
        openaiApiKey: process.env.OPENAI_API_KEY,
        anthropicApiKey: process.env.ANTHROPIC_API_KEY,
        rovoApiKey: process.env.ATLASSIAN_ROVO_API_KEY
    },

    // ==========================================================================
    // Course Information
    // Static data about the bootcamp
    // ==========================================================================
    course: {
        name: 'AI Assisted Jira Cloud Administration & Automation Live Mastery Bootcamp',
        shortName: 'Jira Cloud Bootcamp',
        duration: '2 months (60 days)',
        schedule: 'Monday to Friday, 7:00–8:30 AM IST',
        audience: 'Telugu-speaking IT beginners and professionals',
        startDate: 'Coming Soon' // TODO: Update with actual start date
    }
};

module.exports = config;
