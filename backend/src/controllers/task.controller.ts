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

export async function getAllUserTasks(req: Request, res: Response) {
  try {
    const { id } = req.user;
    const specificTask = await client.task.findMany({
      where: { userId: id },
    });
    res
      .status(200)
      .send({ messsage: "successfully fetched the blog", specificTask });
  } catch (error) {
    res.status(500).send({ message: "error in fetching this specific task" });
  }
}

export async function getSpecificTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await client.task.findFirst({
      where: { id },
    });
    res.status(200).send({
      message: "successfully fetched the specific task",
    });
  } catch (error) {
    res.status(500).send({ message: "error fetching this specific task" });
  }
}

export async function updateTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    await client.task.update({
      where: {
        id,
      },
      data: {
        title: title && title,
        description: description && description,
      },
    });

    res.status(200).send({ message: "successfully updated the task" });
  } catch (error) {
    res.status(500).send({ message: "failed to update this task" });
  }
}
