import { YoutubePlaylistItem } from "../../types";

const YOUTUBE_API_LINK = "https://www.googleapis.com/youtube/v3/playlistItems";
const PLAYLIST_ID = "PL9FAglk4uUH3z6V5NKczLiTPHCdau28C0";

const getVideos = async () => {
  // change playlist id to playlist with my mixes
  const response = await fetch(
    `${YOUTUBE_API_LINK}?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=40&key=${process.env.YOUTUBE_API_KEY}`
  );

  const data = await response.json();
  const playlistItems = data.items as YoutubePlaylistItem[];

  return playlistItems;
};

export default getVideos;
