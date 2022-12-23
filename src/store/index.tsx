import { configureStore } from '@reduxjs/toolkit';

import authSlice from "./authSlice";
import calendarSlice from "./calendarSlice";
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    authSlice,
    calendarSlice
  },
});
