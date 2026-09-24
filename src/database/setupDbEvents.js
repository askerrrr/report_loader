import getClientOptions from "./getClientOptions.js";
import { serverEmitter, databaseEmitter } from "../customEvent/index.js";

var MAX_DELAY_MS = 60_000;
var INITIAL_DELAY_MS = 1_000;

var eventsConfigured = false;
var isReconnecting = false;
var reconnectAttempts = 0;
var currentDelay = INITIAL_DELAY_MS;
var reconnectTimer = null;

var clearReconnectTimer = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

var resetReconnectState = () => {
  isReconnecting = false;
  reconnectAttempts = 0;
  currentDelay = INITIAL_DELAY_MS;
  clearReconnectTimer();
};

var scheduleReconnect = (dbInstance) => {
  if (isReconnecting) return;

  isReconnecting = true;
  serverEmitter.emit("close");

  var tryConnect = async () => {
    if (!isReconnecting) return;

    reconnectAttempts += 1;

    console.clear();
    console.log({ attempt: reconnectAttempts });

    try {
      await dbInstance.connect(process.env.MONGO_URI, getClientOptions());
    } catch (err) {
      console.error("Reconnect attempt failed:", err?.message || err);

      currentDelay = Math.min(currentDelay * 2, MAX_DELAY_MS);
      console.log({ nextDelayMs: currentDelay });
      reconnectTimer = setTimeout(tryConnect, currentDelay);
    }
  };

  reconnectTimer = setTimeout(tryConnect, 300);
};

var setupDbEvents = (dbInstance) => {
  if (eventsConfigured) return;
  eventsConfigured = true;

  dbInstance.connection.on("error", (err) => {
    console.error("mongoose connection error:", err?.message || err);
  });

  dbInstance.connection.on("disconnected", () => {
    console.log("mongoose disconnected");
    scheduleReconnect(dbInstance);
  });

  dbInstance.connection.on("connected", () => {
    if (isReconnecting) {
      console.log("mongoose reconnected");
    } else {
      console.log("mongoose connected");
    }
    resetReconnectState();
  });

  databaseEmitter.on("connection_error", () => {
    console.log("databaseEmitter: connection_error");
    scheduleReconnect(dbInstance);
  });
};

export default setupDbEvents;
