let AWS = require("aws-sdk");

//Import functions for database
let db = require('./database');

module.exports.getSendMessagePromises = async (domainName, stage, currency) => {
    console.log("called")
    //Get connection IDs of clients
    let clientIdArray = (await db.getConnectionIds()).Items;
    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray));
    
    // scan data from numerical table
    let message = (await db.scanData(currency)).Items;

    //Create API Gateway management class.
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + '/' + stage
    });

    //Try to send message to connected clients
    let msgPromiseArray = clientIdArray.map( async item => {
        try{
            console.log("Sending message '" + message + "' to: " + item.ConnectionID);

            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.ConnectionID,
                Data: JSON.stringify(message)
            };

            //Wait for API Gateway to execute and log result
            await apigwManagementApi.postToConnection(apiMsg).promise();
            console.log("Message '" + message + "' sent to: " + item.ConnectionID);
        }
        catch(err){
            console.log("Failed to send message to: " + item.ConnectionID);

            //Delete connection ID from database
            if(err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.ConnectionID);
                }
                catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            }
            else{
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    });

    return msgPromiseArray;
};
