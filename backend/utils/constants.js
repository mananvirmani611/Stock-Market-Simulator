require("dotenv").config();

const CONSTANTS = {
    DATABASE : {
        DATABASE_CONNECTION_ERROR : "Not able to connect to database",
        DATABASE_CONNECTION_SUCCESS : "Database succesfully connected",
        DATABASE_CONNECTION_URL : "mongodb+srv://mananvirmani611:" + process.env.DB_PASSWORD + "@StockMarketLearning.vvlm6fx.mongodb.net/",
        DATABASE_NAME : "stock_market_learning"
    },
    THIRD_PARTY_URL : {
        STOCK_DATA_BASE_URL : "http://0.0.0.0:5000/",
        GET_STOCK_DATA : 'stock-data'
    }
}
module.exports = CONSTANTS;