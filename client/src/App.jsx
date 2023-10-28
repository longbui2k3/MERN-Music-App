import { PageResetPassword } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
import SignUp from "./pages/SignUp";
export function App() {
  return (
    <ChakraProvider>
      <div>
        <SignUp/>
      </div>
    </ChakraProvider>
  );
}
