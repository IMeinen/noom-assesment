import { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  useToast
} from "@chakra-ui/react";
import { useCreateSleepLog } from "api/sleepInfoApi";
import { format, isToday, parseISO } from "date-fns";

import {
  changeCurrentDaySleepData,
  changeState
} from "app/store/sleepInfoCardSlice";
import { useDispatch } from "react-redux";

function SubmitSleepInfoContainer() {
  const [bedTime, setBedTime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [feeling, setFeeling] = useState(1);
  const { mutate: createSleepLog, isLoading } = useCreateSleepLog();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sleepLogPayload = {
      bedTimeStart: format(parseISO(bedTime), "yyyy-MM-dd HH:mm"),
      bedTimeEnd: format(parseISO(wakeUpTime), "yyyy-MM-dd HH:mm"),
      feeling
    };

    createSleepLog(sleepLogPayload, {
      onSuccess: (data) => {
        toast({
          title: "Sleep information logged.",
          description: "We've recorded your sleep information.",
          status: "success",
          duration: 5000,
          isClosable: true
        });

        if (isToday(parseISO(data.bed_time_end))) {
          dispatch(changeCurrentDaySleepData(data));
          dispatch(changeState(1));
        } else {
          dispatch(changeState(0));
        }
      },
      onError: (error: any) => {
        toast({
          title: "Error logging sleep information, please try to submit again.",
          description: `An error occurred: ${error.message}`,
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    });
  };

  if (isLoading) {
    return <CircularProgress value={80} />;
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Heading as="h3" size="md" mb={4}>
        Please enter your last night&apos;s sleep data
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="bedTime">Time you went to bed</FormLabel>
            <Input
              id="bedTime"
              type="datetime-local"
              value={bedTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setBedTime(event.currentTarget.value)
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="wakeUpTime">Time you got up</FormLabel>
            <Input
              id="wakeUpTime"
              type="datetime-local"
              value={wakeUpTime}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setWakeUpTime(event.currentTarget.value)
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="feeling">
              How did you feel in the morning?
            </FormLabel>
            <Select
              id="feeling"
              placeholder="Select feeling"
              value={feeling}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setFeeling(+event.target.value)
              }
            >
              <option value={1}>Bad</option>
              <option value={2}>OK</option>
              <option value={3}>Good</option>
            </Select>
          </FormControl>
          <Flex justifyContent="space-between" mt={4}>
            <Button
              colorScheme="red"
              onClick={() => dispatch(changeState(0))}
              mr={2}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" ml={2}>
              Submit
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default SubmitSleepInfoContainer;
