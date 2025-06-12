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
import { useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { BoxError } from "src/components/ui/BoxError";

type GithubRepositoriesProps = {
  user: GithubUser;
  isOpened: boolean;
};
export function GithubRepositories(props: GithubRepositoriesProps) {
  const queryClient = useQueryClient();
  const accordionContentBgColor = useColorModeValue("gray.300", "gray.400");

  const {
    data,
    refetch: fetchGithubRepos,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useUserRepos(props.user.login || "");

  useEffect(() => {
    if (props.isOpened) {
      fetchGithubRepos();
    } else {
      queryClient.removeQueries({ queryKey: ["repos", props.user.login] });
    }
  }, [props.isOpened, fetchGithubRepos, props.user.login, queryClient]);

  const repositories = useMemo(() => {
    return data?.pages.flatMap((p) => p);
  }, [data]);

  return (
    <VStack>
      {repositories &&
        repositories.map((repo, index) => {
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
      {error && <BoxError message={error.message} />}
      {isLoading && <Skeleton w="full" height="5" />}
      {!hasNextPage &&
        !isLoading &&
        repositories &&
        repositories?.length > 0 &&
        !error && <Text>- No more repositories -</Text>}
      {!hasNextPage &&
        !isLoading &&
        repositories &&
        repositories?.length === 0 &&
        !error && <Text>- No repositories -</Text>}
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
