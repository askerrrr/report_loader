import pino from "pino";

var defaultOptions = {
  formatters: {
    level: (label) => ({ l: label }),
    bindings: (bindings) => {
      var { hostname } = bindings;
      return { h: hostname };
    },
  },
  timestamp: () => `,"t":"${new Date().toISOString()}"`,
};

var streams = [
  { level: "trace", stream: process.stdout },
  { level: "warn", stream: process.stderr },
];

var logger = pino(defaultOptions, pino.multistream(streams));
var errorLogger = pino(defaultOptions, pino.multistream(streams));

export { logger, errorLogger };
