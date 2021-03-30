DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_FILE := docker-compose.yml
CONTAINER_MONGODB = EC-Mongo
CONTAINER_RABBITMQ = EC-RabbitMQ
CONTAINER_REDIS = EC-Redis

up:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up $(c)

start:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d $(c)

stop:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop $(c)

restart:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop $(c)
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up $(c) -d

status:
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

## logs
mongo-logs:
	docker logs $(CONTAINER_MONGODB) -f

redis-logs:
	docker logs $(CONTAINER_REDIS) -f

rabbit-logs:
	docker logs $(CONTAINER_RABBITMQ) -f


## connect to container
conn-mongo:
	docker exec -it $(CONTAINER_MONGODB)  bash

conn-redis:
	docker exec -it $(CONTAINER_REDIS)  bash

conn-rabbit:
	docker exec -it $(CONTAINER_RABBITMQ)  bash

ps: status

clean: confirm ## Clean all data
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down
