import Image from "next/image";

export default function Mission() {
  return (
    <div className="grid gap-y-8 lg:grid-cols-2 items-center py-10 lg:py-34 lg:gap-x-8 ">
      <Image
        width={1319}
        height={1074}
        src="/images/collab.png"
        alt="An illustraion of two guys performing arm-wrestle handshake in a work environment"
      />
      <div className=" flex flex-col items-center gap-8 lg:items-start ">
        <h2 className="font-title text-h2-mobile sm:text-h2 leading-tight">
          More Than Just Projects
        </h2>
        <p className="font-subtitle text-dark-grey lg:max-w-[70ch] ">
          We believe great ideas grow through collaboration. Our mission is to
          create a space where creators can showcase their projects, receive
          constructive feedback, and learn from a supportive community.
        </p>
      </div>
    </div>
  );
}
