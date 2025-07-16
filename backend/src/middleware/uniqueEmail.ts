import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function uniqueEmail(req: Request, res: Response) {
  const { email } = req.body;
  const similarEmail = await client.user.findFirst({
    where: { email },
  });
  if (similarEmail) {
    res
      .status(401)
      .send({ message: "this email is already taken, enter different email" });
    return;
  }
}
