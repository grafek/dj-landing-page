import YoutubePlayer from "@/components/YotubePlayer";
import getVideos from "@/lib/getVideos";
import Link from "next/link";

const HomePage = async () => {
  const playlistItems = await getVideos();

  return (
    <section className="sm:gap-8 gap-4 select-none flex-col-reverse md:flex-row flex min-h-[calc(100dvh-10rem)] items-center justify-center">
      <div className="flex flex-col gap-8 font-semibold md:w-3/5 flex-1">
        <p className="text-4xl italic md:text-5xl lg:text-6xl xl:text-7xl ">
          Where the sun, sand, and beats collide -{" "}
          <span className="text-red-primary">jackdahaus</span> brings the
          ultimate beach party vibe!
        </p>
        <div className="mx-auto flex w-full md:h-11 flex-col gap-10 md:w-2/3 md:flex-row">
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
          className="mx-auto md:pl-16 w-fit italic text-gray-500 transition-colors duration-300 hover:text-red-primary/75"
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
