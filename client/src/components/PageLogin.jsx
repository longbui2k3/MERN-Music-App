import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";
import { SingleButton } from "./SingleButton";
import { ShowNotify } from "./ShowNotify";
import { Logo } from "./Logo";
import { InfoErrorInput } from "./InfoErrorInput";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Login, LoginFacebook, LoginGoogle, getUser } from "../api";
import { useCookies } from "react-cookie";
import { UserAuth } from "../context/AuthContext";
import GoogleIcon from "./GoogleIcon";
import FacebookIcon from "./FacebookIcon";
export default function PageLogin({ isLoading, user }) {
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
  const [isNoAccountGoogle, setIsNoAccountGoogle] = useState(false);
  const [isNoAccountFacebook, setIsNoAccountFacebook] = useState(false);
  // const [user, setUser] = useState("");
  // useEffect(() => {
  //   const getUserFunc = async () => {
  //     try {
  //       const res = await getUser();
  //       setUser(res.data.metadata);
  //     } catch (err) {
  //       setUser("");
  //     }
  //   };
  //   getUserFunc();
  // }, []);
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
      console.log(res);
      if (res.status === 200) {
        const email = document.getElementById("email");
        setIsLoginSuccessfully(true);
        setMessage(res.data.message);
        setCookie("remember", isChecked ? email.value : "", {});
        setCookie("jwt", res.data.metadata.token, {
          path: "/",
        });
        // console.log(res.data.data);
        // localStorage.setItem("user", JSON.stringify(res.data.data.user));
      }
    } catch (err) {
      setIsLoginSuccessfully(false);
      setMessage(err.response.data.message);
    }
  }
  const { googleSignIn, facebookSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      const credential = await googleSignIn();
      const res = await LoginGoogle(
        credential.user.email,
        credential.user.accessToken
      );
      setCookie("jwt", res.data.metadata.token, {
        path: "/",
      });
      setIsLoginSuccessfully(true);
      setMessage(res.data.message);
    } catch (err) {
      setIsNoAccountGoogle(true);
      console.log(err);
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      const credential = await facebookSignIn();
      const res = await LoginFacebook(
        credential.user.accessToken,
        credential.user.providerData[0].uid
      );
      setCookie("jwt", res.data.metadata.token, {
        path: "/",
      });
      setIsLoginSuccessfully(true);
      setMessage(res.data.message);
    } catch (err) {
      setIsNoAccountFacebook(true);
      console.log(err);
    }
  };
  useEffect(() => {
    if (user || isLoginSuccessfully) {
      window.location.href = "/";
    }
  }, [user, isLoginSuccessfully]);
  return (
    <>
      {isLoading && !user ? (
        <>
          <div className="w-100 bg-black h-[150px] mt-[-40px] mb-[100px] py-[25px]">
            <Logo />
          </div>
          <div className={"w-[600px] m-auto mt-[-40px] relative"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={isEmptyPassword}
                className={"h-full bg-black px-[120px] py-[70px] w-full "}
              >
                <h1 className="text-white font-[600] text-[40px] text-center mb-[40px]">
                  Log in to Spotify
                </h1>
                {isNoAccountGoogle && (
                  <div className="absolute">
                    <ShowNotify
                      type="error"
                      message={
                        "You do not have a Spotify account connected to your Google Account. If you have a Spotify account, please try log in with your Spotify email or username. If you do not have a Spotify account, please sign up."
                      }
                      variant={"solid"}
                      className={"my-4 -top-[20px] w-[600px] -left-[60px]"}
                    />
                  </div>
                )}
                <Button
                  backgroundColor="#141414"
                  borderRadius="500px"
                  width="100%"
                  padding="24px 32px"
                  marginTop={isNoAccountGoogle ? "150px" : ""}
                  fontSize="16px"
                  fontWeight="700"
                  border="1px solid #555"
                  color="white"
                  _hover={{
                    backgroundColor: "#141414",
                    border: "1px solid white",
                  }}
                  onClick={handleGoogleSignIn}
                  leftIcon={<GoogleIcon />}
                >
                  Sign in with Google
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
                  _hover={{
                    backgroundColor: "#141414",
                    border: "1px solid white",
                  }}
                  onClick={handleFacebookSignIn}
                  // onClick={handleGoogleSignIn}
                  leftIcon={<FacebookIcon />}
                >
                  Sign in with Facebook
                </Button>
                <Divider backgroundColor="#333" margin="40px 2px" />
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
                  <InfoErrorInput message="Please enter your email" />
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
                  <InfoErrorInput message="Please enter your password." />
                )}
                <Checkbox
                  id="rememberMe"
                  formLabel="Remember me"
                  onChange={onChangeCheckbox}
                />
                <SingleButton
                  name="Login"
                  width="full"
                  isLoading={isSubmitting}
                />
                <a href="/forgotPassword">
                  <h5 class="text-white text-center w-full mt-[30px] underline">
                    Forgot your password?
                  </h5>
                </a>

                <h5 class="text-[#a7a7a7] text-center w-full mt-10">
                  Don't have an acccount?{" "}
                  <a href="/signUp" class="underline text-white">
                    Sign Up for Spotify
                  </a>
                </h5>
              </FormControl>
            </form>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
