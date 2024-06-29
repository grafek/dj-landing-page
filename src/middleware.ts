import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  locales,
  defaultLocale: "pl",
});

export const config = {
  matcher: ["/", "/(pl|en)/:path*"],
};
