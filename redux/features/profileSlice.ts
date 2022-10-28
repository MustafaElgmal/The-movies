import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "@prisma/client";

const initialState: { profile: User,isLoggedIn:boolean } = {
  profile: {} as User,
  isLoggedIn:false
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isLoggedIn=true
    },
    removeProfile:(state)=>{
      state.profile={} as User
      state.isLoggedIn=false

    }
  },
});
export const { setProfile ,removeProfile} = profileSlice.actions;
export default profileSlice.reducer;
