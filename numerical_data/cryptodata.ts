//Time library that we will use to increment dates.
const moment = require('moment');

//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Reads keys from .env file
const dotenv = require('dotenv');

import { deflateSync } from "node:zlib";
import { CoinRates } from "./cryptotypes";

//Copy variables in file into environment variables
dotenv.config();

//Class that wraps fixer.io web service
export class Coin {

    

    constructor(api_key: string = null) {
    }

      //Base URL of coincap.io API

    //Returns a Promise that will get the exchange rates for the specified date
    async getExchangeRates() : Promise<CoinRates[]> {
        let litecoinUrl:string = "https://api.coincap.io/v2/assets/litecoin/history?interval=m1"
        //Output URL and return Promise
        
        let bitcoinUrl:string = "https://api.coincap.io/v2/assets/bitcoin/history?interval=m1"
        //Output URL and return Promise
        
        let xrpUrl:string = "https://api.coincap.io/v2/assets/xrp/history?interval=m1"
        //Output URL and return Promise
        
        let cardanoUrl:string = "https://api.coincap.io/v2/assets/cardano/history?interval=m1"
        //Output URL and return Promise
        
        let ethereumUrl:string = "https://api.coincap.io/v2/assets/ethereum/history?interval=m1"
        //Output URL and return Promise
        const {data:CARDANO_DATA} =  await axios.get(cardanoUrl);
        const {data:BITCOIN_DATA} =  await axios.get(bitcoinUrl);
        const {data:XRP_DATA} =  await axios.get(xrpUrl);
        const {data:LITECOIN_DATA} =  await axios.get(litecoinUrl);
        const {data:ETHEREUM_DATA} =  await axios.get(ethereumUrl);
        let coinRates: CoinRates[] = [];
        for (let i =0 ; i < 1001 ; i++) {
            coinRates.push({
                BTC: BITCOIN_DATA.data[i],
                LTC: LITECOIN_DATA.data[i],
                XRP: XRP_DATA.data[i],
                ETH: ETHEREUM_DATA.data[i],
                ADA: CARDANO_DATA.data[i]
            })

        }

        return coinRates;

    }
}


//Gets the historical data for a range of dates.
async function getHistoricalData(startDate: string, numDays: number){
    /* You should check that the start date plus the number of days is
    less than the current date*/

    //Create moment date, which will enable us to add days easily.
    let dates = [moment(startDate).format()];

    let startMomentDate = moment(startDate)

    //Create instance of Fixer.io class
    let coinIo: Coin = new Coin();
    //Array to hold promises

    

    //Wait for all promises to execute
    try {
        const data = await coinIo.getExchangeRates()
        console.log(data);
    }
    catch(error){
        console.log("Error: " + JSON.stringify(error));
    }
}

//Call function to get historical data
getHistoricalData('2015-12-24', 0);