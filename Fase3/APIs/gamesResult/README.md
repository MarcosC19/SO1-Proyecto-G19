# Resultados Juegos

API desarrollada con NodeJS para obtener los resultados de los juegos almacenados en las bases de datos para mostrarlos en el Frontend.

Para crear los sockets es necesario contar con un servidor, por lo cual se opto por utilizar la libreria de Express, se inicia el servidor en el puerto 8080 y posteriormente se crean dos sockets para llevar el control de redis y tidb con las siguientes rutas '/resultRedis' y '/resultTiDB' respectivamente para la conexion con el frontend.

Al momento de recibir una conexion nueva en el servidor del socket se procede a realizar las consultas necesarias y extraer los resultados, segun lo solicitado, luego de obtener los resultados se emite una señal hacia el cliente que realizo la conexion con todos estos resultados para poder mapearlos y mostrarlos en pantalla de forma ordenada.

Se realizaron 3 metodos que se activan al realizar una conexion con cada una de las rutas para poder obtener los resultados solicitados, los metodos son: 

- lastTenGames, donde se ira a buscar en las bases de datos los ultimos 10 juegos que han sido ejecutados.
- bestPlayers, donde se ira a buscar en las bases de datos los mejores jugadores de cada juego.
- statsPlayer, donde se ira a buscar las estadisticas de un jugador en especifico.

Cada uno de estos metodos cuenta con su emisor para enviar los resultados obtenidos, los cuales serian:

- lastTenGamesResult
- bestPlayersResult
- statsPlayerResult

Toda la API fue desplegada en 'App Engine' de Google Cloud Platform, por lo cual se subio la carpeta [gameResult](../gamesResult) mediante consola y se creo el archivo [app.yaml](app.yaml) para poder realizar todo el despliegue, junto con las variables de entorno, los puertos y otros valores requeridos por parte de App Engine.

Durante el despliegue app engine se encarga de instalar las dependencias necesarias para el correcto funcionamiento del servidor.

A continuacion se muestra la estructura utilizada para el despliegue de la aplicacion.

```yaml
runtime: nodejs
env: flex
manual_scaling:
 instances: 1
network:
 session_affinity: true
env_variables:
  hostMongo: 34.121.72.211
  portMongo: 27017
  adminMongo: mongoadminG19
  passwordMongo: proyectof1g19
```