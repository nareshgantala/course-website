# =============================================================================
# Dockerfile for AI Assisted Jira Cloud Bootcamp Website
# =============================================================================
# SDLC Phase: Deployment - container packaging
#
# This Dockerfile creates a production-ready container image.
# Key concepts demonstrated:
# - Multi-stage builds for smaller images
# - Non-root user for security
# - Health check for ECS/load balancer integration
# - Layer caching optimization
#
# In the bootcamp, you'll learn:
# - Docker fundamentals and best practices
# - How to optimize container images
# - Security considerations for containers
# - Integration with AWS ECR and ECS
# =============================================================================

# =============================================================================
# Stage 1: Build Stage
# Install all dependencies including devDependencies for any build steps
# =============================================================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better layer caching)
# If package.json hasn't changed, Docker will use cached node_modules
COPY package*.json ./

# Install all dependencies (including dev for potential build steps)
RUN npm ci

# Copy source code
COPY . .

# If you had a build step (TypeScript, webpack, etc.), it would go here:
# RUN npm run build

# =============================================================================
# Stage 2: Production Stage
# Only include production dependencies and built assets
# =============================================================================
FROM node:20-alpine AS production

# Add labels for image metadata
# These are useful for container registries and orchestration
LABEL maintainer="Jira Cloud Bootcamp"
LABEL description="AI Assisted Jira Cloud Administration & Automation Bootcamp Website"
LABEL version="1.0.0"

# Set NODE_ENV to production
# This affects how npm installs dependencies and how Express behaves
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# =============================================================================
# Install curl for health checks
# ECS task definition uses curl for health check endpoint
# =============================================================================
RUN apk add --no-cache curl

# =============================================================================
# Security Best Practice: Run as non-root user
# This limits potential damage if the container is compromised
# =============================================================================
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodeuser

# Copy package files
COPY package*.json ./

# Install only production dependencies
# --omit=dev excludes devDependencies
# --ignore-scripts prevents potential malicious scripts
RUN npm ci --omit=dev --ignore-scripts

# Copy application code from builder stage
COPY --from=builder /app/src ./src

# Optional: Copy built assets if you have a build step
# COPY --from=builder /app/dist ./dist

# Change ownership to non-root user
RUN chown -R nodeuser:nodejs /app

# Switch to non-root user
USER nodeuser

# Expose the port the app runs on
# This is documentation - actual port mapping is done at runtime
EXPOSE 3000

# =============================================================================
# Health Check
# ECS and load balancers use this to determine container health
# The check runs every 30 seconds after an initial 5-second delay
# If 3 consecutive checks fail, the container is marked unhealthy
# =============================================================================
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# =============================================================================
# Start the application
# Using node directly (not npm) for better signal handling
# This allows graceful shutdown when container stops
# =============================================================================
CMD ["node", "src/app.js"]

# =============================================================================
# Usage Instructions
# =============================================================================
# Build the image:
#   docker build -t jira-bootcamp-web .
#
# Run locally:
#   docker run -p 3000:3000 --env-file .env jira-bootcamp-web
#
# Run with specific environment variables:
#   docker run -p 3000:3000 -e PORT=3000 -e NODE_ENV=production jira-bootcamp-web
#
# Push to AWS ECR:
#   aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.ap-south-1.amazonaws.com
#   docker tag jira-bootcamp-web:latest <account>.dkr.ecr.ap-south-1.amazonaws.com/jira-bootcamp-web:latest
#   docker push <account>.dkr.ecr.ap-south-1.amazonaws.com/jira-bootcamp-web:latest
# =============================================================================
