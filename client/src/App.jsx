import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageResetPassword,
  PageSignUp,
  PageStatus,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthContext, useAuth } from "./context/AuthContext";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { actionType } from "./context/reducer";

export function App() {
  const [cookies, setCookies] = useCookies([""]);
  const [{ user }, dispatch] = useAuth();
  const PublicRoute = function () {
    return user ? <Navigate to="/status" /> : <Outlet />;
  };
  const PrivateRoute = function () {
    return user ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="home" element={<PageHome />} />
          <Route path="/status" element={<PrivateRoute />}>
            <Route path="/status" element={<PageStatus />} />
          </Route>
          <Route path="/login" element={<PublicRoute />}>
            <Route path="/login" element={<PageLogin />} />
          </Route>
          <Route path="/signup" element={<PublicRoute />}>
            <Route path="/signup" element={<PageSignUp />} />
          </Route>

          <Route path="forgotPassword" element={<PageForgotPassword />} />
          <Route
            path="resetPassword/:userId/:token"
            element={<PageResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
