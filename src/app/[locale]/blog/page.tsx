import { Flex, Heading } from "@/once-ui/components";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

// Definice typů pro blog a newsletter
interface BlogContent {
  label?: string;
  title: string;
  description: string;
}

interface NewsletterContent {
  display: boolean;
  title: string | Element;
  description: string | Element;
}

interface PersonContent {
  name?: string;
  avatar?: string;
}

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations();
  const content = renderContent(t);

  // Kontrola, zda blog existuje a má potřebné vlastnosti
  const blogContent = content.blog as BlogContent | undefined;

  // Použití výchozích hodnot, pokud blog neexistuje nebo nemá potřebné vlastnosti
  const title = blogContent?.title || "Blog";
  const description = blogContent?.description || "Latest blog posts";
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

export default function Blog({ params: { locale } }: PageProps) {
  const t = useTranslations();
  const content = renderContent(t);

  // Typové anotace a výchozí hodnoty pro blog a newsletter
  const person = (content.person as PersonContent) || {};
  const blogContent = (content.blog as BlogContent) || {
    title: "Blog",
    description: "Latest blog posts"
  };

  const newsletterContent = (content.newsletter as NewsletterContent) || {
    display: false,
    title: "Newsletter",
    description: "Subscribe to our newsletter"
  };

  return (
    <Flex fillWidth maxWidth="s" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: blogContent.title,
            description: blogContent.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og?title=${encodeURIComponent(blogContent.title)}`,
            author: {
              "@type": "Person",
              name: person.name || "",
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar || ""}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blogContent.title}
      </Heading>
      <Flex fillWidth flex={1} direction="column">
        <Posts range={[1, 3]} locale={locale} thumbnail />
        <Posts range={[4]} columns="2" locale={locale} />
      </Flex>
      {newsletterContent.display && (
        <Mailchimp
          newsletter={{
            display: newsletterContent.display,
            title: typeof newsletterContent.title === 'string' ? newsletterContent.title : "",
            description: typeof newsletterContent.description === 'string' ? newsletterContent.description : "",
          }}
        />
      )}
    </Flex>
  );
}