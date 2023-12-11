import { PageSignUp, PageResetPassword, PageLogin } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
export function App() {
  return (
    <ChakraProvider>
      <PageLogin></PageLogin>
      {/* <PageSignUp></PageSignUp> */}
      {/* <PageResetPassword></PageResetPassword> */}
    </ChakraProvider>
  );
}
