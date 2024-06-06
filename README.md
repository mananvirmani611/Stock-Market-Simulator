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
          &nbsp;3.1.1 User Data Schema <br />
                &nbsp;&nbsp;- _id: ObjectId <br />
                &nbsp;&nbsp;- Email: String <br />
                &nbsp;&nbsp;- Balance: Number <br />
                &nbsp;&nbsp;- StocksInHand: Array[StockRecord] <br />
          &nbsp;3.1.2 StockRecord Schema <br />
                &nbsp;&nbsp;- _id: ObjectId <br />
                &nbsp;&nbsp;- StockName: String <br />
                &nbsp;&nbsp;- PurchasedAt: Date <br />
                &nbsp;&nbsp;- Quantity: Number <br />
                &nbsp;&nbsp;- PurchaseQuantity: Number <br />
                &nbsp;&nbsp;- StockPurchasePrice: Number <br />
                &nbsp;&nbsp;- TotalPurchaseValue: Number <br />
      3.2 API Routes <br />
          &nbsp;3.2.1 UserRoutes <br />
                &nbsp;&nbsp;- GET /current-balance: Retrieves the current balance of the authenticated user <br />
                &nbsp;&nbsp;- PATCH /stock-record: Updates the stock record of the user <br />
                &nbsp;&nbsp;- GET /data: Retrieves the entire user data <br />
                &nbsp;&nbsp;- PATCH /sell: Updates the stock record after selling <br />
          &nbsp;3.2.2 authRoutes <br />
                &nbsp;&nbsp;- GET /verifyToken: Verifies the JWT token and returns the corresponding email <br />
                &nbsp;&nbsp;- POST /authenticate: Creates a new user in the database and adds 5000 initial credits to the user account balance <br />
   
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
