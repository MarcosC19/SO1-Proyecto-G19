const {
  game1, 
  game2, 
  game3, 
  game4, 
  game5
} = require("./helpers/games");
const { createConnection }  = require("./helpers/rabbitConnection");

//Para las variables de entorno
require('dotenv').config();

//Configuraciones para grpc
var PROTO_PATH = './protos/game.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var game_proto = grpc.loadPackageDefinition(packageDefinition).game;

const PlayGame = async (call, callback) => {
  let result;
  let gameid = call.request.gameid
  switch (gameid) {
    case 1:
        result = await game1(call.request.players);
      break;
    case 2:
        result = await game2(call.request.players);
      break;
    case 3:
        result = await game3(call.request.players);
      break;
    case 4:
        result = await game4(call.request.players);
      break;
    case 5:
        result = await game5(call.request.players);
      break;
    default:
      result = "Id de juego incorrecto"
      break;
  }
  callback(null, { response: result });
}

const main = () => {
  createConnection();
  var server = new grpc.Server();
  server.addService(game_proto.ExecuteGame.service, {
    PlayGame: PlayGame
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("gRPC Server on 50051");
  });
}

main();