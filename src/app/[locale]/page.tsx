import { type Metadata } from "next";
import { PageWrapper } from "@/src/components/PageWrapper";
import { useTranslations } from "next-intl";
import { Link } from "@/src/navigation";
import { Heading } from "@/src/components/ui";

export const metadata: Metadata = {
  title: "jackdahaus",
  description: "jackdahaus - bringing the haus vibes!",
};

const HomePage = () => {
  const t = useTranslations("Home");

  return (
    <PageWrapper id="home" className="flex flex-col gap-8 font-medium">
      <Heading
        level={1}
        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      >
        {t("Text")}
      </Heading>
      <div className="flex flex-col justify-around gap-6 md:w-3/4 md:flex-row">
        <Link
          href={`/contact`}
          title="Contact"
          role="button"
          className="border-1 flex-1 rounded-md border border-purple-primary bg-purple-primary px-4 py-2 text-center transition-all duration-300 hover:bg-transparent"
        >
          {t("CTA1")}
        </Link>
        <Link
          href={`/about`}
          title="Bio"
          role="button"
          className="border-1 flex-1 rounded-md border border-purple-primary px-4 py-2 text-center transition-all duration-300 hover:bg-purple-primary"
        >
          {t("CTA2")}
        </Link>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
