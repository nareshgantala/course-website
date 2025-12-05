/**
 * =============================================================================
 * Courses Controller
 * =============================================================================
 * SDLC Phase: Development - curriculum content management
 * 
 * This controller provides the course curriculum data.
 * Content is organized to match SDLC phases, helping students understand
 * how different tools fit into the software development lifecycle.
 * 
 * In the bootcamp, we'll learn:
 * - How to structure educational content
 * - Data-driven rendering with EJS
 * - How each tool maps to SDLC phases
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

/**
 * Course modules organized by topic
 * Each module shows which SDLC phase it belongs to
 */
const courseModules = [
    // ==========================================================================
    // WEEK 1-2: FOUNDATIONS
    // ==========================================================================
    {
        id: 'jira-software',
        title: 'Jira Software Cloud',
        duration: 'Week 1-2',
        sdlcPhase: 'Requirements & Planning, Development',
        icon: '📋',
        description: 'Master Jira for agile project management',
        topics: [
            'Project creation and configuration',
            'Issue types, workflows, and screens',
            'Sprint planning and backlog management',
            'Roadmaps and release planning',
            'Dev tasks and QA task management',
            'Custom fields and field configurations',
            'Permissions and security schemes',
            'JQL (Jira Query Language)',
            'Dashboards and reporting'
        ]
    },

    // ==========================================================================
    // WEEK 3: SERVICE MANAGEMENT
    // ==========================================================================
    {
        id: 'jsm',
        title: 'Jira Service Management (JSM)',
        duration: 'Week 3',
        sdlcPhase: 'Operations & Support',
        icon: '🎫',
        description: 'ITSM and service desk operations',
        topics: [
            'Service desk setup and configuration',
            'Incident management',
            'Problem management',
            'Change management',
            'Service request management',
            'SLAs and escalations',
            'AIOps and alert management',
            'Alert grouping and noise reduction',
            'Root Cause Analysis (RCA)',
            'Customer portal customization'
        ]
    },

    // ==========================================================================
    // WEEK 4: CI/CD & VERSION CONTROL
    // ==========================================================================
    {
        id: 'bitbucket',
        title: 'Bitbucket & CI/CD',
        duration: 'Week 4',
        sdlcPhase: 'Development, Deployment',
        icon: '🔀',
        description: 'Git version control and continuous integration',
        topics: [
            'Git fundamentals and branching strategies',
            'Bitbucket repository management',
            'Pull requests and code reviews',
            'Bitbucket Pipelines configuration',
            'Building and testing automation',
            'Docker image builds',
            'Deployment to AWS (ECR, ECS)',
            'Jira-Bitbucket integration',
            'Smart commits and automation'
        ]
    },

    // ==========================================================================
    // WEEK 5: STATUS & COMMUNICATION
    // ==========================================================================
    {
        id: 'statuspage',
        title: 'Statuspage',
        duration: 'Week 5 (Part 1)',
        sdlcPhase: 'Operations & Support',
        icon: '📊',
        description: 'Status communication and incident updates',
        topics: [
            'Statuspage setup and configuration',
            'Component and metric management',
            'Incident communication',
            'Scheduled maintenance',
            'Subscriber notifications',
            'Integration with monitoring tools',
            'Automation with APIs'
        ]
    },

    // ==========================================================================
    // WEEK 5-6: AI & AUTOMATION
    // ==========================================================================
    {
        id: 'rovo',
        title: 'Atlassian Rovo & AI',
        duration: 'Week 5 (Part 2)',
        sdlcPhase: 'All Phases',
        icon: '🤖',
        description: 'AI-powered productivity and automation',
        topics: [
            'Atlassian Intelligence overview',
            'Rovo AI agents',
            'AI-assisted issue creation',
            'Smart suggestions and automation',
            'Natural language JQL',
            'AI-powered search',
            'Custom AI agents development'
        ]
    },

    {
        id: 'marketplace-apps',
        title: 'ScriptRunner, JMWE & eazyBI',
        duration: 'Week 6',
        sdlcPhase: 'Development, Reporting',
        icon: '🔧',
        description: 'Powerful Jira extensions and reporting',
        topics: [
            'ScriptRunner for Jira Cloud',
            'Custom scripts and automation',
            'JMWE (Jira Misc Workflow Extensions)',
            'Advanced workflow conditions and validators',
            'eazyBI for advanced reporting',
            'Custom reports and dashboards',
            'Data import and cube configuration'
        ]
    },

    // ==========================================================================
    // WEEK 7: INTEGRATION & AUTOMATION
    // ==========================================================================
    {
        id: 'python-jira',
        title: 'Python + Jira REST API',
        duration: 'Week 7 (Part 1)',
        sdlcPhase: 'Development, Automation',
        icon: '🐍',
        description: 'Programmatic Jira automation with Python',
        topics: [
            'Jira REST API fundamentals',
            'Authentication (API tokens, OAuth)',
            'Python requests library',
            'Creating and updating issues',
            'Bulk operations',
            'Custom field handling',
            'Automation scripts',
            'Error handling and logging'
        ]
    },

    {
        id: 'ansible',
        title: 'Ansible + Jira Module',
        duration: 'Week 7 (Part 2)',
        sdlcPhase: 'Deployment, Operations',
        icon: '⚙️',
        description: 'Infrastructure automation with Jira integration',
        topics: [
            'Ansible fundamentals',
            'Playbooks and roles',
            'Jira module for Ansible',
            'Automated issue creation on deployment',
            'Inventory management',
            'Integration with CI/CD',
            'Infrastructure as Code concepts'
        ]
    },

    {
        id: 'n8n',
        title: 'n8n No-Code Workflows',
        duration: 'Week 7 (Part 3)',
        sdlcPhase: 'Automation',
        icon: '🔄',
        description: 'Visual workflow automation',
        topics: [
            'n8n installation and setup',
            'Visual workflow builder',
            'Jira node configuration',
            'Webhooks and triggers',
            'Multi-app integrations',
            'Error handling in workflows',
            'Scheduling and automation'
        ]
    },

    // ==========================================================================
    // WEEK 8: CLOUD & DEVOPS
    // ==========================================================================
    {
        id: 'linux-aws',
        title: 'Linux & AWS Basics',
        duration: 'Week 8 (Part 1)',
        sdlcPhase: 'Deployment, Operations',
        icon: '☁️',
        description: 'Cloud infrastructure fundamentals',
        topics: [
            'Linux command line essentials',
            'File system and permissions',
            'Process management',
            'AWS account setup and IAM',
            'EC2 instance management',
            'CloudWatch monitoring and logging',
            'Security groups and networking',
            'Cost management basics'
        ]
    },

    {
        id: 'devops',
        title: 'DevOps Fundamentals',
        duration: 'Week 8 (Part 2)',
        sdlcPhase: 'All Phases',
        icon: '🚀',
        description: 'DevOps culture and practices',
        topics: [
            'DevOps principles and culture',
            'CI/CD pipeline design',
            'Container basics (Docker)',
            'Container orchestration (ECS)',
            'Infrastructure as Code',
            'Monitoring and observability',
            'Incident response',
            'Course project presentation'
        ]
    }
];

