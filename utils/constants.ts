import {
  InstagramIcon,
  YoutubeIcon,
  SoundcloudIcon,
  TikTokIcon,
  FacebookIcon,
  MixcloudIcon,
} from "@/src/components/icons";

export const SOCIALMEDIA_ITEMS = [
  {
    icon: YoutubeIcon,
    href: "https://youtube.com/@jackdahaus",
    title: "Youtube Link",
  },
  {
    icon: SoundcloudIcon,
    href: "https://soundcloud.com/jackdahaus",
    title: "Soundcloud Link",
  },
  {
    icon: MixcloudIcon,
    href: "https://www.mixcloud.com/jackdahaus/",
    title: "Mixcloud Link",
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/jackdahaus/",
    title: "Instagram Link",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@jackdahausjack",
    title: "TikTok Link",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/people/jackdahaus/100095363321137",
    title: "Facebook Link",
  },
];

export const COLLAB_ARTISTS = {
  hbi: {
    name: "HBI",
    ig: "https://www.instagram.com/hbi_hbo/",
  },
  flamewave: {
    name: "Flame Wave",
    ig: "https://www.instagram.com/flamewaveofficial_/",
  },
};

export const VENUES_PLAYED = {
  tamka: {
    name: "Wyspa Tamka",
    ig: "https://www.instagram.com/wyspatamka",
    ownIgPost: "https://www.instagram.com/p/C7hhcgLoXSa/?img_index=1",
  },
};

export const NOTIFICATION_MS_TIME = 4000;
export const DJING_START_YEAR = new Date("6/6/2021").getFullYear();
export const CURRENT_YEAR = new Date().getFullYear();
