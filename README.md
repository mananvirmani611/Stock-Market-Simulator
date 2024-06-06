Welcome to the Stock Market Simulator App!
This application lets users virtually invest money in the stock market using real-time stock prices. Users can track their investments, monitor their balance, and manage their stock portfolio. 
This README provides detailed information about the app's functionality, database structure, and API endpoints.

-------------------------------------------

Table of Contents
1. Introduction
2. Features
3. Technical Details
4. Installation
   
-------------------------------------------

1. Introduction
The Stock Market Simulator App is designed to simulate stock market investments.
Users can register, receive an initial virtual money balance, and use it to buy and sell stocks based on real market prices. This is an excellent tool for learning about stock trading and investment strategies without financial risk.

2. Features
- Virtual investment in the stock market using real-time prices.
- User authentication and initial balance credit.
- Track current balance and portfolio.
- Update stock records upon buying or selling stocks.
- Secure authentication using JWT tokens.

3. Technical Details <br />
      3.1 Database Structure <br />
          3.1.1 User Data Schema <br />
                - _id: ObjectId <br />
                - Email: String <br />
                - Balance: Number <br />
                - StocksInHand: Array[StockRecord] <br />
          3.1.2 StockRecord Schema <br />
                - _id: ObjectId <br />
                - StockName: String <br />
                - PurchasedAt: Date <br />
                - Quantity: Number <br />
                - PurchaseQuantity: Number <br />
                - StockPurchasePrice: Number <br />
                - TotalPurchaseValue: Number <br />
      3.2 API Routes <br />
          3.2.1 UserRoutes <br />
                - GET /current-balance: Retrieves the current balance of the authenticated user <br />
                - PATCH /stock-record: Updates the stock record of the user <br />
                - GET /data: Retrieves the entire user data <br />
                - PATCH /sell: Updates the stock record after selling <br />
          3.2.2 authRoutes <br />
                - GET /verifyToken: Verifies the JWT token and returns the corresponding email <br />
                - POST /authenticate: Creates a new user in the database and adds 5000 initial credits to the user account balance <br />
   
4. Installation: <br />
   4.1 Scraping Real-Time Stock Data
   - Make sure you have MySQL installed on your device.
   - Install required Python packages:
         pip install mysql-connector-python
         pip install flask
   - Run the scraping script:
         python3 scraping.py

   4.2 For backend:
   - Navigate to the backend folder:
         cd backend
   - Set up environment variables
   - Install dependencies:
         npm install
   - Start the backend application:
         node index.js

   4.3 For frontend:
   - Navigate to the frontend folder:
         cd frontend
   - Install dependencies:
         npm install
   - Start the frontend application:
         npm run start
