import { render, screen } from "@testing-library/react";
import {
  Accordion,
  ChakraProvider,
  defaultSystem,
  VStack,
} from "@chakra-ui/react";
import { AccordionItem } from "./AccordionItem";
import { describe, it, expect } from "vitest";

describe("AccordionItem", () => {
  it("renders title and children correctly", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Accordion.Root value={[]} multiple collapsible>
          <AccordionItem
            title="My Accordion Title"
            value="item-1"
            isOpened={true}
          >
            <VStack>
              <p>Accordion Content</p>
            </VStack>
          </AccordionItem>
        </Accordion.Root>
      </ChakraProvider>
    );

    expect(screen.getByText("My Accordion Title")).toBeInTheDocument();

    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("adds border when isOpened is true", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Accordion.Root value={[]} multiple>
          <AccordionItem title="With Border" value="item-2" isOpened={true}>
            <p>Content</p>
          </AccordionItem>
        </Accordion.Root>
      </ChakraProvider>
    );

    const item = screen.getByTestId("item-2");
    expect(item).toHaveStyle("border-bottom-style: solid");
  });

  it("does not add border when isOpened is false", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <Accordion.Root value={[]} multiple>
          <AccordionItem title="Without Border" value="item-3" isOpened={false}>
            <p>Content</p>
          </AccordionItem>
        </Accordion.Root>
      </ChakraProvider>
    );

    const item = screen.getByTestId("item-3");
    expect(item).toHaveStyle("border-bottom-style: none");
  });
});
