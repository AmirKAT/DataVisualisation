let AWS = require("aws-sdk");

exports.handler = async (event) => {
    try {
        console.log("EVENT:" + JSON.stringify(event));
        const { domainName, stage, connectionId } = event.requestContext;
        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: domainName + '/' + stage
        });
        let apiMsg = {
            ConnectionId: connectionId,
            Data: JSON.stringify("Path not valid")
        };

        await apigwManagementApi.postToConnection(apiMsg).promise();

        //Build and return response with error message
        const response = {
            statusCode: 500,
            body: JSON.stringify('ERROR. Message not recognized.'),
        };
        return response;
    } catch (err) {
        console.log(err);
    }
};


