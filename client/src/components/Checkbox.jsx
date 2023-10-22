import { FormLabel, Switch } from "@chakra-ui/react";
export function Checkbox({ formLabel }) {
  return (
    // <ChakraProvider>
    <div className={"flex flex-row my-[20px] "}>
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
      />
      <FormLabel className={"text-white mt-[-2px] ms-[7px] font-[200]"}>
        {formLabel}
      </FormLabel>
    </div>
    // </ChakraProvider>
  );
}
