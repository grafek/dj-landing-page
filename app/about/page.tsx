import { Metadata } from "next";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";
import { SOCIALMEDIA_ITEMS } from "@/utils/globals";

export const metadata: Metadata = {
  title: "jackdahaus | about",
  description: "Learn more about me and my journey with music :)",
};

const AboutPage = () => {
  const igLink = SOCIALMEDIA_ITEMS.find((i) =>
    i.title.toLowerCase().includes("instagram"),
  )?.href as string;

  return (
    <PageWrapper
      id="about"
      className="flex flex-col items-start gap-4 text-justify lg:flex-row lg:items-center lg:gap-8"
    >
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

      <div className="flex flex-col gap-4 pt-4">
        <p>
          Hey there! I am{" "}
          <span className="font-semibold text-purple-primary">jackdahaus</span>,
          a passionate DJ with an insatiable love for almost all genres. House
          music has left a big mark on my soul since the beginning, although I
          also like to play it fast (trance, techno).
        </p>
        <div>
          Over the past two years, my passion for DJing has been an exhilarating
          journey of growth and exploration.
          <div className="pt-2">
            During this time I...
            <ul>
              <li>
                ✅played my first gig @
                <Link
                  href={"https://www.instagram.com/p/C7hhcgLoXSa/?img_index=1"}
                  target="_blank"
                  className="w-fit font-semibold italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
                >
                  Wyspa Tamka
                </Link>
                , outdoor haus stage.
              </li>
              <li>
                ✅have started cooperation with an underground rapper{" "}
                <Link
                  href={"https://www.instagram.com/hbi_hbo/"}
                  target="_blank"
                  className="w-fit font-semibold italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
                >
                  HBI
                </Link>
                , which includes playing beats and warming up the crowd before
                his concerts.
              </li>
            </ul>
          </div>
        </div>
        <Link
          href={"/contact"}
          title="Contact"
          className="w-fit font-semibold italic underline decoration-purple-primary underline-offset-4 transition-colors duration-300 hover:text-purple-primary"
        >
          Try me!
        </Link>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
