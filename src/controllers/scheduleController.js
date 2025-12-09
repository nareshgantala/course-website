/**
 * =============================================================================
 * Schedule Controller
 * =============================================================================
 * SDLC Phase: Development - timeline and schedule management
 * 
 * This controller provides the bootcamp schedule data.
 * Organized week-by-week to show the learning journey.
 * =============================================================================
 */

const config = require('../config');
const logger = require('../middleware/logger');

/**
 * Weekly schedule for the 8-week bootcamp
 */
const weeklySchedule = [
    {
        week: 1,
        theme: 'Jira Software Foundations',
        sessions: [
            { day: 'Monday', topic: 'Introduction to Jira Cloud & Project Setup', duration: '90 min' },
            { day: 'Tuesday', topic: 'Issue Types, Workflows & Screens', duration: '90 min' },
            { day: 'Wednesday', topic: 'Custom Fields & Field Configurations', duration: '90 min' },
            { day: 'Thursday', topic: 'Permissions & Security Schemes', duration: '90 min' },
            { day: 'Friday', topic: 'Week 1 Lab: Hands-on Jira Project Setup', duration: '90 min' }
        ]
    },
    {
        week: 2,
        theme: 'Agile with Jira',
        sessions: [
            { day: 'Monday', topic: 'Sprint Planning & Backlog Management', duration: '90 min' },
            { day: 'Tuesday', topic: 'Roadmaps & Release Planning', duration: '90 min' },
            { day: 'Wednesday', topic: 'JQL Fundamentals & Advanced Queries', duration: '90 min' },
            { day: 'Thursday', topic: 'Dashboards & Reporting', duration: '90 min' },
            { day: 'Friday', topic: 'Week 2 Lab: End-to-End Sprint Management', duration: '90 min' }
        ]
    },
    {
        week: 3,
        theme: 'Jira Service Management',
        sessions: [
            { day: 'Monday', topic: 'JSM Setup & Service Desk Configuration', duration: '90 min' },
            { day: 'Tuesday', topic: 'Incident & Problem Management', duration: '90 min' },
            { day: 'Wednesday', topic: 'Change Management & Service Requests', duration: '90 min' },
            { day: 'Thursday', topic: 'AIOps, Alerts & Alert Grouping', duration: '90 min' },
            { day: 'Friday', topic: 'Week 3 Lab: Complete ITSM Workflow', duration: '90 min' }
        ]
    },
    {
        week: 4,
        theme: 'Bitbucket & CI/CD',
        sessions: [
            { day: 'Monday', topic: 'Git Fundamentals & Bitbucket Setup', duration: '90 min' },
            { day: 'Tuesday', topic: 'Branching Strategies & Pull Requests', duration: '90 min' },
            { day: 'Wednesday', topic: 'Bitbucket Pipelines Introduction', duration: '90 min' },
            { day: 'Thursday', topic: 'Docker Builds & AWS ECR Push', duration: '90 min' },
            { day: 'Friday', topic: 'Week 4 Lab: Complete CI/CD Pipeline', duration: '90 min' }
        ]
    },
    {
        week: 5,
        theme: 'Statuspage & AI Tools',
        sessions: [
            { day: 'Monday', topic: 'Statuspage Setup & Configuration', duration: '90 min' },
            { day: 'Tuesday', topic: 'Incident Communication & Automations', duration: '90 min' },
            { day: 'Wednesday', topic: 'Atlassian Intelligence & Rovo AI', duration: '90 min' },
            { day: 'Thursday', topic: 'AI Agents & Custom Automations', duration: '90 min' },
            { day: 'Friday', topic: 'Week 5 Lab: AI-Assisted Workflow', duration: '90 min' }
        ]
    },
    {
        week: 6,
        theme: 'Marketplace Apps',
        sessions: [
            { day: 'Monday', topic: 'ScriptRunner for Jira Cloud', duration: '90 min' },
            { day: 'Tuesday', topic: 'Custom Scripts & Listeners', duration: '90 min' },
            { day: 'Wednesday', topic: 'JMWE Advanced Workflows', duration: '90 min' },
            { day: 'Thursday', topic: 'eazyBI Reports & Dashboards', duration: '90 min' },
            { day: 'Friday', topic: 'Week 6 Lab: Custom Automation Rules', duration: '90 min' }
        ]
    },
    {
        week: 7,
        theme: 'Integration & Automation',
        sessions: [
            { day: 'Monday', topic: 'Python + Jira REST API Basics', duration: '90 min' },
            { day: 'Tuesday', topic: 'Python Automation Scripts', duration: '90 min' },
            { day: 'Wednesday', topic: 'Ansible Fundamentals & Jira Module', duration: '90 min' },
            { day: 'Thursday', topic: 'n8n Visual Workflow Automation', duration: '90 min' },
            { day: 'Friday', topic: 'Week 7 Lab: Multi-Tool Integration', duration: '90 min' }
        ]
    },
    {
        week: 8,
        theme: 'Cloud & DevOps',
        sessions: [
            { day: 'Monday', topic: 'Linux Command Line Essentials', duration: '90 min' },
            { day: 'Tuesday', topic: 'AWS Basics: EC2, IAM, CloudWatch', duration: '90 min' },
            { day: 'Wednesday', topic: 'ECS & Container Deployment', duration: '90 min' },
            { day: 'Thursday', topic: 'DevOps Best Practices & Review', duration: '90 min' },
            { day: 'Friday', topic: 'Final Project Presentations', duration: '90 min' }
        ]
    }
];

/**
 * Phase-based breakdown for alternative view
 */
const phases = [
    {
        name: 'Phase 1: Jira Fundamentals',
        weeks: '1-2',
        description: 'Master Jira Software Cloud for project management',
        color: '#0052CC'
    },
    {
        name: 'Phase 2: Service Management',
        weeks: '3',
        description: 'Learn ITSM with Jira Service Management',
        color: '#00875A'
    },
    {
        name: 'Phase 3: DevOps Pipeline',
        weeks: '4',
        description: 'Git, Bitbucket, and CI/CD with Pipelines',
        color: '#6554C0'
    },
    {
        name: 'Phase 4: AI & Extensions',
        weeks: '5-6',
        description: 'Statuspage, Rovo AI, and Marketplace apps',
        color: '#FF5630'
    },
    {
        name: 'Phase 5: Automation & Cloud',
        weeks: '7-8',
        description: 'Python, Ansible, n8n, AWS, and final project',
        color: '#FFAB00'
    }
];

/**
 * Render schedule page
 */
const getSchedulePage = (req, res, next) => {
    try {
        res.render('schedule', {
            title: 'Bootcamp Schedule',
            schedule: weeklySchedule,
            phases,
            course: config.course,
            timing: {
                time: '7:00 – 8:30 AM IST',
                days: 'Monday to Friday',
                duration: '90 minutes per session',
                totalWeeks: 8,
                totalSessions: 40
            }
        });
    } catch (error) {
        logger.error('Error rendering schedule page', { error: error.message });
        next(error);
    }
};

module.exports = {
    getSchedulePage,
    weeklySchedule,  // Exported for testing
    phases
};
