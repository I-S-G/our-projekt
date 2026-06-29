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
import { signIn } from "@/lib/actions/auth-actions";

/* ---------------- Schema ---------------- */
const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInModal() {
  const { activeModal, closeModal, openModal } = useModalStore();
  const router = useRouter();

  const isOpen = activeModal === "signin";

  /* ---------------- React Hook Form ---------------- */
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: SignInFormValues) => {
    const { email, password } = data;

    try {
      const result = await signIn(email, password);
      if (!result.user) throw new Error("Sign in failed");
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
          <DialogTitle>Sign in</DialogTitle>
          <DialogDescription>
            Enter your email and password to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="you@example.com" {...register("email")} />
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

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Footer actions */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-4">
          <button
            type="button"
            onClick={() => openModal("signup")}
            className="hover:underline text-left"
          >
            Don’t have an account?{" "}
            <span className=" text-indigo-700">Sign up</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
