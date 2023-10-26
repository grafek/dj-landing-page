import type { YoutubePlaylistItem } from "../types";

const getVideos = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_LINK}?part=snippet&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.YOUTUBE_API_KEY}`,
  );

  const data = await response.json();
  const playlistItems = data.items as YoutubePlaylistItem[];

  return playlistItems;
};

export default getVideos;
