import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  VStack,
  InputGroup,
  CloseButton,
  Accordion,
  Span,
  Icon,
} from "@chakra-ui/react";
import { ColorModeButton, LightMode } from "./components/ui/colorMode";
import { useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useColorModeValue } from "./hooks/useColorMode";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const accordionContent = useColorModeValue("gray.300", "gray.400");

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
              <ColorModeButton />
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
                            <Accordion.ItemBody paddingLeft="3">
                              <VStack gap={gap}>
                                <Box
                                  w="full"
                                  bgColor={accordionContent}
                                  padding="3"
                                  borderRadius="sm"
                                >
                                  <VStack alignItems="flex-start">
                                    <HStack
                                      w="full"
                                      justifyContent="space-between"
                                    >
                                      <Text fontWeight="bold">{item.text}</Text>
                                      <HStack gap="1">
                                        <Text fontWeight="bold">18</Text>
                                        <Icon>
                                          <FaStar />
                                        </Icon>
                                      </HStack>
                                    </HStack>
                                    <Text>Description</Text>
                                  </VStack>
                                </Box>
                                <Button
                                  w="full"
                                  variant="subtle"
                                  colorPalette="gray"
                                >
                                  Load More Repository
                                </Button>
                              </VStack>
                            </Accordion.ItemBody>
                          </Accordion.ItemContent>
                        </Accordion.Item>
                      );
                    })}
                    <Button w="full" variant="subtle" colorPalette="blue">
                      Load More Users
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
