import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  signup as signupApi,
  login as loginApi,
} from "../services/authService";
import { userSchema, userType } from "../types/schema";
import { generateToken } from "../utils/jwtHelper";

export async function signup(req: Request, res: Response) {
  const { fullName, email, password, profile } = req.body;

  const newUser: userType = {
    fullName,
    email,
    password,
    profile,
  };

  const { success } = userSchema.safeParse(newUser);

  if (!success) {
    res.status(400).json({ error: "Invalid user data" });
    throw new Error("Invalid user data");
  }

  const encryptPassword = await bcrypt.hash(newUser.password, 10);

  newUser.password = encryptPassword;

  const user = await signupApi(newUser);

  const token = await generateToken(user.email);

  res.status(201).json({ data: user, Token: token });
  //   res.status(201).json({ data: user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const loginSchema = userSchema.pick({ email: true, password: true });
  const { success } = loginSchema.safeParse({ email, password });

  if (!success) {
    res.status(400).json({ error: "Invalid user data" });
    throw new Error("Invalid user data");
  }

  const isVailPassword = await loginApi(email, password);

  if (!isVailPassword) {
    res.status(401).json({ error: "Invalid password" });
    throw new Error("Invalid password");
  }

  return res.status(200).json({ message: "Login successful" });
}
