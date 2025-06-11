import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  VStack,
  Accordion as AccordionRoot,
  Icon,
} from "@chakra-ui/react";
import { ColorModeButton, LightMode } from "./components/ui/ColorMode";
import { useState } from "react";

import { SearchInput } from "./components/ui/SearchInput";
import { MAX_WIDTH } from "./constants";
import { AccordionItem } from "./components/ui/AccordionItem";
import { FaStar } from "react-icons/fa";
import { useColorModeValue } from "./hooks/useColorMode";

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
  const { Root: Accordion } = AccordionRoot;
  const [openedUsers, setOpenedUsers] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const accordionContentBgColor = useColorModeValue("gray.300", "gray.400");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("inputText: ", inputText);
    setSearchUsername(inputText);
  };

  return (
    <Container>
      <VStack p="7">
        <Box w="full" maxWidth={MAX_WIDTH}>
          <VStack gap={5}>
            <HStack w="full" justifyContent="space-between">
              <Text>GitHub Repositories Explorer</Text>
              <ColorModeButton />
            </HStack>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack>
                <SearchInput
                  value={inputText}
                  onChange={setInputText}
                  onClear={() => {
                    setInputText("");
                    setSearchUsername("");
                    setOpenedUsers([]);
                  }}
                />
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
              <Accordion
                multiple
                collapsible
                value={openedUsers}
                onValueChange={(e) => setOpenedUsers(e.value)}
              >
                <VStack>
                  <LightMode>
                    {users.map((user, index) => {
                      return (
                        <AccordionItem
                          key={index}
                          {...user}
                          isOpened={openedUsers.includes(user.value)}
                        >
                          <VStack>
                            <Box
                              w="full"
                              bgColor={accordionContentBgColor}
                              padding="3"
                              borderRadius="sm"
                            >
                              <VStack alignItems="flex-start">
                                <HStack w="full" justifyContent="space-between">
                                  <Text fontWeight="bold">{user.text}</Text>
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
                        </AccordionItem>
                      );
                    })}
                    <Button w="full" variant="subtle" colorPalette="blue">
                      Load More Users
                    </Button>
                  </LightMode>
                </VStack>
              </Accordion>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
