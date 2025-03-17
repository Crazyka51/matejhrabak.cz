import { renderContent } from "@/app/resources";
import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components"
import { useTranslations } from "next-intl";
import styles from './Footer.module.scss'

// Definice typů pro lepší typovou kontrolu
interface PersonContent {
  name?: string;
  avatar?: string;
}

interface SocialItem {
  name: string;
  icon: string;
  link?: string;
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const t = useTranslations();
  const content = renderContent(t);
  
  // Bezpečné typování s výchozími hodnotami
  const person = (content.person as PersonContent) || {};
  const social = (content.social as SocialItem[]) || [];

  return (
    <Flex
      as="footer"
      position="relative"
      fillWidth padding="8"
      justifyContent="center" mobileDirection="column">
      <Flex
        className={styles.mobile}
        fillWidth maxWidth="m" paddingY="8" paddingX="16" gap="16"
        justifyContent="space-between" alignItems="center">
        <Text
          variant="body-default-s"
          onBackground="neutral-strong">
          <Text
            onBackground="neutral-weak">
            © {currentYear} /
          </Text>
          <Text paddingX="4">
            {person.name || ""}
          </Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
            / Build by <SmartLink style={{ marginLeft: '-0.125rem' }} href="https://once-ui.com/templates/magic-portfolio">UI</SmartLink>
          </Text>
        </Text>
        <Flex
          gap="16">
          {social.map((item, index) => (
            item.link && (
              <IconButton
                key={item.name || `social-${index}`}
                href={item.link}
                icon={item.icon || "link"}
                tooltip={item.name || "Social link"}
                size="s"
                variant="ghost" />
            )
          ))}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  )
}