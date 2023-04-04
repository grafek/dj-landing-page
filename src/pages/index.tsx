import YoutubePlayer from "@/components/YotubePlayer";
import withPageWrapper from "@/hoc/PageWrap";
import getVideos from "@/lib/getVideos";
import { debounce } from "@/utils/helpers";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type YoutubePlaylistItem } from "../../types";

type HomePageProps = {
  playlistItems: YoutubePlaylistItem[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const playlistItems = await getVideos();
  return {
    props: { playlistItems },
  };
};

const HomePage: NextPage<HomePageProps> = ({ playlistItems }) => {
  const [isMounted, setIsMounted] = useState(false);

  const [isVideoShown, setIsVideoShown] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 640) {
      setIsVideoShown(true);
    } else {
      setIsVideoShown(false);
    }
    return;
  };

  const debouncedHandleResize = debounce(handleResize, 200);

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  useEffect(() => {
    handleResize();
  }, []);

  if (!isMounted) return <div></div>;

  return (
    <>
      <div className="flex flex-col gap-10 font-semibold md:w-3/5">
        <p className="text-4xl italic md:text-5xl lg:text-6xl xl:text-7xl ">
          Where the sun, sand, and beats collide -{" "}
          <span className="text-red-primary">DJ Graph</span> brings the ultimate
          beach party vibe!
        </p>
        <div className="mx-auto flex w-full flex-col gap-10 md:w-2/3 md:flex-row">
          <Link
            href={"/contact"}
            title="Contact"
            role="button"
            className="min-w-[100px] flex-1 rounded-full bg-red-primary px-4 py-2 text-center outline outline-1 outline-red-primary transition-all duration-300 hover:bg-transparent"
          >
            Booking
          </Link>
          <Link
            href={"/about"}
            title="Bio"
            role="button"
            className="min-w-[100px] flex-1 rounded-full px-4 py-2 text-center outline outline-1 outline-red-primary transition-all duration-300 hover:bg-red-primary"
          >
            About me
          </Link>
        </div>
      </div>
      {isVideoShown ? (
        <div
          className={`relative flex flex-col gap-8 sm:min-w-full md:min-w-[35%] lg:min-w-[40%]`}
        >
          <Link
            href={`https://www.youtube.com/watch?v=${playlistItems[26].snippet.resourceId.videoId}`}
            className="mx-auto w-fit italic text-gray-500 transition-colors duration-300 hover:text-red-primary/75"
            target="_blank"
          >
            Check out my latest mix
          </Link>
          <div className={`relative aspect-video sm:min-w-full md:min-w-[40%]`}>
            {playlistItems.slice(26, 27).map((item) => (
              <YoutubePlayer
                key={item.snippet.resourceId.videoId}
                videoId={item.snippet.resourceId.videoId}
                thumbnailUrl={item.snippet.thumbnails.high.url}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withPageWrapper(
  HomePage,
  "home",
  "sm:gap-8 select-none flex-col-reverse md:flex-row"
);
