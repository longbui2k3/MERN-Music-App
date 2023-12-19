import React, { useState } from "react";
import { Logo } from "./Logo";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { InfoErrorInput } from "./InfoErrorInput";
import { useForm } from "react-hook-form";
import { ForgotPassword } from "../api";
import { ShowNotify } from "./ShowNotify";
export default function PageForgotPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [inputEmail, setInputEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isForgotPwdSuccessfully, setIsForgotPwdSuccessfully] = useState("");
  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value);
    await register("email").onChange(e);
  };
  async function onSubmit(values) {
    try {
      const res = await ForgotPassword(values.email);
      console.log(res);
      setMessage(res.data.message);
      setIsForgotPwdSuccessfully(true);
    } catch (err) {
      setMessage(err.response.data.message);
      setIsForgotPwdSuccessfully(false);
    }
  }
  const isEmptyInputEmail = inputEmail === "";
  if (isForgotPwdSuccessfully)
    return (
      <>
        <Logo />
        <div className="w-full flex justify-center">
          <div className="w-[600px]">
            <Text
              as="h1"
              color="white"
              fontWeight="600"
              fontSize="50px"
              textAlign="center"
              mb="10px"
            >
              Password Reset
            </Text>
            <p className="text-center text-[rgb(165,163,161)] font-[80px]">
              We've sent you an email. Just follow the instructions to reset
              your password.
            </p>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Logo />
      <div className={"w-[500px] m-auto mt-[-40px]"}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {!isForgotPwdSuccessfully && isForgotPwdSuccessfully !== "" ? (
              <ShowNotify
                type="error"
                message={message}
                variant="left-accent"
                className={"mt-4"}
              ></ShowNotify>
            ) : (
              ""
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Email
              </FormLabel>
              <Input
                type="email"
                className={
                  "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                }
                placeholder="name@domain.com"
                h="50px"
                onChange={handleInputEmail}
                name={register("email").name}
                onBlur={register("email").onBlur}
                ref={register("email").ref}
              />
            </div>
            {isEmptyInputEmail && (
              <InfoErrorInput message="Please enter your email" />
            )}
            <Button
              type="submit"
              class={`font-bold bg-[rgb(30,215,96)] w-full h-[50px] rounded-lg mt-5`}
              isLoading={isSubmitting}
            >
              Send
            </Button>
          </FormControl>
        </form>
      </div>
    </>
  );
}
