import express from "express";
import cors from "cors";
import { Express } from "express";

import authRouter from "./routes/authRouter";
import { verifyToken } from "./utils/jwtHelper";
import { pinoHttpMiddleware } from "./utils/loggerHelper";

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.LOCAL_FRONTEND_URL,
    credentials: true,
  })
);

app.use(pinoHttpMiddleware);

app.use("/v1", authRouter);

app.use(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authorization.split(" ")[1];
  await verifyToken(token);

  next();
});

export default app;
