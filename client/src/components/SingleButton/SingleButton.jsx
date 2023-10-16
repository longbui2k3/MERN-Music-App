import s from "./style.module.css";
import { Button } from "@chakra-ui/react";
export function SingleButton({ name, width }) {
  return (
    <Button
      w={width}
      h="50px"
      bg="rgb(30,215,96)"
      type="submit"
      className={s.button}
    >
      {name}
    </Button>
  );
}
