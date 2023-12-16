import { createSlice } from "@reduxjs/toolkit";

export const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    gender: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDateOfBirth: (state, action) => {
      state.dateOfBirth = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
  },
});

export const { setEmail, setPassword, setName, setDateOfBirth, setGender } =
  signUpSlice.actions;

export default signUpSlice.reducer;
