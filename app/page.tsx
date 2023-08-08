import YoutubePlayer from "@/components/YoutubePlayer";
import getVideos from "@/lib/getVideos";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JACKDAHAUS",
  description: "Your next beach party DJ - check out my website for more info",
};

const HomePage = async () => {
  const playlistItems = await getVideos();

  return (
    <section className="flex select-none flex-col-reverse items-center justify-center gap-4 sm:gap-8 md:flex-row">
      <div className="flex flex-1 flex-col gap-8 font-semibold md:w-3/5">
        <p className="text-2xl italic md:text-3xl lg:text-4xl xl:text-5xl">
          Where the sun, sand, and beats collide -{" "}
          <span className="uppercase text-red-primary">jackdahaus</span> brings
          the ultimate beach party vibe!
        </p>
        <div className="flex w-full flex-col justify-around gap-6 md:flex-row">
          <Link
            href={"/contact"}
            title="Contact"
            role="button"
            className="border-1 flex-1 rounded-md border border-red-primary bg-red-primary px-4 py-2 text-center transition-all duration-300 hover:bg-transparent"
          >
            Booking
          </Link>
          <Link
            href={"/about"}
            title="Bio"
            role="button"
            className="border-1 flex-1 rounded-md border border-red-primary px-4 py-2 text-center transition-all duration-300 hover:bg-red-primary"
          >
            About me
          </Link>
        </div>
      </div>
      <div
        className={`relative my-auto aspect-video sm:w-[50%] md:w-[30%] lg:min-w-[40%] [&>div]:h-full [&>p]:my-auto`}
      >
        <YoutubePlayer
          key={playlistItems[0].snippet.resourceId.videoId}
          videoId={playlistItems[0].snippet.resourceId.videoId}
          thumbnailUrl={playlistItems[0].snippet.thumbnails.high.url}
        />
      </div>
    </section>
  );
};

export default HomePage;
