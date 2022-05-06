package main

import (
	"context"
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"

	pb "go/protos"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

type Game struct {
	GameId  int32 `json:"game_id"`
	Players int32 `json:"players"`
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error al cargar variables de entorno")
	}
}

func game(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var game Game
	parameters := mux.Vars(r)
	id1, err := strconv.Atoi(parameters["id"])
	id := int32(id1)
	game.GameId = id
	players1, err := strconv.Atoi(parameters["players"])
	players2 := int32(players1)
	game.Players = players2
	flag.Parse()
	// Set up a connection to the server.
	loadEnv()
	path := os.Getenv("SERVER_NODE_PATH")
	conn, err := grpc.Dial(path, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewExecuteGameClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	reply, err := c.PlayGame(ctx, &pb.GameRequest{
		Gameid:  game.GameId,
		Players: game.Players,
	})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: reply.GetResponse()})
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(struct {
		Mensaje string `json:"mensaje"`
	}{Mensaje: "GO client"})
}

func main() {
	loadEnv()
	port := os.Getenv("GO_CLIENT_PORT")
	router := mux.NewRouter().StrictSlash(false)
	router.HandleFunc("/", IndexHandler)
	router.HandleFunc("/gameid/{id}/players/{players}", game).Methods("POST")
	log.Println("Listening at port " + port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
