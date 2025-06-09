import { Box, Button, Container, Input, VStack } from "@chakra-ui/react";

function App() {
  return (
    <Container fluid>
      <VStack p="7">
        <Box
          backgroundColor={"white"}
          w="full"
          maxWidth={{ base: "72", md: "lg", lg: "xl" }}
        >
          <VStack gap="5">
            <Input placeholder="Enter username" backgroundColor="gray.200" />
            <Button w="full" colorPalette="blue">
              Search
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default App;
