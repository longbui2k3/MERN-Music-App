import { FormLabel, Input } from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import s from "./style.module.css";
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
    <div className={s.formInput}>
      <FormLabel className={s.formLabel}>{formLabel}</FormLabel>
      <Input
        type={
          formLabel.includes("Password")
            ? isShowPassword
              ? "text"
              : "password"
            : type
        }
        className={s.input}
        placeholder={placeholder}
        onChange={handleInputChange}
        h="50px"
      />
      {formLabel.includes("Password") &&
        (isShowPassword ? (
          <AiFillEye className={s.eye} onClick={togglePassword} />
        ) : (
          <AiFillEyeInvisible className={s.eye} onClick={togglePassword} />
        ))}
    </div>
  );
}
