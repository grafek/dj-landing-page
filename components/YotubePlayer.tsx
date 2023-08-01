"use client";

import { debounce } from "@/utils/helpers";
import Image from "next/image";
import { lazy, useEffect, useState, useTransition } from "react";
import { type YouTubeEvent, type YouTubeProps } from "react-youtube";

type YoutubePlayerProps = {
  videoId: string;
  thumbnailUrl: string;
};

const YouTube = lazy(() => import("react-youtube"));

const opts: YouTubeProps["opts"] = {
  height: "320",
  width: "540",
};

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({
  videoId,
  thumbnailUrl,
}) => {
  const [, startTransition] = useTransition();
  const [showVideo, setShowVideo] = useState(false);

  const _onReady = (event: YouTubeEvent<any>) => {
    event.target.playVideo();
  };

  return (
    <>
      {!showVideo ? (
        <button
          onClick={() => {
            startTransition(() => {
              setShowVideo(true);
            });
          }}
          className="h-full w-full cursor-pointer border-0 bg-transparent"
        >
          <div className={"absolute inset-0 aspect-video h-full w-full"}>
            <Image
              alt="Video thumbnail"
              src={thumbnailUrl}
              fill
              className={
                "inset-0 m-0 h-full w-full cursor-pointer border-0 bg-transparent p-0"
              }
              loading="lazy"
            />
            <Image
              alt="Play Video button"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
              loading="lazy"
              width={"60"}
              height={"40"}
              className={
                "absolute md:left-[calc(50%-40px)] left-[calc(50%-30px)] top-[calc(50%-21px)] h-10 w-14"
              }
            />
          </div>
        </button>
      ) : (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={_onReady}
          iframeClassName="z-50 aspect-video rounded-lg w-full ml-auto"
        />
      )}
    </>
  );
};

export default YoutubePlayer;
