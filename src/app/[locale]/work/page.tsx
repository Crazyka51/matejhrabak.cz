import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

// Definice typů pro work sekci
interface WorkContent {
  label?: string;
  title: string;
  description: string;
}

interface PersonContent {
  name?: string;
  avatar?: string;
}

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
) {
  const t = await getTranslations();
  const content = renderContent(t);

  // Bezpečné typování s výchozími hodnotami
  const work = (content.work as WorkContent) || {
    title: "Work",
    description: "My projects"
  };

  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work(
  { params: { locale } }: { params: { locale: string } }
) {
  unstable_setRequestLocale(locale);
  let allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);

  const t = useTranslations();
  const content = renderContent(t);

  // Bezpečné typování s výchozími hodnotami
  const person = (content.person as PersonContent) || { name: "" };
  const work = (content.work as WorkContent) || {
    title: "Work",
    description: "My projects"
  };

  return (
    <Flex
      fillWidth maxWidth="m"
      direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og?title=Design%20Projects`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
            hasPart: allProjects.map((project: any) => ({
              '@type': 'CreativeWork',
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects locale={locale} />
    </Flex>
  );
}
