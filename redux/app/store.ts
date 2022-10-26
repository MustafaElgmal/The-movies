import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "../features/filmsSlice";

export const store = configureStore({
  reducer: {
    filmsSlice,
  },

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
