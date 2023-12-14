const mongoose = require("mongoose");

// Connection
async function connectMongoDB(DB_CONNECTION) {
  return mongoose.connect(DB_CONNECTION);
}

module.exports = { connectMongoDB };
