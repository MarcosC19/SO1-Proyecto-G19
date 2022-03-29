package main

import (
	"context"
	"flag"
	"fmt"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	pb "proyecto.com/fase2/Proto"
)

var (
	serverAddr = flag.String("addr", "localhost:50051", "Server address in format host:port")
)

func main() {
	fmt.Println("Starting gRPC Client...")

	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.Dial(*serverAddr, opts...)
	if err != nil {
		fmt.Println("Error dialing to server...")
		return
	}
	defer conn.Close()

	client := pb.NewLocalAPIClient(conn)

	result, err := client.StartGame(context.Background(), &pb.GameRequest{Gameid: 2, Players: 25})

	if err != nil {
		fmt.Println("Error sending game request", err)
		return
	}

	fmt.Println(result)

}
