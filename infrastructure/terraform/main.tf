# =============================================================================
# Terraform Configuration for AWS ECS Deployment
# =============================================================================
# SDLC Phase: Deployment & Operations - Infrastructure as Code
#
# This Terraform configuration creates:
# - ECS Cluster
# - ECS Service with Fargate
# - Task Definition
# - CloudWatch Log Group
# - IAM Roles
#
# In the bootcamp, you'll learn:
# - Infrastructure as Code concepts
# - AWS ECS and Fargate
# - CloudWatch logging
# - IAM roles and policies
# =============================================================================

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  # Backend configuration for remote state storage
  # TODO: Configure your backend for team collaboration
  backend "s3" {
    bucket         = "nareshcloud-jenkins-cicd-setup-terraform-state "
    key            = "jira-bootcamp/terraform.tfstate"
    region         = "us-east-1"
  }
}

# =============================================================================
# Provider Configuration
# =============================================================================
provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "JiraBootcamp"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# =============================================================================
# Data Sources
# =============================================================================
data "aws_caller_identity" "current" {}

data "aws_vpc" "selected" {
  tags = {
    "Name" = "demo_vpc"
  }
}

data "aws_subnet" "selected" {
  filter {
    name   = "tag:Name"
    values = [demo_public_subnet_0]
  }
}

data "aws_ecr_repository" "service" {
  name = "jira-bootcamp-web"
}

# =============================================================================
# CloudWatch Log Group
# =============================================================================
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.app_name}"
  retention_in_days = 30
  
  tags = {
    Name = "${var.app_name}-logs"
  }
}

# =============================================================================
# IAM Role for ECS Task Execution
# Allows ECS to pull images from ECR and write logs to CloudWatch
# =============================================================================
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.app_name}-task-execution-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# =============================================================================
# IAM Role for ECS Task
# This role is assumed by the container itself (for S3 access, etc.)
# =============================================================================
resource "aws_iam_role" "ecs_task" {
  name = "${var.app_name}-task-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

# Allow task to access S3 for banner images (optional)
resource "aws_iam_role_policy" "ecs_task_s3" {
  name = "${var.app_name}-s3-access"
  role = aws_iam_role.ecs_task.id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::${var.s3_bucket_name}",
          "arn:aws:s3:::${var.s3_bucket_name}/*"
        ]
      }
    ]
  })
}

# =============================================================================
# Security Group for ECS Tasks
# =============================================================================
resource "aws_security_group" "ecs_tasks" {
  name        = "${var.app_name}-ecs-tasks-sg"
  description = "Security group for ECS tasks"
  vpc_id      = data.aws_vpc.selected.id
  
  ingress {
    description = "HTTP from anywhere"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    description = "Allow all outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.app_name}-ecs-sg"
  }
}

# # =============================================================================
# # Security Group for ECS Tasks
# # =============================================================================
# resource "aws_security_group" "ecs_tasks" {
#   name        = "${var.app_name}-ecs-tasks-sg"
#   description = "Security group for ECS tasks"
#   vpc_id      = data.aws_vpc.selected.id
  
#   ingress {
#     description = "HTTP from anywhere"
#     from_port   = 3000
#     to_port     = 3000
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
  
#   egress {
#     description = "Allow all outbound"
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
  
#   tags = {
#     Name = "${var.app_name}-ecs-sg"
#   }
# }

# =============================================================================
# ECS Cluster
# =============================================================================
resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
  
  tags = {
    Name = "${var.app_name}-cluster"
  }
}

# =============================================================================
# ECS Task Definition
# =============================================================================
resource "aws_ecs_task_definition" "app" {
  family                   = var.app_name
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.container_cpu
  memory                   = var.container_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn
  
  container_definitions = jsonencode([
    {
      name      = var.app_name
      image     = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repository_name}:latest"
      essential = true
      
      portMappings = [
        {
          containerPort = var.container_port
          protocol      = "tcp"
        }
      ]
      
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = tostring(var.container_port)
        },
        {
          name  = "BANNER_SOURCE"
          value = var.banner_source
        }
      ]
      
      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:${var.container_port}/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
      
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
  
  tags = {
    Name = "${var.app_name}-task-definition"
  }
}

# =============================================================================
# ECS Service
# =============================================================================
resource "aws_ecs_service" "main" {
  name                               = "${var.app_name}-service"
  cluster                            = aws_ecs_cluster.main.id
  task_definition                    = aws_ecs_task_definition.app.arn
  desired_count                      = var.desired_count
  launch_type                        = "FARGATE"
  platform_version                   = "LATEST"
  health_check_grace_period_seconds  = 60
  
  network_configuration {
    subnets          = [data.aws_subnet.selected.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true  # Required for Fargate in public subnets
  }
  
  # Enable rolling deployments
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  
  # Enable circuit breaker for failed deployments
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }
  
  tags = {
    Name = "${var.app_name}-service"
  }
  
  # Ignore changes to desired_count for auto-scaling
  lifecycle {
    ignore_changes = [desired_count]
  }
}

# =============================================================================
# ECR Repository (if not exists)
# =============================================================================
# resource "aws_ecr_repository" "app" {
#   name                 = var.ecr_repository_name
#   image_tag_mutability = "MUTABLE"
  
#   image_scanning_configuration {
#     scan_on_push = true
#   }
  
#   tags = {
#     Name = "${var.app_name}-ecr"
#   }
# }




# Lifecycle policy to keep only recent images
resource "aws_ecr_lifecycle_policy" "app" {
  repository = data.aws_ecr_repository.service.name
  
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep last 10 images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = 10
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
