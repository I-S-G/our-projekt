import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || !session?.user.id) {
    return new NextResponse("Unauthorized access", { status: 401 });
  }

  try {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Image wasn't found" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadedImage = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "our-projekt",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      stream.end(buffer);
    });

    const project = await prisma.project.create({
      data: {
        title: title,
        description: description,
        image: uploadedImage.secure_url,
        authorID: session.user.id,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetchin jobs: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
