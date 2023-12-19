import { FormErrorMessage } from "@chakra-ui/react";
import { PiWarningCircleFill } from "react-icons/pi";
export function InfoErrorInput({ message }) {
  return (
    <FormErrorMessage
      className={"text-[rgb(229, 89, 77)] mt-[5px] text-[14px] font-[500]"}
    >
      <PiWarningCircleFill className={"text-[20px] me-[4px]"} />
      {message}
    </FormErrorMessage>
  );
}
