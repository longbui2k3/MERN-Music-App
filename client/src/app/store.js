import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlice";
export default configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});
