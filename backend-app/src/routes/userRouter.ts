import express, { Router } from "express";
import prisma from "../utils/deHepler";

const userRouter: Router = express.Router();

userRouter.get("/", async (req, res) => {
  const allUser = await prisma.user.findMany();

  return res.status(200).json({
    data: allUser,
  });
});

export default userRouter;
