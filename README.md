# AI Assisted Jira Cloud Administration & Automation Bootcamp

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![Express](https://img.shields.io/badge/Express-4.18+-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![AWS ECS](https://img.shields.io/badge/AWS-ECS-orange)
![Bitbucket Pipelines](https://img.shields.io/badge/CI/CD-Bitbucket%20Pipelines-blue)

**A production-ready Node.js web application for the AI Assisted Jira Cloud Bootcamp**

[View Live Demo](#) • [Documentation](#documentation) • [Report Bug](#)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [AWS ECS Deployment](#aws-ecs-deployment)
- [CI/CD with Bitbucket Pipelines](#cicd-with-bitbucket-pipelines)
- [For Bootcamp Students](#for-bootcamp-students)
- [API Reference](#api-reference)
- [Contributing](#contributing)

---

## 🎯 About the Project

This web application serves as the official website for the **AI Assisted Jira Cloud Administration & Automation Live Mastery Bootcamp**. It's designed to:

1. **Present the course professionally** to prospective students
2. **Demonstrate real-world DevOps practices** as teaching material
3. **Show SDLC tool integration** that students will learn in the bootcamp

### Built With

- **Backend**: Node.js with Express.js
- **Views**: EJS templating engine
- **Styling**: Modern CSS with custom properties
- **Containerization**: Docker with multi-stage builds
- **Infrastructure**: Terraform for AWS ECS
- **CI/CD**: Bitbucket Pipelines
- **Logging**: Winston with CloudWatch integration

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **Multi-page Website** | Home, Courses, Schedule, Tools, Contact pages |
| 🎨 **Modern Design** | Responsive CSS with animations and dark mode ready |
| 🤖 **AI Assistant Placeholder** | Ready for ChatGPT/Claude/Rovo integration |
| 🐳 **Docker Ready** | Production-optimized container image |
| ☁️ **AWS ECS** | Terraform infrastructure as code |
| 🔄 **CI/CD Pipeline** | Automated builds and deployments |
| 📝 **Educational Comments** | Code comments for teaching SDLC concepts |

---

## 📁 Project Structure

```
jira-bootcamp-website/
├── src/
│   ├── app.js                    # Main Express application
│   ├── config/
│   │   └── index.js              # Configuration management
│   ├── controllers/
│   │   ├── homeController.js     # Home page logic
│   │   ├── coursesController.js  # Course curriculum
│   │   ├── scheduleController.js # Schedule data
│   │   ├── toolsController.js    # Tools with SDLC mapping
│   │   ├── contactController.js  # Contact form handling
│   │   └── aiController.js       # AI Assistant (placeholder)
│   ├── middleware/
│   │   ├── logger.js             # Winston logging
│   │   └── errorHandler.js       # Error handling
│   ├── routes/
│   │   ├── index.js              # Home routes
│   │   ├── courses.js            # Course routes
│   │   ├── schedule.js           # Schedule routes
│   │   ├── tools.js              # Tools routes
│   │   ├── contact.js            # Contact routes
│   │   ├── ai.js                 # AI routes
│   │   └── health.js             # Health check
│   ├── views/
│   │   ├── layout.ejs            # Main layout template
│   │   ├── home.ejs              # Home page
│   │   ├── courses.ejs           # Courses page
│   │   ├── schedule.ejs          # Schedule page
│   │   ├── tools.ejs             # Tools page
│   │   ├── contact.ejs           # Contact page
│   │   ├── ai-assistant.ejs      # AI page
│   │   └── partials/
│   │       ├── header.ejs        # Header component
│   │       └── footer.ejs        # Footer component
│   └── public/
│       ├── css/styles.css        # Main stylesheet
│       ├── js/main.js            # Frontend JavaScript
│       └── images/               # Static images
│
├── tests/
│   ├── routes/
│   │   └── health.test.js        # Health endpoint tests
│   └── controllers/
│       ├── homeController.test.js
│       └── contactController.test.js
│
├── infrastructure/
│   ├── ecs-task-definition.json  # ECS task definition
│   └── terraform/
│       ├── main.tf               # Main Terraform config
│       ├── variables.tf          # Variables
│       └── outputs.tf            # Outputs
│
├── Dockerfile                    # Docker configuration
├── .dockerignore                 # Docker ignore file
├── bitbucket-pipelines.yml       # CI/CD pipeline
├── package.json                  # Node.js dependencies
├── jest.config.js                # Jest configuration
├── .env.example                  # Environment template
└── README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Docker** (for containerization) ([Download](https://www.docker.com/))
- **AWS CLI** (for deployment) ([Install](https://aws.amazon.com/cli/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://bitbucket.org/your-org/jira-bootcamp-web.git
   cd jira-bootcamp-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Add a banner image** (optional)
   ```bash
   # Place your banner image at:
   # src/public/images/course-banner.png
   ```

---

## 💻 Running Locally

### Development Mode

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

Features:
- Auto-reload on file changes (nodemon)
- Colorized console logs
- Detailed error pages

### Production Mode

```bash
npm start
```

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test -- --coverage

# Watch mode
npm run test:watch
```

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t jira-bootcamp-web .
```

### Run Container Locally

```bash
docker run -p 3000:3000 --env-file .env jira-bootcamp-web
```

### Verify Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "service": "jira-bootcamp-web",
  "version": "1.0.0"
}
```

---

## ☁️ AWS ECS Deployment

### Prerequisites

1. AWS Account with appropriate permissions
2. AWS CLI configured
3. ECR repository created
4. VPC with subnets configured

### Using Terraform

```bash
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply changes
terraform apply
```

### Manual ECR Push

```bash
# Login to ECR
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com

# Tag image
docker tag jira-bootcamp-web:latest \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com/jira-bootcamp-web:latest

# Push image
docker push \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com/jira-bootcamp-web:latest
```

---

## 🔄 CI/CD with Bitbucket Pipelines

### Pipeline Stages

| Stage | Branch | Actions |
|-------|--------|---------|
| **Test** | All | Install deps, Lint, Test |
| **Build** | develop, main | Build Docker image |
| **Push** | main | Push to ECR |
| **Deploy** | main | Update ECS service |

### Required Repository Variables

Set these in Bitbucket Repository Settings:

| Variable | Description | Secured |
|----------|-------------|---------|
| `AWS_ACCESS_KEY_ID` | AWS access key | ❌ |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | ✅ |
| `AWS_DEFAULT_REGION` | e.g., ap-south-1 | ❌ |
| `AWS_ACCOUNT_ID` | AWS account ID | ❌ |
| `ECR_REPOSITORY_NAME` | ECR repository name | ❌ |
| `ECS_CLUSTER_NAME` | ECS cluster name | ❌ |
| `ECS_SERVICE_NAME` | ECS service name | ❌ |

### Trigger Deployment

```bash
# Merge to main triggers deployment
git checkout main
git merge develop
git push origin main
```

---

## 📚 For Bootcamp Students

This codebase is designed as teaching material. Here's how different concepts map to the SDLC:

### SDLC Tool Mapping

| SDLC Phase | Tools Demonstrated |
|------------|-------------------|
| **Requirements** | Jira Software (issue tracking) |
| **Design** | Code comments, architecture |
| **Development** | Node.js, Express.js, EJS |
| **Testing** | Jest, Supertest |
| **Deployment** | Docker, ECR, ECS, Terraform |
| **Operations** | CloudWatch, Health checks |
| **CI/CD** | Bitbucket Pipelines |

### Key Learning Files

| Concept | File | Description |
|---------|------|-------------|
| Express Setup | `src/app.js` | Main application entry |
| Configuration | `src/config/index.js` | Environment variables |
| Logging | `src/middleware/logger.js` | Winston/CloudWatch |
| Error Handling | `src/middleware/errorHandler.js` | Centralized errors |
| Routing | `src/routes/*.js` | Express routing |
| Controllers | `src/controllers/*.js` | Business logic |
| Testing | `tests/*.test.js` | Jest tests |
| Docker | `Dockerfile` | Container build |
| CI/CD | `bitbucket-pipelines.yml` | Automation |
| IaC | `infrastructure/terraform/` | AWS resources |

### Topics to Explore

1. **Week 4**: Study `bitbucket-pipelines.yml` for CI/CD concepts
2. **Week 7**: Look at `aiController.js` for API integration patterns
3. **Week 8**: Explore `infrastructure/terraform/` for AWS/DevOps

---

## 📡 API Reference

### Health Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Full health status |
| `/health/ready` | GET | Readiness probe |
| `/health/live` | GET | Liveness probe |

### AI Endpoints (Coming Soon)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ai` | GET | AI assistant page |
| `/ai/chat` | POST | Send message to AI |
| `/ai/status` | GET | AI service status |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 📧 Contact

**AI Assisted Jira Cloud Bootcamp**

- Website: [Visit Site](#)
- Email: [Contact](#)

---

<div align="center">

**Built with ❤️ for Telugu IT Professionals**

🛠️ Node.js | 🐳 Docker | ☁️ AWS ECS | 🔄 Bitbucket Pipelines

</div>
