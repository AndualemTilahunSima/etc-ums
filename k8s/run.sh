#!/bin/bash

echo "Building Docker image..."
docker build -t etc-ums:latest ../.

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