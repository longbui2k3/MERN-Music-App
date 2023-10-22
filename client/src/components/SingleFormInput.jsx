import { FormLabel, Input } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
export function SingleFormInput({
  formLabel,
  placeholder,
  handleInputChange,
  type,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const togglePassword = (e) => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className={"relative"}>
      <FormLabel className={"text-white mt-[10px] font-[500]"}>
        {formLabel}
      </FormLabel>
      <Input
        type={
          formLabel.includes("Password")
            ? isShowPassword
              ? "text"
              : "password"
            : type
        }
        className={
          "w-full mt-[5px] bg-[rgb(20, 20, 20)] text-white border-[#aaaaaa]"
        }
        placeholder={placeholder}
        onChange={handleInputChange}
        h="50px"
      />
      {formLabel.includes("Password") &&
        (isShowPassword ? (
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
        ))}
    </div>
  );
}
