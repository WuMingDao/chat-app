import pino from "pino";
import pinoHttp from "pino-http";

const transprts = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: "./src/logs/all-logs.log", mkdir: true },
      level: "info",
    },
    {
      target: "pino/file",
      options: { destination: "./src/logs/error.log", mkdir: true },
      level: "error",
    },
    {
      target: "pino-pretty",
      options: { colors: true },
      level: "info",
    },
  ],
});

export const logger = pino(transprts);

export const pinoHttpMiddleware = pinoHttp({
  logger,
  customLogLevel: function (_req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
});
