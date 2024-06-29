"use client";
import { debounce } from "@/utils/helpers";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import { Logo } from "../components/icons";
import { useTranslations } from "next-intl";
import { useRouter } from "../navigation";
import { AppLocaleType } from "../config";

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

  const [headerClasses, setHeaderClasses] = useState("");

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHeaderClasses("bg-black/70 shadow-lg shadow-black/70");
    } else {
      setHeaderClasses("");
    }
    return;
  };

  const debouncedHandleScroll = debounce(handleScroll, 1);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <header
      className={`${headerClasses} sticky top-0 z-50 mx-auto w-full select-none py-5 text-white/80`}
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
  const { locale } = useParams();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const [selectedLanguage, setSelectedLanguage] = useState<AppLocaleType>(
    locale as AppLocaleType,
  );

  const handleLanguageChange = (selectedLocale: AppLocaleType) => {
    setSelectedLanguage(selectedLocale);
    let strippedPath = "";
    if (pathname.length > 3) {
      strippedPath = pathname.split(locale as string)[1];
    } else if (pathname.length === 3) {
      strippedPath = selectedLocale;
    }
    router.push(strippedPath, { locale: selectedLocale as AppLocaleType });
  };

  useEffect(() => {
    setSelectedLanguage(locale as AppLocaleType);
  }, [locale]);

  return (
    <div className="relative">
      <div className="relative">
        <button
          type="button"
          className="flex items-center space-x-1 text-sm focus:outline-none"
          onClick={handleDropdownToggle}
        >
          {selectedLanguage === "en" && (
            <img
              src="/uk-flag.svg"
              alt="UK Flag"
              className="inline-block h-auto w-4"
            />
          )}
          {selectedLanguage === "pl" && (
            <img
              src="/poland-flag.svg"
              alt="Poland Flag"
              className="inline-block h-auto w-4"
            />
          )}
          <svg
            className={`ml-1 h-3 w-3 transform fill-current transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 6.293a1 1 0 0 1 1.414 0L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z" />
          </svg>
        </button>

        {isOpen ? (
          <div className="absolute right-0 mt-2 w-12 rounded-md bg-slate-950 bg-transparent shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                type="button"
                className="flex w-full items-center justify-start px-4 py-2 text-left hover:bg-slate-900 focus:outline-none"
                onClick={() => handleLanguageChange("pl")}
              >
                <img
                  src="/poland-flag.svg"
                  alt="Poland Flag"
                  className="inline-block h-auto w-4"
                />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-start px-4 py-2 text-left hover:bg-slate-900 focus:outline-none"
                onClick={() => handleLanguageChange("en")}
              >
                <img
                  src="/uk-flag.svg"
                  alt="UK Flag"
                  className="inline-block h-auto w-4"
                />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
