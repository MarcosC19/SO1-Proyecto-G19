package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net"

	pb "github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/grpc-server/protos"
	"github.com/segmentio/kafka-go"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

// server is used to implement server.PlayGameServer.
type server struct {
	pb.UnimplementedPlayGameServer
}

// JSON PARA ENVIAR A KAFKA
type logs struct {
	Game_id   int32  `json:"game_id"`
	Players   int32  `json:"players_num"`
	Game_name string `json:"game_name"`
	Winner    int32  `json:"winner"`
	Queue     string `json:"queue"`
}

// PRODUCIENDO MENSAJES A LA COLA DE KAFKA
func sendKafka(id_game int32, num_players int32, name_game string, winner_game int32) {
	// CREANDO JSON
	myLog := logs{
		Game_id:   id_game,
		Players:   num_players,
		Game_name: name_game,
		Winner:    winner_game,
		Queue:     "Apache Kafka",
	}

	// OBTENIENDO STRUCT EN FORMATO JSON
	jsonString, err := json.Marshal(myLog)

	if err != nil {
		fmt.Println("Ocurrio un error: ", err)
	}

	// CONVIRTIENDO JSON EN STRING
	logString := string(jsonString)

	fmt.Println(logString)

	// CREATING PRODUCER KAFKA
	topic := "so1-proyecto-fase2"
	partition := 0

	// CREANDO CONEXION
	conn, err := kafka.DialLeader(context.Background(), "tcp", "localhost:9092", topic, partition)
	if err != nil {
		log.Fatal("Ocurrio un error: ", err)
	}

	// RECORRIENDO TODO EL JSON EN STRING
	for _, word := range []string{string(logString)} {
		_, err = conn.WriteMessages(
			kafka.Message{Value: []byte(word)},
		)
		if err != nil {
			log.Fatal("Error al mandar el mensaje: ", err)
		}
	}

	if err := conn.Close(); err != nil {
		log.Fatal("Error al cerrar la conexion: ", err)
	}
}

// calling the function rcp Playing
func (s *server) Playing(ctx context.Context, in *pb.GameRequest) (*pb.GameReply, error) {
	log.Printf("Received: { %v, %v }", in.GetGameId(), in.GetPlayers())
	var game_name string
	var winner int32

	switch in.GetGameId() {
	case 1:
		game_name = "Juego 1"
		winner = 1
	case 2:
		game_name = "Juego 2"
		winner = 2
	case 3:
		game_name = "Juego 3"
		winner = 3
	case 4:
		game_name = "Juego 4"
		winner = 4
	case 5:
		game_name = "Juego 5"
		winner = 5
	}

	sendKafka(in.GameId, in.Players, game_name, winner)

	return &pb.GameReply{GameId: in.GameId, Players: in.Players, GameName: game_name, Winner: winner}, nil
}

func main() {
	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterPlayGameServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
