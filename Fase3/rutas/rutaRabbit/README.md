## Primera Ruta (RabbitMQ)

La primera ruta consiste de un cliente, servidor y adminstrador de colas

El cliente esta hecho en Go, utilizando las librerias de Fiber y Cors para implementar el API y a su vez ambos el cliente y servidor se comunican utiliando gRPC

Para la estandarizacion de los metodos se utiliza un ProtoBuffer con la siguiente estructura


```javascript
service localAPI {
    rpc startGame (GameRequest) returns (GameResult) {}
}

message GameRequest {
    int32 game_id = 1;
    int32 players = 2;
}

message GameResult {
    int32 status = 1;
}
```

## Como desplegar

Para su facil implementacion la ruta esta dividida en 2 partes. La parte del cliente puede desplegarse facilmente con la imagen desde docker hub: [container de go client](stevengez/goclient_grpc)

La parte del servidor, el administrador de colas RabbitMQ y el subscriber se ejecutan en una misma maquina virtual por lo que pueden desplegarse utilizando docker compose

```docker
services:
  rabbit:
    image: rabbitmq:3.9.14-alpine
    container_name: messagequeue
    environment:
      - RABBITMQ_DEFAULT_USER=rabbit
      - RABBITMQ_DEFAULT_PASS=sopes1
    ports:
      - "5672:5672"
  goserver:
    depends_on:
      - rabbit
    image: stevengez/nodeserver_grpc
    container_name: nodeServer_gRPC
    environment:
      - gRPC_SERVER_PORT=50051
      - RABBIT_SERVER=10.128.0.24 # VM Local IP where Rabbit is running
      - RABBIT_USER=rabbit
      - RABBIT_PASSWORD=sopes1
      - RABBIT_QUEUE=GameQueue
    ports:
      - "50051:50051"
  subscriber:
    depends_on:
      - goserver
    image: stevengez/gorabbit_subscriber
    container_name: rabbitsubscriber
    environment:
      - RABIT_HOST=10.128.0.24 # VM IP where Rabbit is Running
      - RABBIT_PORT=5672
      - RABBIT_QUEUE=GameQueue
      - RABBIT_USER=rabbit
      - RABBIT_PASSWORD=sopes1
      - REDIS_HOST=10.128.0.21 # VM IP where Redis is Running
      - REDIS_PORT=6379
      - MONGO_HOST=10.128.0.20 # VM IP where Mongo is Running
      - MONGO_PORT=27017
      - MONGO_USER=admingrupo19
      - MONGO_PASS=so1-fase3
      - MONGO_DB=so-proyecto-f3
      - MONGO_COLLECTION=logs
      - TiDB_HOST=10.128.0.19 # VM IP where TiDB is Running
      - TiDB_USER=grupo19
      - TiDB_PORT=grupo19-f3
      - TiDB_DB=sopes1f3
```

## Servidor

El servidor esta implementado en NodeJS, para su ejecucion basta instalar las dependencias con el comando:

```bash
npm install
```

Y para ejecutarlo:

```bash
node index.js
```

## Subscriber

Para poder procesar las solicitudes e ingresarlas a las diferentes DB se utiliza un subscriber en Go, este se encarga de escuchar nuevos mensajes en un queue asignado para luego enviarlos a las diferentes bases de datos con la siguiente estructura: 

```javascript
{
    game_id: Number,
    players: Number,
    game_name: String,
    winner: Number
}
```
