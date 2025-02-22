"use client";

import React, { useMemo, memo } from "react";
import styles from "../../../components/about/about.module.scss";
import TableOfContents from "../../../components/about/TableOfContents";
import {
  Flex,
  Avatar,
  Icon,
  Tag,
  IconButton,
  Heading,
  Button,
  SmartImage,
  Text,
} from "../../../once-ui/components";
import { baseURL } from "../../resources";

// Types
interface ImageType {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface WorkExperienceType {
  company: string;
  role: string;
  timeframe: string;
  achievements: string[];
  images: ImageType[];
}

interface InstitutionType {
  name: string;
  description: string;
}

interface SkillType {
  title: string;
  description: string;
  images: ImageType[];
}

interface AboutClientProps {
  content: {
    person: {
      firstName: string;
      lastName: string;
      name: string;
      role: string;
      avatar: string;
      location: string;
      languages: string[];
    };
    about: {
      intro: {
        title: string;
        display: boolean;
        description: string | JSX.Element;
      };
      work: {
        title: string;
        display: boolean;
        experiences: WorkExperienceType[];
      };
      studies: {
        title: string;
        display: boolean;
        institutions: InstitutionType[];
      };
      technical: {
        title: string;
        display: boolean;
        skills: SkillType[];
      };
      tableOfContent: {
        display: boolean;
        subItems: boolean;
      };
      calendar: {
        display: boolean;
        link: string;
      };
      avatar: {
        display: boolean;
      };
    };
    social: {
      name: string;
      link: string;
      icon: string;
    }[];
  };
}

// Reusable Components
const ImageGallery = memo(({ images }: { images: ImageType[] }) => (
  <Flex fillWidth paddingTop="m" gap="12" wrap>
    {images.map((image, index) => (
      <Flex
        key={`${image.src}-${index}`}
        border="neutral-medium"
        borderStyle="solid-1"
        radius="m"
        minWidth={image.width}
        height={image.height}
      >
        <SmartImage
          enlarge
          radius="m"
          sizes={image.width.toString()}
          alt={image.alt}
          src={image.src}
          loading="lazy"
        />
      </Flex>
    ))}
  </Flex>
));

const WorkExperience = memo(
  ({ experience }: { experience: WorkExperienceType }) => (
    <Flex fillWidth direction="column">
      <Flex
        fillWidth
        justifyContent="space-between"
        alignItems="flex-end"
        marginBottom="4"
      >
        <Text id={experience.company} variant="heading-strong-l">
          {experience.company}
        </Text>
        <Text variant="heading-default-xs" onBackground="neutral-weak">
          {experience.timeframe}
        </Text>
      </Flex>
      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
        {experience.role}
      </Text>
      <Flex as="ul" direction="column" gap="16">
        {experience.achievements.map((achievement, index) => (
          <Text
            as="li"
            variant="body-default-m"
            key={`${experience.company}-${index}`}
          >
            {achievement}
          </Text>
        ))}
      </Flex>
      {experience.images.length > 0 && (
        <Flex fillWidth paddingTop="m" paddingLeft="40">
          <ImageGallery images={experience.images} />
        </Flex>
      )}
    </Flex>
  )
);

const Studies = memo(({ institution }: { institution: InstitutionType }) => (
  <Flex fillWidth gap="4" direction="column">
    <Text id={institution.name} variant="heading-strong-l">
      {institution.name}
    </Text>
    <Text variant="heading-default-xs" onBackground="neutral-weak">
      {institution.description}
    </Text>
  </Flex>
));

const TechnicalSkill = memo(({ skill }: { skill: SkillType }) => (
  <Flex fillWidth gap="4" direction="column">
    <Text variant="heading-strong-l">{skill.title}</Text>
    <Text variant="body-default-m" onBackground="neutral-weak">
      {skill.description}
    </Text>
    {skill.images && skill.images.length > 0 && (
      <ImageGallery images={skill.images} />
    )}
  </Flex>
));

const AboutClient: React.FC<AboutClientProps> = ({ content }) => {
  const { person, about, social } = content;

  const structure = useMemo(
    () => [
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
        items: about.studies.institutions.map(
          (institution) => institution.name
        ),
      },
      {
        title: about.technical.title,
        display: about.technical.display,
        items: about.technical.skills.map((skill) => skill.title),
      },
    ],
    [about]
  );

  const schemaOrgData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
      description: about.intro.description,
      url: `https://${baseURL}/about`,
      image: `${baseURL}/images/${person.avatar}`,
      sameAs: social
        .filter((item) => item.link && !item.link.startsWith("mailto:"))
        .map((item) => item.link),
      worksFor: {
        "@type": "Organization",
        name: about.work.experiences[0]?.company || "",
      },
    }),
    [person, about, social]
  );

  return (
    <Flex fillWidth maxWidth="m" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrgData),
        }}
      />
      {about.tableOfContent.display && (
        <Flex
          style={{ left: "0", top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          direction="column"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Flex>
      )}
      <Flex fillWidth mobileDirection="column" justifyContent="center">
        {about.avatar.display && (
          <Flex
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            direction="column"
            alignItems="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" alignItems="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
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
        <Flex
          className={styles.blockAlign}
          fillWidth
          flex={9}
          maxWidth={40}
          direction="column"
        >
          <Flex
            id={about.intro.title}
            fillWidth
            minHeight="160"
            direction="column"
            justifyContent="center"
            marginBottom="32"
          >
            {about.calendar.display && (
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
                <Flex paddingX="8">Domluvit schůzku</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="tertiary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles?.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      />
                    )
                )}
              </Flex>
            )}
          </Flex>

          {about.intro.display && (
            <Flex
              direction="column"
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
            >
              {about.intro.description}
            </Flex>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <WorkExperience
                    key={`${experience.company}-${experience.role}-${index}`}
                    experience={experience}
                  />
                ))}
              </Flex>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Studies
                    key={`${institution.name}-${index}`}
                    institution={institution}
                  />
                ))}
              </Flex>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <TechnicalSkill
                    key={`${skill.title}-${index}`}
                    skill={skill}
                  />
                ))}
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AboutClient;
