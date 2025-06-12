import {
  Accordion as AccordionRoot,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { LightMode } from "src/components/ui/ColorMode";
import type { UserResponse } from "../types/githubUser.type";
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { AccordionItem } from "src/components/ui/AccordionItem";

import { GithubRepositories } from "./GithubRepositories";

type GithubUsersProps = {
  data: InfiniteData<UserResponse, number>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<UserResponse, number>, Error>
  >;
  openedUsers: string[];
  setOpenedUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

export function GithubUsers(props: GithubUsersProps) {
  const { Root: Accordion } = AccordionRoot;
  const users = props.data.pages.flatMap((p) => p.items);

  return (
    <Accordion
      multiple
      collapsible
      value={props.openedUsers}
      onValueChange={(e) => props.setOpenedUsers(e.value)}
    >
      <VStack>
        <LightMode>
          {users.map((user, index) => {
            if (!user.id || !user.login) {
              return null;
            }
            const isOpened = props.openedUsers.includes(user.id.toString());
            return (
              <AccordionItem
                key={index}
                testId={`user-${index + 1}`}
                value={user.id.toString()}
                title={user.login}
                isOpened={isOpened}
              >
                <GithubRepositories
                  userIndex={index + 1}
                  user={user}
                  isOpened={isOpened}
                />
              </AccordionItem>
            );
          })}
          {!props.hasNextPage && !props.isLoading && users.length === 0 && (
            <Text data-testid="text-no-user">- No user -</Text>
          )}
          {!props.hasNextPage && !props.isLoading && users.length > 0 && (
            <Text data-testid="text-no-more-user">- No more user -</Text>
          )}
          {props.hasNextPage && (
            <Button
              data-testid="load-more-user"
              w="full"
              variant="subtle"
              colorPalette="blue"
              onClick={() => props.fetchNextPage()}
              loading={props.isFetchingNextPage}
            >
              Load More Users
            </Button>
          )}
        </LightMode>
      </VStack>
    </Accordion>
  );
}
