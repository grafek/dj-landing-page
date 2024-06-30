"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../navigation";
import { type AppLocaleType, locales } from "../../config";
import Image from "next/image";
import { Logo, Dropdown } from "@/src/components/ui";

export default function Header() {
  const path = usePathname();
  const { locale } = useParams();
  const t = useTranslations("Header");

  const NAV_ITEMS = [
    {
      title: t("Home"),
      href: `/${locale}`,
    },
    {
      title: t("About"),
      href: `/${locale}/about`,
    },
    {
      title: t("Contact"),
      href: `/${locale}/contact`,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-50 mx-auto w-full select-none bg-black/70 py-5 text-white/80 shadow-lg shadow-black/70`}
    >
      <nav className="container mx-auto flex w-full items-stretch justify-between px-6 md:px-12 xl:px-20">
        <Link
          href={"/"}
          className="flex h-10 w-24 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <Logo />
        </Link>
        <ul className="flex items-center gap-4 text-sm md:gap-8 md:text-base">
          <LanguageSwitcher />

          {NAV_ITEMS.map((item) => (
            <li key={item.title} className="h-fit">
              <Link
                className={`${
                  path === item.href
                    ? "text-purple-primary hover:text-[#851717]"
                    : ""
                } font-semibold transition-all duration-300 hover:text-purple-primary sm:hover:-translate-y-[2px]`}
                href={item.href}
                title={item.title}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale }: { locale: AppLocaleType } = useParams();
  const pathname = usePathname();

  const [selectedLanguage, setSelectedLanguage] =
    useState<AppLocaleType>(locale);

  const handleLanguageChange = (selectedLocale: AppLocaleType) => {
    setSelectedLanguage(selectedLocale);
    let strippedPath = "";
    if (pathname.length > 3) {
      strippedPath = pathname.split(locale as string)[1] || "";
    } else if (pathname.length === 3) {
      strippedPath = selectedLocale;
    }
    router.push(strippedPath, { locale: selectedLocale });
  };

  useEffect(() => {
    setSelectedLanguage(locale as AppLocaleType);
  }, [locale]);

  const renderOptionAndSelected = (option: AppLocaleType) => (
    <Image
      src={`/${option === "en" ? "uk" : "poland"}-flag.svg`}
      alt={`${option === "en" ? "UK" : "Poland"} Flag`}
      width={16}
      height={16}
    />
  );

  return (
    <Dropdown<AppLocaleType>
      options={locales}
      selectedOption={selectedLanguage}
      onSelect={handleLanguageChange}
      renderOption={renderOptionAndSelected}
      renderSelected={renderOptionAndSelected}
    />
  );
};
