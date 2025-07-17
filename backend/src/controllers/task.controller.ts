import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getActiveTaskById } from "../helpers/getActiveTaskById";

const client = new PrismaClient();

export async function createTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
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
      where: {
        userId: id,
        isDeleted: false,
      },
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
    const task = await getActiveTaskById(id);

    if (!task) {
      res.status(404).send({ message: "Task not found or has been deleted" });
      return;
    }

    res.status(200).send({
      message: "successfully fetched the specific task",
      task,
    });
  } catch (error) {
    res.status(500).send({ message: "error fetching this specific task" });
  }
}

export async function updateTaskById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const existingTask = await getActiveTaskById(id);

    if (!existingTask) {
      res.status(404).send({ message: "Task not found or has been deleted" });
      return;
    }

    await client.task.update({
      where: { id },
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

export async function markTaskAsDeleted(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await client.task.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    res.status(200).send({ message: "successfully mark task as deleted" });
  } catch (error) {
    res.status(500).send({ message: "error in marking task as deleted" });
  }
}

export async function restoreDeletedTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const task = await client.task.findFirst({
      where: {
        id,
        isDeleted: true,
      },
    });

    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found or is not deleted" });
    }

    await client.task.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });

    res.status(200).send({ message: "successfully restored deleted message" });
  } catch (error) {
    res.status(500).send({ message: "error restoring the deleted task" });
  }
}
