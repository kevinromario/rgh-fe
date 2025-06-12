import { Accordion, Text } from "@chakra-ui/react";

type AccordionItemProps = {
  title: string;
  value: string;
  isOpened: boolean;
  children: React.ReactNode;
  testId: string;
};

export function AccordionItem({
  title,
  value,
  isOpened,
  children,
  testId,
}: AccordionItemProps) {
  return (
    <Accordion.Item
      data-testid="accordion-item"
      w="full"
      value={value}
      borderBottomStyle={isOpened ? "solid" : "none"}
    >
      <Accordion.ItemTrigger
        data-testid={testId}
        cursor="pointer"
        bgColor="gray.200"
        paddingX="3"
      >
        <Text flex="1">{title}</Text>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent>
        <Accordion.ItemBody paddingLeft="3">{children}</Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
