import Image from "next/image";
import { Button } from "@/components/ui/button";


export default function Hero() {
  return (
    <div className="grid gap-y-8 lg:grid-cols-2 items-center pt-20 lg:pt-32">
      <div className=" flex flex-col items-center gap-8 lg:items-start ">
        <h1 className="font-heading text-h1-mobile sm:text-h1 leading-tight">
          Ship Your Ideas. Get Real Feedback.
        </h1>
        <p className="font-subtitle text-dark-grey lg:max-w-[60ch] ">
          Share side projects, portfolios, apps, and experiments. Receive
          constructive feedback from the community and help others improve their
          work.
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
  );
}
