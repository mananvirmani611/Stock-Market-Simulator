This repository contains the Server side code of the Stock Market Learning Application

Complete App description: https://docs.google.com/document/d/1asxFoqEVE_YcUV3l87jLsVVH2GU83Gql5QLrbsRuv3I/edit?usp=sharing

##############################################

Database used: MongoDB

Schemas used:
1. StockRecord : 
For storing the record of every transaction
2. User : 
    a. Contains entire user information
    b. Contains an Array of StockRecords, which will have the stocks purchased by the User


##############################################


Router Used:
1. Authentication Routes :
    a. /authenticate(POST) - save the user in Database and return the JWT Token
    b. /verifyToken(GET) - verify the token and return the email associated with that JWT

2. Stock Routes:
    a. /data (GET) - return the data of stocks by passing stock_name or page_no as the query parameter

3. User Routes:
    a. /current-balance(GET) - return the current balance associated with the user by passing email as query parameter
    b. /stock-record (PATCH) - for buying any stock. 
                               Creates a StockRecord and update stockrecord array of current user
    c. /data (GET) - get the entire data of the current user
    d. /sell (PATCH) - for selling any stock
                     - Updates a StockRecord and update stockRecord array of current user


##############################################