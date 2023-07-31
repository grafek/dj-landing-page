"use client";
import { debounce } from "@/utils/helpers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SOCIALMEDIA_ITEMS } from "@/utils/globals";
import "./globals.css";

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

  const debouncedHandleScroll = debounce(handleScroll, 30);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <html lang="en">
      <body>
        <header
          className={`${headerClasses} fixed z-40 mx-auto flex h-20 w-screen select-none items-center justify-between text-white/80`}
        >
          <nav className="container mx-auto flex w-full items-center justify-between px-6">
            <Link
              href={"/"}
              className="flex items-center justify-center transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={"/logo.png"}
                height={40}
                width={100}
                alt="jackdahaus logo"
              />
            </Link>
            <ul className="flex md:gap-16 md:text-xl">
              {NAV_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    className={`${
                      path === item.href
                        ? "text-red-primary hover:text-[#851717]"
                        : ""
                    } px-2 py-1 font-bold transition-all duration-300 hover:scale-105 hover:text-red-primary active:scale-95`}
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
        <div className="container mx-auto overflow-x-hidden px-4 text-white/80 pb-10">
          <main className="px-11 pt-24">
            {children}
            <ul
              className="fixed right-5 top-24 flex flex-col gap-4 md:gap-6"
              role="list"
            >
              {SOCIALMEDIA_ITEMS.map((item, i) => (
                <li
                  key={item.href + i}
                  className="transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Link
                    href={item.href}
                    title={item.title}
                    target="_blank"
                    className="hover:fill-black"
                  >
                    <item.icon />
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </div>
        <footer className="flex select-none flex-col items-center gap-4 bg-black/70 p-4 text-white/60 shadow-lg shadow-black/70">
          <ul className="flex gap-4 pt-4 md:gap-6" role="list">
            {SOCIALMEDIA_ITEMS.map((item, i) => (
              <li
                key={item.href + i}
                className="transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Link href={item.href} title={item.title} target="_blank">
                  <item.icon />
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-center font-semibold">
            {new Date().getFullYear()}© jackdahaus
          </p>
        </footer>
      </body>
    </html>
  );
}
