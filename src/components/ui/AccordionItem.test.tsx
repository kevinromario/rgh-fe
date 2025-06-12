import { screen } from "@testing-library/react";
import { VStack } from "@chakra-ui/react";

import { describe, it, expect } from "vitest";
import { renderAccordionItem } from "src/test/utils/renderAccordionItem";

describe("AccordionItem", () => {
  it("renders title and children correctly", () => {
    renderAccordionItem({
      title: "My Accordion Title",
      value: "item-1",
      isOpened: true,
      children: (
        <VStack>
          <p>Accordion Content</p>
        </VStack>
      ),
    });

    expect(screen.getByText("My Accordion Title")).toBeInTheDocument();
    expect(screen.getByText("Accordion Content")).toBeInTheDocument();
  });

  it("adds border when isOpened is true", () => {
    renderAccordionItem({
      title: "With Border",
      value: "item-2",
      isOpened: true,
      children: <p>Content</p>,
    });

    const item = screen.getByTestId("accordion-item");
    expect(item).toHaveStyle("border-bottom-style: solid");
  });

  it("does not add border when isOpened is false", () => {
    renderAccordionItem({
      title: "Without Border",
      value: "item-3",
      isOpened: false,
      children: <p>Content</p>,
    });

    const item = screen.getByTestId("accordion-item");
    expect(item).toHaveStyle("border-bottom-style: none");
  });
});
