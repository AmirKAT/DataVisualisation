let AWS = require("aws-sdk");

//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function saveData(currency: any, priceTimeStamp: any, price: any,): Promise<string> {
    //Table name and data for table
    let params = {
        TableName: "crypto_numerical",
        Item: {
            Currency: currency,//PARTITION
            PriceTimeStamp: priceTimeStamp,
            Price: price,
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string>((resolve, reject) => {
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + currency);
            }
        })
    });
}


