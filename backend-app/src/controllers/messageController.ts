import { Request, Response } from "express";

import {
  getUserForSider as getUserForSiderApi,
  getMessages as getMessagesApi,
} from "../services/messageService";
import prisma from "../utils/deHepler";
import cloudinary from "../utils/cloudinaryHelper";
import { messageType } from "../types/schema";
export async function getUserForSider(req: Request, res: Response) {
  try {
    const userId = Number(req.body.id);
    // console.log(userId);

    const filterUsers = await getUserForSiderApi(userId);
    // console.log(filterUsers);

    return res.status(200).json({
      data: filterUsers,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getMessages(req: Request, res: Response) {
  try {
    const userToChatId = Number(req.params.id);
    const myId = Number(req.body.id);

    const messages = getMessagesApi(myId, userToChatId);

    res.status(200).json({
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function sendMessage(req: Request, res: Response) {
  try {
    const { image, content }: { image: string; content: string } = req.body;
    const receiverId = Number(req.params.id);
    const myId = Number(req.body.id);

    let imageUrl: string = "";
    // if (image) {
    //   try {
    //     const uploadResponse = await cloudinary.uploader.upload(image);
    //     imageUrl = uploadResponse.secure_url;
    //   } catch (error) {
    //     console.error("Image upload failed:", error);
    //     imageUrl = "";
    //   }
    // }

    const newMessage: messageType = {
      content,
      image: imageUrl,
      senderId: myId,
      receiverId,
    };

    const message = await prisma.message.create({ data: newMessage });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
