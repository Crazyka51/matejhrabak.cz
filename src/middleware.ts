import createMiddleware from "next-intl/middleware"
import { locales, defaultLocale } from "./i18n/routing"

// Vytvoříme middleware s explicitní konfigurací
export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix: "as-needed",
})

// Nastavíme matcher pro cesty
export const config = {
  matcher: [
    // Matchuje všechny cesty kromě těch, které:
    // - začínají na /api, /_next, /_vercel
    // - obsahují tečku (např. favicon.ico)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}

