let AWS = require("aws-sdk");

//create a new document client
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //get the connection id from event
    let connectId = event.requestContext.connectionID;
    console.log("Client has connected with ID: " + connectId);
    
    //parameters for storing the ids in database
    let params = {
        TableName: "websocket_clients",
        Item: {
            ConnectionID: connectId
        }
    };
    
    //store id for communication with client
    try {
        await documentClient.put(params).promise();
        console.log("Connection ID has been stored");
        
        return{
            statusCode: 200,
            body: "Client has connected with ID: " + connectId
        };
    } catch (err) {
        return{
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
};