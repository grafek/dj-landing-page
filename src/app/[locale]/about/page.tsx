import { type Metadata } from "next";
import { PageWrapper } from "@/src/components/PageWrapper";
import { useTranslations } from "next-intl";
import { Link } from "@/src/navigation";
import {
  COLLAB_ARTISTS,
  SOCIALMEDIA_ITEMS,
  VENUES_PLAYED,
} from "@/utils/constants";

export const metadata: Metadata = {
  title: "jackdahaus | about",
  description: "Learn more about me and my journey with music",
};

const AboutPage = () => {
  const t = useTranslations("About");

  const mixcloudLink =
    SOCIALMEDIA_ITEMS.find((q) => q.title.toLowerCase().includes("mixcloud"))
      ?.href || "";

  return (
    <PageWrapper
      id="about"
      className="flex flex-col items-start gap-4 text-justify lg:flex-row lg:items-center lg:gap-8"
    >
      <AboutPhoto />
      <div className="flex flex-col gap-4 pt-4 text-sm">
        <p>
          {t("P1")}{" "}
          <span className="font-semibold text-purple-primary">jackdahaus</span>,{" "}
          {t("P2")}{" "}
          <Link
            href={mixcloudLink}
            target="_blank"
            className="mx-auto text-sm font-light italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
          >
            {t("P2Link")}
          </Link>
        </p>
        <HisSection t={t} />
        <ContactLink t={t} />
      </div>
    </PageWrapper>
  );
};

export default AboutPage;

type HisItemType = {
  text: string;
  link: {
    href: string;
    text: string;
  } | null;
  suffix?: string;
};

const HisSection = ({ t }: { t: (key: string) => string }) => {
  const { tamka } = VENUES_PLAYED;
  const { flamewave, hbi } = COLLAB_ARTISTS;

  const hisItems: HisItemType[] = [
    {
      text: t("HisItem1"),
      link: {
        href: tamka.ownIgPost,
        text: tamka.name,
      },
      suffix: ", outdoor haus stage.",
    },
    {
      text: `${t("HisItem2")} `,
      link: {
        href: hbi.ig,
        text: hbi.name,
      },
      suffix: t("HisItem2Part2"),
    },
    {
      text: t("HisItem3"),
      link: {
        href: flamewave.ig,
        text: flamewave.name,
      },
      suffix: t("HisItem3Part2"),
    },
  ];

  return (
    <div>
      {t("His")}
      <div className="pt-2 text-start">
        {t("HisPresentation")}
        <ul>
          {hisItems.map((item, index) => (
            <li key={index} className="leading-[22px]">
              ✅ {item.text}
              {item?.link ? (
                <Link
                  href={item.link.href}
                  target="_blank"
                  className="w-fit font-semibold italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
                >
                  {item.link.text}
                </Link>
              ) : null}
              {item?.suffix ?? ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function AboutPhoto() {
  const igLink = SOCIALMEDIA_ITEMS.find((i) =>
    i.title.toLowerCase().includes("instagram"),
  )?.href as string;

  return (
    <div className="mx-auto flex flex-col items-center">
      <Link
        href={igLink}
        target="_blank"
        className="h-32 w-32 flex-shrink-0 rounded-full bg-[url('/aboutphoto.jpg')] bg-cover bg-center md:h-52 md:w-52"
      >
        <div className="flex h-full w-full items-center justify-center rounded-full backdrop-brightness-[.65]" />
      </Link>
      <Link
        href={igLink}
        target="_blank"
        className="mx-auto text-sm font-light italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
      >
        @jackdahaus
      </Link>
    </div>
  );
}

const ContactLink = ({ t }: { t: (key: string) => string }) => (
  <Link
    href={"/contact"}
    title="Contact"
    className="w-fit font-semibold italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
  >
    {t("TryMe")}
  </Link>
);
