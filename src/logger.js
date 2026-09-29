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

var logger = pino(defaultOptions, pino.destination({ dest: "logs/app.log" }));
var errorLogger = pino(
  defaultOptions,
  pino.destination({ dest: "logs/err.log" }),
);

export { logger, errorLogger };
