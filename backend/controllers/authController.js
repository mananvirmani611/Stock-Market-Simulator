
const AuthService = require("../services/authService");

const authenticateUser = async (req, res) => {
    try{
        const response = await AuthService.performAuthAndReturnToken(req);
        res.json(response);
    }
    catch(error){
        res.json(error)
    }
}

const returnEmail = async (req, res, next) => {
    try{
        const response = await AuthService.returnEmailIfTokenCorrect(req);
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
}

module.exports = {
    authenticateUser,
    returnEmail,
}