"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/customUI/input";
import CustomTextArea from "@/components/customUI/textArea";
import { Button } from "@/components/ui/button";

const createProjectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be atleast 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be atleast 10 characters")
    .max(800, "Description cannot exceed 800 characters"),
  image: z
    .custom<FileList>()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Please select an image",
    )
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "Only images are allowed",
    ),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

export default function Create() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
  });

  const onSubmit = async (data: CreateProjectForm) => {
    const image = data.image?.[0];
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", image);

    try {
      if (!image) throw new Error("Image not found");

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("An Error Occured: ", error);
    }
  };

  return (
    <div className="container mx-auto pt-10 flex items-center flex-col">
      <h1 className=" font-title text-h1-mobile sm:text-h1 pb-8">
        {" "}
        Post a Project{" "}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <CustomInput
          {...register("title")}
          error={errors.title?.message}
          className="w-md max-w-[80vw]"
          label="Project Title"
        />
        <CustomTextArea
          {...register("description")}
          error={errors.description?.message}
          label="Project Description"
        />
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <CustomInput
              label="Upload Your Project Image"
              type="file"
              accept="image/*"
              error={errors.image?.message}
              onChange={(e) => field.onChange(e.target.files)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
            />
          )}
        />
        <Button className="font-link" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Project"}{" "}
        </Button>
      </form>
    </div>
  );
}
