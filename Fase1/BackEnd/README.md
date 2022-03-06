## BackEnd Go

Backend desarrollado en GO para obtener la informacion de uso de RAM y procesos en el CPU

La api esta contenida en una imagen de docker que puede ser levantada usando el archivo de docker compose desde el respositorio **stevengez/backendkernel:latest**

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


