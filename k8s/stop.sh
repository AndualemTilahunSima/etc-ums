#!/bin/bash

echo "Stopping Kubernetes deployment..."

echo "Deleting application..."
kubectl delete -f app-deployment.yml

echo "Deleting MySQL..."
kubectl delete -f mysql-deployment.yml

echo "Deleting PVC (this will delete data!)..."
kubectl delete -f mysql-pvc.yml

echo "Deleting ConfigMap..."
kubectl delete -f config-map.yml

echo "Deleting namespace..."
kubectl delete -f namespace.yml

echo "Cleanup complete!"