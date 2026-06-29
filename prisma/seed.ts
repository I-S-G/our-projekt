import prisma from "@/lib/prisma";

async function seed() {
  await prisma.project.createMany({
    data: [
      {
        authorID: "QtujDW6laDENmUMSWSX2iwQvyh0lmjfx",
        image: "main-sample",
        title: "Test Project",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      },
      {
        authorID: "QtujDW6laDENmUMSWSX2iwQvyh0lmjfx",
        image: "main-sample",
        title: "Test Project",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      },
      {
        authorID: "QtujDW6laDENmUMSWSX2iwQvyh0lmjfx",
        image: "main-sample",
        title: "Test Project",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
      },
    ],
  });
}
seed().then(() => prisma.$disconnect());
