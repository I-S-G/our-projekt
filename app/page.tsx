import Hero from "@/components/hero";
import Mission from "@/components/mission";

export default function Home() {
  return (
    <div className="container mx-auto">
      <main className="px-5">
        <Hero />
        <Mission />
      </main>
    </div>
  );
}
