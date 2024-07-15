import { Box, Text } from "@chakra-ui/react";
import { FeelingColorMap, FeelingEnum } from "types/sleepInfoCard.types";

export interface FeelingCounterProperties {
  feeling: number;
  count: number;
}

export function FeelingCounter({ feeling, count }: FeelingCounterProperties) {
  return (
    <Box textAlign="center">
      <Text color={`${FeelingColorMap[feeling]}`} fontWeight="bold">
        {FeelingEnum[feeling]}
      </Text>
      <Text
        fontSize="xl"
        fontWeight="bold"
        color={`${FeelingColorMap[feeling]}`}
      >
        {count}
      </Text>
    </Box>
  );
}
