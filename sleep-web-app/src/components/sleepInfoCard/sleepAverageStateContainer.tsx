import { Box, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeState } from "../../app/store/sleepInfoCardSlice";

function SleepAverageStateContainer() {
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
          onClick={() => dispatch(changeState(2))}
        >
          BACK
        </Button>
      </Box>
      <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        October, 14th to November, 13th
      </Text>

      <Text fontSize="2xl" fontWeight="bold">
        7 h 14 min
      </Text>
      <Text fontSize="md" color="gray.500">
        11:51 pm - 7:05 am
      </Text>
      <Box mt="4" display="flex" justifyContent="space-around">
        <Box textAlign="center">
          <Text color="red.500" fontWeight="bold">
            Bad
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="red.500">
            3
          </Text>
        </Box>
        <Box textAlign="center">
          <Text color="black" fontWeight="bold">
            OK
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="black">
            14
          </Text>
        </Box>
        <Box textAlign="center">
          <Text color="green.500" fontWeight="bold">
            Good
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="green.500">
            9
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default SleepAverageStateContainer;
