//The structure of a Rates object
export interface FixerRates{
    USD: number,
    CAD: number,
    GBP: number
}

//The data structure returned in the message body by fixer.io
export interface FixerObject {
    success: boolean,
    error?: FixerError,
    timestamp: number,
    historical: boolean,
    base: string,
    date: string,
    rates: FixerRates
}

//The data structure of a fixer.io error
export interface FixerError{
    code: number,
    type: string,
    info: string,
}

