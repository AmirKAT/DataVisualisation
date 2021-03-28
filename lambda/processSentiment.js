let AWS = require("aws-sdk");

//Create instance of Comprehend
let comprehend = new AWS.Comprehend();

let documentClient = new AWS.DynamoDB.DocumentClient();

//Function that will be called
exports.handler = (event) => {
    console.log(JSON.stringify(event));
    event.Records.forEach(record => {

        //twitter table data
        let currency = record.dynamodb.NewImage.Currency.S;
        let tweetTimeStamp = Number(record.dynamodb.NewImage.TweetTimeStamp.N);
        let text = record.dynamodb.NewImage.Text.S;
        let tweetID = record.dynamodb.NewImage.TweetID.N;

        //params for calls to aws comprehend
        let params = {
            LanguageCode: "en",
            Text: text
        };

        //Call comprehend to detect sentiment of text
        comprehend.detectSentiment(params, (err, data) => {
            //Log result or error
            if (err) {
                console.log("\nError with call to Comprehend:\n" + JSON.stringify(err));
            } else {
                let sentimentText = data;

                //name of table for tweets
                let params = {
                    TableName: "crypto_sentiment",
                    Item: {
                        TweetID: tweetID,
                        Currency: currency,
                        TweetTimeStamp: tweetTimeStamp,
                        TweetSentiment: sentimentText
                    }
                };

                //stores the data into database
                return new Promise((resolve, reject) => {
                    documentClient.put(params, (err, data) => {
                        if (err) {
                            reject("Unable to add data to table: " + JSON.stringify(err));
                        } else {
                            resolve("Data added to table: " + params.Item.Currency);
                        }
                    });
                });

            }
        });

    });

};