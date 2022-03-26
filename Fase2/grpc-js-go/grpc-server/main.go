package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	pb "github.com/MarcosC19/SO1-Proyecto-G19/Fase2/grpc-js-go/grpc-server/protos"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

// server is used to implement server.PlayGameServer.
type server struct {
	pb.UnimplementedPlayGameServer
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
