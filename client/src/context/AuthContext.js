import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../config/firebase";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userGoogle, setUserGoogle] = useState({});
  //   const navigate = useNavigate();
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const googleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider).then((res) => {
      window.location.href = "/signup?step=1";
    });
    getRedirectResult(auth).then((res) => {
      console.log(res);
      window.location.href = "/signup?step=1";
    });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserGoogle(currentUser);
      //   navigate("/signup?step=1");
      console.log("User", currentUser);
      currentUser.getIdToken().then((res) => console.log(res));
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{ googleSignIn, googleSignUp, logOut, userGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
