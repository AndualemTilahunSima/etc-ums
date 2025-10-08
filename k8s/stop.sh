kubectl delete -f mysql-deployment.yml
kubectl delete -f app-deployment.yml
kubectl delete -f mysql-pvc.yml
kubectl delete -f config-map.yml
kubectl delete -f namespace.yml