## BackEnd Go

Backend desarrollado en GO para obtener la informacion de uso de RAM y procesos en el CPU

## Como desplegar el servidor

La api esta contenida en una imagen de docker que puede ser levantada usando el archivo de docker compose desde el respositorio **stevengez/backendkernel:latest**

Para desplegar el servidor BackEnd primero debe insertarse dos modulos en el kernel para leer la informacion de RAM y CPU

Para esto puede hacerse de manera facil con **MAKE**, ejecutando en cada carpeta del modulo el comando **MAKE RUN** con permisos de superusuario

Para su facil implementacion el servidor backend puede ser desplegado usando un archivo de docker-compose con la siguiente estructura:

```docker
services:
  backend: 
    image: stevengez/backendkernel:latest
    container_name: backendKernel
    environment:
      - VM_NAME=1
      - CF_URL=https://us-central1-sopes1-341821.cloudfunctions.net/insertomongo
    ports:
      - "80:5000"
    volumes:
      - /proc:/hostProc
```

Donde **VM_NAME** es el numero de la maquina virtual y **CF_URL** es la URL para invocar la funcion de google cloud

### Puntos de entrada

#### GET: /getCPUstatus
Ejemplo de respuesta: 
~~~json

{
    "vm": 1,
    "data": [
        {
            "pid": 1,
            "name": "systemd",
            "ppid": 0,
            "state": 1,
            "childs": [
                {
                    "ppid": 1,
                    "pid": 279,
                    "name": "systemd-journal",
                    "state": 1
                }
            ]
        }
    ]
}
~~~

Donde los valores del estado pueden ser: 

state -> 0     = Running </br>
state -> 1     = Interrumpible Sleeping </br>
state -> 2     = Uninterrumpible Sleeping </br>
state -> 1026  = Idle </br>


#### GET: /getRAMstatus
Respuesta: 
~~~json
{
    "vm": "1",
    "data": {
        "total"      :    15848,
        "used"       :     8204,
        "percentage" :       51,
        "free"       :     7640
    }
}
~~~


## Objectos Usados en MONGO

Al activarse cualquiera de los dos puntos entradas de la API ademas de devolver el resultado se invocara a la funcion de CloudFunctions que insertara un nuevo objeto a la DB con la siguiente estructura

~~~
{
    "logtype" : "RAM",
    "logorigin" : "1",
    "logcontent" : "{
                        total: 15848,
                        used: 12152,
                        percentage: 76,
                        free: 3696
                    }",
    "timestamp" : "2022-03-07T04:46:44.201+00:00"
}
~~~


