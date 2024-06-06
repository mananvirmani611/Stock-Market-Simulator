const Constants = {
    GOOGLE_USER_INFO_BASE_URL : 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=',
    BASE_API_URL : "http://localhost:3009",
    APIS: {
        AUTHENTICATE : '/api/authenticate',
        VERIFY_TOKEN : '/api/verifyToken',
        ALL_STOCKS_DATA : '/api/stocks/data',
        CURRENT_BALANCE : '/api/users/current-balance',
        BUY_STOCK : '/api/users/stock-record',
        USER_DATA : '/api/users/data',
        SELL_STOCK : '/api/users/sell',
    }

};

export default Constants;