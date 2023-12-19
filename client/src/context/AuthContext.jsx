// AuthContext.js
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useCookies } from "react-cookie";
const AuthContext = createContext({});
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ reducer, initialState, children }) => {
  // const [cookies, setCookie] = useCookies([""]);
  // const [auth, setAuth] = useState({ jwt: cookies.jwt, data: null });
  // function setAuthData(data) {
  //   return setAuth({ jwt: cookies.jwt, data: data });
  // }
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
