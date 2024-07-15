import { createSlice } from "@reduxjs/toolkit";
import { SleepData } from "types/sleepInfoCard.types";

interface SleepInfoCardState {
  currentState: number;
  currentDaySleepData: SleepData | null;
}

const initialState: SleepInfoCardState = {
  currentState: 1,
  currentDaySleepData: null
};

const sleepInfoCardSlice = createSlice({
  name: "sleepInfoCard",
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.currentState = action.payload;
    },
    changeCurrentDaySleepData: (state, action) => {
      state.currentDaySleepData = action.payload;
    }
  }
});

export const { changeState, changeCurrentDaySleepData } =
  sleepInfoCardSlice.actions;

export default sleepInfoCardSlice.reducer;
