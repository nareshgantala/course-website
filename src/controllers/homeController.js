/**
 * =============================================================================
 * Home Controller
 * =============================================================================
 * SDLC Phase: Development - business logic for home page
 * 
 * This controller handles the home page logic, including:
 * - Rendering the main landing page
 * - Serving the course banner (from local file or S3)
 * - Handling the registration redirect
 * 
 * AWS S3 Integration Example:
 * - The code below shows how to optionally fetch the banner from S3
 * - In the bootcamp, we'll learn AWS SDK v3 for Node.js
 * - S3 is ideal for storing static assets in production
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

// =============================================================================
// AWS S3 Integration (Optional - Uncomment when needed)
// =============================================================================
// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
// 
// const s3Client = new S3Client({
//   region: config.aws.region,
//   // In ECS, credentials come from IAM Task Role (recommended)
//   // For local development, you can use explicit credentials:
//   // credentials: {
//   //   accessKeyId: config.aws.accessKeyId,
//   //   secretAccessKey: config.aws.secretAccessKey
//   // }
// });
// 
// async function getBannerFromS3() {
//   const command = new GetObjectCommand({
//     Bucket: config.aws.s3.bucketName,
//     Key: config.aws.s3.bannerKey
//   });
//   
//   // Generate a pre-signed URL valid for 1 hour
//   const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
//   return signedUrl;
// }
// =============================================================================

/**
 * Get banner image URL based on configuration
 * @returns {Promise<string>} Banner image URL
 */
async function getBannerUrl() {
    if (config.banner.source === 's3') {
        // TODO: Uncomment and use S3 integration
        // return await getBannerFromS3();
        logger.info('S3 banner source configured but not implemented, falling back to local');
    }

    // Default: serve from local public folder
    return config.banner.localPath;
}

/**
 * Render home page
 * SDLC: This is the entry point for users - first impression matters!
 */
const getHomePage = async (req, res, next) => {
    try {
        const bannerUrl = await getBannerUrl();

        res.render('home', {
            title: 'Home',
            bannerUrl,
            course: config.course,
            highlights: [
                {
                    icon: '🎯',
                    title: 'Live Interactive Sessions',
                    description: 'Daily 90-minute live classes with Q&A'
                },
                {
                    icon: '🛠️',
                    title: 'Hands-on Practice',
                    description: 'Real-world projects and exercises'
                },
                {
                    icon: '🤖',
                    title: 'AI-Assisted Learning',
                    description: 'Learn to leverage ChatGPT, Claude & Rovo'
                },
                {
                    icon: '📜',
                    title: 'Telugu Medium',
                    description: 'Explained in Telugu for better understanding'
                }
            ]
        });
    } catch (error) {
        logger.error('Error rendering home page', { error: error.message });
        next(error);
    }
};

/**
 * Render registration page or redirect to external form
 * TODO: Integrate with Jira Service Management for registration workflow
 */
const getRegisterPage = (req, res) => {
    // Option 1: Render local registration form
    // res.render('register', { title: 'Register' });

    // Option 2: Redirect to external registration (Google Form, Typeform, JSM portal)
    // TODO: Replace with actual registration URL
    res.render('register', {
        title: 'Register Interest',
        course: config.course
    });
};

module.exports = {
    getHomePage,
    getRegisterPage,
    getBannerUrl  // Exported for testing
};
