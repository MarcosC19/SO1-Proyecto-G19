## Logs API
Esta es una API en RUST que permite acceder a los registros guardados en una base de datos Mongo

La conexion se realiza utilizando los paquetes ActixWeb y Actix Cors

Para la implementacion se realizo una imagen y contenedor con el compilado de Rust para correr en el servicio de cloud run de google

La imagen se almacena en Google Cloud Registry para su posterior uso en cloud run


## Como construir 
El build de la imagen se encuentra en el dockerfile, es un build en dos pasos, primero se instalan todas las dependencias y se compila el ejecutable

Posteriormente, con base en una imagen de debian se copian el ejecutable y se crea un contenedor expuesto en el puerto definido por la variable de entorno PORT

```docker
FROM rust:latest as build
WORKDIR /
COPY . .
ENV MONGO_HOST 34.122.108.75
ENV MONGO_USER admingrupo19
ENV MONGO_PASS so1-fase2
ENV MONGO_DB so-proyecto-f2
ENV MONGO_COLLECTION logs
RUN cargo build

FROM debian:bullseye-slim
WORKDIR /
COPY --from=build ./target/debug/api ./
EXPOSE 8080
CMD ["./api"]
```

## Como desplegar

Para desplegar el API solamente hace falta crear una instancia de google cloud run y elegir desde el Google Cloud Registry la imagen correspondiente a la API, deben definirse dos variables de entorno para la IP de mongo y el puerto donde se expone el container