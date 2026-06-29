"use client";

import { ProfileIcon } from "./svgs";
import { Heart, MessageCircle, ThumbsDown } from "lucide-react";
import { CldImage } from "next-cloudinary";

type ProjectCardProps = {
  icon?: string | null;
  name: string;
  title: string;
  image: string;
  description: string;
  likes: number;
  dislikes: number;
  comments: number;
};

export default function ProjectCard(props: ProjectCardProps) {
  const { icon, name, title, image, description, likes, dislikes, comments } =
    props;
  return (
    <div className="flex flex-col w-full h-full max-w-[90vw] border border-black rounded-sm px-5 py-8 gap-6">
      <div className="flex items-center gap-2.5">
        {icon ? (
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-black">
            <CldImage
              src={icon}
              alt="profile icon"
              width={34}
              height={34}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <ProfileIcon />
        )}
        <span>{name}</span>
      </div>
      <div className=" flex flex-col items-center">
        <h2 className="text-center font-title pb-2"> {title} </h2>
        <div className="w-full h-96 relative overflow-hidden rounded-sm">
          <CldImage
            src={image}
            alt="project image"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
        <p className="leading-tight self-start pt-4"> {description} </p>
      </div>
      <div className="flex gap-6 mt-auto ">
        <div>
          <Heart />
          {likes}
        </div>
        <div>
          <ThumbsDown />
          {dislikes}
        </div>
        <div>
          <MessageCircle />
          {comments}
        </div>
      </div>
    </div>
  );
}
