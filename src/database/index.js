var { MongoClient } = require("mongodb");

var client = new MongoClient(process.env.MONGO_URI);

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongodbReconnected = false;
const MAX_CONNECTION_ATTEMPTS = 5;

var mongodbConnection = async () => await client.connect();

var setupMongoDBEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;

  console.log("connection to mongodb...\n");

  client.on("error", (e) => {
    console.log("mongodb connection error: ", { name: e.name, msg: e.message });
    client.close();
  });

  client.on("serverClosed", () => {
    console.log("mongodb disconnected\n");

    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    timerId = setTimeout(mongodbConnection, 1000);

    if (connectionAttempts === MAX_CONNECTION_ATTEMPTS) {
      clearTimeout(timerId);
      timerId = null;
      client.removeAllListeners();
      console.log("mongodb connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  client.on("serverOpening", () => {
    if (timerId) {
      console.clear();
      console.log("mongodb reconnected\n");

      mongodbReconnected = true;
      clearTimeout(timerId);
      timerId = null;
      serverEmitter.emit("start");
    }

    if (!mongodbReconnected) {
      console.clear();
      console.log("mongodb connected\n");
    }

    mongodbReconnected = false;
    connectionAttempts = 0;
  });
};

var runDB = async () => {
  setupMongoDBEvents();
  await mongodbConnection();
};

module.exports = { runDB, connection: client };
