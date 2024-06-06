const express = require("express");
const app = express();
const cors = require('cors');
const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require('body-parser');
require("./config/database");
app.use(bodyParser.json())

app.use(cors());

const PORT = process.env.PORT || 3009;

app.use("/api/stocks", stockRoutes.router);
app.use("/api/", authRoutes.router);
app.use("/api/users", userRoutes.router)

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
