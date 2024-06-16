import { createSlice } from "@reduxjs/toolkit";

export const discographySlice = createSlice({
  name: "discography",
  initialState: {
    name: "",
    filter: "All", // Album, Singles
    view: "Grid", // List
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    setView(state, action) {
      state.view = action.payload;
    },
  },
});

export const { setName, setFilter, setView } = discographySlice.actions;
export default discographySlice.reducer;
