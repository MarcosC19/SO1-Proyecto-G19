# API Reportes Socket.io

API desarrollada con NodeJS para obtener los logs de las peticiones realizadas por parte del Frontend.

Para crear el socket es necesario contar con un servidor, por lo cual se opto por utilizar la libreria de Express, se inicia el servidor en el puerto 8080 y posteriormente se crea el socket con la ruta '/getLogs' para la conexion con el frontend.

Al momento de recibir una conexion nueva en el servidor del socket se procede a realizar la consulta necesaria y extraer cada todos los logs que han sido registrados por parte de Cloud Functions, luego de obtener el arreglo de logs se emite una señal hacia el cliente que realizo la conexion con todos estos logs para poder mapearlos y mostrarlos en pantalla de forma ordenada.

Toda la API fue desplegada en 'App Engine' de Google Cloud Platform, por lo cual se subio la carpeta [api reportes](../api%20reportes/) mediante consola y se creo el archivo [app.yaml](app.yaml) para poder realizar todo el despliegue, junto con las variables de entorno, los puertos y otros valores requeridos por parte de App Engine.

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

Al terminar el despliegue de la aplicacion, app engine nos proporciona la ruta mediante la cual se puede acceder mediante el cliente en React, el link cuenta con la siguiente estructura: https://<ID_ProyectoGCP>.uc.r.appspot.com, en este caso el link proporcionado es: https://so1-proyecto-342902.uc.r.appspot.com