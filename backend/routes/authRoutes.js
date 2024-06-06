const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');
const TokenVerification = require('../services/TokenVerification');

router.post("/authenticate", AuthController.authenticateUser);
router.get("/verifyToken", TokenVerification.verifyToken, AuthController.returnEmail);

module.exports = {
    router,
}