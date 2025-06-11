// console.log("structuredClone in test env:", typeof structuredClone);
// import { render, screen } from "@testing-library/react";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// import { BoxError } from "./BoxError";

// describe("Button", () => {
//   it("renders with text", () => {
//     render(
//       <ChakraProvider value={defaultSystem}>
//         <BoxError message="Not Found" />
//       </ChakraProvider>
//     );

//     expect(screen.getByText("Not Found")).toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import { BoxError } from "./BoxError";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("BoxError", () => {
  it("renders the given error message", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BoxError message="Something went wrong" />
      </ChakraProvider>
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("displays the error icon", () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <BoxError message="Error occurred" />
      </ChakraProvider>
    );
    const icon = screen.getByTestId("icon-error");
    expect(icon).toBeInTheDocument();
  });
});
