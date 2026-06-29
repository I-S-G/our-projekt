"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useModalStore } from "@/stores/modal-store";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions";
import { ProfileIcon } from "./svgs";

type Session = typeof auth.$Infer.Session;

export default function Navbar({ session }: { session: Session | null }) {
  const openModal = useModalStore((state) => state.openModal);

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 backdrop-blur-md bg-navbar py-6 shadow container mx-auto">
      <Link href="/">
        <p className="font-link"> Our Projekt </p>
      </Link>
      {!session && (
        <nav className="flex gap-x-8">
          <button
            onClick={() => openModal("signin")}
            className="font-link cursor-pointer"
          >
            {" "}
            Sign In{" "}
          </button>
          <button
            onClick={() => openModal("signup")}
            className="font-link cursor-pointer"
          >
            {" "}
            Sign Up{" "}
          </button>
        </nav>
      )}
      {session && (
        <div className="font-link flex gap-x-4 sm:gap-x-10 items-center">
          <Link href={"/create"} className="cursor-pointer">
            {" "}
            Create{" "}
          </Link>
          <button onClick={onSignOut} className="cursor-pointer">
            {" "}
            Sign out{" "}
          </button>
          <div className="flex items-center cursor-pointer sm:gap-x-2.5">
            {session.user.image ? (
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-black">
                <CldImage
                  src={session.user.image}
                  alt="profile image"
                  width={34}
                  height={34}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <ProfileIcon />
            )}
            <span className="hidden sm:inline"> {session.user.name} </span>
          </div>
        </div>
      )}
    </header>
  );
}
