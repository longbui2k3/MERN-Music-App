import { Button } from "@chakra-ui/react";
export function SingleButton({ name, width }) {
  return (
    <Button
      type="submit"
      class={`font-bold bg-[rgb(30,215,96)] w-${width} h-[50px] rounded-lg`}
    >
      {name}
    </Button>
  );
}
