import { Box, CircularProgress } from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { getSleepLogByDate } from "api/sleepInfoApi";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import NoInfoStateContainer from "./noInfoStateContainer";
import SleepDetailsStateContainer from "./sleepDetailsStateContainer";
import SleepAverageStateContainer from "./sleepAverageStateContainer";
import {
  changeCurrentDaySleepData,
  changeState
} from "../../app/store/sleepInfoCardSlice";
import SubmitSleepInfoContainer from "./submitSleepInfoContainer";

function SleepInfoCard() {
  const { currentState } = useSelector(
    (state: RootState) => state.sleepInfoCard
  );

  const dispatch = useDispatch();

  const { data, isLoading } = useQuery(
    ["getSleepLogByDate", format(new Date(), "yyyy-MM-dd")],
    () => getSleepLogByDate(format(new Date(), "yyyy-MM-dd"))
  );

  useEffect(() => {
    if (data) {
      dispatch(changeState(1));
      dispatch(changeCurrentDaySleepData(data));
      return;
    }

    dispatch(changeState(0));
  }, [data, dispatch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minW="240px"
      minH="240px"
      backgroundColor="#f0f0f0"
      position="relative"
    >
      {isLoading ? (
        <CircularProgress value={80} />
      ) : (
        <>
          {currentState === 0 && <NoInfoStateContainer />}
          {currentState === 1 && <SleepDetailsStateContainer />}
          {currentState === 2 && <SleepAverageStateContainer />}
          {currentState === 3 && <SubmitSleepInfoContainer />}
        </>
      )}
    </Box>
  );
}

export default SleepInfoCard;
