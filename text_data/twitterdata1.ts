//Module that reads keys from .env file
const dotenv = require('dotenv');

//Node Twitter library
const Twitter = require('twitter');

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//Downloads and outputs tweet text
async function searchTweets(keyword: string){
    try{
        //Set up parameters for the search
        let searchParams = {
            q: keyword,
            count: 10000,
            lang: "en"
        };

        //Wait for search to execute asynchronously
        let result = await client.get('search/tweets', searchParams);

        const tweets = result.statuses.map(tweet =>({
            id:tweet.id, text:tweet.text
        }))

        //Output results
        console.log(tweets);

        return tweets
        
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Call function to search for tweets with specified subject
searchTweets("BTC");

