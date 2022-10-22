kubectl delete --all deployments
kubectl apply -f ./client/k8s
kubectl apply -f ./tasks-service/k8s/postgres
kubectl apply -f ./tasks-service/k8s
