import PageHome from "./components/PageHome";
import { ChakraProvider } from "@chakra-ui/react";
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
