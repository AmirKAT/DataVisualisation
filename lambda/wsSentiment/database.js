let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "websocket_clients"
    }
    console.log('getConnectionIds called')
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "websocket_clients",
        Key: {
            ConnectionID: connectionId
        }
    };
    return documentClient.delete(params).promise();
};

// retrieve data from table

module.exports.scanData = async(currency) => {
    console.log("Scanning data from sentiment database");
    let params = {
        TableName: "crypto_sentiment",
        KeyConditionExpression: "Currency = :curr",
        ExpressionAttributeValues: {
            ":curr": currency,
            
        },
    };
    
    return documentClient.query(params).promise();
};