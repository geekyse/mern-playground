BIN_DOCKER = 'docker'
BIN_DOCKER_COMPOSE = 'docker-compose'

COMPOSE_FILE_BUILD = 'compose-build.yml'
COMPOSE_FILE_UP = 'docker-compose.yml'

CONTAINER_BACKUP = backup
CONTAINER_MYSQL = mysql
CONTAINER_MONGODB = mongodb
CONTAINER_TRAEFIK = traefik
CONTAINER_REDIS = redis



clear_all: clear_containers clear_images

# this used to set the container names prefix https://github.com/docker/compose/issues/3431
export COMPOSE_PROJECT_NAME = machine

clear_containers:
	$(BIN_DOCKER) stop `$(BIN_DOCKER) ps -a -q` && $(BIN_DOCKER) rm `$(BIN_DOCKER) ps -a -q`

clear_images:
	$(BIN_DOCKER) rmi -f `$(BIN_DOCKER) images -q`

up_base:
	$(BIN_DOCKER_COMPOSE) -f $(COMPOSE_FILE_UP)  up

down:
	$(BIN_DOCKER) stop `$(BIN_DOCKER) ps -a -q`
restart_nginx:
	$(BIN_DOCKER) exec -it $(CONTAINER_NGINX) service nginx reload

restart_mongodb:
	$(BIN_DOCKER) exec -it $(CONTAINER_MONGODB) service mongod reload


connect_mongodb:
	$(BIN_DOCKER) exec -it $(CONTAINER_MONGODB)  bash




