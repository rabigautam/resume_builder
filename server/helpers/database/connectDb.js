const connectDb = (connector, config) => {
  
    return connector.connect(config.db.MONGO_SERVER_CONNECT_STR, {
      // reconnectTries: config.db.reconnectTries,
      // reconnectInterval: config.db.reconnectInterval,
      poolSize: config.db.poolSize,
      keepAlive: 1,
      useNewUrlParser: true,
      useCreateIndex: true,
     useUnifiedTopology: true 
    });
  };
  
  module.exports = connectDb;
  