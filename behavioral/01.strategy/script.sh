docker run \
  --name postgres \
  -e POSTGRES_USER=bruna \
  -e POSTGRES_PASSWORD="senha" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

  docker logs postgres
  docker exec -it postgres psql --username bruna --dbname heroes
  CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
  SELECT *  FROM warriors;


  docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=bruna \
  -e MONGO_INITDB_ROOT_PASSWORD="senha001" \
  -p 27017:27017 \
  -d \
  mongo:4

  docker logs mongodb