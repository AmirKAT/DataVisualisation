//The structure of a Rates object
export interface CoinRates {
    BTC: CoinDetail,
    LTC: CoinDetail,
    XRP: CoinDetail,
    ETH: CoinDetail,
    ADA: CoinDetail
}

export interface CoinDetail {
    currency: string,
    priceTimeStamp: number,
    price: number
}
