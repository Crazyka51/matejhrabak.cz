import type React from "react"
import "@/once-ui/styles/index.scss"
import "@/once-ui/tokens/index.scss"
import classNames from "classnames"
import { Inter } from "next/font/google"
import { Source_Code_Pro } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, unstable_setRequestLocale } from "next-intl/server"
import { Footer, Header, RouteGuard } from "@/components"
import { effects, style } from "@/app/resources"
import { Background, Flex } from "@/once-ui/components"
import { locales } from "@/i18n/routing"

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
})

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
})

type FontConfig = {
  variable: string
}

const secondary: FontConfig | undefined = undefined
const tertiary: FontConfig | undefined = undefined

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Flex
            background="page"
            data-neutral={style.neutral}
            data-brand={style.brand}
            data-accent={style.accent}
            data-solid={style.solid}
            data-solid-style={style.solidStyle}
            data-theme={style.theme}
            data-border={style.border}
            data-surface={style.surface}
            data-transition={style.transition}
            className={classNames(primary.variable, secondary?.variable, tertiary?.variable, code.variable)}
          >
            <Flex style={{ minHeight: "100vh" }} fillWidth margin="0" padding="0" direction="column">
              <Background mask={effects.mask} gradient={effects.gradient} dots={effects.dots} lines={effects.lines} />
              <Flex fillWidth minHeight="16"></Flex>
              <Header />
              <Flex zIndex={0} fillWidth paddingY="l" paddingX="l" justifyContent="center" flex={1}>
                <Flex justifyContent="center" fillWidth minHeight="0">
                  <RouteGuard>{children}</RouteGuard>
                </Flex>
              </Flex>
              <Footer />
            </Flex>
          </Flex>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
