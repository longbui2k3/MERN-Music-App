import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: "",
  },
  reducers: {
    setUserGlobal: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserGlobal } = userSlice.actions;

export default userSlice.reducer;
