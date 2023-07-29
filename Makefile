down:
	docker-compose down
	rm -rf ./data

build:
	docker build -t service-user:0.1 .
	docker run -d --name service-user -p 8080:8080 -e DATABASE_URL="mongodb://mongoset1:27017,mongoset2:27018,mongoset3:27019/my-database?replicaSet=my-replica-set"  service-user:0.1