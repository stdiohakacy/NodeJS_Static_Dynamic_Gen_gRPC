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

const client = new greetPackageDefinition.GreetService('localhost:50051', grpc.credentials.createInsecure());

// eslint-disable-next-line require-jsdoc
function callGreetings() {
    const request = {
        greeting: {
            first_name: 'Nguyen',
            last_name: 'Duy'
        }
    };
    client.greet(request, (err, response) => {
        if (!err)
            console.log(`Greeting response ${response.result}`);
        else
            console.log(`Error!!!`);
    });
}

// eslint-disable-next-line require-jsdoc
function main() {
    callGreetings();
}

main();
