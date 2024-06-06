const mongoose = require('mongoose');
const CONSTANTS = require('../utils/constants');

mongoose.connect(CONSTANTS.DATABASE.DATABASE_CONNECTION_URL + CONSTANTS.DATABASE.DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(CONSTANTS.DATABASE.DATABASE_CONNECTION_SUCCESS))
  .catch(err => console.log(CONSTANTS.DATABASE.DATABASE_CONNECTION_ERROR));

module.exports = mongoose.connection;