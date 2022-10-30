import categorySlice from "./../features/categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "../features/filmsSlice";
import profileSlice from "../features/profileSlice";

export const store = configureStore({
  reducer: {
    filmsSlice,
    profileSlice,
    categorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
