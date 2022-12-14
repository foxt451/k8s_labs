eval $(minikube docker-env)
docker build -t tasks-service ./tasks-service
docker build -t tasks-migrations ./tasks-service/prisma/migrations
docker build -t auth-service ./auth-service
docker build -t auth-migrations ./auth-service/prisma/migrations
docker build -t scheduler-service ./scheduler
docker build -t client ./client
docker build -t notification-service ./notification-service
docker build -t email-service ./email-service
