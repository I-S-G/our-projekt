import ProjectCard from "@/components/projectCard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ChevronDown, SearchIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: true,
      _count: {
        select: {
          Likes: true,
          Dislikes: true,
          Comments: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto font-link pt-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row lg:justify-end">
        <div className="relative">
          <SearchIcon className="text-dark-grey absolute top-[50%] translate-y-[-50%] left-4" />
          <input
            placeholder="Search"
            className=" border-dark-grey border-2 pl-14 py-2.5 rounded-xs "
          />
        </div>
        <button className="flex text-dark-grey cursor-pointer ">
          <span> Most Recent </span>
          <ChevronDown />
        </button>
      </div>

      <div className="grid justify-items-center auto-rows-fr py-10 place-items-center lg:grid-cols-3 gap-10">
        {projects &&
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.author.name}
              title={project.title}
              icon={project.author.image}
              image={project.image}
              description={project.description}
              likes={project._count.Likes}
              dislikes={project._count.Dislikes}
              comments={project._count.Comments}
            />
          ))}
      </div>
    </div>
  );
}
