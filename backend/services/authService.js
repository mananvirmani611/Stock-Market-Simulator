const jwt = require('jsonwebtoken');
require("dotenv").config();
const { User } = require("../models/User");

const performAuthAndReturnToken = async (req) => {
  try {
    const user = { id: req.body.id, username: req.body.email };
    let currToken = await signToken(user);
    const existingUser = await User.findOne({email : req.body.email});
    if(!existingUser){
      const newUser = new User({
        email : req.body.email,
        balance : 5000,
        totalInvestedAmount : 0,
        stocksInHand : [],
      })
      await newUser.save();
      console.log("NEW USER ADDED");
    }
    return {token : currToken};
  }
  catch (err) {
    console.log(err);
    return err;
  }
}

const returnEmailIfTokenCorrect = async(req) => {
    if(req.user){
      return req.user;
    }
    else{
      throw new Error("No email found");
    }
}

async function signToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        reject("Failed to generate token");
      } else {
        resolve(token);
      }
    });
  })
}

module.exports = {
  performAuthAndReturnToken,
  returnEmailIfTokenCorrect,
}