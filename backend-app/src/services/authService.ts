import bcrypt from "bcrypt";

import { userType } from "../types/schema";
import prisma from "../utils/deHepler";

export async function signup(newUser: userType) {
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  console.log("user: ", user);
  console.log("password: ", password);
  console.log("user.password: ", user.password);

  const isVailPassword = await bcrypt.compare(password, user.password);

  return isVailPassword;
}
