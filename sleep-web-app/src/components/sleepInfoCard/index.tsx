import { Box } from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import NoInfoStateContainer from "./noInfoStateContainer";
import SleepDetailsStateContainer from "./sleepDetailsStateContainer";
import SleepAverageStateContainer from "./sleepAverageStateContainer";

function SleepInfoCard() {
  const currentState = useSelector(
    (state: RootState) => state.sleepInfoCard.currentState
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="240px"
      height="240px"
      backgroundColor="#f0f0f0"
      position="relative"
    >
      {currentState === 0 && <NoInfoStateContainer />}
      {currentState === 1 && <SleepDetailsStateContainer />}
      {currentState === 2 && <SleepAverageStateContainer />}
    </Box>
  );
}

export default SleepInfoCard;
