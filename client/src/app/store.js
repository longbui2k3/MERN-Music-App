import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlice";
import signUpAuthReducer from "../features/signUp/signUpAuthSlice";
import navigateReducer from "../features/navigate/navigateSlice";
import userReducer from "../features/user/userSlice";
import editFormSlice from "../features/editForm/editFormSlice";
import updateSlice from "../features/update/updateSlice";
import queueSlice from "../features/queue/queueSlice";
export default configureStore({
  reducer: {
    signUp: signUpReducer,
    signUpAuth: signUpAuthReducer,
    navigate: navigateReducer,
    user: userReducer,
    editForm: editFormSlice,
    update: updateSlice,
    queue: queueSlice,
  },
});
