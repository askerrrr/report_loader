import setupDbEvents from "./setupDbEvents.js";
import { MongoClient, ClientEncryption } from "mongodb";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var kmsProviders = { local: { key: process.env.MONGO_LOCAL_MASTER_KEY } };
var extraOptions = { cryptSharedLibPath: process.env.MONGO_CRYPT_SHARED_PATH, cryptSharedLibRequired: true };

var autoEncryption = { kmsProviders, extraOptions, keyVaultNamespace: process.env.KEY_VAULT_NAME_SPACE, bypassAutoEncryption: true };
var options = { autoEncryption, connectTimeoutMS: 5000, ...JSON.parse(process.env.MONGO_AUTH_OPTIONS) };

var dbClient = new MongoClient(process.env.MONGO_URI, options);
setupDbEvents(dbClient);

var killAllSessions = async () => dbClient.db("admin").command({ killAllSessions: [] });

var runDB = async () => {
  try {
    await dbClient.connect();

    await killAllSessions();
    console.info("---------- DB CONNECTED ----------\n");

    serverEmitter.emit("start");
  } catch (e) {
    console.log(e.message.toUpperCase());

    if (e.message.startsWith("connect ECONNREFUSED")) {
      serverEmitter.emit("close");
      databaseEmitter.emit("connection_error");
    }
  }
};

export { runDB, dbClient };
