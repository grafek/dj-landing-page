import { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "jackdahaus",
  description: "Your next DJ - Bringing the ultimate beach party vibe!",
};

const HomePage = async () => {
  return (
    <PageWrapper id="home" className="flex flex-col gap-8 font-medium">
      <Heading
        level={1}
        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      >
        Bringing haus & hard groove vibes to your next event
      </Heading>
      <div className="flex flex-col justify-around gap-6 md:w-3/4 md:flex-row">
        <Link
          href={"/contact"}
          title="Contact"
          role="button"
          className="border-1 flex-1 rounded-md border border-purple-primary bg-purple-primary px-4 py-2 text-center transition-all duration-300 hover:bg-transparent"
        >
          Book Now
        </Link>
        <Link
          href={"/about"}
          title="Bio"
          role="button"
          className="border-1 flex-1 rounded-md border border-purple-primary px-4 py-2 text-center transition-all duration-300 hover:bg-purple-primary"
        >
          About Me
        </Link>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
