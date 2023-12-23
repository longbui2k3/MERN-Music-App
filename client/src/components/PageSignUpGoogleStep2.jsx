import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Text, Button } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SignUpGoogle } from "../api";
import { Navigate } from "react-router-dom";
import SignUpGoogleStep1 from "./PageSignUpGoogleStep1";
import { useCookies } from "react-cookie";
export default function SignUpGoogleStep2() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [cookies, setCookie] = useCookies([""]);
  const [clickBack, setClickBack] = useState(false);
  const [isLoginSuccessfully, setIsLoginSuccessfully] = useState(false);
  function clickBackFunc() {
    setClickBack(true);
  }
  const email = useSelector((state) => state.signUpGoogle.email);
  const uid = useSelector((state) => state.signUpGoogle.uid);
  const name = useSelector((state) => state.signUpGoogle.name);
  const dateOfBirth = useSelector((state) => state.signUpGoogle.dateOfBirth);
  const gender = useSelector((state) => state.signUpGoogle.gender);
  async function onSubmit() {
    try {
      const res = await SignUpGoogle(email, uid, name, dateOfBirth, gender);
      setIsLoginSuccessfully(true);
      setCookie("jwt", res.data.token, {
        path: "/",
      });
      console.log(res);
      console.log(res.data.message);
    } catch (err) {
      setIsLoginSuccessfully(false);
      console.log(err);
      console.log(err.response.data.error);
    }
  }
  if (isLoginSuccessfully) {
    return <Navigate to="/status" />;
  }
  if (clickBack) {
    return <Navigate to="/signup?step=1" />;
  }
  return (
    <>
      <Logo />
      <div className="w-[450px] h-[600px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="h-1 relative max-w-xl rounded-full overflow-hidden">
            <div class="w-full h-full bg-gray-200 absolute"></div>
            <div class="h-full bg-[#1ED760] absolute w-full"></div>
          </div>
          <div className="mt-6 mb-6 flex">
            <ChevronLeftIcon
              boxSize={10}
              color="#a7a7a7"
              className="mt-2 hover:text-white cursor-pointer"
              onClick={clickBackFunc}
            />
            <div className="ms-3">
              <Text className="text-[#a7a7a7] font-bold">Step 2 of 2</Text>
              <Text className="text-white font-bold mt-1">
                Terms & Conditions
              </Text>
            </div>
          </div>
          <CheckboxGroup>
            <Checkbox className="text-white bg-[#232323] p-3 w-[350px] mb-2 mx-[50px] rounded-[8px]">
              <p className="ms-3">
                I would prefer not to receive marketing messages from Spotify
              </p>
            </Checkbox>
            <Checkbox
              className="text-white bg-[#232323] p-3 w-[350px] mb-2 mx-[50px] rounded-[8px]"
              iconColor="white"
            >
              <p className="ms-3">
                Share my registration data with Spotify's content providers for
                marketing purposes.
              </p>
            </Checkbox>
          </CheckboxGroup>
          <p className="w-[350px] mx-[50px] text-white mt-1">
            By clicking on sign-up, you agree to Spotify's{" "}
            <a href="#" className="text-[rgb(30,215,96)] underline">
              Terms and Conditions of Use
            </a>
            .
          </p>
          <p className="w-[350px] mx-[50px] text-white">
            To learn more about how Spotify collects, uses, shares and protects
            your personal data, please see{" "}
            <a href="#" className="text-[rgb(30,215,96)] underline">
              Spotify's Privacy Policy
            </a>
            .
          </p>
          <Button
            type="submit"
            class={`font-bold bg-[rgb(30,215,96)] w-[350px] mx-[50px] h-[50px] rounded-lg mt-5`}
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
}
