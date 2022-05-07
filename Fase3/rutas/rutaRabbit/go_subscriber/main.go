package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"database/sql"

	"github.com/go-redis/redis/v8"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/streadway/amqp"

	//"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Game struct {
	GameId  int32  `json:"Game_id"`
	Players int32  `json:"Players"`
	Name    string `json:"Game_name"`
	Winner  int32  `json:"Winner"`
	Queue   string `json:"Queue"`
}

type GameMongo struct {
	//ID      primitive.ObjectID `bson:"_id"`
	GameId  int32  `bson:"Game_id"`
	Players int32  `bson:"Players"`
	Name    string `bson:"Game_name"`
	Winner  int32  `bson:"Winner"`
	Queue   string `bson:"Queue"`
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error al cargar variables de entorno")
	}
}

func sendToDataBases(game Game) {
	sendToMongo(game)
	sendToRedis(game)
	sendToTidb(game)
}

func main() {
	loadEnv()
	finalUrl := os.Getenv("RABBIT_DIRECTION")
	conn, err := amqp.Dial("amqp://guest:guest@" + finalUrl + ":5672/")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()
	ch, err := conn.Channel()
	if err != nil {
		log.Fatal(err)
	}
	defer ch.Close()
	msg, err := ch.Consume(
		"games",
		"",
		true,
		false,
		false,
		false,
		nil,
	)

	noStop := make(chan bool)
	go func() {
		for d := range msg {
			var game Game
			b := []byte(string(d.Body))
			json.Unmarshal(b, &game)
			sendToDataBases(game)
		}
	}()
	fmt.Println("Succesfully connected to RabbitMQ")
	fmt.Println("[*] - waiting for messages")
	<-noStop
}

func sendToRedis(game Game) {
	var ctx = context.Background()
	loadEnv()
	host := os.Getenv("REDIS_DIRECTION")
	client := redis.NewClient(&redis.Options{
		Addr:     string(host) + ":6379",
		Password: "",
		DB:       0,
	})
	json, err := json.Marshal(game)
	if err != nil {
		log.Fatal(err)
	}
	val, err := client.Do(ctx, "keys", "*").StringSlice()
	if err != nil {
		panic(err)
	}

	var cont = len(val)
	var keyName = fmt.Sprint("result", cont)

	err = client.Set(ctx, keyName, json, 0).Err()
	if err != nil {
		panic(err)
	}
	fmt.Println("Log insertado, redis ", keyName)
}

func sendToTidb(game Game) {
	loadEnv()
	finalUrl := os.Getenv("TIDB_CONNECTION")
	// Open database connection
	db, err := sql.Open("mysql", finalUrl)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	sql := getQuery(game)
	res, err := db.Exec(sql)
	if err != nil {
		log.Fatal(err)
	}
	lastId, err := res.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Log insertado, tidb: %d\n", lastId)
}

func getQuery(game Game) string {
	gameid := strconv.FormatInt(int64(game.GameId), 10)
	players := strconv.FormatInt(int64(game.Players), 10)
	game_name := game.Name
	winner := strconv.FormatInt(int64(game.Winner), 10)
	queue := game.Queue
	return "INSERT INTO reportes (game_id, players, game_name, winner, queue) VALUES (" + gameid + "," + players + ",\"" + game_name + "\"," + winner + ",\"" + queue + "\");"
}

func sendToMongo(game Game) {
	loadEnv()
	finalUrl := os.Getenv("MONGO_DIRECTION")
	clientOpts := options.Client().ApplyURI(finalUrl)
	client, err := mongo.Connect(context.TODO(), clientOpts)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database("so1-proyecto-f3").Collection("logs")
	game2 := &GameMongo{
		//ID:      primitive.NewObjectID(),
		GameId:  game.GameId,
		Players: game.Players,
		Name:    game.Name,
		Winner:  game.Winner,
		Queue:   game.Queue,
	}
	insertResult, err := collection.InsertOne(context.TODO(), game2)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Log insertado, mongo", insertResult.InsertedID)
}
