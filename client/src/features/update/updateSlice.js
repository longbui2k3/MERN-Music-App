import { createSlice } from "@reduxjs/toolkit";

export const updateSlice = createSlice({
  name: "update",
  initialState: {
    sections: [],
  },
  reducers: {
    setUpdatedSection(state, action) {
      state.sections = action.payload;
    },
  },
});

export const { setUpdatedSection } = updateSlice.actions;
export default updateSlice.reducer;
