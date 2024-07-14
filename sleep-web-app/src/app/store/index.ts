import { configureStore } from "@reduxjs/toolkit";
import sleepInfoCardReducer from "./sleepInfoCardSlice";

const store = configureStore({
  reducer: {
    sleepInfoCard: sleepInfoCardReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
