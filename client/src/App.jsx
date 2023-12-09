import { PageResetPassword } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./pages/SignUp";
import PageForgotPassword from "./components/PageForgotPassword";
import PageHome from "./components/PageHome";
export function App() {
  return (
    <ChakraProvider>
      <div>
        {/* <SignUp/> */}
        {/* <PageResetPassword /> */}
        {/* <PageForgotPassword /> */}
        <PageHome></PageHome>
      </div>
    </ChakraProvider>
  );
}
