import { PageResetPassword } from "./components";
import { ChakraProvider } from "@chakra-ui/react";
export function App() {
  return (
    <ChakraProvider>
      <div>
        <PageResetPassword />
      </div>
    </ChakraProvider>
  );
}
