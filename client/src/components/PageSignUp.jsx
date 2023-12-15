import React, { useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { useForm } from "react-hook-form";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
import SignUpStep1 from "./PageSignUpStep1";

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [inputEmail, setInputEmail] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value);
    await register("email").onChange(e);
  };
  function onSubmit(values) {
    setIsContinue(true);
  }
  const isEmptyInputEmail = inputEmail === "";
  if (isContinue) return <SignUpStep1 />;
  return (
    <>
      <Logo />
      <Container width="400px">
        <Text
          fontSize="48px"
          fontWeight="700"
          color="white"
          marginBottom="40px"
        >
          Sign up to start listening
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={isEmptyInputEmail}>
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
              <InfoErrorEmptyInput message="Please enter your email" />
            )}
            <Button
              type="submit"
              backgroundColor="#1ED760"
              borderRadius="500px"
              width="100%"
              padding="24px 32px"
              fontSize="16px"
              fontWeight="700"
              marginTop="24px"
              _hover={{ backgroundColor: "#1ED760" }}
              isLoading={isSubmitting}
            >
              Next
            </Button>
          </FormControl>
        </form>
        <Box position="relative" padding="40px 4px">
          <Divider backgroundColor="#ccc" width="100" />
          <AbsoluteCenter bg="#141414" px="4" color="white">
            or
          </AbsoluteCenter>
        </Box>
        <Button
          backgroundColor="#141414"
          borderRadius="500px"
          width="100%"
          padding="24px 32px"
          fontSize="16px"
          fontWeight="700"
          border="1px solid #555"
          color="white"
          _hover={{ backgroundColor: "#141414", border: "1px solid white" }}
        >
          Sign up with Google
        </Button>
        <Button
          backgroundColor="#141414"
          borderRadius="500px"
          width="100%"
          padding="24px 32px"
          fontSize="16px"
          fontWeight="700"
          marginTop="8px"
          border="1px solid #555"
          color="white"
          _hover={{ backgroundColor: "#141414", border: "1px solid white" }}
        >
          Sign up with Facebook
        </Button>

        <Divider backgroundColor="#333" margin="40px 2px" />
        <Text textAlign="center" color="#a7a7a7" fontWeight="600">
          Already have an account?{" "}
          <a
            href="/login"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Login in here
          </a>
        </Text>
      </Container>
    </>
  );
}
