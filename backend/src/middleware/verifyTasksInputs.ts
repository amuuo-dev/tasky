import { Request, Response, NextFunction } from "express";

export function verifyTasksInputs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, descritption } = req.body;
  if (!title) {
    res.status(400).send({ message: "title is required" });
    return;
  }
  if (!descritption) {
    res.status(400).send({ message: "description is required " });
    return;
  }
  next();
}
