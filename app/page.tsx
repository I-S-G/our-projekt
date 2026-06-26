import Hero from "@/components/hero";
import Mission from "@/components/mission";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth.api.getSession({headers: await headers()});
  if(session) {
    redirect("/dashboard");
  }

  return (
    <div className="container mx-auto">
      <main className="px-5">
        <Hero />
        <Mission />
      </main>
    </div>
  );
}
