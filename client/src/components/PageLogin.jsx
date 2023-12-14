import { FormControl } from "@chakra-ui/react";
import { SingleFormInput } from "./SingleFormInput";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { SingleButton } from "./SingleButton";
import { Logo } from "./Logo";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
export default function PageLogin() {
  const [inputPassword, setInputPassword] = useState(" ");
  const [inputEmail, setInputEmail] = useState("");
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const isEmptyPassword = inputPassword === "";
  const isEmptyInputEmail = inputEmail === "";

  return (
    <>
      <div className="w-100 bg-black h-[150px] mt-[-40px] mb-[100px] py-[25px]">
        <Logo />
      </div>

      <div className={"w-[500px] m-auto mt-[-40px]"}>
        <FormControl
          isInvalid={isEmptyPassword}
          className={"h-[600px] bg-black p-[70px]"}
        >
          <h1 className="text-white font-[600] text-[40px] text-center mb-[40px]">
            Login
          </h1>
          <SingleFormInput
            type="email"
            formLabel="Email"
            placeholder="name@domain.com"
            handleInputChange={handleInputEmail}
          />
          {isEmptyInputEmail && (
            <InfoErrorEmptyInput message="Please enter your email" />
          )}
          <SingleFormInput
            type="password"
            formLabel="Password"
            placeholder="Password"
            handleInputChange={handleInputPasswordChange}
          />
          {isEmptyPassword && (
            <InfoErrorEmptyInput message="Please enter your password." />
          )}
          <Checkbox formLabel="Remember me" />
          <SingleButton name="Login" width="full" />
        </FormControl>
      </div>
    </>
  );
}
