import { MongoClient } from "mongodb";

var dbClient = new MongoClient(process.env.MONGO_URI);

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongodbReconnected = false;
var MAX_CONNECTION_ATTEMPTS = 5;

var mongodbConnection = async () => await dbClient.connect();

var setupMongoDBEvents = () => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;

  console.log("connection to mongodb...\n");

  dbClient.on("error", (e) => {
    console.log("mongodb connection error: ", { name: e.name, msg: e.message });
    dbClient.close();
  });

  dbClient.on("serverClosed", () => {
    console.log("mongodb disconnected\n");

    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }

    timerId = setTimeout(mongodbConnection, 1000);

    if (connectionAttempts === MAX_CONNECTION_ATTEMPTS) {
      clearTimeout(timerId);
      timerId = null;
      dbClient.removeAllListeners();
      console.log("mongodb connection was been destroed");

      return;
    }

    connectionAttempts++;
  });

  dbClient.on("serverOpening", () => {
    if (timerId) {
      console.clear();
      console.log("mongodb reconnected\n");

      mongodbReconnected = true;
      clearTimeout(timerId);
      timerId = null;
    }

    if (!mongodbReconnected) {
      console.clear();

      console.log("mongodb connected\n");
    }

    mongodbReconnected = false;
    connectionAttempts = 0;
  });
};

var killAllSessions = async () =>
  dbClient
    .db("admin")
    .command({ killAllSessions: [] })
    .then(() => console.log("all sessions killed"));

var runDB = async () => {
  setupMongoDBEvents();
  await mongodbConnection();
  await killAllSessions();
};

export { runDB, dbClient };
