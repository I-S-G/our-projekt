import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import Navbar from "@/components/navbar";
import ModalProvider from "@/components/providers/modals-provider";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const galindo = localFont({
  src: "../fonts/galindo-v26-latin-regular.woff2",
  variable: "--font-galindo",
  display: "swap",
});

const inter = localFont({
  src: [
    {
      path: "../fonts/inter-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

const roboto = localFont({
  src: [
    {
      path: "../fonts/roboto-v51-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Projekt",
  description: "A platform to share your projects",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({headers: await headers()});

  return (
    <html
      lang="en"
      className={cn(
        galindo.variable,
        roboto.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar session= {session} />
        {children}
        <ModalProvider />
      </body>
    </html>
  );
}
