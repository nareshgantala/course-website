/**
 * =============================================================================
 * Tools Controller
 * =============================================================================
 * SDLC Phase: Development - tool catalog with SDLC mapping
 * 
 * This controller provides data for all tools covered in the bootcamp.
 * Each tool is mapped to its role in the SDLC, helping students understand
 * when and why to use each tool in real-world projects.
 * 
 * Key Learning:
 * - How different tools integrate across the SDLC
 * - When to use each tool for maximum impact
 * - How tools complement each other
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

/**
 * Complete list of tools covered in the bootcamp
 * Each tool includes:
 * - Basic info (name, description, icon)
 * - SDLC phases where it's used
 * - How it fits into the development lifecycle
 */
const tools = [
    // ==========================================================================
    // ATLASSIAN CORE PRODUCTS
    // ==========================================================================
    {
        id: 'jira-software',
        name: 'Jira Software Cloud',
        category: 'Atlassian',
        icon: '📋',
        purpose: 'Agile project management and issue tracking',
        sdlcPhases: ['Requirements & Planning', 'Development', 'Testing & QA'],
        sdlcFit: 'Central hub for planning sprints, tracking development tasks, and managing QA workflows. Create user stories, track bugs, and monitor team progress.',
        link: 'https://www.atlassian.com/software/jira'
    },
    {
        id: 'jsm',
        name: 'Jira Service Management',
        category: 'Atlassian',
        icon: '🎫',
        purpose: 'IT service management and customer support',
        sdlcPhases: ['Operations & Support'],
        sdlcFit: 'Manage incidents, problems, and changes in production. Handle service requests and maintain SLAs. AIOps capabilities for alert management.',
        link: 'https://www.atlassian.com/software/jira/service-management'
    },
    {
        id: 'bitbucket',
        name: 'Bitbucket',
        category: 'Atlassian',
        icon: '🔀',
        purpose: 'Git repository hosting and CI/CD pipelines',
        sdlcPhases: ['Development', 'Deployment'],
        sdlcFit: 'Store and version code, conduct code reviews via pull requests, and automate builds and deployments with Bitbucket Pipelines.',
        link: 'https://bitbucket.org'
    },
    {
        id: 'statuspage',
        name: 'Statuspage',
        category: 'Atlassian',
        icon: '📊',
        purpose: 'Status communication and incident updates',
        sdlcPhases: ['Operations & Support'],
        sdlcFit: 'Communicate system status to users, announce scheduled maintenance, and provide real-time incident updates during outages.',
        link: 'https://www.atlassian.com/software/statuspage'
    },
    {
        id: 'rovo',
        name: 'Atlassian Rovo / Intelligence',
        category: 'Atlassian',
        icon: '🤖',
        purpose: 'AI-powered productivity and knowledge assistant',
        sdlcPhases: ['Requirements & Planning', 'Development', 'Operations & Support'],
        sdlcFit: 'AI agents that help with issue creation, smart suggestions, natural language queries, and knowledge discovery across Atlassian products.',
        link: 'https://www.atlassian.com/software/rovo'
    },

    // ==========================================================================
    // MARKETPLACE APPS
    // ==========================================================================
    {
        id: 'scriptrunner',
        name: 'ScriptRunner for Jira Cloud',
        category: 'Marketplace Apps',
        icon: '⚡',
        purpose: 'Advanced scripting and automation for Jira',
        sdlcPhases: ['Development', 'Automation'],
        sdlcFit: 'Extend Jira with custom scripts, listeners, and automation rules. Implement complex business logic and integrations.',
        link: 'https://marketplace.atlassian.com/apps/1211542/scriptrunner-for-jira-cloud'
    },
    {
        id: 'jmwe',
        name: 'JMWE (Jira Misc Workflow Extensions)',
        category: 'Marketplace Apps',
        icon: '🔧',
        purpose: 'Enhanced workflow conditions and validators',
        sdlcPhases: ['Development'],
        sdlcFit: 'Add powerful conditions, validators, and post functions to Jira workflows without coding.',
        link: 'https://marketplace.atlassian.com/apps/1211572/jira-misc-workflow-extensions-jmwe'
    },
    {
        id: 'eazybi',
        name: 'eazyBI',
        category: 'Marketplace Apps',
        icon: '📈',
        purpose: 'Advanced reporting and business intelligence',
        sdlcPhases: ['Reporting'],
        sdlcFit: 'Create sophisticated reports and dashboards. Analyze Jira data with custom dimensions and measures. Track team metrics and KPIs.',
        link: 'https://marketplace.atlassian.com/apps/1211051/eazybi-reports-and-charts-for-jira'
    },

    // ==========================================================================
    // AUTOMATION TOOLS
    // ==========================================================================
    {
        id: 'n8n',
        name: 'n8n',
        category: 'Automation',
        icon: '🔄',
        purpose: 'Visual workflow automation platform',
        sdlcPhases: ['Automation'],
        sdlcFit: 'Build automated workflows connecting Jira with 200+ other services. No-code/low-code automation for complex integrations.',
        link: 'https://n8n.io'
    },
    {
        id: 'ansible',
        name: 'Ansible',
        category: 'Automation',
        icon: '⚙️',
        purpose: 'IT automation and configuration management',
        sdlcPhases: ['Deployment', 'Operations & Support'],
        sdlcFit: 'Automate infrastructure provisioning and deployments. Use Jira module to create issues on deployment events.',
        link: 'https://www.ansible.com'
    },
    {
        id: 'python-jira',
        name: 'Python + Jira REST API',
        category: 'Automation',
        icon: '🐍',
        purpose: 'Programmatic Jira automation and scripting',
        sdlcPhases: ['Development', 'Automation'],
        sdlcFit: 'Build custom integrations and automation scripts. Bulk operations, data migration, and custom reporting.',
        link: 'https://jira.readthedocs.io/en/master/'
    },

    // ==========================================================================
    // AWS SERVICES
    // ==========================================================================
    {
        id: 'aws-ec2',
        name: 'AWS EC2',
        category: 'AWS',
        icon: '🖥️',
        purpose: 'Virtual servers in the cloud',
        sdlcPhases: ['Deployment'],
        sdlcFit: 'Run applications and services on scalable virtual machines. Foundation for cloud deployments.',
        link: 'https://aws.amazon.com/ec2/'
    },
    {
        id: 'aws-cloudwatch',
        name: 'AWS CloudWatch',
        category: 'AWS',
        icon: '👁️',
        purpose: 'Monitoring and observability',
        sdlcPhases: ['Operations & Support'],
        sdlcFit: 'Monitor application logs and metrics. Set up alarms for critical thresholds. Integrate with JSM for incident management.',
        link: 'https://aws.amazon.com/cloudwatch/'
    },
    {
        id: 'aws-iam',
        name: 'AWS IAM',
        category: 'AWS',
        icon: '🔐',
        purpose: 'Identity and access management',
        sdlcPhases: ['All Phases'],
        sdlcFit: 'Manage user permissions and service roles. Essential for security in all AWS deployments.',
        link: 'https://aws.amazon.com/iam/'
    },

    // ==========================================================================
    // FOUNDATIONAL SKILLS
    // ==========================================================================
    {
        id: 'linux',
        name: 'Linux',
        category: 'Foundations',
        icon: '🐧',
        purpose: 'Operating system for servers and development',
        sdlcPhases: ['Development', 'Deployment', 'Operations & Support'],
        sdlcFit: 'Essential for server management, container operations, and DevOps workflows. Command line skills for automation.',
        link: 'https://www.linux.org'
    },

    // ==========================================================================
    // AI TOOLS
    // ==========================================================================
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'AI Tools',
        icon: '💬',
        purpose: 'AI assistant for coding and documentation',
        sdlcPhases: ['Requirements & Planning', 'Development'],
        sdlcFit: 'Get help writing code, documentation, and solving problems. Accelerate learning and productivity.',
        link: 'https://chat.openai.com'
    },
    {
        id: 'claude',
        name: 'Claude',
        category: 'AI Tools',
        icon: '🧠',
        purpose: 'AI assistant for analysis and content',
        sdlcPhases: ['Requirements & Planning', 'Development'],
        sdlcFit: 'Analyze requirements, generate documentation, and assist with complex problem-solving.',
        link: 'https://claude.ai'
    }
];

