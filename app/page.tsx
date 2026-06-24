import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main className="px-5">
        <div className="grid gap-y-8 lg:grid-cols-2 items-center mt-20 lg:mt-32">
          <div className=" flex flex-col items-center gap-8 lg:items-start ">
            <h1 className="font-heading text-h1-mobile sm:text-h1 leading-tight">
              Ship Your Ideas. Get Real Feedback.
            </h1>
            <p className="font-subtitle text-dark-grey">
              Share side projects, portfolios, apps, and experiments. Receive
              constructive feedback from the community and help others improve
              their work.
            </p>
            <Button className="w-fit px-6 py-6"> Get Started </Button>
          </div>
          <Image
            width={1319}
            height={1074}
            src="/images/hero.png"
            alt="An illustraion of a guy standing on top of an open head, ready to dive into the brain"
          />
        </div>
      </main>
    </div>
  );
}
