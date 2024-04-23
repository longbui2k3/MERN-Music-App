import { createSlice } from "@reduxjs/toolkit";

export const editFormSlice = createSlice({
  name: "editForm",
  initialState: {
    editPlaylist: false,
    editProfile: false,
    editSection: false,
    section: {},
    addListsToSection: false,
  },
  reducers: {
    openEditFormPlaylist(state, action) {
      state.editPlaylist = true;
    },
    closeEditFormPlaylist(state, action) {
      state.editPlaylist = false;
    },
    openEditFormProfile(state, action) {
      state.editProfile = true;
    },
    closeEditFormProfile(state, action) {
      state.editProfile = false;
    },
    openEditFormSection(state, action) {
      state.editSection = true;
    },
    closeEditFormSection(state, action) {
      state.editSection = false;
    },
    setSection(state, action) {
      state.section = action.payload;
    },
    getSection(state, action) {
      return state.section;
    },
    openAddListsToSection(state, action) {
      state.addListsToSection = true;
    },
    closeAddListsToSection(state, action) {
      state.addListsToSection = false;
    },
  },
});
export const {
  openEditFormPlaylist,
  closeEditFormPlaylist,
  openEditFormProfile,
  closeEditFormProfile,
  openEditFormSection,
  closeEditFormSection,
  getSection,
  setSection,
  openAddListsToSection,
  closeAddListsToSection
} = editFormSlice.actions;
export default editFormSlice.reducer;
