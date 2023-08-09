import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JACKDAHAUS | ABOUT",
  description: "Learn more about me and my journey with music :)",
};

const AboutPage = () => {
  return (
    <div className="flex flex-col flex-wrap text-justify ">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
        <div className="mx-auto h-52 w-52 flex-shrink-0 rounded-full bg-[url('/aboutphoto.jpg')] bg-cover bg-center">
          <div className="flex h-full w-full items-center justify-center rounded-full backdrop-brightness-[.35]" />
        </div>
        <div className="flex flex-col sm:px-12 md:px-24">
          <p>
            Hey there, music enthusiasts! I am{" "}
            <span className="font-semibold uppercase text-red-primary">
              jackdahaus
            </span>
            , a passionate DJ with an insatiable love for almost all genres.
            Drawing inspiration from legendary artists and modern trailblazers
            alike, my music style blends infectious melodies, soulful grooves,
            and pulsating basslines to deliver a sonic experience that leaves an
            indelible mark on your soul. Although, house music has left a big
            mark on my soul since the beginning
          </p>
          <p className="pt-2">
            Over the past two years, my passion for DJing has been an
            exhilarating journey of growth and exploration. I&apos;ve immersed
            myself in the art of mixing, honing my skills and refining my music
            style. However, this year marks a turning point as I take my DJ
            career to a whole new level of dedication and commitment. I am
            thrilled to announce that I am finally ready to conquer new
            challenges and step onto the stage for my very first gig. The
            adrenaline surges through me as I prepare to share my passion for
            music with a live audience, knowing that this is just the beginning
            of an extraordinary adventure.
          </p>
          <Link
            href={"/contact"}
            title="Contact"
            className="w-fit pt-4 font-semibold italic underline decoration-red-primary underline-offset-4 transition-colors duration-300 hover:text-red-primary"
          >
            Try me!
          </Link>
        </div>
      </div>
    </div>
    // TODO: Add about page
  );
};

export default AboutPage;
