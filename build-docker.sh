#!/bin/bash
set -e  # stop script if any command fails

echo "=============================="
echo "🚀 Starting Deployment Process"
echo "=============================="

# Step 1: Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "🐳 Docker not found. Installing Docker..."

    sudo apt-get remove docker docker-engine docker.io containerd runc -y || true

    sudo apt-get update -y
    sudo apt-get install ca-certificates curl gnupg lsb-release -y

    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
      https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt-get update -y
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

    echo "✅ Docker installed successfully!"
else
    echo "🐳 Docker already installed."
fi

# Step 2: Ensure Docker daemon is running
echo "🔄 Starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

# Step 3: Check if docker-compose is available
if ! docker compose version &> /dev/null
then
    echo "⚙️ Docker Compose not found. Installing manually..."
    DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
    mkdir -p $DOCKER_CONFIG/cli-plugins
    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
        -o $DOCKER_CONFIG/cli-plugins/docker-compose
    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
    echo "✅ Docker Compose installed!"
else
    echo "⚙️ Docker Compose already installed."
fi

# Step 4: Add current user to docker group
if ! groups $USER | grep -q docker; then
    echo "👤 Adding $USER to docker group..."
    sudo usermod -aG docker $USER
    newgrp docker
fi

# Step 5: Build the Docker image
echo "🔨 Building Docker image..."
docker build -t etc-ums:latest .

# Step 6: Deploy using docker compose (staging)
echo "🚢 Applying docker compose staging..."
docker compose -f docker-compose.staging.yml up -d --build

# Step 7: Show status
echo "✅ Deployment complete! Running containers:"
docker ps

echo "🎉 All done!"
