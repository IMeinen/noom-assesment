import { Box, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeState } from "../../app/store/sleepInfoCardSlice";

function SleepDetailsStateContainer() {
  const dispatch = useDispatch();

  return (
    <Box overflow="hidden" p="6" maxW="sm" textAlign="center">
      <Box
        position="absolute"
        top="0"
        right="0"
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          colorScheme="blackAlpha"
          fontSize="12px"
          p="1"
          borderRadius="0"
          onClick={() => dispatch(changeState(1))}
        >
          AVG
        </Button>
      </Box>
      <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        November, 13th
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        8 h 12 min
      </Text>
      <Text fontSize="md" color="gray.500">
        10:53 pm - 7:05 am
      </Text>
      <Text mt="2">
        You felt:{" "}
        <Text as="span" color="green.500" fontWeight="bold">
          Good
        </Text>
      </Text>
    </Box>
  );
}

export default SleepDetailsStateContainer;
