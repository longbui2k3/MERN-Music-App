import s from "./style.module.css";
import { FormLabel, Switch } from "@chakra-ui/react";
export function Checkbox({ formLabel }) {
  return (
    // <ChakraProvider>
    <div className={s.checkbox}>
      <Switch
        sx={{
          "span.chakra-switch__track:not([data-checked])": {
            backgroundColor: "#aaaaaa",
          },
          "span.chakra-switch__track": {
            backgroundColor: "rgb(30,215,96)",
          },
        }}
        defaultChecked="true"
        size="md"
        className={s.switch}
      />
      <FormLabel className={s.formLabel}>{formLabel}</FormLabel>
    </div>
    // </ChakraProvider>
  );
}
