local=$(HOME)/.local

.PHONY: init

.DEFAULT_GOAL := all
DOCKER_COMPOSE = docker-compose


all: up
	@echo "All done"

init:
	mkdir -p /goinfre/$(USER)/local
	mkdir -p $(HOME)/$(local)
	ln -s /goinfre/$(USER)/local $(local)
	npm install -g @nestjs/cli

build:
	$(DOCKER_COMPOSE) --build
	@echo "Build complete"

down:
	$(DOCKER_COMPOSE) down
up:
	$(DOCKER_COMPOSE) up --build

clean: 
	-@ $(DOCKER_COMPOSE) stop $(docker ps -a -q)
	-@ $(DOCKER_COMPOSE) rm $(docker ps -a -q)
	-@ docker volume rm nestjs postgres


fclean: down clean
	-@ docker rmi $(shell docker images -q | tr "\n" " ")
	docker system prune -f
	
