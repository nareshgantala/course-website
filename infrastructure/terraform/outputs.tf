# =============================================================================
# Terraform Outputs
# =============================================================================

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.main.name
}

output "ecs_cluster_arn" {
  description = "ARN of the ECS cluster"
  value       = aws_ecs_cluster.main.arn
}

output "ecs_service_name" {
  description = "Name of the ECS service"
  value       = aws_ecs_service.main.name
}

# output "ecr_repository_url" {
#   description = "URL of the ECR repository"
#   value       = aws_ecr_repository.app.repository_url
# }

output "cloudwatch_log_group" {
  description = "Name of the CloudWatch log group"
  value       = aws_cloudwatch_log_group.app.name
}

output "task_execution_role_arn" {
  description = "ARN of the ECS task execution role"
  value       = aws_iam_role.ecs_task_execution.arn
}

output "task_role_arn" {
  description = "ARN of the ECS task role"
  value       = aws_iam_role.ecs_task.arn
}

output "security_group_id" {
  description = "ID of the ECS tasks security group"
  value       = aws_security_group.ecs_tasks.id
}

# =============================================================================
# Deployment Information
# =============================================================================
output "deployment_info" {
  description = "Information for Bitbucket Pipelines deployment"
  value = {
    cluster_name    = aws_ecs_cluster.main.name
    service_name    = aws_ecs_service.main.name
    # repository_url  = aws_ecr_repository.app.repository_url
    region          = var.aws_region
  }
}
