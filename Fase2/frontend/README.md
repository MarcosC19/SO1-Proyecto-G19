# FrontEnd

El frontend esta implementado usando NodeJS y React y montado en una instancia de Google Cloud Run

Para implementarlo se hace google cloud tiene la facilidad de recibir como entrada un repositorio que contenga la informacion necesaria para crear un contenedor de docker que posteriormente se usara para ejecutar la instancia

Junto con la informacion de la webapp se utiliza un dockerfile de "double stage" de la siguiente manera:

```docker
# STEP 1 - BUILD OF REACT PROJECT
FROM node:16-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# STEP 2 - CREATE NGINX SERVER
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

El comando npm install instala todas las dependencias necesarias para correr el frontend incluidas las librerias de **socket.io-client**, **canvasjs**, **uuid**, **reactstrap** y **react** mismo con sus dependencias

Se utiliza una version alpine de NodeJS para reducir el tamano del contenedor.

Se utilizan algunos componentes para ahorrar la escritura de codigo y no tener redundancia, los componentes utilizados son:

- [lastGames.js](./src/components/lastGames.js), componente donde se renderizan los ultimos 10 juegos.
- [bestPlayers.js](./src/components/bestPlayers.js), componente donde se renderizan los mejores jugadores.
- [statsPlayer.js](./src/components/statsPlayer.js), componente donde se renderizan las estadisticas de un jugador.
- [Canvas](./src/components/Canvas), componente donde se renderizan los logs de cada juego ejecutado.

Se crearon 4 paginas, en las cuales se iran mostrando cada uno de los componentes con sus respectivos reportes, las paginas creadas son:

- [Home](./src/pages/Home.js), pagina donde se visualizan los datos del grupo.
- [Logs](./src/pages/Logs.js), pagina donde se visualizan los logs que se obtienen de mongoDB.
- [Redis](./src/pages/Redis.js), pagina donde se visualizan los reportes de juegos obtenidos de redisDB.
- [TiDB](./src/pages/TiDB.js), pagina donde se visualizan los reportes de juegos obtenidos de TiDB.

