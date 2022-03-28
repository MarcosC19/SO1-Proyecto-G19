var PROTO_PATH = "./Proto/API.proto";

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

const proyectDef = grpc.loadPackageDefinition(packageDefinition).proyecto;

function startGame(call, callback){

    console.log(call.request);
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