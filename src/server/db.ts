import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const migrate = async () => {
  const seed = {
    uuid: "21887533-6ebd-48a6-86e2-d9267ab8c719",
    note: "write a todo",
    done: false,
    archived: false
  };
  const note = await prisma.note.upsert({
    where: { uuid: seed.uuid },
    update: seed,
    create: seed
  });

  // eslint-disable-next-line no-console
  console.log("seeded db with", note);
};
