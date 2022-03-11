## Cloud Functions

Para generar persistencia de datos se utiliza una base de datos Mongo que esta corriendo en una tercera maquina virtual de GCP

El intermediario entre el BackEnd y Mongo es una funcion en GO implementada en Google Cloud Functions


Cada vez que se invoca un GET en el backend tambien se hace una solicitud http post hacia la funcion en google cloud

Esta solicitud se hace con la libreria http y el siguiente formato json:

### Puntos de entrada

#### POST: https://us-central1-sopes1-341821.cloudfunctions.net/insertomongo

Cabe aclarar que la ruta de esta funcion variara en cada proyecto de google cloud, para este ejemplo la URL asignada es la antes descrita 

La solicitud post debe tener el siguiente formato

~~~json
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

Y la repuesta seria el ID del objeto generado
~~~json
{
    "ObjectID":"[aslyyfjwj112jasdfj23444342j34j]"
}
~~~
