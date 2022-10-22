eval $(minikube docker-env)
docker build -t tasks-service ./tasks-service
docker build -t tasks-migrations ./tasks-service/prisma/migrations
docker build -t client ./client