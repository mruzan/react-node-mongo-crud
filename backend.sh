docker-compose run --service-ports backend npm install
docker-compose run --service-ports backend node seeders/schoolSeeder.js
docker-compose run -d --service-ports backend npm start