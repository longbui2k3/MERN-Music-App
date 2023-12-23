import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlice";
import signUpGoogleReducer from "../features/signUp/signUpGoogleSlice";
export default configureStore({
  reducer: {
    signUp: signUpReducer,
    signUpGoogle: signUpGoogleReducer,
  },
});
