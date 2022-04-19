## Monitoreo
Gracias a grafana y prometheus es posible monitorear el funcionamiento de las diferentes DB usadas en el proyecto, prometheus para la estructura de los datos y grafana para su analisis

# Como desplegar
Por practicidad, prometheus, grafana y mongoDB estan funcionando en la misma maquina virtual, para su facil despliegue se puede utilizar docker-composer

```docker
services:
  grafana:
    image: grafana/grafana
    ports:
      - 80:3000
  prometheus:
    depends_on: 
      - "mongo_exporter"
    image: bitnami/prometheus
    ports:
      - 9090:9090
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
  mongo_exporter:
    image: percona/mongodb_exporter:0.31.2
    command: --mongodb.uri=mongodb://mongodb_exporter1:so1-fase2@10.128.0.20:27017 --groups.enabled 'asserts,durability,background_flusshing,connections,extra_info,global_lock,index_counters,network,op_counters,op_counters_repl,memory,locks,metrics'
    ports:
      - 9216:9216
```

Adicional a esto cada base de datos debe tener un modulo que exporte los datos obtenidos del funcionamiento, estos modulos son llamados exporters

Para TiDB esta ya implementa su propio exporter por lo que no hace falta desplegarlo

Para mongo y redis hace falta implementarlos, para esto usando contenedores con los mismos pueden desplegarse con un comando de docker run como el siguiente: 

```docker
docker run -d -p 9121:9121 -e REDIS_ADDR=10.128.0.21:6379 -e REDIS_USER=null -e REDIS_PASSWORD=null --name redis_exporter oliver006/redis_exporter
```