import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";
import { link } from "../features/navigate/navigateSlice";
import { useNavigate } from "react-router-dom";

const NavigateContext = createContext();

export const NavigateContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigatePage = (path) => {
    console.log("Navigate");
    dispatch(link(path));
    navigate(path);
  };
  return (
    <NavigateContext.Provider value={{ navigatePage }}>
      {children}
    </NavigateContext.Provider>
  );
};

export const NavigateAuth = () => {
  return useContext(NavigateContext);
};
