import { createSlice } from "@reduxjs/toolkit";
import { SleepInfoCardStateEnum } from "../../enums/sleepInfoCard.enums";

interface SleepInfoCardState {
  currentState: SleepInfoCardStateEnum;
}

const initialState: SleepInfoCardState = {
  currentState: 1
};

const sleepInfoCardSlice = createSlice({
  name: "sleepInfoCard",
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.currentState = action.payload.currentState;
    }
  }
});

export const { changeState } = sleepInfoCardSlice.actions;

export default sleepInfoCardSlice.reducer;
