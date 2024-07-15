import { Box, Text, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  formatDateToMonthAndOrdinal,
  formatTimeAMPM,
  getTimeDuration
} from "utils/dateUtils";
import { FeelingColorMap, FeelingEnum } from "types/sleepInfoCard.types";
import { changeState } from "../../app/store/sleepInfoCardSlice";
import { RootState } from "../../app/store";

function SleepDetailsStateContainer() {
  const dispatch = useDispatch();
  const currentDayData = useSelector(
    (state: RootState) => state.sleepInfoCard.currentDaySleepData
  );

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
          AVG
        </Button>
      </Box>
      <Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
        {formatDateToMonthAndOrdinal(currentDayData?.bed_time_start || "")}
      </Text>
      <Text fontSize="2xl" fontWeight="bold">
        {getTimeDuration(
          currentDayData?.bed_time_start || "",
          currentDayData?.bed_time_end || ""
        )}
      </Text>
      <Text fontSize="md" color="gray.500">
        {`${formatTimeAMPM(
          currentDayData?.bed_time_start || ""
        )} - ${formatTimeAMPM(currentDayData?.bed_time_end || "")}`}
      </Text>
      <Text mt="2">
        You felt:{" "}
        <Text
          as="span"
          color={
            currentDayData ? FeelingColorMap[currentDayData.feeling] : "black"
          }
          fontWeight="bold"
        >
          {currentDayData ? FeelingEnum[currentDayData.feeling] : "N/A"}
        </Text>
      </Text>
    </Box>
  );
}

export default SleepDetailsStateContainer;
