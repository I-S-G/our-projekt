"use client";

import Link from "next/link";
import { useModalStore } from "@/stores/modal-store";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions";

type Session = typeof auth.$Infer.Session;

export default function Navbar({ session }: { session: Session | null }) {
  const openModal = useModalStore((state) => state.openModal);

  const onSignOut = async() => {
    try {
      await signOut();
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <header className="flex justify-between items-center px-6 backdrop-blur-md bg-navbar py-6 shadow container mx-auto">
      <Link href="/">
        <p className="font-link"> Our Projekt </p>
      </Link>
      {!session && (
        <nav className="flex gap-8">
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
        <button onClick={onSignOut} className="font-link" > Sign out </button>
      )
      }
    </header>
  );
}
