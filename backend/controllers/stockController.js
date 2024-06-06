const StockService = require("../services/stockService");

const returnStockData = async (req, res) => {
    try{
        const response = await StockService.getStocksData(req);
        res.json(response);
    }
    catch(error){
        res.json(error);
    }
}

module.exports = {
    returnStockData
}
