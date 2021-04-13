//Time library that we will use to increment dates.
const moment = require('moment');

//Axios will handle HTTP requests to web service
const axios = require('axios');

//Reads keys from .env file
const dotenv = require('dotenv');

import { CoinRates } from "./cryptotypes";
import { saveData } from "./database_function";

//Copy variables in file into environment variables
dotenv.config();

//Class that wraps coincap.io web service
export class Coin {



    constructor(api_key: string = null) {
    }

    //Base URL of coincap.io API

    //Returns a Promise that will get the exchange rates for the specified date
    async getExchangeRates(): Promise<CoinRates[]> {
        let litecoinUrl: string = "https://api.coincap.io/v2/assets/litecoin/history?interval=d1"
        //Output URL and return Promise

        let bitcoinUrl: string = "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1"
        //Output URL and return Promise

        let xrpUrl: string = "https://api.coincap.io/v2/assets/xrp/history?interval=d1"
        //Output URL and return Promise

        let cardanoUrl: string = "https://api.coincap.io/v2/assets/cardano/history?interval=d1"
        //Output URL and return Promise

        let ethereumUrl: string = "https://api.coincap.io/v2/assets/ethereum/history?interval=d1"
        //Output URL and return Promise
        let { data: CARDANO_DATA } = await axios.get(cardanoUrl);
        let { data: BITCOIN_DATA } = await axios.get(bitcoinUrl);
        let { data: XRP_DATA } = await axios.get(xrpUrl);
        let { data: LITECOIN_DATA } = await axios.get(litecoinUrl);
        let { data: ETHEREUM_DATA } = await axios.get(ethereumUrl);
        let coinRates: CoinRates[] = [];
        for (let i = 0; i < 1000; i++) {
            await saveData("BTC", BITCOIN_DATA.data[i].time, BITCOIN_DATA.data[i].priceUsd)
            await saveData("LTC", LITECOIN_DATA.data[i].time, LITECOIN_DATA.data[i].priceUsd)
            await saveData("XRP", XRP_DATA.data[i].time, XRP_DATA.data[i].priceUsd)
            await saveData("ETH", ETHEREUM_DATA.data[i].time, ETHEREUM_DATA.data[i].priceUsd)
            await saveData("ADA", CARDANO_DATA.data[i].time, CARDANO_DATA.data[i].priceUsd)
            coinRates.push({
                BTC: restructureData({ currency: "BTC", ...BITCOIN_DATA.data[i] }),
                LTC: restructureData({ currency: "LTC", ...LITECOIN_DATA.data[i] }),
                XRP: restructureData({ currency: "XRP", ...XRP_DATA.data[i] }),
                ETH: restructureData({ currency: "ETH", ...ETHEREUM_DATA.data[i] }),
                ADA: restructureData({ currency: "ADA", ...CARDANO_DATA.data[i] })
            })

        }


        return coinRates;

    }
}
const restructureData = ({ currency, time: priceTimeStamp, priceUsd: price }) => {
    return ({
        currency,
        priceTimeStamp,
        price
    })
}

//Gets the historical data for a range of dates.
async function getHistoricalData(startDate: string, numDays: number) {

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
    catch (error) {
        console.log("Error: " + JSON.stringify(error));
    }
}

//Call function to get historical data
getHistoricalData('2015-12-24', 0);

console.log("Data being sent to DynamoDB Database");