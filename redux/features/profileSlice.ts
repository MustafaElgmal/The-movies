import { userType } from "./../../types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

const initialState: {
  profile: userType;
  isLoggedIn: boolean;
} = {
  profile: {} as userType,
  isLoggedIn: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<userType>) => {
      state.profile = action.payload;
      state.isLoggedIn = true;
    },
    removeProfile: (state) => {
      state.profile = {} as userType;
      state.isLoggedIn = false;
    },
  },
});
export const { setProfile, removeProfile } = profileSlice.actions;
export default profileSlice.reducer;
