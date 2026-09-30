import mongoose from "mongoose";
import { logger } from "../logger.js";
import setupDbEvents from "./setupDbEvents.js";
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

    serverEmitter.emit("start");
  } catch (err) {
    logger.fatal({ err });

    databaseEmitter.emit("connection_error");
  }
};

export { runDB, dbClient };
