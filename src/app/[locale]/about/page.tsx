import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { renderContent } from "@/app/resources";
import { Flex } from "@/once-ui/components";
import { useTranslations } from "next-intl";

type PageProps = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const t = await getTranslations(params.locale);
  const { person, about, social } = renderContent(t);
  const title = about.title;
  const description = about.description;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${params.locale}/about`,
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
  };
}

export default function About({ params }: PageProps) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const { person, about, social } = renderContent(t);

  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Flex fillWidth maxWidth="m" direction="column">
      {/* Keep the existing JSX structure but with proper type checking */}
      {/* ... rest of your component JSX ... */}
    </Flex>
  );
}
