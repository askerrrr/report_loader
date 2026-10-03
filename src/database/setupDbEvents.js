import { logger } from "../logger.js";
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

    logger.info({ reconnectAttempts });

    try {
      await dbInstance.connect(process.env.MONGO_URI, getClientOptions());
    } catch (err) {
      logger.fatal(`Reconnect attempt failed: ${err?.message || err}`);

      currentDelay = Math.min(currentDelay * 2, MAX_DELAY_MS);
      reconnectTimer = setTimeout(tryConnect, currentDelay);
    }
  };

  reconnectTimer = setTimeout(tryConnect, 300);
};

var setupDbEvents = (dbInstance) => {
  if (eventsConfigured) return;
  eventsConfigured = true;

  dbInstance.connection.on("error", (err) => {
    logger.fatal(`mongoose connection error: ${err?.message || err}`);
  });

  dbInstance.connection.on("disconnected", () => {
    logger.warn("---------- DB DISCONNECTED ----------");
    scheduleReconnect(dbInstance);
  });

  dbInstance.connection.on("connected", () => {
    if (isReconnecting) {
      logger.info("---------- DB RECONNECTED ----------");
    } else {
      logger.info("---------- DB CONNECTED ----------");
    }
    resetReconnectState();
  });

  databaseEmitter.on("connection_error", () => {
    logger.fatal("---------- DB CONNECTION ERROR ----------");
    scheduleReconnect(dbInstance);
  });
};

export default setupDbEvents;
