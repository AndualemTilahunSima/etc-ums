echo "Building Docker image..."
docker build -t etc-ums:latest .

echo "Applying docker compose staging..."
docker compose -f docker.staging.yml up -d