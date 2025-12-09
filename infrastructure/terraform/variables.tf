# =============================================================================
# Terraform Variables
# =============================================================================

variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name (e.g., development, staging, production)"
  type        = string
  default     = "production"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "jira-bootcamp-web-2"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "jira-bootcamp-web"
}

variable "container_port" {
  description = "Port the container listens on"
  type        = number
  default     = 3000
}

variable "container_cpu" {
  description = "CPU units for the container (1024 = 1 vCPU)"
  type        = string
  default     = "256"  # 0.25 vCPU
}

variable "container_memory" {
  description = "Memory for the container in MB"
  type        = string
  default     = "512"  # 512 MB
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
}

variable "s3_bucket_name" {
  description = "S3 bucket for storing assets (e.g., banner images)"
  type        = string
  default     = "jira-bootcamp-assets"
}

variable "banner_source" {
  description = "Source for banner image: 'local' or 's3'"
  type        = string
  default     = "local"
}
