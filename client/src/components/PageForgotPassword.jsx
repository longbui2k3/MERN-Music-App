import React, { useState } from "react";
import { Logo } from "./Logo";
import { Button, FormControl, Text } from "@chakra-ui/react";
import { SingleFormInput } from "./SingleFormInput";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";

export default function PageForgotPassword() {
  const [inputEmail, setInputEmail] = useState("");
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };

  const isEmptyInputEmail = inputEmail === "";
  return (
    <>
      <Logo />
      <div className={"w-[500px] m-auto mt-[-40px]"}>
        <FormControl
          isInvalid={isEmptyInputEmail}
          className={"h-[600px] bg-black p-[70px]"}
        >
          <Text
            as="h1"
            color="white"
            fontWeight="600"
            fontSize="40px"
            textAlign="center"
            mb="40px"
          >
            Forgot Password
          </Text>
          <Text textAlign="center" fontSize="xl" color="gray.400">
            Please enter your registered email. We'll email you with your
            username and a link to reset your password.
          </Text>
          <SingleFormInput
            type="email"
            formLabel="Email"
            placeholder="name@domain.com"
            handleInputChange={handleInputEmail}
          />
          {isEmptyInputEmail && (
            <InfoErrorEmptyInput message="Please enter your email" />
          )}
          <Button
            type="submit"
            class={`font-bold bg-[rgb(30,215,96)] w-full h-[50px] rounded-lg mt-5`}
          >
            Send
          </Button>
        </FormControl>
      </div>
    </>
  );
}
