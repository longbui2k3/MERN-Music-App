export const initialState = {
  token: null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : false,
};
