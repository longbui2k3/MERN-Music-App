import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Logo } from "./Logo";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SignUpStep2 from "./PageSignUpStep2";
export default function SignUpStep1() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState(" ");
  const [isContinue, setIsContinue] = useState(false);
  const isEmptyPassword = inputPassword === "";
  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };
  async function onSubmit(values) {
    console.log(values.password);
    setIsContinue(true);
  }
  if (isContinue) return <SignUpStep2 />;
  return (
    <>
      <Logo />
      <div className="w-[450px] h-[600px] mx-auto">
        <div class="h-1 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-200 absolute"></div>
          <div class="h-full bg-[#1ED760] absolute w-1/3"></div>
        </div>
        <div className="mt-6 mb-6 flex">
          <ChevronLeftIcon boxSize={10} color="#a7a7a7" className="mt-2" />
          <div className="ms-3">
            <Text className="text-[#a7a7a7] font-bold">Step 1 of 3</Text>
            <Text className="text-white font-bold mt-1">Create a password</Text>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={isEmptyPassword} className="px-[50px]">
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
                  "absolute text-[25px] text-[#dddddd] right-[65px] top-[50px] z-[999]"
                }
                onClick={togglePassword}
              />
            ) : (
              <AiFillEyeInvisible
                className={
                  "absolute text-[25px] text-[#dddddd] right-[65px] top-[50px] z-[999]"
                }
                onClick={togglePassword}
              />
            )}
            {isEmptyPassword && (
              <InfoErrorEmptyInput message="Please enter your new password." />
            )}
            <Text className="mt-4 text-[#a7a7a7] fold-bold" fontSize={"15px"}>
              The password must contain at least 8 characters. We recommend
              including at least 1 number and 1 special character.
            </Text>
            <Button
              type="submit"
              class={`font-bold bg-[rgb(30,215,96)] w-full h-[50px] rounded-lg mt-5`}
              isLoading={isSubmitting}
            >
              Next
            </Button>
          </FormControl>
        </form>
      </div>
    </>
  );
}
