import { Logo } from "./Logo";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InfoErrorInput } from "./InfoErrorInput";
import { Select } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNameAuth,
  setDateOfBirthAuth,
  setGenderAuth,
  setUidAuth,
  setEmailAuth,
} from "../features/signUp/signUpAuthSlice";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { CheckExistEmail } from "../api";
import { ShowNotify } from "./ShowNotify";
import { GoChevronLeft } from "react-icons/go";
export default function SignUpGoogleStep1() {
  const dispatch = useDispatch();
  const { userAuth } = UserAuth();
  dispatch(setEmailAuth(userAuth.email));
  dispatch(setUidAuth(userAuth.uid));
  dispatch(setNameAuth(userAuth.displayName));
  const email = useSelector((state) => state.signUpAuth.email);
  const name = useSelector((state) => state.signUpAuth.name);
  const dateOfBirth = useSelector((state) => state.signUpAuth.dateOfBirth);
  const day = dateOfBirth.split("-")[0];
  const month = dateOfBirth.split("-")[1];
  const year = dateOfBirth.split("-")[2];
  const gender = useSelector((state) => state.signUpAuth.gender);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [inputName, setInputName] = useState(name);
  const [inputDay, setInputDay] = useState(day);
  const [inputMonth, setInputMonth] = useState(month);
  const [inputYear, setInputYear] = useState(year);
  const [genderState, setGenderState] = useState(gender);
  const [isContinue, setIsContinue] = useState(false);
  const [clickBack, setClickBack] = useState(false);
  const [isExistEmail, setIsExistEmail] = useState(false);
  async function checkExsitEmail(email) {
    try {
      const res = await CheckExistEmail(email);
      return false;
    } catch (err) {
      return true;
    }
  }
  useEffect(() => {
    async function checkExsitEmailFunc() {
      const res = await checkExsitEmail(email);
      setIsExistEmail(res);
    }
    checkExsitEmailFunc();
  }, [email]);
  const handleInputName = async (e) => {
    setInputName(e.target.value);
    await register("name").onChange(e);
  };
  const handleInputDay = async (e) => {
    setInputDay(e.target.value);
    await register("day").onChange(e);
  };
  const handleInputMonth = async (e) => {
    setInputMonth(e.target.value);
    await register("month").onChange(e);
  };
  const handleInputYear = async (e) => {
    setInputYear(e.target.value);
    await register("year").onChange(e);
  };
  function handleKeyDown(event) {
    var numberArray = [];
    for (var i = 0; i < 10; i++) {
      var c = String.fromCharCode(48 + i);
      numberArray.push(c);
    }
    var char = event.key;
    var isLetter = numberArray.includes(char);

    if (!isLetter && char !== "Backspace") {
      event.preventDefault();
    }
  }
  function handleKeyDownDay(event) {
    handleKeyDown(event);
    var char = event.key;
    if (event.target.value.length >= 2 && char !== "Backspace") {
      event.preventDefault();
    }
  }
  function handleKeyDownYear(event) {
    handleKeyDown(event);
    var char = event.key;
    if (event.target.value.length >= 4 && char !== "Backspace") {
      event.preventDefault();
    }
  }
  const isInvalidInputName = inputName === "";
  const isInvalidInputDay =
    isNaN(inputDay) || inputDay - "0" < 1 || inputDay - "0" > 31;
  const isInvalidInputMonth = inputMonth === "";
  const isInvalidInputYear = inputYear < 1900;
  const isInvalidGender = genderState === "";
  const isValidInput =
    !isInvalidInputName &&
    !isInvalidInputDay &&
    !isInvalidInputMonth &&
    !isInvalidInputYear &&
    !isInvalidGender;
  const store = (name, dateOfBirth, gender) => {
    dispatch(setNameAuth(name));
    dispatch(setGenderAuth(gender));
    dispatch(setDateOfBirthAuth(dateOfBirth));
  };
  function onSubmit(values) {
    if (isValidInput) {
      store(
        values.name,
        `${values.year}-${
          Number(values.month) < 10
            ? "0" + Number(values.month)
            : Number(values.month)
        }-${
          Number(values.day) < 10
            ? "0" + Number(values.day)
            : Number(values.day)
        }`,
        genderState
      );
      setIsContinue(true);
    }
  }
  function clickBackFunc() {
    setClickBack(true);
  }
  if (clickBack) {
    return <Navigate to="/signup" />;
  }
  if (isContinue) return <Navigate to="/signup?type=google&step=2" />;
  return (
    <>
      <Logo />
      <div className="w-[450px] h-[600px] mx-auto">
        <div class="h-1 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-200 absolute"></div>
          <div class="h-full bg-[#1ED760] absolute w-2/3"></div>
        </div>
        <div className="mt-6 mb-6 flex">
          <GoChevronLeft
            fontSize={36}
            color="#a7a7a7"
            className="mt-2 hover:text-white cursor-pointer"
            onClick={clickBackFunc}
          />
          <div className="ms-3">
            <Text className="text-[#a7a7a7] font-bold">Step 1 of 2</Text>
            <Text className="text-white font-bold mt-1">
              Finish creating your account
            </Text>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={
              isInvalidInputName ||
              isInvalidInputDay ||
              isInvalidInputMonth ||
              isInvalidInputYear ||
              isInvalidGender
            }
            className="px-[50px]"
          >
            {isExistEmail && (
              <ShowNotify
                type="error"
                message={"This email is already connected to an account."}
                link={"Log in"}
                linkUrl={"/login"}
                variant={"solid"}
              />
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Name
              </FormLabel>
              <Input
                type="text"
                value={inputName}
                className={
                  "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                }
                h="50px"
                onChange={handleInputName}
                name={register("name").name}
                onBlur={register("name").onBlur}
                ref={register("name").ref}
                disabled={isExistEmail}
              />
            </div>
            {isInvalidInputName && (
              <InfoErrorInput message="Enter a name for your profile." />
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Date of birth
              </FormLabel>
              <div className="flex">
                <Input
                  type="text"
                  className={
                    "mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa] me-2"
                  }
                  h="50px"
                  w="100px"
                  placeholder="dd"
                  value={inputDay}
                  onChange={handleInputDay}
                  name={register("day").name}
                  onBlur={register("day").onBlur}
                  ref={register("day").ref}
                  onKeyDown={handleKeyDownDay}
                  disabled={isExistEmail}
                />
                <Select
                  placeholder="Month"
                  iconColor="white"
                  iconSize="20px"
                  className="text-white mt-[5px]"
                  value={inputMonth}
                  onChange={handleInputMonth}
                  name={register("month").name}
                  onBlur={register("month").onBlur}
                  ref={register("month").ref}
                  h="50px"
                  disabled={isExistEmail}
                >
                  <option value="1" style={{ background: "black" }}>
                    January
                  </option>
                  <option value="2" style={{ background: "black" }}>
                    February
                  </option>
                  <option value="3" style={{ background: "black" }}>
                    March
                  </option>
                  <option value="4" style={{ background: "black" }}>
                    April
                  </option>
                  <option value="5" style={{ background: "black" }}>
                    May
                  </option>
                  <option value="6" style={{ background: "black" }}>
                    June
                  </option>
                  <option value="7" style={{ background: "black" }}>
                    July
                  </option>
                  <option value="8" style={{ background: "black" }}>
                    August
                  </option>
                  <option value="9" style={{ background: "black" }}>
                    September
                  </option>
                  <option value="10" style={{ background: "black" }}>
                    October
                  </option>
                  <option value="11" style={{ background: "black" }}>
                    November
                  </option>
                  <option value="12" style={{ background: "black" }}>
                    December
                  </option>
                </Select>
                <Input
                  type="text"
                  className={
                    "mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa] ms-2"
                  }
                  h="50px"
                  w="130px"
                  placeholder="yyyy"
                  value={inputYear}
                  onChange={handleInputYear}
                  name={register("year").name}
                  onBlur={register("year").onBlur}
                  ref={register("year").ref}
                  onKeyDown={handleKeyDownYear}
                  disabled={isExistEmail}
                />
              </div>
            </div>
            {isInvalidInputDay && (
              <InfoErrorInput message="Please enter the day of your birth date by entering a number between 1 and 31." />
            )}
            {isInvalidInputMonth && (
              <InfoErrorInput message="Select your birth month." />
            )}
            {isInvalidInputYear && (
              <InfoErrorInput message="Please enter the year of your birth date using four digits (e.g., 1990)." />
            )}
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Gender
              </FormLabel>
              <Text className="mb-2 text-[#a7a7a7] fold-bold" fontSize={"15px"}>
                We use your gender to help personalize our content
                recommendations and ads for you.
              </Text>
              <RadioGroup
                onChange={setGenderState}
                value={genderState}
                className="text-white"
              >
                <div className="mb-2">
                  <Radio value="Man" className="" isDisabled={isExistEmail}>
                    Man
                  </Radio>
                  <Radio
                    value="Woman"
                    className="ms-10"
                    isDisabled={isExistEmail}
                  >
                    Woman
                  </Radio>
                  <Radio
                    value="Non-binary"
                    className="ms-10"
                    isDisabled={isExistEmail}
                  >
                    Non-binary
                  </Radio>
                </div>
                <div>
                  <Radio value="Something else" isDisabled={isExistEmail}>
                    Something else
                  </Radio>
                  <Radio
                    value="Prefer not to say"
                    className="ms-11"
                    isDisabled={isExistEmail}
                  >
                    Prefer not to say
                  </Radio>
                </div>
              </RadioGroup>
            </div>
            {isInvalidGender && (
              <InfoErrorInput message="Select your gender." />
            )}
            <Button
              type="submit"
              class={`font-bold bg-[rgb(30,215,96)] w-full h-[50px] rounded-lg mt-5`}
              isLoading={isSubmitting}
              isDisabled={isExistEmail}
            >
              Next
            </Button>
          </FormControl>
        </form>
      </div>
    </>
  );
}
