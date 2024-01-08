import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch } from "react-redux";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [userAuth, setUserAuth] = useState({});
  const [additionalUserAuth, setAdditionalUserAuth] = useState({});
  //   const navigate = useNavigate();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  };
  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res;
  };
  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAuth(currentUser);
      console.log(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        userAuth,
        additionalUserAuth,
        facebookSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
