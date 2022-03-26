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

// PlayGameClient is the client API for PlayGame service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PlayGameClient interface {
	Playing(ctx context.Context, in *GameRequest, opts ...grpc.CallOption) (*GameReply, error)
}

type playGameClient struct {
	cc grpc.ClientConnInterface
}

func NewPlayGameClient(cc grpc.ClientConnInterface) PlayGameClient {
	return &playGameClient{cc}
}

func (c *playGameClient) Playing(ctx context.Context, in *GameRequest, opts ...grpc.CallOption) (*GameReply, error) {
	out := new(GameReply)
	err := c.cc.Invoke(ctx, "/fase2.PlayGame/Playing", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PlayGameServer is the server API for PlayGame service.
// All implementations must embed UnimplementedPlayGameServer
// for forward compatibility
type PlayGameServer interface {
	Playing(context.Context, *GameRequest) (*GameReply, error)
	mustEmbedUnimplementedPlayGameServer()
}

// UnimplementedPlayGameServer must be embedded to have forward compatible implementations.
type UnimplementedPlayGameServer struct {
}

func (UnimplementedPlayGameServer) Playing(context.Context, *GameRequest) (*GameReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Playing not implemented")
}
func (UnimplementedPlayGameServer) mustEmbedUnimplementedPlayGameServer() {}

// UnsafePlayGameServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PlayGameServer will
// result in compilation errors.
type UnsafePlayGameServer interface {
	mustEmbedUnimplementedPlayGameServer()
}

func RegisterPlayGameServer(s grpc.ServiceRegistrar, srv PlayGameServer) {
	s.RegisterService(&PlayGame_ServiceDesc, srv)
}

func _PlayGame_Playing_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GameRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PlayGameServer).Playing(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/fase2.PlayGame/Playing",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PlayGameServer).Playing(ctx, req.(*GameRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// PlayGame_ServiceDesc is the grpc.ServiceDesc for PlayGame service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PlayGame_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "fase2.PlayGame",
	HandlerType: (*PlayGameServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Playing",
			Handler:    _PlayGame_Playing_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protos/server.proto",
}
