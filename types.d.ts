interface YoutubePlaylistItem {
  kind: "youtube#playlistItem";
  id: string;
  snippet: {
    publishedAt: string;
    channelId: strings;
    title: string;
    thumbnails: {
      default: {
        url: string;
        width: 120;
        height: 90;
      };
      medium: {
        url: string;
        width: 320;
        height: 180;
      };
      high: {
        url: string;
        width: 480;
        height: 360;
      };
      standard: {
        url: string;
        width: 640;
        height: 480;
      };
    };
    resourceId: {
      videoId: string;
    };
    position: 9;
  };
}
