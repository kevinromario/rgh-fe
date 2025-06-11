import { Box, Button, Container, HStack, Text, VStack } from "@chakra-ui/react";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { MAX_WIDTH } from "../../constants";
import { ColorModeButton } from "src/components/ui/ColorMode";
import { SearchInput } from "src/components/ui/SearchInput";
import { useSearchGithubUsers } from "./hooks/useGithubQuery";

import { GithubUsers } from "./components/GithubUsers";

import { BoxError } from "src/components/ui/BoxError";

export default function GithubExplorer() {
  const [openedUsers, setOpenedUsers] = useState<string[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState<string>("");

  const queryClient = useQueryClient();

  const {
    data,
    refetch: fetchGithubUsers,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
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
                  loading={isLoading}
                  disabled={inputText === searchUsername}
                >
                  Search
                </Button>
              </VStack>
            </form>
            {error && <BoxError message={error.message} />}
            {searchUsername && data?.pages && (
              <Text alignSelf="self-start" fontWeight="light">
                Showing users for "{searchUsername}"
              </Text>
            )}
            {searchUsername && data?.pages && (
              <GithubUsers
                data={data}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                openedUsers={openedUsers}
                setOpenedUsers={setOpenedUsers}
              />
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
