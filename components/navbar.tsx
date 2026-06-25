'use client'

import Link from "next/link";
import { useModalStore } from "@/stores/modal-store";

export default function Navbar() {

  const openModal = useModalStore((state) => state.openModal)

  return (
    <header className="flex justify-between items-center px-6 backdrop-blur-md bg-navbar py-6 shadow container mx-auto">
      <Link href="/">
        <p className="font-link"> Our Projekt </p>
      </Link>
      <nav className="flex gap-8">
        <button onClick={() => openModal('signin')} className="font-link"> Sign In </button>
        <button onClick={() => openModal('signup')} className="font-link"> Sign Up </button>
      </nav>
    </header>
  );
}
