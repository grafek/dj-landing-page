import YouTube, { type YouTubeEvent, type YouTubeProps } from "react-youtube";

type YoutubePlayerProps = {
  videoId: string;
};

const YoutubePlayer: React.FC<YoutubePlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps["opts"] = {
    height: "320",
    width: "540",
  };
  
  const _onReady = (event: YouTubeEvent<any>) => {
    event.target.playVideo();
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={_onReady}
      className="w-full [&>iframe]:z-50 [&>iframe]:aspect-video [&>iframe]:w-full [&>iframe]:rounded-lg"
    />
  );
};

export default YoutubePlayer;
