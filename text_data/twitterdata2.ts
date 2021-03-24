//Module that reads keys from .env file
const dotenv = require('dotenv');

//Node Twitter library
const Twitter = require('twitter');

//Database module
import { saveData } from "./database_function";

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

interface Tweet {
    TweetId:number,
    Text:string, 
    TweetTimeStamp:number,
    Currency: string
}
//Function downloads and outputs tweet text
async function storeTweets(keyword: string){
    try{
        //Set up parameters for the search
        let searchParams = {
            q: keyword,
            count: 10,
            lang: "en"
        };

        //Wait for search to execute asynchronously
        let twitterResult = await client.get('search/tweets', searchParams);

        //Output the result
        let tweets:Tweet[] = [];
        twitterResult.statuses.forEach((tweet)=>{
            //Store save data promise in array
            tweets.push(({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: keyword
        }));
        });

        //Execute all of the save data promises
        let databaseResult: Array<string> = await Promise.all(tweets.map(async tweet => await saveData(tweet.Currency, tweet.TweetId, tweet.Text, tweet.TweetTimeStamp)));
        
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Call function to search for tweets with specified subject
storeTweets("BTC");
storeTweets("ADA");
storeTweets("ETH");
storeTweets("XRP");
storeTweets("LTC");




