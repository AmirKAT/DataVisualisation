import { saveData } from "./database_function";

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
async function searchTweets(){
    try{
        //Set up parameters for the search
        let searchParams = {
            count: 10000,
            lang: "en"
        };
        
        //Wait for search to execute asynchronously
        let btc = await client.get('search/tweets', {...searchParams, q:"BTC"});
        const btcTweets = btc.statuses.map(tweet =>{
            return({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: "BTC"
        })})
         let ltc = await client.get('search/tweets', {...searchParams, q:"LTC"});
        const ltcTweets = ltc.statuses.map(tweet =>{
            return({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: "LTC"
        })})
         let xrp = await client.get('search/tweets', {...searchParams, q:"XRP"});
        const xrpTweets = xrp.statuses.map(tweet =>{
            return({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: "XRP"
        })})
         let ada = await client.get('search/tweets', {...searchParams, q:"ADA"});
        const adaTweets = ada.statuses.map(tweet =>{
            return({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: "ADA"
        })})
         let eth = await client.get('search/tweets', {...searchParams, q:"ETH"});
        const ethTweets = eth.statuses.map(tweet =>{
            return({
            TweetId:tweet.id, Text:tweet.text, TweetTimeStamp:new Date(tweet.created_at).valueOf(),
            Currency: "ETH"
        })})


        //Output results
        return  {
            BTC: btcTweets,
            LTC: ltcTweets,
            XRP: xrpTweets,
            ETH: ethTweets,
            ADA: adaTweets
        }
        
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Call function to search for tweets with specified subject
searchTweets() ;

saveData("BTC", 1234345543, "Hello BTC", 140232323);