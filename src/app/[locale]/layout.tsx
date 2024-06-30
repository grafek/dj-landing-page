import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Footer from "./Footer";
import Header from "./Header";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="flex min-h-[100dvh] flex-col">
          <Header />
          <main className="container relative mx-auto flex flex-1 flex-col justify-center overflow-x-hidden px-6 pb-8 pt-3 text-white/80 md:px-12 xl:px-20">
            {children}
          </main>
          <Footer />
          <Analytics />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
