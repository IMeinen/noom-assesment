import { Box, Text, Button, CircularProgress } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { getMonthlySleepLogAverages } from "api/sleepInfoApi";
import {
  convertDecimalHoursToHoursAndMinutes,
  formatDateToMonthAndOrdinal
} from "utils/dateUtils";
import { FeelingEnum } from "types/sleepInfoCard.types";
import { changeState } from "../../app/store/sleepInfoCardSlice";
import { FeelingCounter } from "./feelingCounter";

function SleepAverageStateContainer() {
  const dispatch = useDispatch();

  const { data, isLoading } = useQuery(
    ["getMonthlySleepLogAverages", format(new Date(), "yyyy-MM-dd")],
    () => getMonthlySleepLogAverages(format(new Date(), "yyyy-MM-dd"))
  );



  if (isLoading) {
    return <CircularProgress value={80} />;
  }

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
          BACK
        </Button>
      </Box>
      <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {`${formatDateToMonthAndOrdinal(
          data?.first_day_of_month || ""
        )} to ${formatDateToMonthAndOrdinal(data?.last_day_of_month || "")}`}
      </Text>

      <Text fontSize="2xl" fontWeight="bold">
        {`${convertDecimalHoursToHoursAndMinutes(
          data?.average_slept_time || 0
        )}`}
      </Text>
      <Text fontSize="md" color="gray.500">
        {`${data?.average_bed_time_start || ""} - ${
          data?.average_bed_time_end || ""
        }`}
      </Text>
      <Box mt="4" display="flex" justifyContent="space-around">
        {Object.values(FeelingEnum).map((feeling: string, index: number) => (
          <FeelingCounter
            key={feeling}
            feeling={index + 1}
            count={
              data
                ? data.feeling_count[
                    `${index + 1}` as keyof typeof data.feeling_count
                  ]
                : 0
            }
          />
        ))}
      </Box>
    </Box>
  );
}

export default SleepAverageStateContainer;
