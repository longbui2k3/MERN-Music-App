import { FormErrorMessage } from "@chakra-ui/react";
import s from "./style.module.css";
import { PiWarningCircleFill } from "react-icons/pi";
export function InfoErrorEmptyInput({ message }) {
  return (
    <FormErrorMessage className={s.formErrorMessage}>
      <PiWarningCircleFill className={s.piWarningCircleFill} />
      {message}
    </FormErrorMessage>
  );
}
