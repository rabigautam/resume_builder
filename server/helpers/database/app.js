const mongoose = require("mongoose");
const connectDb = require("./connectDb");
const config = require("../../config/index");
const handleDbEvents = require("./handleDbEvent");

const createConnection = () => {
  connectDb(mongoose, config);
  const connection = mongoose.connection;
  handleDbEvents(connection);
};

module.exports = {
  createConnection: createConnection,
};
