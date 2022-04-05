// Code generated by protoc-gen-go. DO NOT EDIT.
// source: protoAPI.proto

package protoAPI

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type GameRequest struct {
	Gameid               int32    `protobuf:"varint,1,opt,name=gameid,proto3" json:"gameid,omitempty"`
	Players              int32    `protobuf:"varint,2,opt,name=players,proto3" json:"players,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GameRequest) Reset()         { *m = GameRequest{} }
func (m *GameRequest) String() string { return proto.CompactTextString(m) }
func (*GameRequest) ProtoMessage()    {}
func (*GameRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_a06943f4b0dee5bc, []int{0}
}

func (m *GameRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GameRequest.Unmarshal(m, b)
}
func (m *GameRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GameRequest.Marshal(b, m, deterministic)
}
func (m *GameRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GameRequest.Merge(m, src)
}
func (m *GameRequest) XXX_Size() int {
	return xxx_messageInfo_GameRequest.Size(m)
}
func (m *GameRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_GameRequest.DiscardUnknown(m)
}

var xxx_messageInfo_GameRequest proto.InternalMessageInfo

func (m *GameRequest) GetGameid() int32 {
	if m != nil {
		return m.Gameid
	}
	return 0
}

func (m *GameRequest) GetPlayers() int32 {
	if m != nil {
		return m.Players
	}
	return 0
}

type GameResult struct {
	Status               int32    `protobuf:"varint,1,opt,name=status,proto3" json:"status,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *GameResult) Reset()         { *m = GameResult{} }
func (m *GameResult) String() string { return proto.CompactTextString(m) }
func (*GameResult) ProtoMessage()    {}
func (*GameResult) Descriptor() ([]byte, []int) {
	return fileDescriptor_a06943f4b0dee5bc, []int{1}
}

func (m *GameResult) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_GameResult.Unmarshal(m, b)
}
func (m *GameResult) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_GameResult.Marshal(b, m, deterministic)
}
func (m *GameResult) XXX_Merge(src proto.Message) {
	xxx_messageInfo_GameResult.Merge(m, src)
}
func (m *GameResult) XXX_Size() int {
	return xxx_messageInfo_GameResult.Size(m)
}
func (m *GameResult) XXX_DiscardUnknown() {
	xxx_messageInfo_GameResult.DiscardUnknown(m)
}

var xxx_messageInfo_GameResult proto.InternalMessageInfo

func (m *GameResult) GetStatus() int32 {
	if m != nil {
		return m.Status
	}
	return 0
}

func init() {
	proto.RegisterType((*GameRequest)(nil), "protoAPI.GameRequest")
	proto.RegisterType((*GameResult)(nil), "protoAPI.GameResult")
}

func init() {
	proto.RegisterFile("protoAPI.proto", fileDescriptor_a06943f4b0dee5bc)
}

var fileDescriptor_a06943f4b0dee5bc = []byte{
	// 196 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x2b, 0x28, 0xca, 0x2f,
	0xc9, 0x77, 0x0c, 0xf0, 0xd4, 0x03, 0x33, 0x84, 0x38, 0x60, 0x7c, 0x25, 0x7b, 0x2e, 0x6e, 0xf7,
	0xc4, 0xdc, 0xd4, 0xa0, 0xd4, 0xc2, 0xd2, 0xd4, 0xe2, 0x12, 0x21, 0x31, 0x2e, 0xb6, 0xf4, 0xc4,
	0xdc, 0xd4, 0xcc, 0x14, 0x09, 0x46, 0x05, 0x46, 0x0d, 0xd6, 0x20, 0x28, 0x4f, 0x48, 0x82, 0x8b,
	0xbd, 0x20, 0x27, 0xb1, 0x32, 0xb5, 0xa8, 0x58, 0x82, 0x09, 0x2c, 0x01, 0xe3, 0x2a, 0xa9, 0x70,
	0x71, 0x41, 0x0c, 0x28, 0x2e, 0xcd, 0x01, 0xeb, 0x2f, 0x2e, 0x49, 0x2c, 0x29, 0x2d, 0x86, 0xe9,
	0x87, 0xf0, 0x8c, 0xdc, 0xb8, 0x38, 0x72, 0xf2, 0x93, 0x13, 0x73, 0x1c, 0x03, 0x3c, 0x85, 0xac,
	0xb8, 0x38, 0x8b, 0x4b, 0x12, 0x8b, 0x4a, 0x40, 0xda, 0x84, 0x44, 0xf5, 0xe0, 0x4e, 0x43, 0x72,
	0x87, 0x94, 0x08, 0xba, 0x30, 0xc8, 0x74, 0x25, 0x06, 0x27, 0x5f, 0x2e, 0xe9, 0x82, 0xa2, 0xfc,
	0xca, 0xd4, 0xe4, 0x92, 0x7c, 0xbd, 0xe4, 0xfc, 0x5c, 0xfd, 0xb4, 0xc4, 0xe2, 0x54, 0x23, 0x7d,
	0x98, 0x5a, 0x27, 0xb8, 0xbf, 0x02, 0x18, 0xa3, 0xf0, 0x29, 0x5c, 0xc4, 0xc4, 0x52, 0x5c, 0x90,
	0x66, 0x94, 0xc4, 0x06, 0x16, 0x30, 0x06, 0x04, 0x00, 0x00, 0xff, 0xff, 0x02, 0xa5, 0x99, 0xfe,
	0x20, 0x01, 0x00, 0x00,
}