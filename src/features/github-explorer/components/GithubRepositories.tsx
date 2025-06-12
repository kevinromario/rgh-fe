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
  userIndex: number;
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
              data-testid="repo-box"
              key={`${props.user.login}-${index + 1}`}
              w="full"
              bgColor={accordionContentBgColor}
              padding="3"
              borderRadius="sm"
            >
              <VStack alignItems="flex-start">
                <HStack w="full" justifyContent="space-between">
                  <Text
                    data-testid={`user-${props.userIndex}-repo-${
                      index + 1
                    }-title`}
                    fontWeight="bold"
                  >
                    {repo.name}
                  </Text>
                  <HStack gap="1">
                    <Text
                      data-testid={`user-${props.userIndex}-repo-${
                        index + 1
                      }-stars`}
                      fontWeight="bold"
                    >
                      {repo.stargazers_count}
                    </Text>
                    <Icon>
                      <FaStar />
                    </Icon>
                  </HStack>
                </HStack>
                <Text
                  data-testid={`user-${props.userIndex}-repo-${index}-description`}
                >
                  {repo.description}
                </Text>
              </VStack>
            </Box>
          );
        })}
      {error && <BoxError message={error.message} />}
      {isLoading && (
        <Skeleton data-testid="skeleton-loading" w="full" height="5" />
      )}
      {!hasNextPage &&
        !isLoading &&
        repositories &&
        repositories?.length > 0 &&
        !error && (
          <Text data-testid="text-no-more-repo">- No more repositories -</Text>
        )}
      {!hasNextPage &&
        !isLoading &&
        repositories &&
        repositories?.length === 0 &&
        !error && <Text data-testid="text-no-repo">- No repositories -</Text>}
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
