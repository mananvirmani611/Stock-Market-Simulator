const express = require('express');
const router = express.Router();

const StockController = require("../controllers/stockController");

router.get("/data", StockController.returnStockData);

module.exports = {
    router,
}