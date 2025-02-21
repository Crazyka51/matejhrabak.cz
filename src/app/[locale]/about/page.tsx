import { unstable_setRequestLocale } from "next-intl/server";
import AboutClient from "./about-client";
import { getTranslations } from "next-intl/server";
import { renderContent } from "@/app/resources";

// This is a Server Component
export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("About");
  const content = renderContent(t);

  return <AboutClient content={content} />;
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations("About");
  const { about } = renderContent(t);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(
    about.title
  )}`;

  return {
    title: about.title,
    description: about.description,
    openGraph: {
      title: about.title,
      description: about.description,
      type: "website",
      url: `https://${baseURL}/${locale}/about`,
      images: [
        {
          url: ogImage,
          alt: about.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: about.title,
      description: about.description,
      images: [ogImage],
    },
  };
}
