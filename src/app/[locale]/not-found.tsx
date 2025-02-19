import { Flex, Heading, Text } from "@/once-ui/components";

export default function NotFound() {
  return (
    <Flex as="section" direction="column" alignItems="center">
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-strong-xs">
        Stránka nenalezena!
      </Heading>
      <Text onBackground="neutral-weak">
        Stránku kterou hledáte jsme nenašli.
      </Text>
    </Flex>
  );
}
