import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  Switch,
  VStack,
  InputGroup,
  CloseButton,
} from "@chakra-ui/react";
import { LightMode, useColorMode } from "./components/ui/color-mode";
import { useRef, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const gap = 5;

function App() {
  const { toggleColorMode, colorMode } = useColorMode();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inputText: ", inputText);
    setSearchUsername(inputText);
  };

  const endElement = inputText ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setInputText("");
        setSearchUsername("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <Container>
      <VStack p="7">
        <Box
          w="full"
          maxWidth={{
            base: "72",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "3xl",
            "3xl": "4xl",
            "4xl": "5xl",
          }}
        >
          <VStack gap={gap}>
            <HStack w="full" justifyContent="space-between">
              <Text>GitHub Repositories Explorer</Text>
              <Button variant="ghost" onClick={toggleColorMode}>
                <Switch.Root checked={colorMode === "dark" ? true : false}>
                  <Switch.HiddenInput />
                  <Switch.Control />
                </Switch.Root>
                {colorMode === "light" ? <LuSun /> : <LuMoon />}
              </Button>
            </HStack>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack gap={gap}>
                <LightMode>
                  <InputGroup endElement={endElement}>
                    <Input
                      ref={inputRef}
                      value={inputText}
                      placeholder="Enter username"
                      backgroundColor="gray.200"
                      onChange={(x) => {
                        setInputText(x.target.value);
                      }}
                    />
                  </InputGroup>
                </LightMode>
                <Button type="submit" w="full" colorPalette="blue">
                  Search
                </Button>
              </VStack>
            </form>
            {searchUsername && (
              <Text alignSelf="self-start" fontWeight="light">
                Showing users for {searchUsername}
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
