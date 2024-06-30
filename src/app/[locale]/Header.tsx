"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "../../navigation";
import { type AppLocaleType, locales } from "../../config";
import Image from "next/image";
import { Logo, Dropdown } from "@/src/components/ui";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "@/src/hooks/useClickOutside";

export default function Header() {
  const path = usePathname();
  const { locale } = useParams();
  const t = useTranslations("Header");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);

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
      className={`sticky top-0 z-20 mx-auto w-full select-none bg-black/60 py-4 text-white/80 shadow-lg shadow-black/60`}
    >
      <nav className="container mx-auto flex w-full items-center justify-between px-6 md:px-12 xl:px-20">
        <Link
          href={"/"}
          className="flex h-10 w-24 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-4 md:gap-8">
          <LanguageSwitcher />
          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            onClick={handleMenuToggle}
          />
          <DesktopMenu navItems={NAV_ITEMS} path={path} />
        </div>
      </nav>
      <HamburgerMenu
        navItems={NAV_ITEMS}
        path={path}
        onClose={() => setIsMenuOpen(false)}
        isOpen={isMenuOpen}
      />
    </header>
  );
}

type MobileMenuButtonProps = {
  isMenuOpen: boolean;
  onClick: () => void;
};

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isMenuOpen,
  onClick,
}) => {
  return (
    <div className="flex items-center overflow-hidden md:hidden">
      <button
        type="button"
        className="focus:outline-none"
        id="hamburger-btn"
        onClick={onClick}
      >
        <motion.svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          initial={false}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.path
            key="top-line"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6" : "M4 6h16"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            key="middle-line"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 6l12 12" : "M4 12h16"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            key="bottom-line"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 6l12 12" : "M4 18h16"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.svg>
      </button>
    </div>
  );
};

type NavItem = {
  title: string;
  href: string;
};

type HamburgerMenuProps = {
  navItems: NavItem[];
  path: string;
  onClose: () => void;
  isOpen: boolean;
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  navItems,
  path,
  onClose,
  isOpen,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerBtnEl = document.getElementById("hamburger-btn");

  useClickOutside(menuRef, (event) => {
    if (!hamburgerBtnEl?.contains(event.target as Node)) {
      onClose();
    }
  });

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="ovex absolute right-0 w-1/3 overflow-hidden bg-black/60 shadow-lg shadow-black/70 md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ x: "250%" }}
          ref={menuRef}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            {navItems.map((item, i) => (
              <motion.li
                key={item.title}
                className="w-full text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link
                  className={`block px-4 py-2 ${
                    path === item.href ? "text-purple-primary" : ""
                  } font-medium transition-all duration-300 hover:text-purple-primary`}
                  href={item.href}
                  title={item.title}
                  onClick={onClose}
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

type NavItemsProps = {
  path: string;
  navItems: NavItem[];
};

const DesktopMenu: React.FC<NavItemsProps> = ({ navItems, path }) => {
  return (
    <ul className="hidden items-center gap-4 text-sm md:flex md:gap-8 md:text-base">
      {navItems.map((item) => (
        <li key={item.title} className="h-fit">
          <Link
            className={`${
              path === item.href ? "text-purple-primary" : ""
            } font-medium transition-all duration-300 hover:text-purple-primary`}
            href={item.href}
            title={item.title}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

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
