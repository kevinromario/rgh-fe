import {
  Box,
  Button,
  HStack,
  Icon,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useColorModeValue } from "src/hooks/useColorMode";
import type { GithubUser } from "../types/githubUser.type";
import { useUserRepos } from "../hooks/useGithubQuery";
import { useEffect } from "react";

type GithubRepositoriesProps = {
  user: GithubUser;
  isOpened: boolean;
};
export function GithubRepositories(props: GithubRepositoriesProps) {
  const accordionContentBgColor = useColorModeValue("gray.300", "gray.400");

  const {
    data,
    refetch: fetchGithubRepos,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useUserRepos(props.user.login);

  useEffect(() => {
    if (props.isOpened) {
      fetchGithubRepos();
    }
  }, [props.isOpened, fetchGithubRepos]);
  return (
    <VStack>
      {data?.pages
        .flatMap((p) => p)
        .map((repo, index) => {
          return (
            <Box
              key={`${props.user.login}-${index}`}
              w="full"
              bgColor={accordionContentBgColor}
              padding="3"
              borderRadius="sm"
            >
              <VStack alignItems="flex-start">
                <HStack w="full" justifyContent="space-between">
                  <Text fontWeight="bold">{repo.name}</Text>
                  <HStack gap="1">
                    <Text fontWeight="bold">{repo.stargazers_count}</Text>
                    <Icon>
                      <FaStar />
                    </Icon>
                  </HStack>
                </HStack>
                <Text>{repo.description}</Text>
              </VStack>
            </Box>
          );
        })}
      {isLoading && <Skeleton w="full" height="5" />}
      {!hasNextPage && <Text>- No more repositories -</Text>}
      {hasNextPage && (
        <Button
          w="full"
          variant="subtle"
          colorPalette="gray"
          loading={isLoading || isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load More Repositories
        </Button>
      )}
    </VStack>
  );
}
