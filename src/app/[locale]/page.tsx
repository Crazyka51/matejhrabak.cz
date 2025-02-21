import React from "react";
import Image from "next/image";

// Importování komponent z knihovny once-ui
import {
  Heading,
  Flex,
  Text,
  Button,
  RevealFx,
  Arrow,
  Grid,
  Badge,
} from "@/once-ui/components";

// Importování vlastních komponent
import { Projects } from "@/components/work/Projects";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";

// Importování funkcí a datových zdrojů
import { baseURL, routes, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

// Funkce pro generování metadat pro stránku
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { home } = renderContent(t);
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}`,
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

// Hlavní komponenta pro domovskou stránku
export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Nastavení jazyka na základě parametru locale
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const { home, about, person, newsletter } = renderContent(t);

  return (
    <Flex
      maxWidth="m"
      fillWidth
      gap="xl"
      direction="column"
      alignItems="center"
    >
      {/* Strukturovaná data pro SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
            publisher: {
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
      {/* Hlavní obsah stránky */}
      <Flex fillWidth direction="row" paddingY="l" gap="l" alignItems="center">
        <Image
          src="/images/avatar_fullHD.png"
          width="200"
          height={360}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "24px",
          }}
          alt="Portrét Matěje Hrabáka"
        />
        <Flex direction="column">
          <RevealFx
            translateY="4"
            fillWidth
            justifyContent="flex-start"
            paddingBottom="m"
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            justifyContent="flex-start"
            paddingBottom="m"
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-xl"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4}>
            <Flex fillWidth>
              <Button
                id="about"
                href={`/${locale}/about`}
                variant="tertiary"
                size="m"
                data-shape="playful"
              >
                <Flex gap="8" alignItems="center">
                  {t("about.title")}
                  <Arrow trigger="#about" />
                </Flex>
              </Button>
            </Flex>
          </RevealFx>
        </Flex>
      </Flex>
      {/* Sekce s odznaky */}
      <RevealFx translateY="16" delay={0.6}>
        <Grid columns="repeat(4, 1fr)" gap="24" padding="24">
          {/* Odznak pro investice */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href={`/${locale}/investments`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/investice_ikona.png"
              alt="Investice"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Generali Investice
            </span>
          </Badge>
          {/* Odznak pro pojištění majetku */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href="https://www.generaliceska.cz/pojisteni-majetku#/?externalSellerID=int-matej-hrabak"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/majetek_ikona.png"
              alt="Pojištění majetku"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Pojištění majetku
            </span>
          </Badge>
          {/* Odznak pro pojištění mazlíčků */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href="https://sjednat.generaliceska.cz/mazlicek?externalSellerId=int-matej-hrabak"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/mazlicek_ikona.png"
              alt="Pojištění mazlíčků"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Pojištění mazlíčků
            </span>
          </Badge>
          {/* Odznak pro penzijní připojištění */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href={`/${locale}/pension-insurance`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/penzijni_ikona.png"
              alt="Penzijní připojištění"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Penzijní připojištění
            </span>
          </Badge>
          {/* Odznak pro povinné ručení */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href="https://www.generaliceska.cz/povinne-ruceni-online-sjednani?externalSellerId=int-matej-hrabak"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/pmv_ikona.png"
              alt="Povinné ručení"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Povinné ručení
            </span>
          </Badge>
          {/* Odznak pro firemní pojištění */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href={`/${locale}/business-insurance`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/sme_ikona.png"
              alt="Firemní pojištění"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Firemní pojištění
            </span>
          </Badge>
          {/* Odznak pro životní pojištění */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href={`/${locale}/life-insurance`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/zivot_ikona.png"
              alt="Životní pojištění"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Životní pojištění
            </span>
          </Badge>
          {/* Odznak pro bankovní služby */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href={`/${locale}/banking-services`}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/bankovni_sluzby_ikona.png"
              alt="Bankovní služby"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Bankovní služby
            </span>
          </Badge>
          {/* Odznak pro cestovní pojištění */}
          <Badge
            arrow
            effect
            data-brand="tertiary"
            data-border="rounded"
            as="a"
            href="https://www.generaliceska.cz/cestovni-pojisteni-online-sjednani#/?externalSellerID=int-matej-hrabak"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              transition: "all 0.3s ease",
            }}
          >
            <Image
              src="/images/cestovko_ikona.png"
              alt="Cestovní pojištění"
              width={50}
              height={50}
            />
            <span style={{ display: "inline-block", marginTop: "8px" }}>
              Cestovní pojištění
            </span>
          </Badge>
        </Grid>
      </RevealFx>
    </Flex>
  );
}
