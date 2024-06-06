const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email : {type : String, unique : true},
    balance : Number,
    totalInvestedAmount : Number,
    stocksInHand : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'StockRecord'
    }]
})

const User = new mongoose.model('User', UserSchema);
module.exports = {
    User,
}