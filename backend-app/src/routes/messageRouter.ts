import exopress, { Router } from "express";
import {
  getMessages,
  getUserForSider,
  sendMessage,
} from "../controllers/messageController";

const messageRouter: Router = exopress.Router();

messageRouter.get("/users", getUserForSider);
messageRouter.get("/:id", getMessages);
messageRouter.post("/send/:id", sendMessage);

export default messageRouter;
