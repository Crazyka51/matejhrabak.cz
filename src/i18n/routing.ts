import { createSharedPathnamesNavigation } from "next-intl/navigation"

// Definujeme podporované jazyky jako konstanty
export const locales = ["cs", "en"] as const
export const defaultLocale = "cs" as const

// Vytvoříme typ pro locale
export type Locale = (typeof locales)[number]

// Základní konfigurace routingu
export const routing = {
  locales,
  defaultLocale,
} as const

// Exportujeme navigační nástroje
export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales,
  defaultLocale,
})

