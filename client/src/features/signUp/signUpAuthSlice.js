import { createSlice } from "@reduxjs/toolkit";

export const signUpAuthSlice = createSlice({
  name: "signUpAuth",
  initialState: {
    email: "",
    uid: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    avatar: "",
    federatedId: "",
  },
  reducers: {
    setEmailAuth: (state, action) => {
      state.email = action.payload;
    },
    setUidAuth: (state, action) => {
      state.uid = action.payload;
    },
    setNameAuth: (state, action) => {
      state.name = action.payload;
    },
    setDateOfBirthAuth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGenderAuth: (state, action) => {
      state.gender = action.payload;
    },
    setAvatarAuth: (state, action) => {
      state.avatar = action.payload;
    },
    setFederatedId: (state, action) => {
      state.federatedId = action.payload;
    },
  },
});

export const {
  setEmailAuth,
  setUidAuth,
  setNameAuth,
  setDateOfBirthAuth,
  setGenderAuth,
  setAvatarAuth,
  setFederatedId,
} = signUpAuthSlice.actions;

export default signUpAuthSlice.reducer;
