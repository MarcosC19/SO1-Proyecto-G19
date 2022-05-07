// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package protos

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// ExecuteGameClient is the client API for ExecuteGame service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ExecuteGameClient interface {
	PlayGame(ctx context.Context, in *GameRequest, opts ...grpc.CallOption) (*GameReply, error)
}

type executeGameClient struct {
	cc grpc.ClientConnInterface
}

func NewExecuteGameClient(cc grpc.ClientConnInterface) ExecuteGameClient {
	return &executeGameClient{cc}
}

func (c *executeGameClient) PlayGame(ctx context.Context, in *GameRequest, opts ...grpc.CallOption) (*GameReply, error) {
	out := new(GameReply)
	err := c.cc.Invoke(ctx, "/game.ExecuteGame/PlayGame", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ExecuteGameServer is the server API for ExecuteGame service.
// All implementations must embed UnimplementedExecuteGameServer
// for forward compatibility
type ExecuteGameServer interface {
	PlayGame(context.Context, *GameRequest) (*GameReply, error)
	mustEmbedUnimplementedExecuteGameServer()
}

// UnimplementedExecuteGameServer must be embedded to have forward compatible implementations.
type UnimplementedExecuteGameServer struct {
}

func (UnimplementedExecuteGameServer) PlayGame(context.Context, *GameRequest) (*GameReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PlayGame not implemented")
}
func (UnimplementedExecuteGameServer) mustEmbedUnimplementedExecuteGameServer() {}

// UnsafeExecuteGameServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ExecuteGameServer will
// result in compilation errors.
type UnsafeExecuteGameServer interface {
	mustEmbedUnimplementedExecuteGameServer()
}

func RegisterExecuteGameServer(s grpc.ServiceRegistrar, srv ExecuteGameServer) {
	s.RegisterService(&ExecuteGame_ServiceDesc, srv)
}

func _ExecuteGame_PlayGame_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ExecuteGameServer).PlayGame(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/game.ExecuteGame/PlayGame",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ExecuteGameServer).PlayGame(ctx, req.(*GameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// ExecuteGame_ServiceDesc is the grpc.ServiceDesc for ExecuteGame service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var ExecuteGame_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "game.ExecuteGame",
	HandlerType: (*ExecuteGameServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "PlayGame",
			Handler:    _ExecuteGame_PlayGame_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protos/game.proto",
}