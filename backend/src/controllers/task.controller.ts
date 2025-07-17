import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description, userId } = req.body;
    const { id } = req.user;
    const createdTask = await client.task.create({
      data: {
        title,
        description,
        userId: id,
      },
    });

    res
      .status(201)
      .send({ message: "successfully created a task", createdTask });
  } catch (error) {
    res.status(500).send({ message: "failed to create task" });
  }
}
