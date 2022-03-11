# SO1 Proyecto Fase 1
El siguiente proyecto es un sistema de control de recursos con balanceador de carga.

Permite visualizar en tiempo real el uso de la memoria ram y el CPU.

Esto lo realiza a traves de un reporte de memoria total, libre y % de uso asi como un reporte de los procesos que existen en ejecucion

Para acceder a estos reportes se utiliza un portal web:

### Reporte de [Uso de RAM](https://front-g19-4waihun6ya-uc.a.run.app/ramPage): 
La informacion se actualiza cada segundo y solicita en base a la carga de cada maquina de una u otra y la informacion de agrupa en la grafica y se muestra en tiempo real en cada bloque de informacion

De Izquierda a derecha seria: **Memoria Total**, **Memoria Usada**, **Porcentaje de Uso** y **Memoria Libre**

![image](https://user-images.githubusercontent.com/53009062/157988584-50ff7685-6fc4-4dce-b332-d90fd1fe4098.png)

### Reporte de [Uso de CPU](https://front-g19-4waihun6ya-uc.a.run.app/cpuPage): 
El reporte de uso de CPU solicitara los datos en tiempo real de procesos existentes en una de las dos maquinas virtuales (el balanceador decidira que reporte va a ser cargado). 

Se mostrara primero una confirmacion de que los datos fueron cargados desde una de las dos maquinas virtuales: 

![image](https://user-images.githubusercontent.com/53009062/157988630-ddba14c0-27fe-4db5-a656-265bd72ea3df.png)

Una vez la informacion de uno de las dos VM ha sido cargada se podra navegar en los diferentes procesos y a su vez los hijos que cada procesa pueda tener exapndiendo cada uno hasta llegar al nivel mas bajo de hijos

![image](https://user-images.githubusercontent.com/53009062/157988650-6245fa25-14d2-4903-916b-8d0e7929b038.png)

### Historial o [Registros de Solicitudes](https://front-g19-4waihun6ya-uc.a.run.app/): 
Cada solicitud de informacion realizada a una de las dos maquinas virtuales se mostrara en tiempo real en el sitio web y a su ve sera almacenado en una base de datos para poder visualizar todos los registros a travez del portal web

![image](https://user-images.githubusercontent.com/53009062/157988682-1778ef14-e4ab-438a-9a25-a40cf293c5ca.png)
