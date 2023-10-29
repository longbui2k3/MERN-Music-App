import { PageResetPassword } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./pages/SignUp";
import PageForgotPassword from "./components/PageForgotPassword";
export function App() {
  return (
    <ChakraProvider>
      <div>
        {/* <SignUp/> */}
        {/* <PageResetPassword /> */}
        <PageForgotPassword />
      </div>
    </ChakraProvider>
  );
}
