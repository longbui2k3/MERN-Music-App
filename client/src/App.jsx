import {
  PageForgotPassword,
  PageHome,
  PageLogin,
  PageResetPassword,
  PageSignUp,
} from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageHome />} />
          <Route path="home" element={<PageHome />} />
          <Route path="login" element={<PageLogin />} />
          <Route path="signup" element={<PageSignUp />} />
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
