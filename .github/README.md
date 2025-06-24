# GitHub Actions Workflows

This directory contains the GitHub Actions workflows for the Unique Chess project.

## Workflows

### CI/CD

- **ci.yml**: Main CI pipeline that runs on push and pull requests
- **deploy.yml**: Deploys to production when a release is published
- **database.yml**: Runs database migrations when schema changes are pushed
- **docker.yml**: Builds and pushes Docker images

### Testing

- **tests.yml**: Runs unit, integration, and E2E tests
- **lint.yml**: Runs linting and type checking

### Security

- **security.yml**: Runs security scans for dependencies and Docker images

### Maintenance

- **dependencies.yml**: Updates dependencies weekly
- **stale.yml**: Marks and closes stale issues and PRs
- **issue-management.yml**: Manages issue triage and labeling
- **pr-labeler.yml**: Automatically labels PRs based on content

## Required Secrets

To use these workflows, you need to set up the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password
- `INFISICAL_TOKEN`: Infisical API token for dev environment
- `INFISICAL_TOKEN_STAGING`: Infisical API token for staging environment
- `INFISICAL_TOKEN_PRODUCTION`: Infisical API token for production environment
- `SSH_PRIVATE_KEY`: SSH private key for deployment (if using SSH deployment)
- `PRODUCTION_SERVER_IP`: IP address of production server (if using SSH deployment)
- `SSH_USER`: SSH username for deployment (if using SSH deployment)
- `FLY_API_TOKEN`: Fly.io API token (if deploying to Fly.io)

## Usage

### Creating a Release

To create a new release:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Create Release" workflow
3. Click "Run workflow"
4. Enter the version number (e.g., "1.0.0")
5. Select whether it's a prerelease
6. Click "Run workflow"

### Running Tests

Tests are automatically run on push and pull requests, but you can also run them manually:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Tests" workflow
3. Click "Run workflow"
4. Select the branch to run tests on
5. Click "Run workflow"

### Deploying to Production

Production deployments are triggered automatically when a release is published. You can also manually trigger a deployment:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to Production" workflow
3. Click "Run workflow"
4. Select the branch to deploy
5. Click "Run workflow"