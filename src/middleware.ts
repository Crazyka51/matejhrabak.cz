import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // Seznam podporovaných jazyků
  locales: ["en", "cs"],
  // Výchozí jazyk
  defaultLocale: "cs",
})

export const config = {
  // Nastavení, které cesty mají být zpracovány middlewarem
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

