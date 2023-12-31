import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Logo } from "./Logo";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { InfoErrorInput } from "./InfoErrorInput";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SignUpStep2 from "./PageSignUpStep2";
import SignUp from "./PageSignUp";
import { useDispatch, useSelector } from "react-redux";
import { setPassword } from "../features/signUp/signUpSlice";

export default function SignUpStep1() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = useSelector((state) => state.signUp.password);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputPassword, setInputPassword] = useState(password);
  const [isContinue, setIsContinue] = useState(false);
  const [clickBack, setClickBack] = useState(false);
  function containsDigit(inputString) {
    for (var i = 0; i < inputString.length; i++) {
      // Kiểm tra xem ký tự hiện tại có phải là chữ số không
      if (!isNaN(parseInt(inputString[i]))) {
        return true; // Nếu là chữ số, trả về true
      }
    }
    return false; // Nếu không có chữ số nào, trả về false
  }
  function containsSpecialCharacter(inputString) {
    var specialChars = `!@#$%^&*()_+-=[]{};':\\"\\|,.<>/?`;

    for (var i = 0; i < inputString.length; i++) {
      // Kiểm tra xem ký tự hiện tại có nằm trong danh sách ký tự đặc biệt không
      if (specialChars.includes(inputString[i])) {
        return true; // Nếu có ký tự đặc biệt, trả về true
      }
    }
    return false; // Nếu không có ký tự đặc biệt nào, trả về false
  }
  const lengthLower8 = inputPassword.length < 8;
  const isInvalidPassword =
    !containsDigit(inputPassword) || !containsSpecialCharacter(inputPassword);
  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };
  const store = (password) => dispatch(setPassword(password));
  function onSubmit(values) {
    if (!lengthLower8 && !isInvalidPassword) {
      store(values.password);
      setIsContinue(true);
    }
  }
  function clickBackFunc() {
    setClickBack(true);
  }
  if (clickBack) {
    return <SignUp />;
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
          <ChevronLeftIcon
            boxSize={10}
            color="#a7a7a7"
            className="mt-2 hover:text-white cursor-pointer"
            onClick={clickBackFunc}
          />
          <div className="ms-3">
            <Text className="text-[#a7a7a7] font-bold">Step 1 of 3</Text>
            <Text className="text-white font-bold mt-1">Create a password</Text>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={isInvalidPassword || lengthLower8}
            className="px-[50px]"
          >
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
              value={inputPassword}
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
            {lengthLower8 ? (
              <InfoErrorInput message="Password should contain at least 8 characters." />
            ) : isInvalidPassword ? (
              <InfoErrorInput message="Your password is too weak. Set a stronger one." />
            ) : (
              ""
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
