import { YoutubePlaylistItem } from "../types";

const getVideos = async () => {
  // change playlist id to playlist with my mixes
  // as of now there is a playlist with mashups
  // TODO: change it to mixes once uploaded and created playlist for DJ sets
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_YOUTUBE_API_LINK}?part=snippet&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&maxResults=40&key=${process.env.YOUTUBE_API_KEY}`,
  );

  const data = await response.json();
  const playlistItems = data.items as YoutubePlaylistItem[];

  return playlistItems;
};

export default getVideos;
