import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function getActiveTaskById(id: string) {
  return await client.task.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });
}
