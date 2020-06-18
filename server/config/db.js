module.exports = {
  db: {
    MONGO_SERVER_CONNECT_STR:"mongodb+srv://new-user_123:Passw0rd123@resumebuilder-v9d9p.mongodb.net/test?",
    poolSize: process.env.poolSize || 5,
    reconnectTries: process.env.dbReconnectTries || Number.MAX_VALUE,
    reconnectInterval: process.env.dbReconnectInterval || 1000,
    // user:process.env.mongo_user||'new-user_123',
    // password:process.env.mongo_user||'Passw0rd123'
  },
};
