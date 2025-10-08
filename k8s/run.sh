#!/bin/bash

echo "Building Docker image..."
docker build -t etc-ums:latest .

echo "Loading image into Kubernetes (for local clusters)..."
# For local Kubernetes clusters like minikube, kind, or k3s
if command -v minikube &> /dev/null; then
    echo "Loading image into minikube..."
    minikube image load etc-ums:latest
elif command -v kind &> /dev/null; then
    echo "Loading image into kind..."
    kind load docker-image etc-ums:latest
fi

echo "Applying Kubernetes manifests..."
kubectl apply -f namespace.yml
kubectl apply -f config-map.yml
kubectl apply -f mysql-pvc.yml
kubectl apply -f mysql-deployment.yml

echo "Waiting for MySQL to be ready..."
kubectl wait --for=condition=ready pod -l app=mysql -n ums-system --timeout=300s

echo "Deploying application..."
kubectl apply -f app-deployment.yml

echo "Waiting for application to be ready..."
kubectl wait --for=condition=ready pod -l app=node-app -n ums-system --timeout=300s

echo "Deployment complete!"
echo "To check status: kubectl get pods -n ums-system"
echo "To check logs: kubectl logs -f deployment/node-app -n ums-system"