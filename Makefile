local=$(HOME)/.local

init:
	mkdir -p /goinfre/$(USER)/local
	mkdir -p $(HOME)/$(local)
	ln -s /goinfre/$(USER)/local $(local)
	npm install -g @nestjs/cli