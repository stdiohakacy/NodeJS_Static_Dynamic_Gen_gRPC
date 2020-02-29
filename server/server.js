const path = require('path');
const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const greetProtoPath = path.join(__dirname, '..', 'protos', 'greet.proto');
const greetProtoDefinition = protoLoader.loadSync(greetProtoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDefinition).greet;
// eslint-disable-next-line require-jsdoc
function greet(call, callback) {
    const firstName = call.request.greeting.first_name;
    const lastName = call.request.greeting.last_name;
    callback(null, {result: `Hello ${firstName} - ${lastName}`});
}

// eslint-disable-next-line require-jsdoc
function main() {
    const server = new grpc.Server();
    server.addService(greetPackageDefinition.GreetService.service, {greet: greet});
    server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log('Running at 127.0.0.1:50051');
}

main();
