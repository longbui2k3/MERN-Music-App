import { createSlice } from "@reduxjs/toolkit";

export const signUpGoogleSlice = createSlice({
  name: "signUpGoogle",
  initialState: {
    email: "",
    uid: "",
    name: "",
    dateOfBirth: "",
    gender: "",
  },
  reducers: {
    setEmailGoogle: (state, action) => {
      state.email = action.payload;
    },
    setUidGoogle: (state, action) => {
      state.uid = action.payload;
    },
    setNameGoogle: (state, action) => {
      state.name = action.payload;
    },
    setDateOfBirthGoogle: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGenderGoogle: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const {
  setEmailGoogle,
  setUidGoogle,
  setNameGoogle,
  setDateOfBirthGoogle,
  setGenderGoogle,
} = signUpGoogleSlice.actions;

export default signUpGoogleSlice.reducer;
