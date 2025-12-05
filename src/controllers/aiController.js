/**
 * =============================================================================
 * AI Controller (Coming Soon)
 * =============================================================================
 * SDLC Phase: Development - AI/LLM integration placeholder
 * 
 * This controller is structured for future AI/LLM integration.
 * In the bootcamp, we'll learn how to integrate:
 * - OpenAI ChatGPT API
 * - Anthropic Claude API
 * - Atlassian Rovo / Atlassian Intelligence
 * 
 * Key Learning Points:
 * - API integration patterns
 * - Async/await for external API calls
 * - Error handling for third-party services
 * - Rate limiting and caching strategies
 * - Security considerations (API keys, input validation)
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

// =============================================================================
// OpenAI Integration (TODO: Uncomment and configure)
// =============================================================================
// const OpenAI = require('openai');
// 
// const openai = new OpenAI({
//   apiKey: config.ai.openaiApiKey
// });
// 
// async function chatWithOpenAI(message, context = []) {
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4-turbo-preview',
//     messages: [
//       {
//         role: 'system',
//         content: `You are a helpful assistant for the AI Assisted Jira Cloud Bootcamp. 
//                   Help students learn about Jira, DevOps, and automation.
//                   Be concise and educational in your responses.`
//       },
//       ...context,
//       { role: 'user', content: message }
//     ],
//     max_tokens: 500,
//     temperature: 0.7
//   });
//   
//   return response.choices[0].message.content;
// }
// =============================================================================

// =============================================================================
// Anthropic Claude Integration (TODO: Uncomment and configure)
// =============================================================================
// const Anthropic = require('@anthropic-ai/sdk');
// 
// const anthropic = new Anthropic({
//   apiKey: config.ai.anthropicApiKey
// });
// 
// async function chatWithClaude(message, context = []) {
//   const response = await anthropic.messages.create({
//     model: 'claude-3-opus-20240229',
//     max_tokens: 500,
//     system: `You are a helpful assistant for the AI Assisted Jira Cloud Bootcamp.
//              Help students learn about Jira, DevOps, and automation.`,
//     messages: [
//       ...context,
//       { role: 'user', content: message }
//     ]
//   });
//   
//   return response.content[0].text;
// }
// =============================================================================

// =============================================================================
// Atlassian Rovo Integration (TODO: Implement when API is available)
// =============================================================================
// async function chatWithRovo(message, jiraContext = {}) {
//   const response = await fetch('https://api.atlassian.com/rovo/v1/chat', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${config.ai.rovoApiKey}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       message,
//       context: jiraContext
//     })
//   });
//   
//   const data = await response.json();
//   return data.response;
// }
// =============================================================================

/**
 * AI service availability status
 */
const getAIStatus = () => {
    return {
        openai: {
            configured: !!config.ai.openaiApiKey,
            status: config.ai.openaiApiKey ? 'ready' : 'not_configured'
        },
        anthropic: {
            configured: !!config.ai.anthropicApiKey,
            status: config.ai.anthropicApiKey ? 'ready' : 'not_configured'
        },
        rovo: {
            configured: !!config.ai.rovoApiKey,
            status: config.ai.rovoApiKey ? 'ready' : 'not_configured'
        }
    };
};

/**
 * Render AI Assistant placeholder page
 */
const getAIPage = (req, res, next) => {
    try {
        const aiStatus = getAIStatus();
        const anyConfigured = Object.values(aiStatus).some(s => s.configured);

        res.render('ai-assistant', {
            title: 'AI Assistant',
            course: config.course,
            aiStatus,
            anyConfigured,
            features: [
                {
                    icon: '💬',
                    title: 'Course Q&A',
                    description: 'Ask questions about Jira, DevOps, or any bootcamp topic'
                },
                {
                    icon: '📝',
                    title: 'JQL Helper',
                    description: 'Get help writing Jira Query Language expressions'
                },
                {
                    icon: '🔧',
                    title: 'Script Assistant',
                    description: 'Generate ScriptRunner or Python code snippets'
                },
                {
                    icon: '📚',
                    title: 'Documentation',
                    description: 'Quick access to Atlassian documentation and best practices'
                }
            ]
        });
    } catch (error) {
        logger.error('Error rendering AI page', { error: error.message });
        next(error);
    }
};

/**
 * Handle chat messages (placeholder)
 * TODO: Implement actual LLM API calls
 */
const handleChat = async (req, res, next) => {
    try {
        const { message, provider = 'openai' } = req.body;

        if (!message || message.trim().length === 0) {
            return res.status(400).json({
                error: 'Message is required'
            });
        }

        logger.info('AI chat request received', { provider, messageLength: message.length });

        // ==========================================================================
        // TODO: Implement actual AI responses
        // Uncomment the appropriate section based on configured provider:
        // 
        // let response;
        // switch (provider) {
        //   case 'openai':
        //     response = await chatWithOpenAI(message);
        //     break;
        //   case 'claude':
        //     response = await chatWithClaude(message);
        //     break;
        //   case 'rovo':
        //     response = await chatWithRovo(message);
        //     break;
        //   default:
        //     throw new Error(`Unknown AI provider: ${provider}`);
        // }
        // 
        // return res.json({ response, provider });
        // ==========================================================================

        // Placeholder response
        res.json({
            response: `🚧 AI Assistant coming soon! 

In the bootcamp, you'll learn how to integrate:
- OpenAI ChatGPT API
- Anthropic Claude API  
- Atlassian Rovo

Your question: "${message}"

This will be answered by AI once integration is complete.`,
            provider: 'placeholder',
            status: 'coming_soon'
        });

    } catch (error) {
        logger.error('Error handling AI chat', { error: error.message });
        next(error);
    }
};

/**
 * Get AI service status
 */
const getStatus = (req, res) => {
    res.json({
        status: 'coming_soon',
        services: getAIStatus(),
        message: 'AI integration is being developed. Check back soon!'
    });
};

module.exports = {
    getAIPage,
    handleChat,
    getStatus,
    getAIStatus  // Exported for testing
};
