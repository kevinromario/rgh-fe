// setupTestUtils.ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import React from "react";
import { render } from "@testing-library/react";

export function renderWithProviders(ui: React.ReactNode) {
  const client = new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <ChakraProvider value={defaultSystem}>{ui}</ChakraProvider>
    </QueryClientProvider>
  );
}
