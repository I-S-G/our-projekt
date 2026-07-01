import ProjectCard from "@/components/projectCard";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SearchIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SortDropDown from "./sortDropDown";
import { Button } from "@/components/ui/button";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");

  const { search = "", sort = "newest" } = await searchParams;

  let orderBy;

  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" as const };
      break;

    case "liked":
      orderBy = { likesCount: "desc" as const };
      break;

    case "commented":
      orderBy = { commentsCount: "desc" as const };
      break;

    default:
      orderBy = { createdAt: "desc" as const };
  }

  const projects = await prisma.project.findMany({
    where: {
      //using AND just incase i add other filters in the future
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      ],
    },
    orderBy,
    include: {
      author: true,
      Likes: true,
      Dislikes: true,
    },
  });

  return (
    <div className="container mx-auto font-link pt-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-end">
        <SortDropDown />
        <form className="relative flex  gap-2.5">
          <SearchIcon className="text-dark-grey absolute top-[50%] translate-y-[-50%] left-4" />
          <input
            name="search"
            placeholder="Search"
            className=" border-dark-grey border-2 pl-14 py-2.5 rounded-xs "
          />
          <Button type="submit" className="py-6 px-4 cursor-pointer">
            GO
          </Button>
        </form>
      </div>

      {search && (
        <h2 className="font-title text-center text-3xl py-10">
          Search Results For: {search}
        </h2>
      )}
      <div className="grid justify-items-center auto-rows-fr py-10 place-items-center lg:grid-cols-3 gap-10">
        {projects &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              projectID= {project.id}
              name={project.author.name}
              title={project.title}
              icon={project.author.image}
              image={project.image}
              description={project.description}
              likes={project.likesCount}
              dislikes={project.dislikesCount}
              comments={project.commentsCount}
              liked= {project.Likes.find((like) => like.userID === session.user.id)? true: false}
              disliked= {project.Dislikes.find((dislike) => dislike.userID === session.user.id)? true: false}
            />
          ))}
      </div>
    </div>
  );
}
