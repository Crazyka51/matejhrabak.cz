import { Flex, Heading } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations();
  const { blog } = renderContent(t);

  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/blog`,
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

// Odstraněno getServerSideProps

export default function Blog({ params: { locale } }: PageProps) {
  const t = useTranslations();
  const { person, blog, newsletter } = renderContent(t);
  return (
    <Flex fillWidth maxWidth="s" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blog.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Flex fillWidth flex={1} direction="column">
        <Posts range={[1, 3]} locale={locale} thumbnail />
        <Posts range={[4]} columns="2" locale={locale} />
      </Flex>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Flex>
  );
}
function requestLocale(req: any) {
  throw new Error("Function not implemented.");
}
