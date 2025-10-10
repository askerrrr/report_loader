var env = require("../env");
var mongoose = require("mongoose");

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongooseReconnected = false;
const MAX_CONNECTION_ATTEMPTS = 5;

var mongooseConnection = async () => await mongoose.connect(env.MONGO_URI);

var setupMongooseEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;
  console.log("connection to mongoose...\n");

  mongoose.connection.on("error", (e) => {
    console.log("mongoose connection error: ", { name: e.name, msg: e.message });
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", async () => {
    console.log("mongoose disconnected\n");

    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    timerId = setTimeout(mongooseConnection, 1000);

    if (connectionAttempts === MAX_CONNECTION_ATTEMPTS) {
      clearTimeout(timerId);
      timerId = null;
      mongoose.connection.removeAllListeners();
      console.log("mongoose connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  mongoose.connection.on("connected", async () => {
    if (timerId) {
      console.clear();
      console.log("mongoose reconnected\n");

      mongooseReconnected = true;
      clearTimeout(timerId);
      timerId = null;
      serverEmitter.emit("start");
    }

    if (!mongooseReconnected) {
      console.clear();
      console.log("mongoose connected\n");
    }

    mongooseReconnected = false;
    connectionAttempts = 0;
  });
};

var runDB = async () => {
  setupMongooseEvents();
  await mongooseConnection();
};

module.exports = { runDB, connection: mongoose.connection };
