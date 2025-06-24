# Docker Setup for Unique Chess

This guide explains how to use Docker with the Unique Chess project for both development and production.

## Project Structure

The project is organized as a monorepo with the following workspaces:

- `workspaces/webapp`: SolidStart web application
- `workspaces/database`: Prisma database package
- `workspaces/websocket`: WebSocket server for real-time communication

## Development Setup

### Prerequisites

- Docker and Docker Compose
- Node.js 20+
- pnpm
- Infisical CLI

### Starting Development Environment

```bash
# Load environment variables from Infisical and start services
task setup-local

# Start development servers with hot reloading
task dev-local
```

### Development Services

- **webapp**: SolidStart application (http://localhost:3000)
- **websocket**: WebSocket server (ws://localhost:8080)
- **postgres**: PostgreSQL database (localhost:5432)
- **pgadmin**: Database management UI (http://localhost:5050)
- **minio**: Object storage (http://localhost:9001)
- **redis**: Cache and session store (localhost:6379)

## Production Setup

### Building Production Images

```bash
# Build all production images
docker-compose -f docker-compose.prod.yml build

# Build specific service
docker-compose -f docker-compose.prod.yml build webapp
```

### Running Production Environment

```bash
# Start all services in production mode
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop all services
docker-compose -f docker-compose.prod.yml down
```

### Production Services

- **webapp**: SolidStart application (https://yourdomain.com)
- **websocket**: WebSocket server (wss://yourdomain.com/ws)
- **postgres**: PostgreSQL database (not exposed externally)
- **minio**: Object storage (https://yourdomain.com/minio-api)
- **redis**: Cache and session store (not exposed externally)
- **nginx**: Reverse proxy and SSL termination (ports 80, 443)

## Docker Configuration Files

- `docker-compose.yml`: Development environment
- `docker-compose.prod.yml`: Production environment
- `workspaces/webapp/Dockerfile.dev`: Development image for webapp
- `workspaces/webapp/Dockerfile`: Production image for webapp
- `workspaces/websocket/Dockerfile.dev`: Development image for websocket server
- `workspaces/websocket/Dockerfile`: Production image for websocket server
- `nginx/conf/default.conf`: Nginx configuration for production

## Environment Variables

Both development and production environments require environment variables. In development, these are loaded from Infisical. In production, they should be provided through a secure method like environment files or a secrets manager.

Required variables include:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT token generation/validation
- `MINIO_ACCESS_KEY`: MinIO access key
- `MINIO_SECRET_KEY`: MinIO secret key
- `POSTGRES_PASSWORD`: PostgreSQL password

## SSL Certificates

For production, you need to provide SSL certificates:

1. Create a directory: `mkdir -p nginx/ssl`
2. Add your certificates:
   - `nginx/ssl/server.crt`: SSL certificate
   - `nginx/ssl/server.key`: SSL private key

For local development with self-signed certificates:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx/ssl/server.key -out nginx/ssl/server.crt
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker-compose logs [service-name]
```

### Database connection issues

Verify environment variables:
```bash
docker-compose exec webapp env | grep DATABASE_URL
```

### WebSocket connection issues

Check WebSocket server logs:
```bash
docker-compose logs websocket
```