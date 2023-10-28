import React from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  Input,
  Text,
} from "@chakra-ui/react";
import { SingleButton } from "../components/SingleButton";
import { Logo } from "../components/Logo";

const SignUp = () => {
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
        <Text color="white" fontWeight="600">
          Email address
        </Text>
        <Input
          margin="8px 0"
          placeholder="name@domain.com"
          size="md"
          color="white"
        />
        <Button
          backgroundColor="#1ED760"
          borderRadius="500px"
          width="100%"
          padding="24px 32px"
          fontSize="16px"
          fontWeight="700"
          marginTop="24px"
          _hover={{ backgroundColor: "#1ED760" }}
        >
          Next
        </Button>
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
          <a href="#" style={{ textDecoration: "underline", color: "white" }}>
            Login in here
          </a>
        </Text>
      </Container>
    </>
  );
};

export default SignUp;
