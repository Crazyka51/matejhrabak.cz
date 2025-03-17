import type React from "react"
import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, Tag, Text } from "@/once-ui/components"
import { baseURL, renderContent } from "@/app/resources"
import TableOfContents from "@/components/about/TableOfContents"
import styles from "@/components/about/about.module.scss"

// Definujeme minimální strukturu, kterou potřebujeme
interface ContentData {
  person?: {
    name?: string
    avatar?: string
    role?: string
    location?: string
    languages?: string[]
  }
  about?: {
    title?: string
    description?: string
    tableOfContent?: {
      display?: boolean
      subItems?: boolean
    }
    avatar?: {
      display?: boolean
    }
    calendar?: {
      display?: boolean
      link?: string
    }
    intro?: {
      display?: boolean
      title?: string
      description?: React.ReactNode
    }
    work?: {
      display?: boolean
      title?: string
      experiences?: Array<{
        company?: string
        role?: string
        timeframe?: string
        achievements?: string[]
        images?: Array<{
          width?: number
          height?: number
          alt?: string
          src?: string
        }>
      }>
    }
    studies?: {
      display?: boolean
      title?: string
      institutions?: Array<{
        name?: string
        description?: string
      }>
    }
    technical?: {
      display?: boolean
      title?: string
      skills?: Array<{
        title?: string
        description?: string
        images?: Array<{
          width?: number
          height?: number
          alt?: string
          src?: string
        }>
      }>
    }
  }
  social?: Array<{
    name?: string
    icon?: string
    link?: string
  }>
}

// Komponenty pro sekce stránky About
const WorkExperience = ({
  experience,
}: {
  experience: {
    company?: string
    role?: string
    timeframe?: string
    achievements?: string[]
    images?: Array<{ width?: number; height?: number; alt?: string; src?: string }>
  }
}) => (
  <Flex fillWidth direction="column">
    <Flex fillWidth justifyContent="space-between" alignItems="flex-end" marginBottom="4">
      <Text id={experience.company || ""} variant="heading-strong-l">
        {experience.company || ""}
      </Text>
      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {experience.timeframe || ""}
      </Text>
    </Flex>
    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
      {experience.role || ""}
    </Text>
    <Flex as="ul" direction="column" gap="16">
      {(experience.achievements || []).map((achievement, index) => (
        <Text as="li" variant="body-default-m" key={`${experience.company || ""}-${index}`}>
          {achievement}
        </Text>
      ))}
    </Flex>
    {experience.images && experience.images.length > 0 && (
      <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
        {experience.images.map((image, imageIndex) => (
          <Flex
            key={imageIndex}
            border="neutral-medium"
            borderStyle="solid-1"
            radius="m"
            minWidth={image.width || 0}
            height={image.height || 0}
          >
            <SmartImage
              enlarge
              radius="m"
              sizes={(image.width || 0).toString()}
              alt={image.alt || ""}
              src={image.src || ""}
            />
          </Flex>
        ))}
      </Flex>
    )}
  </Flex>
)

const Studies = ({
  institution,
}: {
  institution: {
    name?: string
    description?: string
  }
}) => (
  <Flex fillWidth gap="4" direction="column">
    <Text id={institution.name || ""} variant="heading-strong-l">
      {institution.name || ""}
    </Text>
    <Text variant="heading-default-xs" onBackground="neutral-weak">
      {institution.description || ""}
    </Text>
  </Flex>
)

