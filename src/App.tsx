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
import { useSearchGithubUsers } from "./hooks/useGithubQuery";
import { useQueryClient } from "@tanstack/react-query";

function App() {
  const { Root: Accordion } = AccordionRoot;
  const [openedUsers, setOpenedUsers] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const accordionContentBgColor = useColorModeValue("gray.300", "gray.400");

  const queryClient = useQueryClient();

  const {
    data: githubUsers,
    refetch: fetchGithubUsers,
    fetchNextPage: fetchNextGithubUsers,
    hasNextPage: hasNextGithubUsers,
    isLoading: isLoadingFetchGithubUsers,
    isFetchingNextPage: isLoadingNextGithubUsers,
  } = useSearchGithubUsers(inputText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchUsername(inputText);
    fetchGithubUsers();
  };

  const handleOnChange = (text: string) => {
    setInputText(text);
    queryClient.removeQueries({ queryKey: ["search-users", searchUsername] });
    setSearchUsername("");
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
                  onChange={handleOnChange}
                  onClear={() => {
                    setInputText("");
                    setSearchUsername("");
                    setOpenedUsers([]);
                  }}
                />
                <Button
                  type="submit"
                  w="full"
                  colorPalette="blue"
                  loading={isLoadingFetchGithubUsers}
                >
                  Search
                </Button>
              </VStack>
            </form>
            {searchUsername && (
              <Text alignSelf="self-start" fontWeight="light">
                Showing users for {searchUsername}
              </Text>
            )}
            {searchUsername && githubUsers?.pages && (
              <Accordion
                multiple
                collapsible
                value={openedUsers}
                onValueChange={(e) => setOpenedUsers(e.value)}
              >
                <VStack>
                  <LightMode>
                    {githubUsers.pages
                      .flatMap((p) => p.items)
                      .map((user, index) => {
                        return (
                          <AccordionItem
                            key={index}
                            value={user.id.toString()}
                            title={user.login}
                            isOpened={openedUsers.includes(user.id.toString())}
                            onClick={() => null}
                          >
                            <VStack>
                              <Box
                                w="full"
                                bgColor={accordionContentBgColor}
                                padding="3"
                                borderRadius="sm"
                              >
                                <VStack alignItems="flex-start">
                                  <HStack
                                    w="full"
                                    justifyContent="space-between"
                                  >
                                    <Text fontWeight="bold">{user.login}</Text>
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
                    {hasNextGithubUsers && (
                      <Button
                        w="full"
                        variant="subtle"
                        colorPalette="blue"
                        onClick={() => fetchNextGithubUsers()}
                        loading={isLoadingNextGithubUsers}
                      >
                        Load More Users
                      </Button>
                    )}
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
