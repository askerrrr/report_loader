import { MongoClient, ClientEncryption } from "mongodb";

var timerId = null;
var connectionAttempts = 0;
var eventsConfigured = false;
var mongodbReconnected = false;
var MAX_CONNECTION_ATTEMPTS = 5;

var keyVaultNamespace = process.env.KEY_VAULT_NAME_SPACE;
var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

var autoEncryption = { kmsProviders, extraOptions, keyVaultNamespace, bypassAutoEncryption: true };
var options = { autoEncryption };

var dbClient = new MongoClient(process.env.MONGO_URI, options);

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

    timerId = setTimeout(async () => {
      await dbClient.connect();
    }, 1000);

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
    console.log("mongodb connected\n");
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
  await dbClient.connect();

  await killAllSessions();
};

export { runDB, dbClient };
