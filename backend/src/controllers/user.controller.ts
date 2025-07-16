import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

export async function registerUser(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      avatar = null,
      userName,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        avatar,
        userName,
      },
    });
    res.status(201).send({ message: "you have successfully being registered" });
  } catch (error) {
    res.status(500).send({ message: "failed to sign you up" });
  }
}
