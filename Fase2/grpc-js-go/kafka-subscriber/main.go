package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/go-redis/redis/v8"
	"github.com/segmentio/kafka-go"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	port = 27017
)

var ctx = context.Background()

// JSON PARA RECIBIR DE KAFKA
type logs struct {
	Game_id   int32  `json:"game_id"`
	Players   int32  `json:"players_num"`
	Game_name string `json:"game_name"`
	Winner    int32  `json:"winner"`
	Queue     string `json:"queue"`
}

// GUARDANDO LOGS EN MONGODB
func saveLogs(logsData logs) {
	host, defined := os.LookupEnv("HOSTIP")
	if !defined {
		host = "localhost"
	}

	// OPENING CONNECTION TO MONGODB
	clientOpts := options.Client().ApplyURI(fmt.Sprintf("mongodb://%s:%d", host, port))
	client, err := mongo.Connect(context.TODO(), clientOpts)
	if err != nil {
		log.Fatal(err)
	}

	// VERIFYING THE CONNECTION
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Conexion exitosa")

	// CONNECTION TO DATABASE AND COLLECTION
	collection := client.Database("so-proyecto-f2").Collection("logs")

	// INSERT THE NEW OPERATION
	insertResult, err := collection.InsertOne(context.TODO(), logsData)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Nuevo log insertado en Mongo con exito ", insertResult)

	//CLOSING CONNECTION TO MONGODB
	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Conexion cerrada")
}

func saveRedis(logsData string) {
	host, defined := os.LookupEnv("HOSTIP")
	if !defined {
		host = "localhost"
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     string(host) + ":6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})

	val, err := rdb.Do(ctx, "keys", "*").StringSlice()
	if err != nil {
		panic(err)
	}

	var cont = len(val)

	var keyName = fmt.Sprint("result", cont)

	err = rdb.Set(ctx, keyName, logsData, 0).Err()
	if err != nil {
		panic(err)
	}
}

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
		var logJson logs
		logString := string(msg.Value)

		b := []byte(logString)

		json.Unmarshal(b, &logJson)

		// LLAMANDO A LA FUNCION PARA GUARDAR EL LOG
		saveLogs(logJson)

		// LLAMANDO A LA FUNCION PARA GUARDAR DATA REDIS
		saveRedis(logString)
	}
}

func main() {
	fmt.Println("Subscriber Iniciado")

	ReadKafka()
}
