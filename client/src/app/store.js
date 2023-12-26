import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlice";
import signUpAuthReducer from "../features/signUp/signUpAuthSlice";
export default configureStore({
  reducer: {
    signUp: signUpReducer,
    signUpAuth: signUpAuthReducer,
  },
});
