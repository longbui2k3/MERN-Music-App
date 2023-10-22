import { FormControl } from "@chakra-ui/react";
import { SingleFormInput } from "./SingleFormInput";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { SingleButton } from "./SingleButton";
import { Logo } from "./Logo";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
export default function PageResetPassword() {
  const [inputRepeatPassword, setInputRepeatPassword] = useState(" ");
  const [inputPassword, setInputPassword] = useState(" ");
  const handleInputRepeatPasswordChange = (e) => {
    setInputRepeatPassword(e.target.value);
  };
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };
  const isEmptyRepeatPassword = inputRepeatPassword === "";
  const isEmptyPassword = inputPassword === "";

  return (
    <>
      <Logo />
      <div className={"w-[500px] m-auto mt-[-40px]"}>
        <FormControl
          isInvalid={isEmptyRepeatPassword || isEmptyPassword}
          className={"h-[600px] bg-black p-[70px]"}
        >
          <h1 className="text-white font-[600] text-[40px] text-center mb-[40px]">
            Password Reset
          </h1>
          <SingleFormInput
            type="password"
            formLabel="New Password"
            placeholder="New Password"
            handleInputChange={handleInputPasswordChange}
          />
          {isEmptyPassword && (
            <InfoErrorEmptyInput message="Please enter your new password." />
          )}
          <SingleFormInput
            type="password"
            formLabel="Repeat New Password"
            placeholder="Repeat New Password"
            handleInputChange={handleInputRepeatPasswordChange}
          />
          {isEmptyRepeatPassword && (
            <InfoErrorEmptyInput message="Please repeat your new password." />
          )}
          <Checkbox formLabel="Remember me" />
          <SingleButton name="Send" width="full" />
        </FormControl>
      </div>
    </>
  );
}
