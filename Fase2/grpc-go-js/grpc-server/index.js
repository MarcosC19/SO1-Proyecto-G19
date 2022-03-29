var PROTO_PATH = "../Proto/protoAPI.proto";

const { rps, flipit, bigBrother, smallBrother } = require('./Games');

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const proyectDef = grpc.loadPackageDefinition(packageDefinition).protoAPI;

function getGame(id){
    switch(id){
        case 1:
            return rps;
        case 2:
            return flipit;
        case 3:
            return bigBrother;
        case 4:
            return smallBrother;
        default:
            return rps;
    }
}

function startGame(call, callback){
    console.log(call.request);
    let fgame = getGame(call.request.gameid);
    fgame(call.request.players);
    callback(null, {
        status: 1
    });
}

function startServer() {
    var server = new grpc.Server();
    server.addService(proyectDef.localAPI.service, {
        startGame: startGame
    });
    server.bindAsync(
        "0.0.0.0:50051",
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start();
        }
    );
}

startServer();