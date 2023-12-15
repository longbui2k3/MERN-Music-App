import { FormLabel, Switch } from "@chakra-ui/react";
export function Checkbox({ formLabel, id, onChange }) {
  return (
    // <ChakraProvider>
    <div className={"flex flex-row my-[20px] "}>
      <Switch
        id={id}
        sx={{
          "span.chakra-switch__track:not([data-checked])": {
            backgroundColor: "#aaaaaa",
          },
          "span.chakra-switch__track": {
            backgroundColor: "rgb(30,215,96)",
          },
        }}
        defaultChecked="false"
        size="md"
        onChange={onChange}
      />
      <FormLabel className={"text-white mt-[-2px] ms-[7px] font-[200]"}>
        {formLabel}
      </FormLabel>
    </div>
    // </ChakraProvider>
  );
}
