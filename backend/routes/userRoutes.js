const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const TokenVerification = require('../services/TokenVerification');

router.get('/current-balance', UserController.returnCurrentBalance);
router.patch('/stock-record', UserController.updateStockRecord);
router.get('/data', UserController.getUserEntireData);
router.patch('/sell', UserController.sellStockAndUpdateRecord);

module.exports = {
    router,
}