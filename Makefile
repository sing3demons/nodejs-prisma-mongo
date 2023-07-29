down:
	docker-compose down
	rm -rf ./data

start-dev:
	docker-compose up -d mongo1 mongo2 mongo3

start:
	docker-compose up -d