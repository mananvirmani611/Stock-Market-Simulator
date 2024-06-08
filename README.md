Welcome to the Stock Market Simulator App!
This application lets users virtually invest money in the stock market using real-time stock prices. Users can track their investments, monitor their balance, and manage their stock portfolio. 
This README provides detailed information about the app's functionality, database structure, and API endpoints.

-------------------------------------------

Table of Contents
1. Flow Diagram
2. Introduction
3. Features
4. Technical Details
5. Installation
   
-------------------------------------------

1. Flow Diagram Link: https://tinyurl.com/stock-simulator-flow-diagram

2. Introduction
The Stock Market Simulator App is designed to simulate stock market investments.
Users can register, receive an initial virtual money balance, and use it to buy and sell stocks based on real market prices. This is an excellent tool for learning about stock trading and investment strategies without financial risk.

3. Features
- Virtual investment in the stock market using real-time prices.
- User authentication and initial balance credit.
- Track current balance and portfolio.
- Update stock records upon buying or selling stocks.
- Secure authentication using JWT tokens.

4. Technical Details <br />
      4.1 Database Structure <br />
          &emsp;4.1.1 User Data Schema <br />
                &emsp;&emsp;- _id: ObjectId <br />
                &emsp;&emsp;- Email: String <br />
                &emsp;&emsp;- Balance: Number <br />
                &emsp;&emsp;- StocksInHand: Array[StockRecord] <br />
          &emsp;4.1.2 StockRecord Schema <br />
                &emsp;&emsp;- _id: ObjectId <br />
                &emsp;&emsp;- StockName: String <br />
                &emsp;&emsp;- PurchasedAt: Date <br />
                &emsp;&emsp;- Quantity: Number <br />
                &emsp;&emsp;- PurchaseQuantity: Number <br />
                &emsp;&emsp;- StockPurchasePrice: Number <br />
                &emsp;&emsp;- TotalPurchaseValue: Number <br />
                <br />
      4.2 API Routes <br />
          &emsp;4.2.1 UserRoutes <br />
                &emsp;&emsp;- GET /current-balance: Retrieves the current balance of the authenticated user <br />
                &emsp;&emsp;- PATCH /stock-record: Updates the stock record of the user <br />
                &emsp;&emsp;- GET /data: Retrieves the entire user data <br />
                &emsp;&emsp;- PATCH /sell: Updates the stock record after selling <br />
          &emsp;4.2.2 authRoutes <br />
                &emsp;&emsp;- GET /verifyToken: Verifies the JWT token and returns the corresponding email <br />
                &emsp;&emsp;- POST /authenticate: Creates a new user in the database and adds 5000 initial credits to the user account balance <br />
                <br />
      4.3 Scraping the Real Time Stock Data <br />
         &emsp;Our stock market simulator app uses BeautifulSoup to scrape real-time data from Google Finance. The scraped data is stored in a MySQL database and accessed via an API to supply the Node.js backend. This ensures users receive the latest stock prices and market information.
   <br />
5. Installation: <br />
   5.1 Scraping Real-Time Stock Data
   - Make sure you have MySQL installed on your device.
   - Install required Python packages:
         pip install mysql-connector-python
         pip install flask
   - Run the scraping script:
         python3 scraping.py

   5.2 For backend:
   - Navigate to the backend folder:
         cd backend
   - Set up environment variables
   - Install dependencies:
         npm install
   - Start the backend application:
         node index.js

   5.3 For frontend:
   - Navigate to the frontend folder:
         cd frontend
   - Install dependencies:
         npm install
   - Start the frontend application:
         npm run start

