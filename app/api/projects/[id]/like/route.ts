import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || !session?.user.id) {
    return new NextResponse("Unauthorized access", { status: 401 });
  }

  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id: id },
    });
    if (!project) return new NextResponse("Project not found", { status: 404 });

    const res = await prisma.$transaction([
      prisma.like.create({
        data: {
          projectID: id,
          userID: session.user.id,
        },
      }),
      prisma.project.update({
        where: {
          id: id,
        },
        data: {
          likesCount: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error creating like: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || !session.user.id)
    return new NextResponse("Unauthorized access", { status: 401 });

  try {
    const projectID = (await params).id;
    const like = await prisma.like.findUnique({
      where: {
        userID_projectID: {
          userID: session.user.id,
          projectID: projectID,
        },
      },
    });

    if (!like) return new NextResponse("Cannot find like", { status: 404 });
    const res = await prisma.$transaction([
      prisma.like.delete({
        where: {
          userID_projectID: {
            projectID: projectID,
            userID: session.user.id,
          },
        },
      }),
      prisma.project.update({
        where: {
          id: projectID,
        },
        data: {
          likesCount: {
            decrement: 1,
          },
        },
      }),
    ]);

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error removing like: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
