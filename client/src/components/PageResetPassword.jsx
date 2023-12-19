import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SingleButton } from "./SingleButton";
import { Logo } from "./Logo";
import { InfoErrorInput } from "./InfoErrorInput";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Navigate, useParams } from "react-router-dom";
import { ResetPassword } from "../api";
import { ShowNotify } from "./ShowNotify";
import { ArrowForwardIcon } from "@chakra-ui/icons";
export default function PageResetPassword() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  let params = useParams();
  const [inputRepeatPassword, setInputRepeatPassword] = useState(" ");
  const [inputPassword, setInputPassword] = useState(" ");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [isResetPwdSuccessfully, setIsResetPwdSuccessfully] = useState("");
  const [isGoToHome, setIsGoToHome] = useState(false);
  const handleInputRepeatPasswordChange = (e) => {
    setInputRepeatPassword(e.target.value);
  };
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };
  const isEmptyRepeatPassword = inputRepeatPassword === "";
  const isEmptyPassword = inputPassword === "";

  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };
  const togglePasswordConfirm = (e) => {
    setIsShowPasswordConfirm(!isShowPasswordConfirm);
  };
  const clickGoToHome = (e) => {
    setIsGoToHome(true);
  };
  async function onSubmit(values) {
    try {
      const res = await ResetPassword(
        values.password,
        values.passwordConfirm,
        params.userId,
        params.token
      );
      console.log(res);
      setIsResetPwdSuccessfully(true);
      setMessage(res.data.message);
    } catch (err) {
      setIsResetPwdSuccessfully(false);
      setMessage(err.response.data.message);
    }
  }
  if (isGoToHome)
    return (
      <>
        <Navigate to="/"></Navigate>
      </>
    );
  if (isResetPwdSuccessfully)
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
              Password updated
            </Text>
            <p className="text-center text-[rgb(165,163,161)] font-[80px]">
              Sweet! Your new password has now been set and you are logged in.
            </p>
            <Button
              type="submit"
              class={`font-bold bg-[rgb(30,215,96)] w-[200px] h-[50px] rounded-lg mt-9 mx-48 text-center`}
              onClick={clickGoToHome}
            >
              Home
              <ArrowForwardIcon boxSize={7} className="ms-2"></ArrowForwardIcon>
            </Button>
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
            isInvalid={isEmptyRepeatPassword || isEmptyPassword}
            className={"h-[550px] bg-black p-[70px]"}
          >
            <h1 className="text-white font-[600] text-[40px] text-center mb-[40px]">
              Password Reset
            </h1>
            {!isResetPwdSuccessfully && isResetPwdSuccessfully !== "" ? (
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
                Password
              </FormLabel>
              <Input
                id="password"
                type={isShowPassword ? "text" : "password"}
                className={
                  "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                }
                placeholder="Password"
                h="50px"
                name={register("password").name}
                onBlur={register("password").onBlur}
                ref={register("password").ref}
                onChange={handleInputPasswordChange}
              />
              {isShowPassword ? (
                <AiFillEye
                  className={
                    "absolute text-[25px] text-[#dddddd] right-[15px] top-[50px] z-[999]"
                  }
                  onClick={togglePassword}
                />
              ) : (
                <AiFillEyeInvisible
                  className={
                    "absolute text-[25px] text-[#dddddd] right-[15px] top-[50px] z-[999]"
                  }
                  onClick={togglePassword}
                />
              )}
            </div>
            {isEmptyPassword && (
              <InfoErrorInput message="Please enter your new password." />
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Repeat New Password
              </FormLabel>
              <Input
                id="password"
                type={isShowPasswordConfirm ? "text" : "password"}
                className={
                  "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                }
                placeholder="Repeat New Password"
                h="50px"
                name={register("passwordConfirm").name}
                onBlur={register("passwordConfirm").onBlur}
                ref={register("passwordConfirm").ref}
                onChange={handleInputRepeatPasswordChange}
              />
              {isShowPasswordConfirm ? (
                <AiFillEye
                  className={
                    "absolute text-[25px] text-[#dddddd] right-[15px] top-[50px] z-[999]"
                  }
                  onClick={togglePasswordConfirm}
                />
              ) : (
                <AiFillEyeInvisible
                  className={
                    "absolute text-[25px] text-[#dddddd] right-[15px] top-[50px] z-[999]"
                  }
                  onClick={togglePasswordConfirm}
                />
              )}
            </div>
            {isEmptyRepeatPassword && (
              <InfoErrorInput message="Please repeat your new password." />
            )}
            <SingleButton
              name="Send"
              width="full mt-5"
              isLoading={isSubmitting}
            />
          </FormControl>
        </form>
      </div>
    </>
  );
}
