# k8s_labs
Laboratory works for Microservices course

# How to start
## Locally
`cd tasks-service && migrate -source prisma/migrations -database postgres://localhost:5432/tasks up`

`npm i && npm start`

`cd ../auth-service && migrate -source prisma/migrations -database postgres://localhost:5432/users up`

`npm i && npm start`

`cd ../client && npm i && npm start`

Do not forget to define `.env` files following `.env.example` files in each directory

Also, in `auth-service` generate public and private keys by executing `ts-node src/helpers/generateKeys.ts`. It will produce `public.txt` which is the public key and `private.txt`, a private key. Copy `public.txt` to other services (tasks-service) that need it. The key files should be under `src/helpers/keys`

## K8S
Define `secret-map.yml` and `secret-enckeys-map.yml` according to `*.example.yml` files in `tasks-service/k8s` and `tasks-service/k8s/postgres`
Same in `auth-service`.

Then, run `.sh` files in root directory:

(optional, the files take registry images currently)
`source ./docker.sh`

(optional, to push to docker registry)
`source ./publish.sh`

`source ./k8s.sh`

Note, that the first line of the second script will delete all deployments. This is to ensure that if these deployments are already applied and docker images are updated, the deployments restart and pick up image changes.

Finally, open your `http://$(minikube_ip)/` to see the webpage.
`http://$(minikube_ip)/api/tasks/v1/tasks` is the path to the "tasks" REST resource. Apart from GET all, it has endpoints to GET one, POST, PATCH and DELETE.

## Helm

The charts are conveniently installed by executing in `helm` directory:

`helm install todos .`

Custom values might be supplied through helm CLI flags.

# Docker hub images
Client: https://hub.docker.com/repository/docker/foxt451/mcsvc-client

Migrations: https://hub.docker.com/repository/docker/foxt451/tasks-migrations

Tasks service: https://hub.docker.com/repository/docker/foxt451/mcsvc_tasks_service

# Usage
You can add tasks with a form. Upon clicking the checkbox near the task title or "Delete" button the task is removed. You can also edit the task by clicking "Edit".

# Note about the size of docker images
There are at least 2 alternatives to build the backend typescript app.

1) With build step to build ts code into js and copy into the final step. Then run `npm i --production`.
2) Without build step, letting dev deps remain.

The image from the first way weighs 459MB.
The image from the second way weighs 665MB.
The first image, obviously, takes more time to build, because it has more steps.
The second way may be improved by adding steps to delete dev deps, source and other artifacts after build, without utilizing build step.

# Preview
![preview](https://i.imgur.com/wwQqQel.png)
