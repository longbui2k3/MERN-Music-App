import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlice";
import signUpAuthReducer from "../features/signUp/signUpAuthSlice";
import navigateReducer from "../features/navigate/navigateSlice";
import userReducer from "../features/user/userSlice";
export default configureStore({
  reducer: {
    signUp: signUpReducer,
    signUpAuth: signUpAuthReducer,
    navigate: navigateReducer,
    user: userReducer,
  },
});
