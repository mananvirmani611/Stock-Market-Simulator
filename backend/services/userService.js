
const { StockRecord } = require("../models/StockRecord");
const {User} = require("../models/User");
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');


const fetchCurrentBalance = async(req) => {
    const email = req.query.email;
    try{
        const currUser = await User.findOne({'email' : email}, 'balance');
        return currUser.balance;
    }
    catch(err){
        console.log(err);
        return err;
    }
}

const createStockRecordAndUpdateUser = async (req) => {
    try{
        const date = moment().format("DD/MM/YYYY HH:mm:ss")
        let data = req.body;
        const totalPurchaseAmt = req.body.totalPurchaseValue;
        const randomId = uuidv4();
        data = {
            ...data,
            purchasedAt : date,
            recordId : randomId
        }
        const newStockRecord = new StockRecord(data);
        await newStockRecord.save().then(async (savedData) => {
            await User.findOneAndUpdate(
                { email : req.body.email}, 
                { $push : {stocksInHand : savedData}, $inc : { balance : -totalPurchaseAmt }}
            )
        });
        return data;
    }
    catch(err){
        return err;
    }
}

const fetchUserData = async(req) => {
    try{
        const email = req.query.email;
        return new Promise(async (resolve, reject) => {
            await User.findOne({email : email}, {stocksInHand : 1})
            .then(async (response) => {
                const stockIdArray = response.stocksInHand;
                let stockArray = [];
                stockArray = await iterateOnStockIdArray(stockIdArray);
                resolve(stockArray);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
    catch(err){
        return err;
    }
} 

const sellStock = async function(req){
    console.log(req.body);
    const alreadyRecord = await StockRecord.findOne(
        {recordId : req.body.recordId}
    )

    if(alreadyRecord.quantity === req.body.quantityToSell){
        return new Promise(async (resolve, reject) => {
            const userDetails = await User.findOne({email : req.body.username});
            console.log("userrrrrrrrrrr " + userDetails);
            let stockRecordArray = userDetails.stocksInHand;
            console.log(stockRecordArray);

            let filteredArray = [];
            for(let i = 0; i<stockRecordArray.length; i++){
                const stockRecord = await StockRecord.findOne({_id : stockRecordArray[i]});
                // console.log(stockRecordRecordId);
                if(stockRecord.recordId === req.body.recordId){
                    continue;
                }
                filteredArray.push(stockRecordArray[i]);
            }

            console.log(filteredArray);
            console.log("reqbodyyyyyyyyyyy ", req.body)
            const updationResult = await User.findOneAndUpdate(
                {email : req.body.username},
                {stocksInHand : filteredArray, balance : (userDetails.balance + req.body.addBalance)}
            )

            const stockDeletionResponse = await StockRecord.deleteOne({recordId : req.body.recordId})
            resolve("done");
            //delete from user also
        })
    }
    else{
        console.log("insidee this");
        return new Promise(async (resolve, reject) => {
            await StockRecord.findOneAndUpdate(
                {recordId : req.body.recordId},
                {quantity : alreadyRecord.quantity - req.body.quantityToSell}
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });

            const userDetails = await User.findOne({email : req.body.username});

            let stockRecordArray = userDetails.stocksInHand;

            const newStockRecordArray = stockRecordArray.map((item) => {
                if(item.recordId === req.body.recordId){
                    item.quantity = alreadyRecord.quantity - req.body.quantity
                }
                return item;
            })

            const updationResult = await User.findOneAndUpdate(
                {email : req.body.username},
                {stocksInHand : newStockRecordArray, balance : (userDetails.balance + req.body.addBalance)}
            )

            resolve("done");
        })
    }
}

const iterateOnStockIdArray = async function(stockIdArray){
    let stockArray = [];
    for(let i = 0; i<stockIdArray.length; i++){
        await StockRecord.findById({_id : stockIdArray[i]})
        .then((res) => {
            stockArray.push(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    stockArray.reverse();
    return stockArray;
}

module.exports = {
    fetchCurrentBalance,
    createStockRecordAndUpdateUser,
    fetchUserData,
    sellStock
}