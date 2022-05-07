# Segunda Ruta (Kafka)
La segunda ruta de trafico se creo haciendo uso de 4 componentes, los cuales son la API/gRPC Client en NodeJs, el gRPC Server/Kafka Producer en Golang, Apache Kafka y Kafka Subscriber en Golang. A continuacion se muestra detalladamente el trabajo de cada uno de los componentes.

## API/gRPC Client (NodeJs)
Como primer punto se encuentra la [API](./grpc-client/src/index.js) y el [Cliente gRPC](./grpc-client/src/helpers/client-grpc.js) realizados en NodeJs, la API se realizo ya que para poder realizar una peticion hacia el cliente de gRPC no es muy eficiente estar reiniciando el archivo para enviar un nuevo archivo, de esta forma en la ruta recibe la información directamente en la url de la siguiente manera.

```
{
    /gameid/:id/players/:players
}
```

Dentro del archivo [routers.js](./grpc-client/src/routes/client.js) se crearon dos rutas, una de tipo GET (/) donde se valida que el servidor se encuentra corriendo y otra de tipo POST (/gameid) donde se hace una llamada hacia el cliente de gRPC, donde se pasan los parámetros dentro de la misma url, de esta manera no tener que reiniciar el cliente de gRPC cada vez que se va a realizar una nueva operacion.

Para poder utilizar la tecnologia de gRPC se configuro en el archivo [client.proto](./grpc-client/src/helpers/protos/client.proto) tanto el metodo como los mensajes de peticion y respuestas que se utilizaran para la conexion entre el cliente y servidor de gRPC. Se exporta el cliente para poder utilizarlo en la API y asi hacer la llamada al servidor para que ejecute el juego con la cantidad de jugadores que vienen especificados en el body JSON.

Al obtener la respuesta del servidor de gRPC se devuelve la respuesta indicando el estado de la operacion ya sea 200 si todo ha ocurrido correctamente o 400 si hubo algun error con el siguiente formato.

```js
{
    game_id: Number,
    players: Number,
    game_name: String,
    winner: Number
}
```

## gRPC Server (Golang) - Producer Kafka
Como siguiente punto se encuentran el [Servidor de gRPC](./grpc-server/main.go) y el [Kafka Producer](./grpc-server/Kafkaprod/producer.go), los cuales se realizaron con Golang. Para realizar la comunicacion con el cliente se configuro tambien para el servidor el archivo [server.proto](./grpc-server/protos/server.proto), dentro del cual se define el metodo ha realizar junto con los mensajes de peticion y respuesta para el cliente. 

En el servidor segun el identificador del juego que se desea simular se hace el llamado a diferentes archivos, donde se encuentran configurados los algoritmos para definir un ganador, los juegos creados son los siguientes:
- [Piedra, papel o tijera](./grpc-server/Games/Game1/game1.go), se van realizando varias rondas donde cada uno de los jugadores hace su eleccion y se valida cual ha sido el ganador, asi sucesivamente llegar al ganador final.
- [Cara o cruz](./grpc-server/Games/Game2/game2.go), se realizan varias rondas para definir al ganador, cada jugador selecciona su opcion y se verifica quien ha sido el ganador de esa ronda.
- [Numero mayor](./grpc-server/Games/Game3/game3.go), se realiza una reparticion aleatoria de numeros, posteriormente se verifican todos y quien haya obtenido el numero mas grande sera el ganador.
- [Numero menor](./grpc-server/Games/Game4/game4.go), se realiza una reparticion aleatoria de numeros, posteriormente se verifican todos y quien haya obtenido el numero mas pequeño sera el ganador.
- [Ruleta](./grpc-server/Games/Game5/game5.go), se va realizando una eliminacion de jugadores hasta que solamente quede uno, quien sera el ganador.

Al obtener el ganador del juego especificado se hace la llamada al [Producer](./grpc-server/Kafkaprod/producer.go) de kafka para que envie hacia un topic creado en Apache Kafka.

Se crea un struct para poder manejar de mejor manera la informacion que se recibe del servidor de gRPC, de esta forma tener un archivo JSON que se puede ir parseando de string a json y viceversa sin ningun problema, luego se realiza la conexion hacia kafka y su topic para enviar la informacion hacia la cola y que el subscriber pueda recibir dicha informacion.

## Apache Kafka
Es un sistema de colas utilizado para la transmision de datos en tiempo real, fue utilizado para transmitir la informacion desde un Producer hacia un Subscriber, para que dicha informacion sea enviada hacia las bases de datos segun se esten recibiendo por ambas partes.

Se creo un topic con el nombre "so1-proyecto-fase2", en el cual se ira almacenando la informacion para poder ser utilizada.

## Kafka Subscriber
Por ultimo se encuentra el [Subscriber](./kafka-subscriber/main.go) de kafka, el cual hacia la conexion entre kafka y las bases de datos. Se crea la conexion en modo lectura hacia el topic "so1-proyecto-fase2" de manera que se mantenga conectado recibiendo tantos los viejos datos como los nuevos, para posteriormente enviarlos hacia cada uno de las bases de datos.

Se utilizaron ciertos archivos de apoyo para llevar un mejor control del codigo en las conexiones de bases de datos, los cuales son:
- [MongoDB](./kafka-subscriber/Mongo/saveLogs.go), se utilizo para crear la conexion hacia mongo y almacenar los logs para su posterior uso.
- [RedisDB](./kafka-subscriber/Redis/saveRedis.go), se utilizo para crear la conexion hacia redis y llevar un control de todos los juegos.
- [TiDB](./kafka-subscriber/TiDB/savetiDB.go), se utilizo para crear la conexion hacia TiDB y llevar un control de los juegos que han sido ejecutados.