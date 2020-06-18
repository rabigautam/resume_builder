
const handleDbEvents = function(db) {
  let mongodb = {
    status: "1",
  };
  db.on("connecting", function() {
    console.log("Connecting to MongoDB...");
  });

  db.on("connected", function() {
    
    mongodb.status = "1";
    console.log("Connected to MongoDB!");
  });

  db.on("reconnected", function() {
    
    mongodb.status = "1";
    console.log("MongoDB reconnected!");
  });

  db.on("disconnected", function() {
    if (mongodb.status === "1") {
      
      console.log( "MongoDB disconnected!" );
    }
    mongodb.status = "0";
  });

  db.on("error", function(err) {
    if (mongodb.status === "1") {
      
    }
    mongodb.status = "0";
    console.log({ error: err}, "MongoDB connection error.");
    process.exit(0);
  });
};

module.exports = handleDbEvents;
