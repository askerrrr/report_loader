import mongoose from "mongoose";
import setupDbEvents from "./setupDbEvents.js";
import getClientOptions from "./getClientOptions.js";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var dbClient = mongoose.connection;

var killAllSessions = async () => await dbClient.db.command({ killAllSessions: [] }).then(() => console.log("old sessions killed"));

var runDB = async () => {
  try {
    setupDbEvents(mongoose);

    await mongoose.connect(process.env.MONGO_URI, getClientOptions());

    await killAllSessions();
    console.info("---------- DB CONNECTED ----------\n");

    serverEmitter.emit("start");
  } catch (e) {
    console.log(e.message.toUpperCase());

    databaseEmitter.emit("connection_error");
  }
};

export { runDB, dbClient };
