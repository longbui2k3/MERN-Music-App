import { Button } from "@chakra-ui/react";
export function SingleButton({ name, width, isLoading, onClick }) {
  return (
    <Button
      type="submit"
      class={`font-bold bg-[rgb(30,215,96)] w-${width} h-[50px] rounded-lg`}
      isLoading={isLoading}
      onClick={onClick}
    >
      {name}
    </Button>
  );
}
