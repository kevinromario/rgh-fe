import { Accordion as AccordionRoot, VStack, Button } from "@chakra-ui/react";
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

  return (
    <Accordion
      multiple
      collapsible
      value={props.openedUsers}
      onValueChange={(e) => props.setOpenedUsers(e.value)}
    >
      <VStack>
        <LightMode>
          {props.data.pages
            .flatMap((p) => p.items)
            .map((user, index) => {
              const isOpened = props.openedUsers.includes(user.id.toString());
              return (
                <AccordionItem
                  key={`user-${index}`}
                  value={user.id.toString()}
                  title={user.login}
                  isOpened={isOpened}
                  onClick={() => null}
                >
                  <GithubRepositories user={user} isOpened={isOpened} />
                </AccordionItem>
              );
            })}
          {props.hasNextPage && (
            <Button
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
