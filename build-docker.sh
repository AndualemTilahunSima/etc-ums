echo "Building Docker image..."
docker build -t etc-ums:latest .

echo "Applying docker compose staging..."
docker compose -f docker-compose.staging.yml up -d