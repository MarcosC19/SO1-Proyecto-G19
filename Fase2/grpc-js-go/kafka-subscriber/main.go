package main

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/kafka-subscriber/Mongo"
	"github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/kafka-subscriber/Redis"
	"github.com/segmentio/kafka-go"
)

// OBTENIENDO LA COLA DE KAFKA
func ReadKafka() {
	// CONFIGURACION DEL LECTOR
	conf := kafka.ReaderConfig{
		Brokers:  []string{"localhost:9092"},
		Topic:    "so1-proyecto-fase2",
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	}

	// CREANDO LECTOR KAFKA
	reader := kafka.NewReader(conf)

	// RECORRIENDO LA COLA
	for {
		msg, err := reader.ReadMessage(context.Background())
		if err != nil {
			fmt.Println("Ocurrio un error", err)
			continue
		}
		fmt.Println("Data obtenida: ", string(msg.Value))

		// PARSEANDO EL MENSAJE A STRUCT
		var logJson Mongo.Logs
		logString := string(msg.Value)

		b := []byte(logString)

		json.Unmarshal(b, &logJson)

		// LLAMANDO A LA FUNCION PARA GUARDAR EL LOG
		Mongo.SaveLogs(logJson)

		// LLAMANDO A LA FUNCION PARA GUARDAR DATA REDIS
		Redis.SaveRedis(logString)
	}
}

func main() {
	fmt.Println("Subscriber Iniciado")

	ReadKafka()
}
