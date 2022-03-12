## FrontEnd

El frontend esta implementado usando NodeJS y React y montado en una instancia de Google Cloud Run

Para implementarlo se hace google cloud tiene la facilidad de recibir como entrada un repositorio que contenga la informacion necesaria para crear un contenedor de docker que posteriormente se usara para ejecutar la instancia


Junto con la informacion de la webapp se utiliza un dockerfile de la siguiente manera:

```docker
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV REACT_APP_IPAPI 35.208.76.187
CMD ["npm", "run", "start"]
EXPOSE 3000
```

El comando npm install instala todas las dependencias necesarias para correr el frontend incluidas las librerias de **socket**, **react-tree**, **sweet-alert** y **react** mismo

Se utiliza una version alpine de NodeJS para reducir el tamano y se pasa una variable de entorno con la IP del balanceador de carga **REACT_APP_IPAPI**

El resultado deberia verse asi en los registros de google cloud run: 

![image](https://user-images.githubusercontent.com/53009062/157994343-12338b9e-1abc-4dda-9ed9-d40605acabc8.png)






