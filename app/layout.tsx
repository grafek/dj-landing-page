"use client";
import { debounce } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SOCIALMEDIA_ITEMS } from "@/utils/globals";
import "./globals.css";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { Logo } from "@/components/icons";

const NAV_ITEMS = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "ABOUT",
    href: "/about",
  },
  {
    title: "CONTACT",
    href: "/contact",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
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
    <html lang="en" key={path}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <Analytics />
      <AnimatePresence>
        <body className="flex min-h-screen flex-col">
          <header
            className={`${headerClasses} sticky top-0 z-50 mx-auto w-full select-none py-5 text-white/80`}
          >
            <nav className="container mx-auto flex w-full items-stretch justify-between px-6">
              <Link
                href={"/"}
                className="flex h-10 w-24 shrink-0 items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <Logo />
              </Link>
              <ul className="flex items-center gap-4 text-sm md:gap-8 md:text-base">
                {NAV_ITEMS.map((item) => (
                  <li key={item.title} className="h-fit">
                    <Link
                      className={`${
                        path === item.href
                          ? "text-purple-primary hover:text-[#851717]"
                          : ""
                      } hover:text-purple-primary font-semibold transition-all duration-300 sm:hover:-translate-y-[2px]`}
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
          <main className="container relative mx-auto flex flex-1 flex-col justify-center overflow-x-hidden px-12 pb-8 pt-3 text-white/80">
            {children}
          </main>
          <footer className="flex w-full select-none flex-col items-center gap-2 p-4 pb-1 text-white/60 shadow-lg shadow-black/70">
            <ul className="flex gap-4 pt-4" role="list">
              {SOCIALMEDIA_ITEMS.map((item, i) => (
                <li
                  key={item.href + i}
                  className="transition-all duration-300 hover:-translate-y-[2px]"
                >
                  <Link href={item.href} title={item.title} target="_blank">
                    <item.icon />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-center text-xs">
              {new Date().getFullYear()}© jackdahaus
            </p>
          </footer>
        </body>
      </AnimatePresence>
    </html>
  );
}
