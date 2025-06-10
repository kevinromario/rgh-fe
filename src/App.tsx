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
  Accordion,
  Span,
} from "@chakra-ui/react";
import { LightMode, useColorMode } from "./components/ui/color-mode";
import { useRef, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

const gap = 5;

const users = [
  {
    title: "Kevin",
    value: "user-one",
    text: "Content User One",
  },
  {
    title: "Yoga",
    value: "user-two",
    text: "Content User Two",
  },
  {
    title: "Abdul",
    value: "user-third",
    text: "Content User Third",
  },
  {
    title: "Beta",
    value: "user-four",
    text: "Content User Four",
  },
  {
    title: "Alpha",
    value: "user-five",
    text: "Content User Five",
  },
];

function App() {
  const [openedUsers, setOpenedUsers] = useState<string[]>([]);
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
        setOpenedUsers([]);
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
            {searchUsername && (
              <Accordion.Root
                multiple
                collapsible
                value={openedUsers}
                onValueChange={(e) => setOpenedUsers(e.value)}
              >
                <VStack>
                  <LightMode>
                    {users.map((item, index) => {
                      const isOpened = openedUsers.find(
                        (user) => user === item.value
                      );
                      return (
                        <Accordion.Item
                          w="full"
                          key={index}
                          value={item.value}
                          borderBottomStyle={isOpened ? "solid" : "none"}
                        >
                          <Accordion.ItemTrigger
                            cursor="pointer"
                            bgColor="gray.200"
                            paddingX="3"
                          >
                            <Span flex="1">{item.title}</Span>

                            <Accordion.ItemIndicator />
                          </Accordion.ItemTrigger>
                          <Accordion.ItemContent>
                            <Accordion.ItemBody>
                              <Box
                                bgColor="gray.300"
                                padding="3"
                                borderRadius="sm"
                              >
                                {item.text}
                              </Box>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      );
                    })}
                    <Button w="full" variant="subtle">
                      Load More
                    </Button>
                  </LightMode>
                </VStack>
              </Accordion.Root>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
