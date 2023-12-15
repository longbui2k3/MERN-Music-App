import { Divider, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { SingleButton } from "./SingleButton";
import { ShowNotify } from "./ShowNotify";
import { Logo } from "./Logo";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Login } from "../api";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
export default function PageLogin() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [cookies, setCookie] = useCookies([""]);
  const [inputPassword, setInputPassword] = useState(" ");
  const [inputEmail, setInputEmail] = useState(cookies.remember);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoginSuccessfully, setIsLoginSuccessfully] = useState("");
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const handleInputPasswordChange = async (e) => {
    setInputPassword(e.target.value);
    await register("password").onChange(e);
  };
  const handleInputEmail = async (e) => {
    setInputEmail(e.target.value);
    await register("email").onChange(e);
  };

  const isEmptyPassword = inputPassword === "";
  const isEmptyInputEmail = inputEmail === "";

  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };

  function onChangeCheckbox() {
    setIsChecked(false);
  }

  async function onSubmit(values) {
    try {
      const res = await Login(values.email, values.password);
      if (res.data.status === "success") {
        const email = document.getElementById("email");
        setIsLoginSuccessfully(true);
        setMessage(res.data.message);
        setCookie("remember", isChecked ? email.value : "", {});
        setCookie("jwt", res.data.token, {
          path: "/",
        });
      }
    } catch (err) {
      setIsLoginSuccessfully(false);
      setMessage(err.response.data.message);
    }
  }
  if (isLoginSuccessfully) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="w-100 bg-black h-[150px] mt-[-40px] mb-[100px] py-[25px]">
        <Logo />
      </div>
      <div className={"w-[600px] m-auto mt-[-40px]"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={isEmptyPassword}
            className={"h-[700px] bg-black px-[120px] py-[70px] w-full"}
          >
            <h1 className="text-white font-[600] text-[40px] text-center mb-[40px]">
              Login
            </h1>
            {isLoginSuccessfully ? (
              <ShowNotify
                type="success"
                message={message}
                variant="left-accent"
              ></ShowNotify>
            ) : isLoginSuccessfully === "" ? (
              ""
            ) : (
              <ShowNotify
                type="error"
                message={message}
                variant="left-accent"
              ></ShowNotify>
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                value={inputEmail}
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
              <InfoErrorEmptyInput message="Please enter your password." />
            )}
            <Checkbox
              id="rememberMe"
              formLabel="Remember me"
              onChange={onChangeCheckbox}
            />
            <SingleButton name="Login" width="full" isLoading={isSubmitting} />
            <a href="/forgotPassword">
              <h5 class="text-white text-center w-full mt-[30px] underline">
                Forgot your password?
              </h5>
            </a>
            <Divider backgroundColor="#333" margin="40px 2px" />
            <h5 class="text-[#a7a7a7] text-center w-full mt-5">
              Don't have an acccount?{" "}
              <a href="/signUp" class="underline text-white">
                Sign Up for Spotify
              </a>
            </h5>
          </FormControl>
        </form>
      </div>
    </>
  );
}
