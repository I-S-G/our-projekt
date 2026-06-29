import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            }
        })
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Error fetchin jobs: ", error);
        return new NextResponse("Internal server error", { status: 500});
    }
}