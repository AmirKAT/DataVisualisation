let AWS = require("aws-sdk");

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "websocket_clients"
    }
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "websocket_clients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};

// retrieve data from table

module.exports.scanData = async(currency) => {
    console.log("Scanning data from numerical database");
    let params = {
        TableName: "crypto_numerical",
        IndexName: "Currency-PriceTimeStamp-index",
        KeyConditionExpression: "Currency = :curr",
        ExpressionAttributeValues: {
            ":curr": currency
        }
    };
    console.log({params});
    return documentClient.query(params).promise();
};