"use client";

import { ProfileIcon } from "./svgs";
import { Heart, MessageCircle, ThumbsDown } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

type ProjectCardProps = {
  projectID: string;
  icon?: string | null;
  name: string;
  title: string;
  image: string;
  description: string;
  likes: number;
  dislikes: number;
  comments: number;
  liked: boolean;
  disliked: boolean;
};

export default function ProjectCard(props: ProjectCardProps) {
  const {
    projectID,
    icon,
    name,
    title,
    image,
    description,
    likes,
    dislikes,
    comments,
    liked,
    disliked,
  } = props;

  const [like, setLike] = useState<boolean>(liked);

  const onLike = async () => {
    setLike(true);

    try {
      await fetch(`/api/projects/${projectID}/like`, {
        method: "POST",
      });
    } catch (error) {
      console.error("An error occured liking the project:", error);
      setLike(false);
    }
  };

  const undoLike = async () => {
    setLike(false);
    try {
      await fetch(`/api/projects/${projectID}/like`, { method: "DELETE" });
    } catch (error) {
      console.error("An error occured liking the project:", error);
      setLike(true);
    }
  };

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
          {like ? (
            <Heart fill="red" color="red" className="cursor-pointer" onClick={undoLike} />
          ) : (
            <Heart className="cursor-pointer" onClick={onLike} />
          )}
          {likes}
        </div>
        <div>
          {disliked ? (
            <ThumbsDown fill="red" color="red" className="cursor-pointer" />
          ) : (
            <ThumbsDown className="cursor-pointer" />
          )}
          {dislikes}
        </div>
        <div>
          <MessageCircle className="cursor-pointer" />
          {comments}
        </div>
      </div>
    </div>
  );
}
