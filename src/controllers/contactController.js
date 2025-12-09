/**
 * =============================================================================
 * Contact Controller
 * =============================================================================
 * SDLC Phase: Development - form handling and future database integration
 * 
 * This controller handles contact form submissions.
 * Currently logs to console/file; designed for easy database integration.
 * 
 * Future Integration Ideas:
 * - Store in PostgreSQL/MongoDB database
 * - Create a Jira Service Management ticket for each inquiry
 * - Send confirmation email via AWS SES
 * - Trigger n8n workflow for lead nurturing
 * - Add to CRM via REST API
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

/**
 * In-memory storage for development/demo purposes
 * TODO: Replace with actual database
 */
const submissions = [];

// =============================================================================
// Jira Service Management Integration (TODO)
// =============================================================================
// const createJSMRequest = async (formData) => {
//   const jiraClient = require('../integrations/jira');
//   
//   await jiraClient.createRequest({
//     serviceDeskId: 'BOOTCAMP',
//     requestTypeId: 'INQUIRY',
//     requestFieldValues: {
//       summary: `Bootcamp Inquiry from ${formData.name}`,
//       description: formData.message,
//       customfield_10001: formData.email,
//       customfield_10002: formData.whatsapp
//     }
//   });
// };
// =============================================================================

// =============================================================================
// n8n Webhook Integration (TODO)
// =============================================================================
// const triggerN8nWorkflow = async (formData) => {
//   const axios = require('axios');
//   
//   await axios.post(process.env.N8N_WEBHOOK_URL, {
//     type: 'bootcamp_inquiry',
//     data: formData,
//     timestamp: new Date().toISOString()
//   });
// };
// =============================================================================

/**
 * Validate form data
 * @param {Object} formData - Form submission data
 * @returns {Object} Validation result with isValid and errors
 */
const validateFormData = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name is required (minimum 2 characters)');
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Valid email is required');
    }

    if (!formData.whatsapp || !/^[0-9]{10,15}$/.test(formData.whatsapp.replace(/[+\-\s]/g, ''))) {
        errors.push('Valid WhatsApp number is required (10-15 digits)');
    }

    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message is required (minimum 10 characters)');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Render contact form page
 */
const getContactPage = (req, res, next) => {
    try {
        res.render('contact', {
            title: 'Contact Us',
            course: config.course,
            formData: {},
            errors: []
        });
    } catch (error) {
        logger.error('Error rendering contact page', { error: error.message });
        next(error);
    }
};

/**
 * Handle contact form submission
 * SDLC: This demonstrates form handling - a common web development task
 */
const submitContact = async (req, res, next) => {
    try {
        const formData = {
            name: req.body.name,
            email: req.body.email,
            whatsapp: req.body.whatsapp,
            message: req.body.message,
            submittedAt: new Date().toISOString(),
            ip: req.ip
        };

        // Validate form data
        const validation = validateFormData(formData);

        if (!validation.isValid) {
            logger.warn('Contact form validation failed', { errors: validation.errors });
            return res.render('contact', {
                title: 'Contact Us',
                course: config.course,
                formData: req.body,
                errors: validation.errors
            });
        }

        // Log the submission (current implementation)
        logger.info('Contact form submitted', {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            messageLength: formData.message.length
        });

        // Store in memory for demo purposes
        submissions.push(formData);

        // ==========================================================================
        // TODO: Database Integration
        // Replace the in-memory storage with actual database calls:
        // 
        // const db = require('../database');
        // await db.contacts.create(formData);
        // ==========================================================================

        // ==========================================================================
        // TODO: Jira Service Management Integration
        // Create a JSM request for each inquiry:
        // 
        // await createJSMRequest(formData);
        // ==========================================================================

        // ==========================================================================
        // TODO: n8n Workflow Trigger
        // Trigger automated follow-up workflow:
        // 
        // await triggerN8nWorkflow(formData);
        // ==========================================================================

        // Redirect to success page
        res.redirect('/contact/success');

    } catch (error) {
        logger.error('Error processing contact form', { error: error.message });
        next(error);
    }
};

/**
 * Render success page after form submission
 */
const getSuccessPage = (req, res, next) => {
    try {
        res.render('contact-success', {
            title: 'Thank You',
            course: config.course
        });
    } catch (error) {
        logger.error('Error rendering success page', { error: error.message });
        next(error);
    }
};

module.exports = {
    getContactPage,
    submitContact,
    getSuccessPage,
    validateFormData,  // Exported for testing
    submissions        // Exported for testing/demo
};
