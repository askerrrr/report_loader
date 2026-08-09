import { MongoClient } from "mongodb";
import { databaseEmitter, serverEmitter } from "../customEvent/index.js";

var timerId = null;
var eventsConfigured = false;
var dbReconnectionAttempts = 1;
var NEXT_CONNECTION_MS = 30_000;
var dbConnectionRestored = false;
var isFailedAfterFirstSuccessConnection = true;

var setupDbEvents = (dbClient) => {
  if (eventsConfigured) {
    return;
  }

  eventsConfigured = true;

  console.log("connection to mongodb...\n");

  dbClient.on("error", (e) => {
    console.log("mongodb connection error: ", { name: e.name, msg: e.message });
  });

  dbClient.on("serverHeartbeatFailed", async (e) => {
    if (!timerId) {
      databaseEmitter.emit("connection_error");
    }
  });

  dbClient.on("serverHeartbeatSucceeded", async () => {
    isFailedAfterFirstSuccessConnection = false;
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;

      dbConnectionRestored = true;
      dbClient.db("admin").command({ killAllSessions: [] });

      console.info("serverHeartbeatSucceeded\n", { dbReconnectionAttempts, dbConnectionRestored }, "\n");
      dbReconnectionAttempts = 0;

      console.info("---------- DB CONNECTED ----------\n");

      serverEmitter.emit("start");
    }
  });

  databaseEmitter.on("connection_error", async () => {
    isFailedAfterFirstSuccessConnection = false;
    if (!timerId) {
      serverEmitter.emit("close");
      dbConnectionRestored = false;

      timerId = setInterval(async () => {
        // console.clear();
        console.info("into connection_error", { dbReconnectionAttempts });
        dbReconnectionAttempts++;

        try {
          await dbClient.connect();
        } catch (e) {
          if (e.message.startsWith("connect ECONNREFUSED")) {
            clearInterval(timerId);
            timerId = null;
            databaseEmitter.emit("connection_error");
          }
        }
      }, NEXT_CONNECTION_MS);
    }
  });

  dbClient.on("open", async () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;

      dbConnectionRestored = true;
      dbClient.db("admin").command({ killAllSessions: [] });

      console.info({ dbReconnectionAttempts, dbConnectionRestored }, "\n");
      dbReconnectionAttempts = 0;

      console.info("---------- DB CONNECTED ----------\n");
      serverEmitter.emit("start");
    }
  });
};

export default setupDbEvents;
