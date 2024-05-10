import { createSlice } from "@reduxjs/toolkit";

export const resizeSlice = createSlice({
  name: "resize",
  initialState: {
    appContainerSize: "0px",
    sidebarSize: "0px",
  },
  reducers: {
    setSize(state, action) {
      state.appContainerSize = action.payload.appContainerSize;
      state.sidebarSize = action.payload.sidebarSize;
    },
  },
});
export const { setSize } = resizeSlice.actions;
export default resizeSlice.reducer;
