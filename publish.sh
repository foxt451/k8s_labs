docker tag tasks-service foxt451/mcsvc_tasks_service
docker push foxt451/mcsvc_tasks_service
docker tag tasks-migrations foxt451/tasks-migrations
docker push foxt451/tasks-migrations

docker tag auth-service foxt451/mcsvc_auth_service
docker push foxt451/mcsvc_auth_service
docker tag auth-migrations foxt451/auth-migrations
docker push foxt451/auth-migrations

docker tag scheduler-service foxt451/mcsvc_scheduler_service
docker push foxt451/mcsvc_scheduler_service

docker tag notification-service foxt451/mcsvc_notification_service
docker push foxt451/mcsvc_notification_service

docker tag email-service foxt451/mcsvc_email_service
docker push foxt451/mcsvc_email_service

docker tag client foxt451/mcsvc-client
docker push foxt451/mcsvc-client