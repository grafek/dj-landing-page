import { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "JACKDAHAUS",
  description: "Your next DJ - check out my website for more info",
};

const HomePage = async () => {
  return (
    <PageWrapper className="flex select-none flex-col-reverse items-center justify-start gap-4 sm:gap-8 md:flex-row">
      <div className="flex flex-col gap-8 font-medium md:w-3/5">
        <p className="text-2xl italic md:text-3xl lg:text-4xl xl:text-5xl">
          Where the sun, sand, and beats collide -{" "}
          <span className="text-purple-primary">jackdahaus</span> brings the
          ultimate beach party vibe!
        </p>
        <div className="flex flex-col justify-around gap-6 md:flex-row md:w-3/4">
          <Link
            href={"/contact"}
            title="Contact"
            role="button"
            className="border-1 border-purple-primary bg-purple-primary flex-1 rounded-md border px-4 py-2 text-center transition-all duration-300 hover:bg-transparent"
          >
            Booking
          </Link>
          <Link
            href={"/about"}
            title="Bio"
            role="button"
            className="border-1 border-purple-primary hover:bg-purple-primary flex-1 rounded-md border px-4 py-2 text-center transition-all duration-300"
          >
            About me
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
