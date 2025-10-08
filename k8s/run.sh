kubectl apply -f namespace.yml
kubectl apply -f config-map.yml
kubectl apply -f mysql-pvc.yml
kubectl apply -f mysql-deployment.yml
kubectl apply -f app-deployment.yml