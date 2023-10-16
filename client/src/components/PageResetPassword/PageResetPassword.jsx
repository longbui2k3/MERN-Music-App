import { FormControl } from "@chakra-ui/react";
import { SingleFormInput } from "../SingleFormInput/SingleFormInput";
import s from "./style.module.css";
import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { SingleButton } from "../SingleButton/SingleButton";
import { Logo } from "../Logo/Logo";
import { InfoErrorEmptyInput } from "../InfoErrorEmptyInput/InfoErrorEmptyInput";
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
      <div className={s.form}>
        <FormControl
          isInvalid={isEmptyRepeatPassword || isEmptyPassword}
          className={s.formControl}
        >
          <h1>Password Reset</h1>
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
          <SingleButton name="Send" width="100%" />
        </FormControl>
      </div>
    </>
  );
}
