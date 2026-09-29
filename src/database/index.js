import mongoose from "mongoose";
import setupDbEvents from "./setupDbEvents.js";
import { logger, errorLogger } from "../logger.js";
import getClientOptions from "./getClientOptions.js";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var dbClient = mongoose.connection;

var killAllSessions = async () =>
  await dbClient.db.command({ killAllSessions: [] });

var runDB = async () => {
  try {
    setupDbEvents(mongoose);

    await mongoose.connect(process.env.MONGO_URI, getClientOptions());
    await mongoose.syncIndexes();

    logger.info("---------- DB CONNECTED ----------");
    serverEmitter.emit("start");
  } catch (err) {
    errorLogger.info({ err });

    databaseEmitter.emit("connection_error");
  }
};

export { runDB, dbClient };
