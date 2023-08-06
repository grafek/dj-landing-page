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
        <p className="text-4xl italic md:text-4xl lg:text-5xl xl:text-6xl ">
          Where the sun, sand, and beats collide -{" "}
          <span className="uppercase text-red-primary">jackdahaus</span> brings
          the ultimate beach party vibe!
        </p>
        <div className="mx-auto flex w-full flex-col gap-10 md:h-11 md:w-2/3 md:flex-row">
          <Link
            href={"/contact"}
            title="Contact"
            role="button"
            className="flex-1 rounded-full bg-red-primary px-4 py-2 text-center outline outline-1 outline-red-primary transition-all duration-300 hover:bg-transparent"
          >
            Booking
          </Link>
          <Link
            href={"/about"}
            title="Bio"
            role="button"
            className="flex-1 rounded-full px-4 py-2 text-center outline outline-1 outline-red-primary transition-all duration-300 hover:bg-red-primary"
          >
            About me
          </Link>
        </div>
      </div>
      <div
        className={`relative flex flex-col gap-8 sm:w-[50%] md:w-[30%] lg:min-w-[40%]`}
      >
        <Link
          href={`https://www.youtube.com/watch?v=${playlistItems[0].snippet.resourceId.videoId}`}
          className="mx-auto w-fit italic text-gray-500 transition-colors duration-300 hover:text-red-primary/75"
          target="_blank"
        >
          Check out my latest mix
        </Link>
        <div className={`relative aspect-video sm:min-w-[85%] md:min-w-[30%]`}>
          <YoutubePlayer
            key={playlistItems[0].snippet.resourceId.videoId}
            videoId={playlistItems[0].snippet.resourceId.videoId}
            thumbnailUrl={playlistItems[0].snippet.thumbnails.high.url}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
