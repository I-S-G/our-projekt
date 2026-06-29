"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModalStore } from "@/stores/modal-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth-actions";

/* ---------------- Schema ---------------- */
const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "name must be at least 3 characters")
      .max(20, "name must be at most 20 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // shows error under confirmPassword field
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpModal() {
  const { activeModal, closeModal, openModal } = useModalStore();
  const router = useRouter();

  const isOpen = activeModal === "signup";

  /* ---------------- React Hook Form ---------------- */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: SignUpFormValues) => {
    const { name, email, password } = data;
    try {
      const result = await signUp(email, password, name);
      console.log(result);

      if (!result.user) throw new Error("Failed to sign up");
      reset();
      closeModal();
      router.replace("/home");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-md font-link">
        <DialogHeader>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogDescription>Enter your details to continue.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* name */}
          <div className="space-y-2">
            <Label> Display Name </Label>
            <Input placeholder="Display Name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label> Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        {/* Footer actions */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
          <button
            type="button"
            onClick={() => openModal("signin")}
            className="hover:underline text-left"
          >
            Already have an account?{" "}
            <span className=" text-indigo-700">Sign in</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
