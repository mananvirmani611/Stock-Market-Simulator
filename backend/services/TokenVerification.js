const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = function(req, res, next){
    const token = req.header('Authorization');

    if (!token) {
        res.json("Token missing");
    }

    try{
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        if(decoded.user){
            req.user = decoded.user;
            next();
        }
        else{
            throw new Error("Token invalid");
        }
    }
    catch(err){
        res.status(403).json(err.message);
    }
}

module.exports = {
    verifyToken,
}