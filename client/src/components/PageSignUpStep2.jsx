import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Logo } from "./Logo";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InfoErrorEmptyInput } from "./InfoErrorEmptyInput";
import { Select } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import SignUpStep3 from "./PageSignUpStep3";
import SignUpStep1 from "./PageSignUpStep1";
import { useDispatch } from "react-redux";
import {
  setName,
  setDateOfBirth,
  setGender,
} from "../features/signUp/signUpSlice";
export default function SignUpStep2() {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [inputName, setInputName] = useState("");
  const [inputDay, setInputDay] = useState("");
  const [inputMonth, setInputMonth] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [genderState, setGenderState] = useState("");
  const [isContinue, setIsContinue] = useState(false);
  const [clickBack, setClickBack] = useState(false);
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
  const isEmptyInputName = inputName === "";
  const isEmptyInputDay = inputDay === "";
  const isEmptyInputMonth = inputMonth === "";
  const isEmptyInputYear = inputYear === "";
  const store = (name, dateOfBirth, gender) => {
    dispatch(setName(name));
    dispatch(setGender(gender));
    dispatch(setDateOfBirth(dateOfBirth));
  };
  function onSubmit(values) {
    store(
      values.name,
      `${values.day}/${values.month}/${values.year}`,
      genderState
    );
    setIsContinue(true);
  }
  function clickBackFunc() {
    setClickBack(true);
  }
  if (clickBack) {
    return <SignUpStep1 />;
  }
  if (isContinue) return <SignUpStep3 />;
  return (
    <>
      <Logo />
      <div className="w-[450px] h-[600px] mx-auto">
        <div class="h-1 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-200 absolute"></div>
          <div class="h-full bg-[#1ED760] absolute w-2/3"></div>
        </div>
        <div className="mt-6 mb-6 flex">
          <ChevronLeftIcon
            boxSize={10}
            color="#a7a7a7"
            className="mt-2 hover:text-white cursor-pointer"
            onClick={clickBackFunc}
          />
          <div className="ms-3">
            <Text className="text-[#a7a7a7] font-bold">Step 2 of 3</Text>
            <Text className="text-white font-bold mt-1">
              Tell us about yourself
            </Text>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            isInvalid={
              isEmptyInputName ||
              isEmptyInputDay ||
              isEmptyInputMonth ||
              isEmptyInputYear
            }
            className="px-[50px]"
          >
            <div className="relative">
              <FormLabel className={"text-white mt-[10px] font-[500]"}>
                Name
              </FormLabel>
              <Input
                type="text"
                className={
                  "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
                }
                h="50px"
                onChange={handleInputName}
                name={register("name").name}
                onBlur={register("name").onBlur}
                ref={register("name").ref}
              />
            </div>
            {isEmptyInputName && (
              <InfoErrorEmptyInput message="Enter a name for your profile." />
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
                  onChange={handleInputDay}
                  name={register("day").name}
                  onBlur={register("day").onBlur}
                  ref={register("day").ref}
                />
                <Select
                  placeholder="Month"
                  iconColor="white"
                  iconSize="20px"
                  className="text-white mt-[5px]"
                  onChange={handleInputMonth}
                  name={register("month").name}
                  onBlur={register("month").onBlur}
                  ref={register("month").ref}
                  h="50px"
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
                  onChange={handleInputYear}
                  name={register("year").name}
                  onBlur={register("year").onBlur}
                  ref={register("year").ref}
                />
              </div>
            </div>
            {isEmptyInputDay && (
              <InfoErrorEmptyInput message="Please enter the day of your birth date by entering a number between 1 and 31." />
            )}
            {isEmptyInputMonth && (
              <InfoErrorEmptyInput message="Select your birth month." />
            )}
            {isEmptyInputYear && (
              <InfoErrorEmptyInput message="Please enter the year of your birth date using four digits (e.g., 1990)." />
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
                  <Radio value="Man" className="">
                    Man
                  </Radio>
                  <Radio value="Woman" className="ms-10">
                    Woman
                  </Radio>
                  <Radio value="Non-binary" className="ms-10">
                    Non-binary
                  </Radio>
                </div>
                <div>
                  <Radio value="Something else">Something else</Radio>
                  <Radio value="Prefer not to say" className="ms-11">
                    Prefer not to say
                  </Radio>
                </div>
              </RadioGroup>
            </div>
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
