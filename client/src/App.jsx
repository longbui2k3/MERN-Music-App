import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageResetPassword,
  PageSignUp,
  PageStatus,
  SignUpGoogleStep1,
  SignUpGoogleStep2,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

export function App() {
  return (
    <ChakraProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/home" element={<PageHome />} />
            <Route path="/status" element={<PageStatus />} />
            <Route path="/login" element={<PageLogin />} />
            <Route path="/signup" element={<PageSignUp />} />
            <Route path="/forgotPassword" element={<PageForgotPassword />} />
            <Route
              path="/resetPassword/:userId/:token"
              element={<PageResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  );
}