/**
 * SDLC phases for filtering and organization
 */
const sdlcPhases = [
    { id: 'planning', name: 'Requirements & Planning', icon: '📝' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'testing', name: 'Testing & QA', icon: '🧪' },
    { id: 'deployment', name: 'Deployment', icon: '🚀' },
    { id: 'operations', name: 'Operations & Support', icon: '🔧' },
    { id: 'reporting', name: 'Reporting', icon: '📊' }
];

/**
 * Render courses page
 */
const getCoursesPage = (req, res, next) => {
    try {
        res.render('courses', {
            title: 'Course Curriculum',
            modules: courseModules,
            sdlcPhases,
            course: config.course
        });
    } catch (error) {
        logger.error('Error rendering courses page', { error: error.message });
        next(error);
    }
};

/**
 * Render individual module page
 */
const getModulePage = (req, res, next) => {
    try {
        const moduleId = req.params.module;
        const module = courseModules.find(m => m.id === moduleId);

        if (!module) {
            const error = new Error(`Module '${moduleId}' not found`);
            error.status = 404;
            throw error;
        }

        res.render('module-detail', {
            title: module.title,
            module,
            course: config.course
        });
    } catch (error) {
        logger.error('Error rendering module page', { error: error.message, module: req.params.module });
        next(error);
    }
};

module.exports = {
    getCoursesPage,
    getModulePage,
    courseModules,  // Exported for testing
    sdlcPhases
};
