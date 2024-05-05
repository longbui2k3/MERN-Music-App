import { createSlice } from "@reduxjs/toolkit";

export const queueSlice = createSlice({
  name: "queue",
  initialState: {
    isOpenQueue: false,
  },
  reducers: {
    toggleQueue: (state, action) => {
      state.isOpenQueue = !state.isOpenQueue;
    },
  },
});
export const { toggleQueue } = queueSlice.actions;
export default queueSlice.reducer;
