import { Box, Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useColorModeValue } from "src/hooks/useColorMode";
import type { GithubUser } from "../types/githubUser.type";

type GithubRepositoriesProps = {
  user: GithubUser;
  isOpened: boolean;
};
export function GithubRepositories(props: GithubRepositoriesProps) {
  const accordionContentBgColor = useColorModeValue("gray.300", "gray.400");

  return (
    <VStack>
      <Box
        w="full"
        bgColor={accordionContentBgColor}
        padding="3"
        borderRadius="sm"
      >
        <VStack alignItems="flex-start">
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="bold">{props.user.login}</Text>
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
      <Button w="full" variant="subtle" colorPalette="gray">
        Load More Repository
      </Button>
    </VStack>
  );
}
