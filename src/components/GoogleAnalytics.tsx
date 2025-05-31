import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/gtag";

export default function GoogleAnalytics(): JSX.Element | null {
  if (!GA_TRACKING_ID) {
    throw new Error(
      "Google Analytics tracking ID is not defined. Please set NEXT_PUBLIC_GOOGLE_ANALYTICS_ID in your environment variables.",
    );
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  );
}