/**
 * Group tools by category for display
 */
const getToolsByCategory = () => {
    const categories = {};
    tools.forEach(tool => {
        if (!categories[tool.category]) {
            categories[tool.category] = [];
        }
        categories[tool.category].push(tool);
    });
    return categories;
};

/**
 * Render tools page
 */
const getToolsPage = (req, res, next) => {
    try {
        res.render('tools', {
            title: 'Tools Covered',
            tools,
            toolsByCategory: getToolsByCategory(),
            course: config.course
        });
    } catch (error) {
        logger.error('Error rendering tools page', { error: error.message });
        next(error);
    }
};

/**
 * Render individual tool detail page
 */
const getToolDetailPage = (req, res, next) => {
    try {
        const toolId = req.params.toolId;
        const tool = tools.find(t => t.id === toolId);

        if (!tool) {
            const error = new Error(`Tool '${toolId}' not found`);
            error.status = 404;
            throw error;
        }

        res.render('tool-detail', {
            title: tool.name,
            tool,
            course: config.course
        });
    } catch (error) {
        logger.error('Error rendering tool detail page', { error: error.message, tool: req.params.toolId });
        next(error);
    }
};

module.exports = {
    getToolsPage,
    getToolDetailPage,
    tools,  // Exported for testing
    getToolsByCategory
};
