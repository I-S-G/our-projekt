import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 backdrop-blur-md bg-navbar py-6 shadow ">
      <Link href="/">
        <p className="font-link"> Our Projekt </p>
      </Link>
      <nav className="flex gap-8">
        <Link href="/sign-in" className="font-link"> Sign In </Link>
        <Link href="/sign-up" className="font-link"> Sign Up </Link>
      </nav>
    </header>
  );
}
