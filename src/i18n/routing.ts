import { createSharedPathnamesNavigation } from "next-intl/navigation"

export const locales = ["cs", "en"] as const
export const defaultLocale = "cs" as const

export type Locale = (typeof locales)[number]

export const routing = {
  locales,
  defaultLocale,
  localePrefix: "as-needed",
}

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)

