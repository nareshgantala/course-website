// =============================================================================
// Jenkinsfile for ECS Deployment
// =============================================================================
// This pipeline does 4 things:
// 1. Runs tests to make sure code works
// 2. Builds a Docker image
// 3. Pushes the image to AWS ECR
// 4. Deploys to ECS using Terraform
// =============================================================================

pipeline {
    // Run on any available Jenkins agent
    agent any
            parameters {
            
            choice(name: 'deployment_type', choices: ['apply', 'destroy'], description: 'Select the deployment type.')
            
        }
    tools {
        nodejs "Node_21"
    }

    // =========================================================================
    // Environment Variables
    // =========================================================================
    // Change these values to match your AWS setup
    environment {
        AWS_REGION         = 'ap-south-1'
        ECR_REPO_NAME      = 'jira-bootcamp-web'
        APP_NAME           = 'jira-bootcamp-web'
        TERRAFORM_DIR      = 'infrastructure/terraform'
    }

    // =========================================================================
    // Pipeline Stages
    // =========================================================================
    stages {
        
        // ---------------------------------------------------------------------
        // Stage 1: Install Dependencies & Run Tests
        // ---------------------------------------------------------------------
        // This ensures your code works before building and deploying
        stage('Test') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci'
                
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        // ---------------------------------------------------------------------
        // Stage 2: Build Docker Image
        // ---------------------------------------------------------------------
        // Creates a Docker image using your Dockerfile
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    // Build the image with a tag based on build number
                    docker.build("${ECR_REPO_NAME}:${BUILD_NUMBER}")
                    docker.build("${ECR_REPO_NAME}:latest")
                }
            }
        }

        // ---------------------------------------------------------------------
        // Stage 3: Push to AWS ECR
        // ---------------------------------------------------------------------
        // Pushes the Docker image to your ECR repository
        stage('Push to ECR') {
            steps {
                echo '☁️ Pushing image to AWS ECR...'
                
                // Use AWS credentials stored in Jenkins
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'aws-credentials']]) {
                    script {
                        // Get AWS account ID
                        def awsAccountId = sh(
                            script: 'aws sts get-caller-identity --query Account --output text',
                            returnStdout: true
                        ).trim()
                        
                        // ECR registry URL
                        def ecrRegistry = "${awsAccountId}.dkr.ecr.${AWS_REGION}.amazonaws.com"
                        
                        // Login to ECR
                        sh """
                            aws ecr get-login-password --region ${AWS_REGION} | \
                            docker login --username AWS --password-stdin ${ecrRegistry}
                        """
                        
                        // Tag and push both versions
                        sh """
                            docker tag ${ECR_REPO_NAME}:${BUILD_NUMBER} ${ecrRegistry}/${ECR_REPO_NAME}:${BUILD_NUMBER}
                            docker tag ${ECR_REPO_NAME}:latest ${ecrRegistry}/${ECR_REPO_NAME}:latest
                            docker push ${ecrRegistry}/${ECR_REPO_NAME}:${BUILD_NUMBER}
                            docker push ${ecrRegistry}/${ECR_REPO_NAME}:latest
                        """
                    }
                }
            }
        }

        // ---------------------------------------------------------------------
        // Stage 4: Deploy with Terraform
        // ---------------------------------------------------------------------
        // Creates/updates ECS cluster, service, and task definition
        stage('Deploy to ECS') {
            steps {
                echo '🚀 Deploying to ECS with Terraform...'
                
                // Use same AWS credentials for Terraform
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'aws-credentials']]) {
                    script {
                // Simple, self-contained Terraform installer in workspace
                    sh '''
                    set -e

                    TF_VERSION="1.9.8"
                    TF_DIR="${WORKSPACE}/.tf-bin"

                    mkdir -p "$TF_DIR"

                    if [ ! -x "$TF_DIR/terraform" ]; then
                    echo "📥 Downloading Terraform ${TF_VERSION}..."
                    curl -fsSL "https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip" -o tf.zip
                    unzip -o tf.zip -d "$TF_DIR"
                    rm tf.zip
                    chmod +x "$TF_DIR/terraform"
                    fi

                    export PATH="$TF_DIR:$PATH"
                    cd "${TERRAFORM_DIR}"

                    echo "Terraform version:"
                    terraform version

                    echo "🌱 terraform init"
                    terraform init -input=false

                    echo "📝 terraform plan"
                    terraform plan -out=tfplan -input=false

                    echo "✅ terraform apply"
                    terraform apply -auto-approve tfplan
                '''
                }
                }
            }
        }
    }

    // =========================================================================
    // Post-Build Actions
    // =========================================================================
    // These run after the pipeline completes (success or failure)
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🌐 Your app should be running on ECS now.'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above for errors.'
        }
        always {
            // Clean up Docker images to save space
            echo '🧹 Cleaning up...'
            sh "docker rmi ${ECR_REPO_NAME}:${BUILD_NUMBER} || true"
            sh "docker rmi ${ECR_REPO_NAME}:latest || true"
            
            // Clean workspace
            cleanWs()
        }
    }
}

// =============================================================================
// SETUP INSTRUCTIONS (Read this before running!)
// =============================================================================
//
// 1. JENKINS CREDENTIALS:
//    Go to: Jenkins > Manage Jenkins > Credentials > System > Global credentials
//    Add new credential:
//    - Kind: "AWS Credentials"
//    - ID: "aws-credentials"
//    - Access Key ID: Your AWS access key
//    - Secret Access Key: Your AWS secret key
//
// 2. JENKINS PLUGINS REQUIRED:
//    - Docker Pipeline
//    - AWS Credentials
//    - Pipeline
//
// 3. JENKINS AGENT REQUIREMENTS:
//    - Docker installed
//    - Terraform installed (version >= 1.0)
//    - AWS CLI installed
//    - Node.js installed (for running tests)
//
// 4. AWS IAM PERMISSIONS NEEDED:
//    - ECR: Full access to push/pull images
//    - ECS: Full access to manage clusters, services, tasks
//    - IAM: Ability to create roles (for ECS task execution)
//    - CloudWatch: Create log groups
//    - EC2: Describe VPCs, subnets, security groups
//
// =============================================================================