const TechnicalSkill = ({
  skill,
}: {
  skill: {
    title?: string
    description?: string
    images?: Array<{ width?: number; height?: number; alt?: string; src?: string }>
  }
}) => (
  <Flex fillWidth gap="4" direction="column">
    <Text variant="heading-strong-l">{skill.title || ""}</Text>
    <Text variant="body-default-m" onBackground="neutral-weak">
      {skill.description || ""}
    </Text>
    {skill.images && skill.images.length > 0 && (
      <Flex fillWidth paddingTop="m" gap="12" wrap>
        {skill.images.map((image, imageIndex) => (
          <Flex
            key={imageIndex}
            border="neutral-medium"
            borderStyle="solid-1"
            radius="m"
            minWidth={image.width || 0}
            height={image.height || 0}
          >
            <SmartImage
              enlarge
              radius="m"
              sizes={(image.width || 0).toString()}
              alt={image.alt || ""}
              src={image.src || ""}
            />
          </Flex>
        ))}
      </Flex>
    )}
  </Flex>
)

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const content = renderContent() as unknown as ContentData
  const title = content.about?.title || "About"
  const description = content.about?.description || ""
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`

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
  }
}

export default function About({ params: { locale } }: { params: { locale: string } }) {
  // Získáme obsah s typovou anotací
  const content = renderContent() as unknown as ContentData
  const person = content.person || {}
  const about = content.about || {}
  const social = content.social || []

  // Vytvoříme strukturu pro TableOfContents
  const structure = [
    {
      title: about.intro?.title || "",
      display: !!about.intro?.display,
      items: [],
    },
    {
      title: about.work?.title || "",
      display: !!about.work?.display,
      items: (about.work?.experiences || []).map((experience) => experience.company || ""),
    },
    {
      title: about.studies?.title || "",
      display: !!about.studies?.display,
      items: (about.studies?.institutions || []).map((institution) => institution.name || ""),
    },
    {
      title: about.technical?.title || "",
      display: !!about.technical?.display,
      items: (about.technical?.skills || []).map((skill) => skill.title || ""),
    },
  ]

  return (
    <Flex fillWidth maxWidth="m" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name || "",
            jobTitle: person.role || "",
            description: about.intro?.description || "",
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar || ""}`,
            sameAs: (social || [])
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link || ""),
            worksFor: {
              "@type": "Organization",
              name: about.work?.experiences?.[0]?.company || "",
            },
          }),
        }}
      />
      {about.tableOfContent?.display && (
        <Flex
          style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          direction="column"
          hide="s"
        >
          <TableOfContents
            structure={structure}
            about={{
              tableOfContent: {
                display: !!about.tableOfContent?.display,
                subItems: !!about.tableOfContent?.subItems,
              },
            }}
          />
        </Flex>
      )}
      <Flex fillWidth mobileDirection="column" justifyContent="center">
        {about.avatar?.display && (
          <Flex minWidth="160" paddingX="l" paddingBottom="xl" gap="m" flex={3} direction="column" alignItems="center">
            <Avatar src={person.avatar || ""} size="xl" />
            <Flex gap="8" alignItems="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location || ""}
            </Flex>
            {person.languages && person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Flex>
        )}
        <Flex className={styles.blockAlign} fillWidth flex={9} maxWidth={40} direction="column">
          <Flex
            id={about.intro?.title || ""}
            fillWidth
            minHeight="160"
            direction="column"
            justifyContent="center"
            marginBottom="32"
          >
            {about.calendar?.display && (
              <Flex
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                  border: "1px solid var(--brand-alpha-medium)",
                  width: "fit-content",
                }}
                alpha="brand-weak"
                radius="full"
                fillWidth
                padding="4"
                gap="8"
                marginBottom="m"
                alignItems="center"
              >
                <Flex paddingLeft="12">
                  <Icon name="calendar" onBackground="brand-weak" />
                </Flex>
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar?.link || "#"}
                  data-border="rounded"
                  variant="tertiary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name || ""}
            </Heading>
            <Text className={styles.textAlign} variant="display-default-xs" onBackground="neutral-weak">
              {person.role || ""}
            </Text>
            {social && social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap>
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name || ""}
                        size="s"
                        variant="tertiary"
                      />
                    ),
                )}
              </Flex>
            )}
          </Flex>

          {about.intro?.display && (
            <Flex direction="column" textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Flex>
          )}

          {about.work?.display && (
            <>
              <Heading as="h2" id={about.work.title || ""} variant="display-strong-s" marginBottom="m">
                {about.work.title || ""}
              </Heading>
              <Flex direction="column" fillWidth gap="l" marginBottom="40">
                {(about.work.experiences || []).map((experience, index) => (
                  <WorkExperience key={`${experience.company || ""}-${index}`} experience={experience} />
                ))}
              </Flex>
            </>
          )}

          {about.studies?.display && (
            <>
              <Heading as="h2" id={about.studies.title || ""} variant="display-strong-s" marginBottom="m">
                {about.studies.title || ""}
              </Heading>
              <Flex direction="column" fillWidth gap="l" marginBottom="40">
                {(about.studies.institutions || []).map((institution, index) => (
                  <Studies key={`${institution.name || ""}-${index}`} institution={institution} />
                ))}
              </Flex>
            </>
          )}

          {about.technical?.display && (
            <>
              <Heading as="h2" id={about.technical.title || ""} variant="display-strong-s" marginBottom="40">
                {about.technical.title || ""}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                {(about.technical.skills || []).map((skill, index) => (
                  <TechnicalSkill key={`${skill.title || ""}-${index}`} skill={skill} />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

