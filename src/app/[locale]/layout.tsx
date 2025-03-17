import type React from "react"
import "@/once-ui/styles/index.scss"
import "@/once-ui/tokens/index.scss"
import { baseURL } from "@/app/resources"

import { Inter } from "next/font/google"
import { Source_Code_Pro } from "next/font/google"
import { renderContent } from "@/app/resources"

export async function generateMetadata() {
  const { person, about } = renderContent()
  const title = about.title
  const description = about.description
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
})

type FontConfig = {
  variable: string
}

/*
 Replace with code for secondary and tertiary fonts
 from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined
const tertiary: FontConfig | undefined = undefined
/*
 */

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
})

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function RootLayout({ children }: { children: React.ReactNode; params: { locale: string } }) {
  return <RootLayoutContent>{children}</RootLayoutContent>
}

interface RootLayoutContentProps {
  children: React.ReactNode
}

function RootLayoutContent({ children }: RootLayoutContentProps) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}

