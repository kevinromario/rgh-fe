import { Box, HStack, Icon } from "@chakra-ui/react";
import { BiSolidError } from "react-icons/bi";

export function BoxError({ message }: { message: string }) {
  return (
    <Box w="full" bgColor="red.100" p="2" borderRadius="sm">
      <HStack align="center">
        <Icon color="red.700" data-testid="icon-error">
          <BiSolidError />
        </Icon>{" "}
        {message}
      </HStack>
    </Box>
  );
}
