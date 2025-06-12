import { Accordion } from "@chakra-ui/react";
import { renderWithProviders } from "./renderWithProviders";
import { AccordionItem } from "src/components/ui/AccordionItem";

export function renderAccordionItem({
  title,
  value,
  isOpened,
  children,
}: {
  title: string;
  value: string;
  isOpened: boolean;
  children?: React.ReactNode;
}) {
  return renderWithProviders(
    <Accordion.Root value={[]} multiple collapsible>
      <AccordionItem testId="1" title={title} value={value} isOpened={isOpened}>
        {children}
      </AccordionItem>
    </Accordion.Root>
  );
}
