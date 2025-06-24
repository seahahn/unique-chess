#!/bin/bash

# Setup Local Development Environment
echo "🚀 Setting up Unique Chess local development environment..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install Docker and docker-compose first."
    exit 1
fi

# Check if infisical is available
if ! command -v infisical &> /dev/null; then
    echo "❌ Infisical is not installed. Please install Infisical CLI first."
    echo "   See: https://infisical.com/docs/cli/overview"
    exit 1
fi

# Load environment variables from Infisical
echo "🔑 Loading environment variables from Infisical (dev environment)..."
infisical export --env=dev > .env

# Start the services
echo "📦 Starting Docker services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 20

# Check if PostgreSQL is ready
echo "🐘 Checking PostgreSQL status..."
until docker-compose exec -T postgres pg_isready -U postgres -d unique_chess > /dev/null 2>&1; do
    echo "Waiting for PostgreSQL to be ready..."
    sleep 5
done

# Check if MinIO is ready
echo "🗄️ Checking MinIO status..."
until curl -f http://localhost:9000/minio/health/live > /dev/null 2>&1; do
    echo "Waiting for MinIO to be ready..."
    sleep 5
done

# Install MinIO client if not available
if ! command -v mc &> /dev/null; then
    echo "📥 Installing MinIO client..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install minio/stable/mc
        else
            curl https://dl.min.io/client/mc/release/darwin-amd64/mc -o /usr/local/bin/mc
            chmod +x /usr/local/bin/mc
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl https://dl.min.io/client/mc/release/linux-amd64/mc -o /usr/local/bin/mc
        chmod +x /usr/local/bin/mc
    else
        echo "⚠️ Please install MinIO client manually: https://docs.min.io/docs/minio-client-quickstart-guide.html"
    fi
fi

# Configure MinIO client
echo "🔧 Configuring MinIO client..."
mc alias set local http://localhost:9000 minioadmin minioadmin123

# Create required buckets
echo "🪣 Creating MinIO buckets..."
mc mb local/chess-assets --ignore-existing
mc mb local/user-avatars --ignore-existing
mc mb local/game-assets --ignore-existing

# Set bucket policies (public read for assets)
echo "🔐 Setting bucket policies..."
mc anonymous set public local/chess-assets
mc anonymous set public local/game-assets

# Check Redis status
echo "🔴 Checking Redis status..."
until docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; do
    echo "Waiting for Redis to be ready..."
    sleep 5
done

# Run database migrations
echo "🗃️ Running database migrations..."
cd workspaces/database
cp ../../.env .env
pnpm prisma migrate deploy
pnpm prisma generate
cd ../..

echo "✅ Local development environment is ready!"
echo ""
echo "🌐 Available services:"
echo "  • PostgreSQL: localhost:5432 (postgres/postgres)"
echo "  • pgAdmin: http://localhost:5050 (admin@uniquechess.com/admin)"
echo "  • MinIO Console: http://localhost:9001 (minioadmin/minioadmin123)"
echo "  • Redis: localhost:6379"
echo ""
echo "📝 To use local environment:"
echo "  1. Start your development server: infisical run --env=dev -- pnpm dev"
echo ""
echo "🛑 To stop services: docker-compose down"
echo "🗑️ To reset everything: docker-compose down -v"