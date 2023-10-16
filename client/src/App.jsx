import { PageResetPassword } from "./components";
import s from "./style.module.css";
import { ChakraProvider } from "@chakra-ui/react";
export function App() {
  return (
    <ChakraProvider>
      <div className={s.root}>
        <PageResetPassword />
      </div>
    </ChakraProvider>
  );
}
