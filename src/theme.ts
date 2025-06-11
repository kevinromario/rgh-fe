import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    breakpoints: {
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
  },
});

export const system = createSystem(defaultConfig, config);
