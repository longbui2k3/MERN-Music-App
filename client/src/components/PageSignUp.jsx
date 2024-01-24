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
import { InfoErrorInput } from "./InfoErrorInput";
import SignUpStep1 from "./PageSignUpStep1";
import { useDispatch, useSelector } from "react-redux";
import { setEmail } from "../features/signUp/signUpSlice";
import { CheckExistEmail } from "../api";
import { PiWarningCircleFill } from "react-icons/pi";
import { UserAuth } from "../context/AuthContext";
import SignUpGoogleStep1 from "./PageSignUpGoogleStep1";
import SignUpGoogleStep2 from "./PageSignUpGoogleStep2";
import { useNavigate, useSearchParams } from "react-router-dom";
import GoogleIcon from "./GoogleIcon";
import FacebookIcon from "./FacebookIcon";
import SignUpFacebookStep1 from "./PageSignUpFacebookStep1";
import SignUpFacebookStep2 from "./PageSignUpFacebookStep2";
import { FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { setAvatarAuth } from "../features/signUp/signUpAuthSlice";
export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const email = useSelector((state) => state.signUp.email);
  const [inputEmail, setInputEmail] = useState(email);
  const [isExistEmail, setIsExistEmail] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  function isValidEmail(email) {
    const emailRegex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
    return emailRegex.test(email);
  }
  async function checkExsitEmail(email) {
    try {
      const res = await CheckExistEmail(email);
      return false;
    } catch (err) {
      return true;
    }
  }
  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value);
    await register("email").onChange(e);
    setIsExistEmail(await checkExsitEmail(e.target.value));
  };
  const store = (email) => dispatch(setEmail(email));
  function onSubmit(values) {
    if (!isInvalidInputEmail && !isExistEmail) {
      store(values.email);
      setIsContinue(true);
    }
  }

  const isInvalidInputEmail = !isValidEmail(inputEmail);
  const { googleSignIn, facebookSignIn } = UserAuth();
  const handleGoogleSignUp = async () => {
    try {
      const userCredential = await googleSignIn();
      if (userCredential) {
        let additional = getAdditionalUserInfo(userCredential);
        dispatch(
          setAvatarAuth(additional.profile.picture.slice(0, -5) + "s100-c")
        );
        navigate("/signup?type=google&step=1");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFacebookSignUp = async () => {
    try {
      const userCredential = await facebookSignIn();
      if (userCredential) {
        dispatch(
          setAvatarAuth(userCredential.user.photoURL + "?width=100&height=100")
        );
        navigate("/signup?type=facebook&step=1");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get("step");
  const type = searchParams.get("type");
  if (type === "google") {
    if (step === "1") return <SignUpGoogleStep1 />;
    if (step === "2") return <SignUpGoogleStep2 />;
  } else if (type === "facebook") {
    if (step === "1") return <SignUpFacebookStep1 />;
    if (step === "2") return <SignUpFacebookStep2 />;
  }
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
          <FormControl isInvalid={isInvalidInputEmail || isExistEmail}>
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
                value={inputEmail}
                onChange={handleInputEmail}
                name={register("email").name}
                onBlur={register("email").onBlur}
                ref={register("email").ref}
              />
            </div>
            {isExistEmail && (
              <div className="bg-[#ffa42b] flex rounded-md my-4">
                <PiWarningCircleFill
                  className={"text-[40px] mx-[5px] my-[10px]"}
                />
                <p className="my-[10px]">
                  This address is already linked to an existing account. To
                  continue,{" "}
                  <a className="underline" href="/login">
                    log in
                  </a>
                  .
                </p>
              </div>
            )}
            {isInvalidInputEmail && (
              <InfoErrorInput message="This email is invalid. Make sure it's written like example@email.com" />
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
          padding="24px 12px"
          fontSize="16px"
          fontWeight="700"
          border="1px solid #555"
          color="white"
          _hover={{ backgroundColor: "#141414", border: "1px solid white" }}
          onClick={handleGoogleSignUp}
          leftIcon={<GoogleIcon />}
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
          onClick={handleFacebookSignUp}
          leftIcon={<FacebookIcon />}
        >
          Sign up with Facebook
        </Button>

        <Divider backgroundColor="#333" margin="40px 2px" />
        <Text
          textAlign="center"
          color="#a7a7a7"
          fontWeight="600"
          className="mb-[10px]"
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{ textDecoration: "underline", color: "white" }}
          >
            Log in here
          </a>
        </Text>
        <Text
          textAlign="center"
          color="#a7a7a7"
          fontWeight="600"
          className="mb-[80px]"
        >
          You are the artist?{" "}
          <a
            href="/signup"
            style={{ textDecoration: "underline", color: "#1ED760" }}
          >
            Sign up for artist
          </a>
        </Text>
      </Container>
    </>
  );
}
