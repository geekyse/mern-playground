BIN_DOCKER = 'docker'
BIN_DOCKER_COMPOSE = 'docker-compose'

COMPOSE_FILE_BUILD = 'compose-build.yml'
COMPOSE_FILE_UP = 'docker-compose.yml'

clear_all: clear_containers clear_images

export COMPOSE_PROJECT_NAME = machine

clear_containers:
	$(BIN_DOCKER) stop `$(BIN_DOCKER) ps -a -q` && $(BIN_DOCKER) rm `$(BIN_DOCKER) ps -a -q`

clear_images:
	$(BIN_DOCKER) rmi -f `$(BIN_DOCKER) images -q`

up_base:
	$(BIN_DOCKER_COMPOSE) -f $(COMPOSE_FILE_UP)  up

down:
	$(BIN_DOCKER) stop `$(BIN_DOCKER) ps -a -q`



